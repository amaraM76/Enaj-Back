export default function Home() {
  return (
    <main style={{ padding: "2rem", fontFamily: "system-ui" }}>
      <h1>Enaj API</h1>
      <p>Backend is running. Available endpoints:</p>
      <ul>
        <li><code>GET /api/ailments</code></li>
        <li><code>GET /api/ailments/:slug/linked-preferences</code></li>
        <li><code>GET /api/preferences</code></li>
        <li><code>POST /api/preferences</code></li>
        <li><code>GET /api/products/:category</code></li>
        <li><code>GET /api/products/:category/:slug/scan?userId=</code></li>
        <li><code>GET /api/saved-products?userId=</code></li>
        <li><code>POST /api/saved-products</code></li>
        <li><code>DELETE /api/saved-products</code></li>
        <li><code>GET /api/users/:userId</code></li>
      </ul>
    </main>
  );
}
