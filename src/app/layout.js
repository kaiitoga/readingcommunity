"use client"
import React from 'react'
import "./globals.css";
import Header from './Components/Header/Header';
import { Provider } from 'react-redux';
import store from './Redux/store';
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useState, useEffect } from 'react'; 
import { Noto_Serif_JP, Roboto, Yusei_Magic } from "next/font/google";

export const _NotoSerifJP = Noto_Serif_JP({
  subsets: ["latin"],  
  weight: ["700"],
  display: "swap",
});

export const _Roboto = Roboto({
  subsets: ["latin"], 
  weight: ["700"],
  italics: true,
  display: "swap",
});

export const _YuseiMagic = Yusei_Magic({
  subsets: ["latin"], 
  weight: ["400"],
  italics: true,
  display: "swap",
});

  const Layout = ({ children }) => {
    const [isMounted, setIsMounted] = useState(false);
    const [currentPage, setCurrentPage] = useState("");
    const path = usePathname();
  
    useEffect(() => {
      setCurrentPage(path === "/" ? "" : "Chat");
      setIsMounted(true);
    }, [path]);
  
    if (!isMounted) {
      return null;
    }

    return (
      <html lang="ja">
        <body className='max-w-screen-2xl mx-auto h-full w-full scroll-smooth'>
          <Provider store={store}>
          <Header currentPage={currentPage} />
            <AnimatePresence>
             <motion.div
             key={currentPage}
             initial={{ opacity: 0, y: 100 }} // 少し早いアニメーション
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: -100 }} // 逆方向のアニメーション
             transition={{ duration: 1, delay: 0.2 }}
             onAnimationComplete={() => console.log("アニメーション")}
           >
              {children}
              </motion.div>
            </AnimatePresence>
            </Provider>
          </body>
          
      </html>
    )
  }

export default Layout