import { type PropsWithChildren } from "react";
import { Header } from "./Header";

export function Layout({ children }: PropsWithChildren) {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-bg1 text-foreground">
      <Header />
      <main className="mx-auto max-w-4xl px-6 py-10">
        {children}
      </main>
    </div>
  );
}