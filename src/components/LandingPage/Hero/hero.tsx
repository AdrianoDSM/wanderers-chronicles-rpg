import styles from "./hero.module.css";
import Image from "next/image";
import Link from "next/link";

export const Hero = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.headline}>
            <h1 className={styles.title}>EDIÇÃO EXTRAORDINÁRIA</h1>
            <h2 className={styles.subtitle}>
              Suas Aventuras Merecem Ser Contadas
            </h2>
          </div>
          <p className={styles.description}>
            Registre as histórias épicas de suas campanhas de RPG em um formato
            de jornal elegante e imersivo. Transforme suas sessões em manchetes,
            seus personagens em lendas e suas aventuras em história.
          </p>
          <div className={styles.buttons}>
            <Link href="/login" className={styles.primaryButton}>Comece Sua Aventura</Link>
            <Link href="#features" className={styles.secondaryButton}>Saiba Mais</Link>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <Image
            alt="lizard citizen reading the newspaper 'Wanderers Chronicles'"
            src="/Wanderers-Chronicles-Hero-Section-Image-2.jpg"
            width={736}
            height={1120}
          />
        </div>
      </div>
    </section>
  );
};
