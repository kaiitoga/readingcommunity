import { Image } from "@react-three/drei";
// import { useThree, Group } from "@react-three/fiber";
import { useThree } from "@react-three/fiber";

import * as THREE from "three";

const Booksimage = ()=> {
  const {width,height} = useThree((state) => state.viewport);

  // 画像縦横比
  const aspectRatios = {
    HadTheSameDreamAgain: 1600 / 2285,
    ComradeGirlsHitTheTarget: 1295 / 1867,
    NaruseGoesToTakeTheWorld: 680 / 1000,
    T3000LeftToLive: 700 / 1000
  };

  const baseX = 0;
  const baseY = 0

  const calculateScaleRatio = (widthPercentage: number, maxWidth: number, Ratio: number):[number, number, number] => {
    const scaleWidth = Math.min(window.innerWidth * widthPercentage, maxWidth);
    const scaleHeight = scaleWidth / Ratio;
    return [scaleWidth, scaleHeight, 1];
  };

  const images = [
    {
      url: "/homeImages/NaruseGoesToTakeTheWorld.jpg",
      scale: calculateScaleRatio(0.0025, 1.7, aspectRatios.NaruseGoesToTakeTheWorld),
      position:new THREE.Vector3( baseX + width * 0.09, baseY - height *0.005, 2.5),
    },
    {
      url: "/homeImages/HadTheSameDreamAgain.jpg",
      scale: calculateScaleRatio(0.0015, 0.9, aspectRatios.HadTheSameDreamAgain),
      position:new THREE.Vector3(baseX - width * 0.085, baseY - height *0.2, 3)
    },
    {
      url: "/homeImages/3000CharactersLeftToLive.jpg",
      scale: calculateScaleRatio(0.0035, 2, aspectRatios.T3000LeftToLive),
      position:new THREE.Vector3(baseX + width * 0.1, baseY -height * 0.35, 2)
    },
    {
      url: "/homeImages/ComradeGirlsHitTheTarget.jpg",
      scale: calculateScaleRatio(0.0025, 1.5, aspectRatios.ComradeGirlsHitTheTarget),
      position:new THREE.Vector3(baseX + width * 0.02, baseY - height * 0.6, 2.7)
    },
  ]

  return (
    <group>
      {images.map((img, index) => (
        <Image key={index} url={img.url} scale={[img.scale[0], img.scale[1]]} position={img.position} />
      ))}
    </group>
  )
}

export default Booksimage;