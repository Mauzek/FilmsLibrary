import { Controller, useFormContext } from "react-hook-form";
import styles from "./inputForm.module.scss";
import type { InputFormProps } from "./types";

export const InputForm = ({
  name,
  label,
  type = "text",
  placeholder,
  rules,
}: InputFormProps) => {
  const { control } = useFormContext();

  return (
    <div className={styles.inputForm}>
      {label && (
        <label htmlFor={name} className={styles["inputForm__label"]}>
          {label}
        </label>
      )}
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field, fieldState }) => (
          <>
            <input
              {...field}
              id={name}
              type={type}
              placeholder={placeholder}
              className={`${styles["inputForm__input"]} ${
                fieldState.error ? styles["inputForm__input--error"] : ""
              }`}
            />
            {fieldState.error && (
              <span className={styles["inputForm__error"]}>
                {fieldState.error.message}
              </span>
            )}
          </>
        )}
      />
    </div>
  );
};
