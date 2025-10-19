import { Toaster } from "react-hot-toast";

const TOAST_OPTIONS = {
  duration: 3000,
  style: {
    background: "#2a2a2a",
    color: "#fff",
  },
  error: {
    iconTheme: {
      primary: "#ff4a50",
      secondary: "#fff",
    },
  },
  loading: {
    duration: Infinity,
    iconTheme: {
      primary: "#2787f5",
      secondary: "#1D2633",
    },
  },
  success: {
    iconTheme: {
      primary: "#44eb99",
      secondary: "#000",
    },
  },
};

export const AppToaster = () => (
  <Toaster
    position="top-center"
    reverseOrder={false}
    toastOptions={TOAST_OPTIONS}
  />
);