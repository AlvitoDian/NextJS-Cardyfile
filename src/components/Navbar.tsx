"use client";

import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Avatar from "@/components/Avatar"; /* 
import Sidebar from "./Sidebar"; */
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { data: session } = useSession() as any;

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleDropdownOpen = () => {
    setDropdownOpen(true);
  };

  const handleDropdownClose = () => {
    setDropdownOpen(false);
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  const pathname = usePathname();
  const isInLogin =
    pathname.startsWith("/login") || pathname.startsWith("/register");

  if (isInLogin) return null;

  return (
    <nav className="bg-white border-[#f7eae9] border-b-[1px] sticky top-0 z-[999]">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <Image
            src="/assets/images/logo.png"
            alt="Nimbrunk Logo"
            width={150}
            height={150}
          />
        </Link>

        {/* Mobile Menu */}
        <button
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden"
          onClick={toggleSidebar}
        >
          <div className="flex item-center flex-col justify-center relative">
            <span
              className={`${
                isSidebarOpen ? "h-0 -translate-y-[5px]" : "h-0.5"
              } origin-top-left transition-all duration-100 w-5 bg-gray-500 `}
            ></span>

            <span
              className={`${
                isSidebarOpen ? "rotate-45" : ""
              } origin-center transition-all duration-300 w-5 h-0.5 bg-gray-500 mt-[5px] -mb-[7px] `}
            ></span>
            <span
              className={`${
                isSidebarOpen ? "-rotate-45" : ""
              } origin-center transition-all duration-300 w-5 h-0.5 bg-gray-500 mt-[5px] `}
            ></span>

            <span
              className={`${
                isSidebarOpen ? "h-0 translate-y-[5px]" : "h-0.5"
              } origin-bottom-left transition-all duration-100 w-5 bg-gray-500 mt-[5px]`}
            ></span>
          </div>
        </button>
        {/* Mobile Menu End */}

        <div className="hidden w-full lg:flex md:w-auto" id="navbar-default">
          <ul className="font-medium flex items-center md:flex-row md:space-x-2 rtl:space-x-reverse text-gray-600 font-semibold">
            <li>
              <Link
                href="/"
                className="block py-2 px-3 rounded hover:text-e44b37 border-b-2 border-transparent hover:border-e44b37 transition-all duration-200"
              >
                Beranda
              </Link>
            </li>
            <li>
              <Link
                href="#pricing"
                className="block py-2 px-3 rounded hover:text-e44b37 border-b-2 border-transparent hover:border-e44b37 transition-all duration-200"
              >
                Harga
              </Link>
            </li>
            <li>
              <Link
                href="#about"
                className="block py-2 px-3 rounded hover:text-e44b37 border-b-2 border-transparent hover:border-e44b37 transition-all duration-200"
              >
                Tentang Kami
              </Link>
            </li>
            <li>
              <Link
                href="#contact"
                className="px-4 inline-flex items-center justify-center py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600 transition-colors duration-200"
              >
                Hubungi Kami
              </Link>
            </li>

            {session ? (
              <>
                <li
                  className="relative"
                  onMouseEnter={handleDropdownOpen}
                  onMouseLeave={handleDropdownClose}
                >
                  <button
                    id="dropdownNavbarLink"
                    className="flex items-center justify-between w-full py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 md:w-auto "
                  >
                    {session.user.email}
                    <div className="ml-2.5">
                      {/*           <Avatar image={session.user.profileImage} /> */}
                      <Avatar
                        image={
                          "https://res.cloudinary.com/dgfcvu9ns/image/upload/v1735989130/Layer_1_uflkla.png"
                        }
                      />
                    </div>
                    <svg
                      className={`w-2.5 h-2.5 ms-2.5 ${
                        dropdownOpen ? "transform rotate-180" : ""
                      }`}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="m1 1 4 4 4-4"
                      />
                    </svg>
                  </button>

                  {/* Dropdown menu */}
                  <div
                    id="dropdownNavbar"
                    className={`${
                      dropdownOpen ? "block" : "hidden"
                    } absolute top-full right-0 z-10 bg-white rounded-lg shadow-lg border border-gray-100 w-56 mt-1 overflow-hidden transition-all duration-200 ease-in-out`}
                  >
                    <div className="py-2 px-3 bg-[#e44b37] bg-opacity-10 border-b border-gray-100">
                      <p className="text-sm font-medium text-[#e44b37]">
                        Menu Options
                      </p>
                    </div>
                    <ul
                      className="py-2 text-sm"
                      aria-labelledby="dropdownLargeButton"
                    >
                      <li>
                        <Link
                          href={`/dashboard`}
                          className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors duration-150"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-3 text-[#e44b37]"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                          </svg>
                          <span className="text-gray-700 font-medium">
                            Buat Kartu
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={`#`}
                          className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors duration-150"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-3 text-[#e44b37]"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                          <span className="text-gray-700 font-medium">
                            Atur Profil
                          </span>
                        </Link>
                      </li>
                    </ul>
                    <div
                      onClick={handleLogout}
                      className="flex items-center px-4 py-3 text-red-600 hover:bg-red-50 transition-colors duration-150 cursor-pointer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      <span className="font-medium">Sign out</span>
                    </div>
                  </div>
                </li>
              </>
            ) : (
              <div className="flex gap-[10px] mr-[40px]">
                <li>
                  <Link
                    href="/register"
                    className="text-white bg-[#e44b37] border-[2px] border-[#e44b37] rounded-full text-sm px-4 py-[7px] text-center"
                    aria-current="page"
                  >
                    Daftar
                  </Link>
                </li>
                <li>
                  <Link
                    href="/login"
                    className="text-[#e44b37] hover:text-white bg-white hover:bg-[#e44b37] rounded-full border-[2px] border-[#e44b37] text-sm px-4 py-[7px] text-center transition-all duration-500"
                    aria-current="page"
                  >
                    Masuk
                  </Link>
                </li>
              </div>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
