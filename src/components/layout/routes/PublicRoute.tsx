import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "@/store";
import { observer } from "mobx-react-lite";

export const PublicRoute = observer(() => {
  const { user, loading} = useUserStore();

  if (loading) return null;

  if (user) {
    return <Navigate to={`/user/${user.uid}`} replace />;
  }

  return <Outlet />;
});
