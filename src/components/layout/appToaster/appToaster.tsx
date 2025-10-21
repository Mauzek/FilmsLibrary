import { Toaster } from "react-hot-toast";

const TOAST_OPTIONS = {
  duration: 3000,
  style: {
    background: "#191919",
    color: "#fff",
    border: "1px solid #2a2a2a",
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
      secondary: "#2a2a2a",
    },
  },
  success: {
    iconTheme: {
      primary: "#44eb99",
      secondary: "#191919",
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