"use client";
import Link from "next/link";
import { useState } from "react";

function MobileHeader() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => (open ? setOpen(false) : setOpen(true))}
        aria-label="Menu"
        className="sm:hidden"
      >
        {/* Menu Icon SVG */}
        <svg
          width="21"
          height="15"
          viewBox="0 0 21 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="21" height="1.5" rx=".75" fill="#426287" />
          <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#426287" />
          <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="#426287" />
        </svg>
      </button>

      {/* Mobile Menu */}
      <div
        className={`${
          open ? "flex" : "hidden"
        } absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}
      >
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
    </>
  );
}

export default MobileHeader;
