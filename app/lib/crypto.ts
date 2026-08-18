// ==========================================
// Field-level encryption + blind indexing
// ==========================================
// AES-256-GCM (via node:crypto, no new dependency) for encrypting
// sensitive field values, and a separate HMAC-SHA256 "blind index"
// for deterministic per-user lookups/uniqueness enforcement without
// ever storing a plaintext or directly-comparable value.
//
// - encryptField/decryptField use DATA_ENCRYPTION_KEY (32-byte,
//   base64) and are NON-deterministic (random IV per call) — never
//   use the output for equality lookups.
// - blindIndex uses a SEPARATE key, BLIND_INDEX_KEY (32-byte,
//   base64), and IS deterministic for the same input — this is what
//   powers uniqueness constraints and lookups (e.g. "does this user
//   already have this ailment selected?") without needing to decrypt
//   every row to compare.
//
// Encrypted payload encoding: "iv:tag:ciphertext", each component
// base64-encoded, joined with ":".
// ==========================================

import { createCipheriv, createDecipheriv, createHmac, randomBytes } from "node:crypto";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH_BYTES = 12; // recommended IV length for GCM
const KEY_LENGTH_BYTES = 32; // AES-256

function loadKey(envVarName: string): Buffer {
  const raw = process.env[envVarName];
  if (!raw) {
    throw new Error(
      `Missing required environment variable ${envVarName}. It must be a base64-encoded 32-byte key.`
    );
  }
  const key = Buffer.from(raw, "base64");
  if (key.length !== KEY_LENGTH_BYTES) {
    throw new Error(
      `${envVarName} must decode to exactly ${KEY_LENGTH_BYTES} bytes (got ${key.length}). ` +
        `Generate one with: node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"`
    );
  }
  return key;
}

// Keys are lazily loaded and cached on first use so importing this
// module never throws in contexts (build, other routes) where the
// env vars aren't needed yet.
let dataEncryptionKey: Buffer | null = null;
function getDataEncryptionKey(): Buffer {
  if (!dataEncryptionKey) dataEncryptionKey = loadKey("DATA_ENCRYPTION_KEY");
  return dataEncryptionKey;
}

let blindIndexKey: Buffer | null = null;
function getBlindIndexKey(): Buffer {
  if (!blindIndexKey) blindIndexKey = loadKey("BLIND_INDEX_KEY");
  return blindIndexKey;
}

/**
 * Encrypts a plaintext string with AES-256-GCM using a random IV.
 * Returns "iv:tag:ciphertext" (each base64-encoded). Non-deterministic:
 * encrypting the same plaintext twice yields different output, so this
 * must never be used for equality lookups — use blindIndex for that.
 */
export function encryptField(plaintext: string): string {
  const key = getDataEncryptionKey();
  const iv = randomBytes(IV_LENGTH_BYTES);
  const cipher = createCipheriv(ALGORITHM, key, iv);
  const ciphertext = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return [iv.toString("base64"), tag.toString("base64"), ciphertext.toString("base64")].join(":");
}

/**
 * Decrypts a payload produced by encryptField. Throws if the payload
 * is malformed or fails authentication (tampered/wrong key).
 */
export function decryptField(payload: string): string {
  const key = getDataEncryptionKey();
  const parts = payload.split(":");
  if (parts.length !== 3) {
    throw new Error("Invalid encrypted payload format: expected \"iv:tag:ciphertext\"");
  }
  const [ivB64, tagB64, ciphertextB64] = parts;
  const iv = Buffer.from(ivB64, "base64");
  const tag = Buffer.from(tagB64, "base64");
  const ciphertext = Buffer.from(ciphertextB64, "base64");

  const decipher = createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(tag);
  const plaintext = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
  return plaintext.toString("utf8");
}

/**
 * Deterministic HMAC-SHA256 blind index for a value, using a key
 * separate from the AES data-encryption key. Callers should salt the
 * input themselves (e.g. `${userId}:${catalogId}`) so index values
 * can't be clustered across users from a raw DB dump. Returns hex.
 */
export function blindIndex(value: string): string {
  const key = getBlindIndexKey();
  return createHmac("sha256", key).update(value, "utf8").digest("hex");
}
