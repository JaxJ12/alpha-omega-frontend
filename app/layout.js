import './globals.css';

export const metadata = {
  title: 'Alpha & Omega | Medicare Made Simple',
  description: 'Expert Medicare guidance for seniors — understand your options, simplify your coverage, and make confident decisions.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
