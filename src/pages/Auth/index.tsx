import { AuthForm } from "@/components";
import styles from "./authPage.module.scss";
import { useEffect } from "react";

const AuthPage = () => {
  useEffect(() => {
    document.title = "Войти в аккаунт - KINORA";
  }, []);

  return (
    <main className={styles.page}>
      <AuthForm />
    </main>
  );
};

export default AuthPage;
