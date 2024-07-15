"use client";
import Nav from "@/components/Nav/Nav";
import { Provider } from "react-redux";
import store from "@/store";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html className="bg-white">
      <Provider store={store}>
        <body>
          <Nav />
          <main className="h-full bg-slate-100">{children}</main>
        </body>
      </Provider>
    </html>
  );
}
