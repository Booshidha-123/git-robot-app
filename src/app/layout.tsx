"use client";

import "./globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

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
        <header className="p-4 bg-gray-900 text-white flex justify-between">
          <div className="font-bold">Student Number: 12345678</div>
          <nav className="space-x-4">
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
