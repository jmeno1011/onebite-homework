import Link from "next/link";
import React, { ReactNode } from "react";
import style from "./global-layout.module.css";

interface GlobalLayoutProps {
  children: ReactNode;
}

export default function GlobalLayout({ children }: GlobalLayoutProps) {
  return (
    <div className={style.container}>
      <header className={style.header}>
        <Link href={"/"}>ONEBITE CINEMA</Link>
      </header>
      <main>{children}</main>
      <footer>footer</footer>
    </div>
  );
}
