"use client"
import { Image, Scroll, ScrollControls, useScroll } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import store from "./Redux/store";
import AttentionBooksSection from "./Components/Section/AttentionBooksSection";
import ChatSection from "./Components/Section/ChatSection";
import About from "./Components/Section/About";
import Title from "./Components/Section/Title";

const Booksimage = ()=> {
  const {width,height} = useThree((state) => state.viewport);
  const group = useRef();
  const data = useScroll();

  // 画像縦横比
  const aspectRatios = {
    HadTheSameDreamAgain: 1600 / 2285,
    ComradeGirlsHitTheTarget: 1295 / 1867,
    NaruseGoesToTakeTheWorld: 680 / 1000,
    T3000LeftToLive: 700 / 1000
  };

  const baseX = 0;
  const baseY = 0;

  const calculateScaleRatio = (widthPercentage, maxWidth, Ratio) => {
    const scaleWidth = Math.min(window.innerWidth * widthPercentage, maxWidth);
    const scaleHeight = scaleWidth / Ratio;
    return [scaleWidth, scaleHeight, 1]; // 必要に応じてz軸のスケールも調整
  };

  const images = [
    {
      url: "/homeImages/NaruseGoesToTakeTheWorld.jpg",
      scale: calculateScaleRatio(0.0025, 1.7, aspectRatios.NaruseGoesToTakeTheWorld),
      position: [baseX + width * 0.09, baseY - height *0.005, 2.5],
    },
    {
      url: "/homeImages/HadTheSameDreamAgain.jpg",
      scale: calculateScaleRatio(0.0015, 0.9, aspectRatios.HadTheSameDreamAgain),
      position: [baseX - width * 0.085, baseY - height *0.2, 3]
    },
    {
      url: "/homeImages/3000CharactersLeftToLive.jpg",
      scale: calculateScaleRatio(0.0035, 2, aspectRatios.T3000LeftToLive),
      position: [baseX + width * 0.1, baseY -height * 0.35, 2],
    },
    {
      url: "/homeImages/ComradeGirlsHitTheTarget.jpg",
      scale: calculateScaleRatio(0.0025, 1.5, aspectRatios.ComradeGirlsHitTheTarget),
      position: [baseX + width * 0.02, baseY - height * 0.6, 2.7],
    },
  ]

  return (
    <group ref={group}>
      {images.map((img, index) => (
        <Image key={index} url={img.url} scale={img.scale} position={img.position} />
      ))}
    </group>
  )
}

export default function Home() {

// =========
  // h1にtailwindでサポートされていない部分をstyleで指定
  // 下記エラー表示
  // Uncaught TypeError: Cannot read properties of null (reading 'style')
  // サーバー立て直したら治ったが、一応追加
  useEffect(() => {
    const titleElements = document.querySelectorAll("h1");
    titleElements.forEach((titleElement) => {
      titleElement.style.textShadow = "10px 5px 10px #00CC00";
    });
  }, []);
// =========

  return (
    
    <div className="h-calc-header bg-green-200">
        <Canvas className="w-full h-full">
          <ScrollControls pages={4} damping={2}>
            <Scroll>
              <Booksimage />
            </Scroll>

            <Scroll html className="w-full">
              <section id="Top"><Title /></section>
              <section id="About"><About /></section>
              <section id="AttentionBooksSection"><AttentionBooksSection /></section>
              <section id="ChatSection"><ChatSection /></section>

            </Scroll>
          </ScrollControls>
        </Canvas>
      </div>
  );
}