// src/app/api/register/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json();
  console.log("Recebendo no backend: ", body)
  const { name, email, password } = body;

  if (!email || !password) {
    return NextResponse.json(
      { message: "Email e senha são obrigatórios." },
      { status: 400 }
    );
  }

  const userExists = await prisma.user.findUnique({ where: { email } });
  if (userExists) {
    return NextResponse.json(
      { error: "Usuário já existe." },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return NextResponse.json(user);
}
