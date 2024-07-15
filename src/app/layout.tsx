import AuthProvider from "@/components/AuthProvider/AuthProvider";
import "./globals.css";
import Nav from "@/components/Nav/Nav";
import { ReduxProvider } from "@/store/provider";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html className="relative bg-slate-100 h-full">
      <AuthProvider>
        <ReduxProvider>
          <body className="h-full">
            <Nav />
            <main className="h-full bg-slate-100">{children}</main>
          </body>
        </ReduxProvider>
      </AuthProvider>
    </html>
  );
}
