import Image from "next/image";
import Link from "next/link";
import MobileHeader from "./MobileHeader";

function Header() {
  return (
    <header className="overflow-visible transition-[height,background-color] duration-300 ease-out">
      <nav className="flex items-center justify-between px-6 py-4 relative transition-all lg:max-w-7xl mx-auto">
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
        <MobileHeader />
      </nav>
    </header>
  );
}

export default Header;
