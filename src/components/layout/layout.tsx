import React from "react";
import { Header } from "./header";
import { Footer } from "./footer";
import { TabBar } from "./tabBar";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <TabBar/>
      <Footer />
    </>
  );
};
