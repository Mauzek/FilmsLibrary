import type { RegisterOptions } from "react-hook-form";

export interface InputFormProps {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  rules?: RegisterOptions
}
