"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import MenuButton from "./menunav";
import ThemeToggle from "./themetoggle";

const tabs = [
  { href: "/", label: "Themes" },
  { href: "/docker", label: "Docker" },
  { href: "/prisma", label: "Prisma/Sequelize" },
  { href: "/tests", label: "Tests" },
  { href: "/about", label: "About" },
];

export default function Header({ studentNo }: { studentNo: string }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>(tabs[0].href);

  useEffect(() => {
    const saved = Cookies.get("activeTab");
    if (saved) setActive(saved);
  }, []);

  function handleClick(href: string) {
    Cookies.set("activeTab", href, { expires: 30, sameSite: "lax" });
    setActive(href);
    setOpen(false);
  }

  return (
    <header aria-label="Site header" style={{ paddingTop: "1rem", paddingBottom: "1rem" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: ".75rem" }}>
          <strong>Student No.</strong>
          <span aria-label="Student Number">{studentNo}</span>
        </div>

        <nav aria-label="Primary" className="container" style={{ padding: 0 }}>
          <div className="row row-4" style={{ alignItems: "center" }}>
            <MenuButton onClick={() => setOpen(o => !o)} />
            <div style={{ display: open ? "block" : "none" }}>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", gap: ".75rem", flexWrap: "wrap" }}>
                {tabs.map(t => (
                  <li key={t.href}>
                    <Link
                      className="btn"
                      href={t.href}
                      aria-current={active === t.href ? "page" : undefined}
                      onClick={() => handleClick(t.href)}
                    >
                      {t.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div />
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}
