"use client";

import { InputHTMLAttributes } from "react";

type Props = {
  label: string;
  name: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function FormField({ label, name, ...rest }: Props) {
  return (
    <label className="block text-sm mb-3">
      <span className="block mb-1">{label}</span>
      <input
        name={name}
        className="w-full rounded border px-3 py-2"
        {...rest}
      />
    </label>
  );
}
