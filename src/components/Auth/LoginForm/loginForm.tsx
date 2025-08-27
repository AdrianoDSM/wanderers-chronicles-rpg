import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";
import styles from './loginForm.module.css'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const loginSchema = z.object({
  email: z.string().email({ message: "Email Inválido" }),
  password: z.string().min(6, { message: "Senha Inválida" }),
});

type LoginSchema = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });
  const router = useRouter();

  async function onSubmit(data: LoginSchema) {
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (res?.ok) {
        toast.success("Login realizado com sucesso!");
        router.push("/dashboard");
      } else {
        toast.error("Email ou senha inválidos");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Erro inesperado ao logar");
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.formBox}>
        
        <div className={styles.formItem}>
          <label htmlFor="email" className={styles.formLabel}>
            Email
          </label>
          <div>
            <input
              {...register("email")}
              id="email"
              name="email"
              type="email"
              placeholder="Digite seu email"
              className={styles.formInput}
            />
          </div>
          {errors.email && (
            <p className={styles.error}>{errors.email.message}</p>
          )}
        </div>
        <div className={styles.formItem}>
          <label htmlFor="password" className={styles.formLabel}>
            Senha
          </label>
          <div>
            <input
              {...register("password")}
              id="password"
              name="password"
              type="password"
              placeholder="Digite sua senha"
              className={styles.formInput}
            />
          </div>
          {errors.password && (
            <p className={styles.error}>{errors.password.message}</p>
          )}
        </div>
      </div>
      <button type="submit" className={styles.formButton}>
        Entrar nas Crônicas
      </button>
    </form>
  );
};
