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
          {/*  <Image
            src="/assets/images/logo.png"
            alt="Nimbrunk Logo"
            width={150}
            height={150}
          /> */}
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
          <ul className="bg-white font-medium flex items-center p-4 md:p-0 mt-4 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 text-gray-600 font-[600] ">
            <li>
              <Link
                href="/"
                className="block py-2 px-3 rounded md:bg-transparent md:p-0 "
                aria-current="page"
              >
                Beranda
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="block py-2 px-3 rounded md:bg-transparent md:p-0 "
                aria-current="page"
              >
                Harga
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="block py-2 px-3 rounded md:bg-transparent md:p-0 "
                aria-current="page"
              >
                Tentang Kami
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
                    } absolute top-full left-0 z-10 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:divide-gray-600 shadow-lg`}
                  >
                    <ul
                      className="py-2 text-sm text-gray-700   "
                      aria-labelledby="dropdownLargeButton"
                    >
                      {/*  {session.user.roles.includes("ADMIN") && (
                        <li>
                          <Link
                            href="/admin"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Admin Page
                          </Link>
                        </li>
                      )} */}
                      <li>
                        <Link
                          /*    href={`/user/edit/${session.user.id}`} */
                          href={`/dashboard`}
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Buat Kartu
                        </Link>
                      </li>
                      <li>
                        <Link
                          /*    href={`/user/edit/${session.user.id}`} */
                          href={`#`}
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Atur Profil
                        </Link>
                      </li>
                    </ul>
                    <div className="py-1">
                      <a
                        onClick={handleLogout}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                      >
                        Sign out
                      </a>
                    </div>
                  </div>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    href="/register"
                    className="text-white bg-[#e44b37] border-[2px] border-[#e44b37] rounded-full text-sm px-4 py-[7px] text-center -mr-5"
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
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
