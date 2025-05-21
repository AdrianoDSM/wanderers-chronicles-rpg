import Image from "next/image";
import styles from "./header.module.css";
import Link from "next/link";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Image
            src="/logo.png"
            alt="logo da Wanderers Chronicles"
            width={100}
            height={100}
          />
          <div>
          <h1>Wanderers Chronicles</h1>
          <p>Edição Especial • Desde 2025</p>
          </div>
        </div>
        <nav className={styles.navHome}>
          <Link href="/" className={styles.navLink}>
            Início
          </Link>
          <Link href="#features" className={styles.navLink}>
            Recursos
          </Link>
          <Link href="#testimonials" className={styles.navLink}>
            Depoimentos
          </Link>
        </nav>
        <nav className={styles.navAuth}>
          <Link href="#" className={styles.navButton}>
            Entrar
          </Link>
          <Link href="#" className={styles.navButtonPrimary}>
            Registrar
          </Link>
        </nav>
      </div>
    </header>
  );
};
