import React from "react";
import { Header } from "./header";
import { Footer } from "./footer";
import { TabBar } from "./tabBar";
import { ScrollToTop } from "./scrollToTop";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ScrollToTop/>
      <Header />
      <main>{children}</main>
      <TabBar/>
      <Footer />
    </>
  );
};
