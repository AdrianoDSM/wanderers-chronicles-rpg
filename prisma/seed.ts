// prisma/seed.ts
import { prisma } from "../src/lib/prisma";
import { hash } from "bcryptjs";

async function main() {
  const email = "admin@example.com";
  const password = await hash("123456", 10);

  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      name: "Admin",
      email,
      password,
    },
  });

  console.log("Usuário criado com sucesso:");
  console.log(user);
}

main()
  .catch((e) => {
    console.error("Erro ao executar seed:", e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
