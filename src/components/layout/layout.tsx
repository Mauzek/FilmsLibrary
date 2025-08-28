import React from "react";
import { Header } from "./header";
import { Footer } from "./footer";
import { TabBar } from "./tabBar";
import { ScrollToTop } from "./scrollToTop";
import { Analytics } from '@vercel/analytics/react';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Analytics/>
      <ScrollToTop/>
      <Header />
      {children}
      <TabBar/>
      <Footer />
    </>
  );
};
