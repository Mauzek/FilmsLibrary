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
import { useNavigate } from "react-router-dom";

export const AuthForm = () => {
  const [mode, setMode] = useState<"login" | "register">("login");
  const navigate = useNavigate();
  const methods = useForm<AuthFormValues>({
    defaultValues: { email: "", password: "", confirmPassword: "" },
  });

  const { handleSubmit, watch, reset } = methods;
  const password = watch("password");

  const onSubmit = async (data: AuthFormValues) => {
    let userCred;
    switch (mode) {
      case "login":
        userCred = await loginWithEmail(data.email, data.password);
        break;
      case "register":
        userCred = await registerWithEmail(data.email, data.password);
        break;
    }
    if (userCred) {
      navigate(`/user/${userCred.user.uid}`);
    }
    reset();
  };

  const toggleMode = () => {
    setMode(mode === "login" ? "register" : "login");
    reset();
  };

  const handleGoogleLogin = async () => {
    try {
      const userCred = await loginWithGoogle();
      if (userCred) {
        navigate(`/user/${userCred.user.uid}`);
      }
    } catch (err) {
      console.error("Ошибка входа через Google:", err);
    }
  };

  return (
    <FormProvider {...methods}>
      <div className={styles.authForm}>
        <h1>{mode === "login" ? "Вход" : "Регистрация"}</h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.authForm__form}
        >
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
              version="1.1"
              x="0px"
              y="0px"
              viewBox="0 0 48 48"
              enableBackground="new 0 0 48 48"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
	c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
	c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
	C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              ></path>
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              ></path>
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
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
