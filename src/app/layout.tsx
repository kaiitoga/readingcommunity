"use client";
import "./globals.css";
import Header from './Components/Header/Header';
import { Provider } from 'react-redux';
import { store } from'./Redux/store';
import { AnimatePresence, motion } from "framer-motion";
import { Noto_Serif_JP, Roboto, Yusei_Magic } from "next/font/google";
import { useState, useEffect, ReactNode } from "react";
import { usePathname } from "next/navigation";

export const _NotoSerifJP = Noto_Serif_JP({
  subsets: ["latin"],  
  weight: ["700"],
  display: "swap",
});

export const _Roboto = Roboto({
  subsets: ["latin"], 
  weight: ["700"],
  style: "italic",
  display: "swap",
});

export const _YuseiMagic = Yusei_Magic({
  subsets: ["latin"], 
  weight: ["400"],
  style: "normal",
  display: "swap",
});

interface Props {
  children: ReactNode;
}

  const Layout = ({ children }: Props) => {
    const [currentPage, setCurrentPage] = useState("");
    const path = usePathname();
  
    useEffect(() => {
      setCurrentPage(path === "/" ? "" : "Chat");
    }, [path]);
    return (
      <html lang="ja">
        <body className='max-w-screen-2xl mx-auto h-full w-full scroll-smooth'>
          <Provider store={store}>
          <Header />
            {/* <AnimatePresence> */}
              {/* <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{ duration: 1, delay: 0.2 }}
              onAnimationComplete={() => console.log("アニメーション")}
            >  */}
              {children}
              {/* </motion.div> */}
            {/* </AnimatePresence> */}
            </Provider>
          </body>
          
      </html>
    )
  }

export default Layout