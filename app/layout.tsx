export const metadata = {
  title: "Enaj API",
  description: "Backend API for Enaj",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
