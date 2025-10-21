import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import type { AuthFormValues } from "./types";
import { InputForm } from "../inputForm";
import {
  registerWithEmail,
  loginWithEmail,
  loginWithGoogle,
} from "@/services/firebase/auth";
import styles from "./AuthForm.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import type { FirebaseError } from "firebase/app";

export const AuthForm = () => {
  const [mode, setMode] = useState<"login" | "register">("login");
  const navigate = useNavigate();
  const location = useLocation();
  const methods = useForm<AuthFormValues>({
    defaultValues: { email: "", password: "", confirmPassword: "" },
  });

  const params = new URLSearchParams(location.search);
  const redirect = params.get("redirect");

  const { handleSubmit, watch, reset } = methods;
  const password = watch("password");

  const handleFirebaseError = (error: FirebaseError) => {
    switch (error.code) {

      case "auth/too-many-requests":
        toast.error("Слишком много попыток входа. Попробуйте позже.");
        break;

      case "auth/email-already-in-use":
        toast.error("Такой email уже зарегистрирован");
        break;

      default:
        toast.error("Неправильная почта или пароль");
    }
  };

  const onSubmit = async (data: AuthFormValues) => {
    try {
      let userCred;
      if (mode === "login") {
        userCred = await loginWithEmail(data.email, data.password);
        toast.success("Вход выполнен успешно!");
      } else {
        userCred = await registerWithEmail(data.email, data.password);
        toast.success("Регистрация прошла успешно!");
      }

      if (userCred) {
        const target = redirect || `/user/${userCred.user.uid}`;
        navigate(target, { replace: true });
      }
    } catch (err) {
      console.error("Ошибка авторизации:", err);
      if ((err as FirebaseError).code) {
        handleFirebaseError(err as FirebaseError);
      } else {
        toast.error("Непредвиденная ошибка");
      }
    } finally {
      reset();
    }
  };

  const toggleMode = () => {
    setMode(mode === "login" ? "register" : "login");
    reset();
  };

  const handleGoogleLogin = async () => {
    try {
      const userCred = await loginWithGoogle();
      if (userCred) {
        toast.success("Вход через Google выполнен!");
        const target = redirect || `/user/${userCred.user.uid}`;
        navigate(target, { replace: true });
      }
    } catch (err) {
      console.error("Ошибка входа через Google:", err);
      if ((err as FirebaseError).code) {
        handleFirebaseError(err as FirebaseError);
      } else {
        toast.error("Не удалось войти через Google");
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <div className={styles.authForm}>
        <h1>{mode === "login" ? "Вход" : "Регистрация"}</h1>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.authForm__form}>
          <InputForm
            name="email"
            label="Email"
            placeholder="Введите email"
            rules={{
              required: "Поле обязательно",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Введите корректный email",
              },
            }}
          />
          <InputForm
            name="password"
            type="password"
            label="Пароль"
            placeholder="Введите пароль"
            rules={{
              required: "Поле обязательно",
              minLength: { value: 6, message: "Минимум 6 символов" },
            }}
          />
          {mode === "register" && (
            <InputForm
              name="confirmPassword"
              type="password"
              label="Подтверждение пароля"
              placeholder="Повторите пароль"
              rules={{
                required: "Поле обязательно",
                validate: (val) => val === password || "Пароли не совпадают",
              }}
            />
          )}
          <button type="submit" className={styles.authForm__submit}>
            Продолжить
          </button>
        </form>

        {mode === "login" && (
          <button
            onClick={handleGoogleLogin}
            className={styles.authForm__google}
          >
            Google
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 48 48"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8
                c-6.627,0-12-5.373-12-12
                c0-6.627,5.373-12,12-12
                c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
                C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
                c0,11.045,8.955,20,20,20
                c11.045,0,20-8.955,20-20
                C44,22.659,43.862,21.35,43.611,20.083z"
              />
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819
                C14.655,15.108,18.961,12,24,12
                c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
                C34.046,6.053,29.268,4,24,4
                C16.318,4,9.656,8.337,6.306,14.691z"
              />
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238
                C29.211,35.091,26.715,36,24,36
                c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025
                C9.505,39.556,16.227,44,24,44z"
              />
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303
                c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238
                C36.971,39.205,44,34,44,24
                C44,22.659,43.862,21.35,43.611,20.083z"
              />
            </svg>
          </button>
        )}

        <button onClick={toggleMode} className={styles.authForm__toggle}>
          {mode === "login"
            ? "Нет аккаунта? Зарегистрироваться"
            : "Уже есть аккаунт? Войти"}
        </button>
      </div>
    </FormProvider>
  );
};
