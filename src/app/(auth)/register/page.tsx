"use client";

import { RegisterForm } from "@/components/Auth/RegisterForm/registerForm";
import styles from "./register.module.css";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className={styles.container}>
      <div className={styles.cardBox}>
        <Link href="/" className={styles.linkHome}>
          ← Voltar ao Início
        </Link>
        <div className={styles.mainTitle}>
          <h2>Wanderers Chronicles</h2>
          <p>Edição Especial • Novo Cronista</p>
        </div>
        <div className={styles.formContainer}>
          <div className={styles.subTitle}>
            <h2>Torne-se um Cronista</h2>
            <p>
              Junte-se à nossa comunidade de contadores de histórias e comece a
              documentar suas aventuras épicas de RPG em um formato único e
              imersivo.
            </p>
          </div>
          <RegisterForm />
        </div>
        <div className={styles.footer}>
          <p className={styles.footerText}>Já possui uma conta? {" "}<Link href='/login' className={styles.footerLink}>Faça Login aqui</Link></p>
        </div>
      </div>
    </div>
  );
}
