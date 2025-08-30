"use client";
import { Providers } from "./providers";
import "./globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useState, useEffect } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [theme, setTheme] = useState("light");
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const savedTheme = document.cookie
      .split("; ")
      .find((row) => row.startsWith("theme="))
      ?.split("=")[1];
    if (savedTheme) setTheme(savedTheme);
  }, []);

 
  useEffect(() => {
    document.cookie = `theme=${theme}; path=/`;
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        {/* Header */}
        <header className="p-4 bg-gray-900 text-white flex justify-between items-center">
          <div className="font-bold">Student Number: 12345678</div>

          {/* Hamburger button (Mobile) */}
          <button
            className="sm:hidden block"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            ☰
          </button>

          {/* Navigation */}
          <nav
            className={`sm:flex space-x-4 ${
              menuOpen ? "block" : "hidden sm:block"
            }`}
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${
                  pathname === item.href ? "underline text-yellow-400" : ""
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="ml-4 border px-2 py-1 rounded"
          >
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>
        </header>

        {/* Breadcrumbs */}
        <Breadcrumbs />

        {/* Page Content */}
        <main className="flex-1 p-6">{children}</main>

        {/* Footer */}
        <footer className="p-4 bg-gray-200 text-center">
          <p>
            © 2025 Your Name | Student No: 12345678 |{" "}
            {new Date().toDateString()}
          </p>
        </footer>
      </body>
    </html>
  );
}
