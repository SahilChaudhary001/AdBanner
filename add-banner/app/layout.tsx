// app/layout.tsx
import './globals.css';
import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <title>My Next.js App</title>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
