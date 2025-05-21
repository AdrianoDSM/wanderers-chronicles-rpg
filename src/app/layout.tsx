import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Lora } from "next/font/google"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
})

export const metadata: Metadata = {
  title: "Wanderers Chronicles | RPG Journal",
  description: "Registre as histórias épicas de suas campanhas de RPG em estilo de jornal",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${playfair.variable} ${lora.variable}`}>{children}</body>
    </html>
  )
}
