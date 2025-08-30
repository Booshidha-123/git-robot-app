"use client";

type MenuButtonProps = {
  onClick: () => void;
};

export default function MenuButton({ onClick }: MenuButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label="Toggle menu"
      className="p-2 rounded-md border"
    >
      ☰
    </button>
  );
}
const tabs = [
  { name: 'Home', href: '/' },
  { name: 'Commands', href: '/command' },
  { name: 'About', href: '/about' },
]

