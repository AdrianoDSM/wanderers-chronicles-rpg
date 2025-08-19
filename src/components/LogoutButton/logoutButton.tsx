"use client";

import { Power } from "lucide-react";
import { signOut } from "next-auth/react";
import type { ButtonHTMLAttributes } from "react";

interface LogoutButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className: string;
}

export function LogoutButton({ className, ...props }: LogoutButtonProps) {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className={className}
      {...props}
    >
      <Power />
      Sair
    </button>
  );
}
