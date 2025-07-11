import React from "react";
import { Header } from "./header";
import { Footer } from "./footer";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};
