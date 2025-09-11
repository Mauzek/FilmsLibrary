import React from "react";
import { Header } from "./header";
import { Footer } from "./footer";
import { TabBar } from "./tabBar";
import { ScrollToTop } from "./scrollToTop";
import { Analytics } from '@vercel/analytics/react';
import { useUserStore } from "@/store";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const {user} = useUserStore();
  return (
    <>
      <Analytics/>
      <ScrollToTop/>
      <Header user={user}/>
      {children}
      <TabBar user={user}/>
      <Footer />
    </>
  );
};
