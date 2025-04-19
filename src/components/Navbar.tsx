"use client";

import { useSession, signOut } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Avatar from "@/components/Avatar";
import { usePathname } from "next/navigation";
import { Menu, User, LogOut, Plus, ChevronDown } from "lucide-react";

export default function Navbar({ isDashboard }) {
  const { data: session } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  const pathname = usePathname();
  const isInLogin =
    pathname.startsWith("/login") || pathname.startsWith("/register");

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10 && !isDashboard) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (isInLogin) return null;

  const navLinks = [
    { name: "Beranda", href: "/" },
    { name: "Harga", href: "#pricing" },
    { name: "Tentang Kami", href: "#about" },
  ];

  return (
    <nav
      className={`bg-white sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "shadow-md py-2" : "py-3"
      }`}
    >
      <div className="max-w-screen-xl flex items-center justify-between mx-auto px-4 md:px-6">
        {!isDashboard ? (
          <Link href="/" className="flex items-center">
            <Image
              src="/assets/images/logo.png"
              alt="Nimbrunk Logo"
              width={130}
              height={40}
              className="h-10 w-auto"
            />
          </Link>
        ) : (
          <div></div>
        )}

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="inline-flex items-center p-2 rounded-md text-gray-700 md:hidden hover:bg-gray-100 focus:outline-none transition-colors"
          onClick={toggleSidebar}
          aria-label="Toggle menu"
        >
          <div className="flex flex-col justify-center w-6 h-6 relative">
            <span
              className={`absolute h-0.5 w-6 bg-gray-700 transform transition-transform duration-300 ${
                isSidebarOpen ? "rotate-45 translate-y-0" : "-translate-y-2"
              }`}
            ></span>
            <span
              className={`absolute h-0.5 w-6 bg-gray-700 transition-opacity duration-300 ${
                isSidebarOpen ? "opacity-0" : "opacity-100"
              }`}
            ></span>
            <span
              className={`absolute h-0.5 w-6 bg-gray-700 transform transition-transform duration-300 ${
                isSidebarOpen ? "-rotate-45 translate-y-0" : "translate-y-2"
              }`}
            ></span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <div className={`hidden md:flex items-center gap-1 lg:gap-2`}>
          {!isDashboard && (
            <>
              <ul className="flex items-center space-x-1 lg:space-x-2">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#e44b37] rounded-md transition-colors relative group"
                    >
                      {link.name}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#e44b37] group-hover:w-full transition-all duration-300"></span>
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="#contact"
                    className="ml-2 px-4 py-2 text-sm font-medium text-white bg-[#e44b37] hover:bg-[#d43d2a] rounded-md shadow-sm transition-colors"
                  >
                    Hubungi Kami
                  </Link>
                </li>
              </ul>
            </>
          )}

          {session ? (
            <div className="relative ml-4" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className="flex items-center gap-2 p-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
              >
                <div className="flex-shrink-0">
                  <Avatar
                    image={
                      "https://res.cloudinary.com/dgfcvu9ns/image/upload/v1735989130/Layer_1_uflkla.png"
                    }
                  />
                </div>
                <span className="hidden lg:block font-medium truncate max-w-[120px]">
                  {session.user?.email}
                </span>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              <div
                className={`absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden transition-all duration-200 ${
                  dropdownOpen
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95 pointer-events-none"
                }`}
              >
                <div className="p-3 bg-[#e44b37] bg-opacity-10 border-b border-gray-100">
                  <p className="text-sm font-medium text-[#e44b37]">
                    Menu Options
                  </p>
                </div>
                <ul className="py-1">
                  <li>
                    <Link
                      href="/dashboard"
                      className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <Plus size={18} className="mr-3 text-[#e44b37]" />
                      <span className="font-medium">Buat Kartu</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <User size={18} className="mr-3 text-[#e44b37]" />
                      <span className="font-medium">Atur Profil</span>
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut size={18} className="mr-3" />
                      <span className="font-medium">Sign out</span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 ml-4">
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-medium text-[#e44b37] bg-white border border-[#e44b37] rounded-md hover:bg-[#fff8f7] transition-colors"
              >
                Masuk
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 text-sm font-medium text-white bg-[#e44b37] rounded-md hover:bg-[#d43d2a] transition-colors"
              >
                Daftar
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 z-50 bg-gray-900 bg-opacity-50 transform transition-transform duration-300 ${
          isSidebarOpen
            ? "translate-x-0"
            : "-translate-x-full pointer-events-none"
        }`}
        onClick={toggleSidebar}
      >
        <div
          className="h-full w-4/5 max-w-xs bg-white shadow-xl transform transition-transform duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-4 border-b">
            <Image
              src="/assets/images/logo.png"
              alt="Nimbrunk Logo"
              width={120}
              height={30}
              className="h-8 w-auto"
            />
            <button
              className="p-2 rounded-md text-gray-500 hover:bg-gray-100"
              onClick={toggleSidebar}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {session && (
            <div className="p-4 border-b">
              <div className="flex items-center gap-3">
                <Avatar
                  image={
                    "https://res.cloudinary.com/dgfcvu9ns/image/upload/v1735989130/Layer_1_uflkla.png"
                  }
                />
                <div>
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {session.user?.email}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="py-2">
            {!isDashboard && (
              <>
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50"
                    onClick={toggleSidebar}
                  >
                    {link.name}
                  </Link>
                ))}
                <Link
                  href="#contact"
                  className="flex items-center px-4 py-3 text-[#e44b37] font-medium"
                  onClick={toggleSidebar}
                >
                  Hubungi Kami
                </Link>
              </>
            )}

            {session ? (
              <>
                <Link
                  href="/dashboard"
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50"
                  onClick={toggleSidebar}
                >
                  <Plus size={18} className="mr-3 text-[#e44b37]" />
                  <span>Buat Kartu</span>
                </Link>
                <Link
                  href="#"
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50"
                  onClick={toggleSidebar}
                >
                  <User size={18} className="mr-3 text-[#e44b37]" />
                  <span>Atur Profil</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50"
                >
                  <LogOut size={18} className="mr-3" />
                  <span>Sign out</span>
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2 p-4">
                <Link
                  href="/login"
                  className="w-full py-2 text-center text-sm font-medium text-[#e44b37] bg-white border border-[#e44b37] rounded-md"
                  onClick={toggleSidebar}
                >
                  Masuk
                </Link>
                <Link
                  href="/register"
                  className="w-full py-2 text-center text-sm font-medium text-white bg-[#e44b37] rounded-md"
                  onClick={toggleSidebar}
                >
                  Daftar
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
