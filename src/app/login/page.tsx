"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import GoogleSignInButton from "@/components/GoogleSignInButton";
import DiscordSignInButton from "@/components/DiscordSignInButton";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (session && status === "authenticated") {
      router.push("/");
    } else {
      setIsLoadingPage(false);
    }
  }, [session, status]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  //? Credential Provider
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!user.email || !user.password) {
      setError("Must provide all the credentials");
    }

    try {
      setIsLoading(true);

      const res = await signIn("credentials", {
        email: user.email,
        password: user.password,
        redirect: false,
      });

      console.log(res, "res");

      if (res && res.error) {
        setError(res.error);
        setIsLoading(false);
        return;
      }

      router.replace("/");
    } catch (error: any) {
      setError(error.response.data.message);
      setIsLoading(false);
      console.log("Signup failed", error.message);
    }
  };

  if (isLoadingPage) {
    return;
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side - Decorative Card Background */}
      <div
        className="hidden lg:block w-1/2 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #E44B37 0%, #ff8575 100%)",
        }}
      >
        <div className="absolute left-1/2 transform bottom-[70px] -translate-x-1/2 text-white z-10 text-center">
          <h1 className="text-4xl font-bold mb-2">Card Maker</h1>
          <p className="text-lg opacity-90">
            Create beautiful cards in minutes
          </p>
        </div>

        {/* Decorative floating cards */}
        <div
          className="absolute top-1/4 left-1/4 w-40 h-56 bg-white rounded-lg shadow-xl transform -rotate-12 opacity-80"
          style={{
            background: "linear-gradient(45deg, #ffffff 0%, #ffeae7 100%)",
            boxShadow: "0 8px 32px rgba(228, 75, 55, 0.2)",
          }}
        >
          <div className="h-full p-4 flex flex-col justify-between">
            <div className="w-12 h-4 bg-red-200 rounded"></div>
            <div className="space-y-2">
              <div className="w-full h-3 bg-red-100 rounded"></div>
              <div className="w-3/4 h-3 bg-red-100 rounded"></div>
            </div>
          </div>
        </div>

        <div
          className="absolute top-1/3 right-1/4 w-48 h-64 bg-white rounded-lg shadow-xl transform rotate-12 opacity-90"
          style={{
            background: "linear-gradient(45deg, #ffffff 0%, #ffe1dc 100%)",
            boxShadow: "0 8px 32px rgba(228, 75, 55, 0.2)",
          }}
        >
          <div className="h-full p-4 flex flex-col justify-between">
            <div className="w-16 h-4 bg-red-200 rounded"></div>
            <div className="space-y-2">
              <div className="w-full h-3 bg-red-100 rounded"></div>
              <div className="w-2/3 h-3 bg-red-100 rounded"></div>
              <div className="w-3/4 h-3 bg-red-100 rounded"></div>
            </div>
          </div>
        </div>

        <div
          className="absolute bottom-1/4 left-1/3 w-44 h-60 bg-white rounded-lg shadow-xl transform -rotate-6 opacity-85"
          style={{
            background: "linear-gradient(45deg, #ffffff 0%, #fff0ee 100%)",
            boxShadow: "0 8px 32px rgba(228, 75, 55, 0.2)",
          }}
        >
          <div className="h-full p-4 flex flex-col justify-between">
            <div className="w-14 h-4 bg-red-200 rounded"></div>
            <div className="space-y-2">
              <div className="w-full h-3 bg-red-100 rounded"></div>
              <div className="w-4/5 h-3 bg-red-100 rounded"></div>
              <div className="w-2/3 h-3 bg-red-100 rounded"></div>
            </div>
          </div>
        </div>

        {/* Decorative circles */}
        <div className="absolute top-20 right-20 w-20 h-20 rounded-full bg-white opacity-10"></div>
        <div className="absolute bottom-40 left-10 w-32 h-32 rounded-full bg-white opacity-10"></div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full space-y-8">
          <div className="flex justify-start mb-[50px]">
            <Image
              src="/assets/images/logo.png"
              alt="Nimbrunk Logo"
              className="w-[230px]"
              width={200}
              height={200}
            />
          </div>

          <div className="flex flex-col gap-[10px] justify-start">
            <span className="font-semibold text-gray-700 text-4xl">Masuk</span>
            <span className="font-medium text-gray-400 text-sm">
              Buat Kartu Profil-mu sendiri hanya dengan kurang dari 5 menit.
            </span>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="email-address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  required
                  value={user.email}
                  onChange={handleChange}
                  className="mt-1 text-sm outline-none border border-[#DDDDDD] p-2 w-full rounded-[8px] focus:outline-none focus:shadow-[0_0_8px_rgba(228,75,55,0.3)] focus:ring-0 transition-all duration-500"
                  placeholder="Alamat Email"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={user.password}
                    onChange={handleChange}
                    className="mt-1 text-sm outline-none border border-[#DDDDDD] p-2 w-full rounded-[8px] focus:outline-none focus:shadow-[0_0_8px_rgba(228,75,55,0.3)] focus:ring-0 transition-all duration-500 pr-10"
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    className="absolute top-1/2 mt-[2px] right-3 transform -translate-y-1/2 text-gray-500"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? (
                      <EyeOff color="#E44B37" size={20} />
                    ) : (
                      <Eye color="#E44B37" size={20} />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                {error}
              </div>
            )}

            <button
              type="submit"
              style={{ backgroundColor: "#E44B37" }}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? (
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-white"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                "Masuk"
              )}
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">atau</span>
              </div>
            </div>

            <div className="flex gap-3">
              <GoogleSignInButton />
              <DiscordSignInButton />
            </div>

            <div className="text-center">
              <span className="text-gray-600">Belum punya akun? </span>
              <Link
                href="/register"
                style={{ color: "#E44B37" }}
                className="font-medium hover:text-red-600"
              >
                Daftar
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
