// components/DashboardAside/UserInfo.tsx
"use client";

import { useSession } from "next-auth/react";
import styles from "../dashboardAside.module.css";

export function SidebarUserInfo() {
  const { data: session, status } = useSession();
  const userName = session?.user?.name || "Usuário";

  if (status !== "authenticated") return null;

  return (
    <div className={styles.userBox}>
      <div className={styles.avatar}>
        <span>{userName.charAt(0)}</span>
      </div>
      <div>
        <h3 className={styles.username}>{userName}</h3>
        <p className={styles.email}>{session?.user?.email}</p>
      </div>
    </div>
  );
}
