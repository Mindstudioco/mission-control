import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mission Control - Second Brain",
  description: "Dashboard de gestión de agentes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="antialiased">
        <div className="min-h-screen flex flex-col">
          <header className="bg-card border-b border-border p-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  🦅 Mission Control
                </h1>
                <p className="text-sm text-gray-400">Second Brain Dashboard</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-400">Nico & Agents</span>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500"></div>
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-hidden">{children}</main>
        </div>
      </body>
    </html>
  );
}
