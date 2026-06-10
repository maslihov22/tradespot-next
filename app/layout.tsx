import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TradeSpot",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

const isDev = process.env.NODE_ENV === "development";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {isDev ? (
          <script src="/telegram-web-app-mock.js" />
        ) : (
          <script src="https://telegram.org/js/telegram-web-app.js" />
        )}
      </head>
      <body>{children}</body>
    </html>
  );
}
