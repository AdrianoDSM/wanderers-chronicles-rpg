"use client";

import { LoginForm } from "@/components/Auth/LoginForm/loginForm";
import styles from "./login.module.css";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <div className={styles.cardBox}>
        <Link href="/" className={styles.linkHome}>
          ← Voltar ao Início
        </Link>
        <div className={styles.mainTitle}>
          <h2>Wanderers Chronicles</h2>
          <p>Edição Especial • Portal do Cronista</p>
        </div>
        <div className={styles.formContainer}>
          <div className={styles.subTitle}>
            <h2>Bem vindo de volta, Cronista</h2>
            <p>
              Entre em sua conta para continuar documentando suas aventuras épicas e acessar suas crônicas salvas.
            </p>
          </div>
          <LoginForm />
        </div>
        <div className={styles.footer}>
          <p className={styles.footerText}>Novo nas Crônicas? {" "}<Link href='/register' className={styles.footerLink}>Registre-se aqui</Link></p>
        </div>
      </div>
    </div>
  );
}
