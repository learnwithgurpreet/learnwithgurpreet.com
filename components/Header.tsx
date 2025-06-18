"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

function Header() {
  return (
    <div className="top-0 absolute lg:fixed w-full z-20">
      <header className="text-sm lg:text-xs font-medium overflow-visible transition-[height,background-color] duration-300 ease-out h-32">
        <div className="h-full w-full flex items-center justify-between lg:max-w-7xl lg:mx-auto relative">
          <Link className="ml-6 mt-0 lg:pt-px" href="/">
            <Image
              className="dark:invert h-10"
              src="/logo.svg"
              alt="Learn with Gurpreet home"
              width={40}
              height={40}
              priority
            />
          </Link>
          <div className="toggle-button lg:hidden z-30 mr-4">
              <button
                className="bg-blue-500 rounded-xl px-4 py-3 text-white cursor-pointer"
                aria-label="Toggle navigation"
                aria-expanded="false"
                aria-controls="site-nav"
                aria-haspopup="true"
                type="button"
                data-toggle="site-nav">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                  </svg>
              </button>
          </div>
          <nav id="site-nav" className="w-full hidden lg:contents rounded-xl lg:rounded-none mt-5 lg:mt-0 mr-4 lg:mr-0 px-8 lg:pr-0 z-20 shadow-[0_8px_40px_0_rgba(0,0,0,0.35)] lg:shadow-none">
            <ul className="list-none p-0 block lg:flex justify-start items-center gap-6 text-light-02 pt-6 lg:pt-2 lg:ml-8">
              {["Posts", "Stats", "Tags", "Uses", "Contact"].map((item) => (
                <li
                  key={item}
                  className="border-t border-dark-gray-60 first:border-none lg:border-none max-lg:mt-1 py-2 max-lg:first:mt-0 max-lg:first:pt-0 max-lg:first:pb-1.5 lg:pt-0"
                >
                  <Link
                    className="nav-item no-underline lg:font-semibold pb-4 text-sm font-bold"
                    aria-haspopup="true"
                    aria-expanded="false"
                    aria-controls={`dropdown-${item.toLowerCase()}`}
                    href={`/${item.toLowerCase()}`}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex justify-end flex-grow gap-3 flex-wrap lg:flex-no-wrap pt-3 pb-6 lg:p-0 lg:mr-6 button-block lg:w-min">
              <a
                id="top-nav-download-button-desktop"
                data-show-platform="false"
                className="download btn btn--none btn--orange rounded-[--leo-radius-m] h-9 btn--white top-nav-cta font-semibold normal-case py-2 max-w-full w-full lg:w-fit leading-none [--icon-size:1.3em] transition-opacity duration-500"
                data-build-channel="release"
                data-allows-dynamic-ref-code="true"
                href="https://laptop-updates.brave.com/download/BRV002?bitness=64"
                data-theme="light"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 19.5v-.75a7.5 7.5 0 0 0-7.5-7.5H4.5m0-6.75h.75c7.87 0 14.25 6.38 14.25 14.25v.75M6 18.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
              </a>
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
}

function Header2(){
  const [open, setOpen] = useState(false)
    return (
      <header className="overflow-visible transition-[height,background-color] duration-300 ease-out border-gray-300 border-b">
        <nav className="flex items-center justify-between px-6 py-4 bg-white relative transition-all lg:max-w-7xl mx-auto">
            <a href="#">
              <Image
                className="dark:invert h-10"
                src="/logo.svg"
                alt="Learn with Gurpreet home"
                width={40}
                height={40}
                priority
              />
            </a>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-8">
                {["Posts", "Stats", "Tags", "Uses", "Contact"].map((item) => (
                  <Link
                    key={item}
                    aria-haspopup="true"
                    aria-expanded="false"
                    aria-controls={`dropdown-${item.toLowerCase()}`}
                    href={`/${item.toLowerCase()}`}
                  >
                    {item}
                  </Link>
                ))}
            </div>

            <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" className="sm:hidden">
                {/* Menu Icon SVG */}
                <svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="21" height="1.5" rx=".75" fill="#426287" />
                    <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#426287" />
                    <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="#426287" />
                </svg>
            </button>

            {/* Mobile Menu */}
            <div className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}>
                {["Posts", "Stats", "Tags", "Uses", "Contact"].map((item) => (
                  <Link
                    key={item}
                    aria-haspopup="true"
                    aria-expanded="false"
                    aria-controls={`dropdown-${item.toLowerCase()}`}
                    href={`/${item.toLowerCase()}`}
                  >
                    {item}
                  </Link>
                ))}
            </div>
        </nav>
      </header>
    )
}

export default Header2;
