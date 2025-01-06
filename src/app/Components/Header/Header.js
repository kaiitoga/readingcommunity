"use client";
import React, { useEffect, useState } from 'react'
import HamburgerMenu from './SmallScreen/HamburgerMenu';
import Hamburger from './SmallScreen/Hamburger';
import HeaderDesktop from './LargeScreen/HeaderDesktop';
import { useRouter } from 'next/navigation';

const Header = ({ currentPage }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [changeIcon, setChangeIcon] = useState(false);

  const toggleIcon = () => {
    setChangeIcon(!changeIcon)
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <>
    {/* 768px以下ヘッダーメニュー */}
    <header className='bg-lime-400 md:hidden '>
      <Hamburger toggleMenu={toggleMenu} toggleIcon={toggleIcon} changeIcon={changeIcon} />
      <HamburgerMenu toggleMenu={toggleMenu} menuOpen={menuOpen} toggleIcon={toggleIcon} currentPage={currentPage}/>
    </header>

    {/* 768px以上ヘッダーメニュー */}
      <header className='bg-lime-400 text-center py-2 hidden md:block'>
        <HeaderDesktop currentPage={currentPage}/>
      </header>
    </>
  )
}

export default Header