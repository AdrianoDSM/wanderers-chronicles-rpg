import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { toast } from "sonner";
import styles from "./registerForm.module.css";

export const RegisterForm = () => {
  const registerSchema = z
    .object({
      name: z.string().min(1, { message: "Nome é obrigatório" }),
      email: z.string().email({ message: "Email inválido" }),
      password: z
        .string()
        .min(6, { message: "A senha deve ter no mínimo 6 caracteres" }),
      confirmPassword: z.string().min(6, { message: "Confirme sua senha" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "As senhas precisam ser iguais",
      path: ["confirmPassword"],
    });

  type RegisterSchema = z.infer<typeof registerSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({ resolver: zodResolver(registerSchema) });

  const router = useRouter();

  const onSubmit = async (data: RegisterSchema) => {
    try {
      await api.post("/api/register", { json: data }).json();
      toast.success("Usuário registrado com sucesso!");
      router.push("/login");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Erro inesperado ao registrar");
      }
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.formBox}>
        <div className={styles.formItem}>
          <label htmlFor="name" className={styles.formLabel}>Nome</label>
          <div>
            <input
              {...register("name")}
              id="name"
              name="name"
              type="text"
              placeholder="Digite seu nome"
              className={styles.formInput}
            />
          </div>
            {errors.name && <p className={styles.error}>{errors.name.message}</p>}
        </div>
        <div className={styles.formItem}>
          <label htmlFor="email" className={styles.formLabel}>Email</label>
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
            {errors.email && <p className={styles.error}>{errors.email.message}</p>}
        </div>
        <div className={styles.formItem}>
          <label htmlFor="password" className={styles.formLabel}>Senha</label>
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
            {errors.password && <p className={styles.error}>{errors.password.message}</p>}
        </div>
        <div className={styles.formItem}>
          <label htmlFor="confirmPassword" className={styles.formLabel}>Confirmar Senha</label>
          <div>
            <input
              {...register("confirmPassword")}
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirme sua senha"
              className={styles.formInput}
            />
          </div>
            {errors.confirmPassword && <p className={styles.error}>{errors.confirmPassword.message}</p>}
        </div>
      </div>
          <button type='submit' className={styles.formButton}>Se torne um Cronista</button>
    </form>
  );
};
