import './globals.css';

export const metadata = {
  title: 'Alpha & Omega Agency | Medicare Made Easy for Seniors',
  description: 'Independent Medicare guidance from Jay Johnson. Compare 200+ plans from 8 carriers — no cost, no pressure. Serving Oak Point, TX and surrounding areas.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
