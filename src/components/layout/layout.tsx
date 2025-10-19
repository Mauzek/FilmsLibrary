import React, { useEffect } from "react";
import { Header } from "./header";
import { Footer } from "./footer";
import { TabBar } from "./tabBar";
import { ScrollToTop } from "./scrollToTop";
import { Analytics } from '@vercel/analytics/react';
import { initAuthListener } from "@/services";
import { AppToaster } from "./appToaster";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    initAuthListener();
  }, []);
  return (
    <>
      <Analytics/>
      <ScrollToTop/>
      <Header/>
      {children}
      <TabBar/>
      <Footer />
      <AppToaster/>
    </>
  );
};
