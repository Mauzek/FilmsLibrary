import { useParams } from "react-router-dom";
import { useUserProfile } from "@/hooks/useUserProfile";
import { ErrorState, UserDetails } from "@/components";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";

const ProfilePage = observer(() => {
  const { id } = useParams<{ id: string }>();
  const { user, lists, loadingProfile, loadingLists, error } =
    useUserProfile(id);

    useEffect(() => {
      document.title = "Профиль - KINORA";
    }, []);

    if (error || (!user && !loadingProfile))
    return (
      <ErrorState
        error="400"
        title="Пользователь не найден"
        description="Похоже, пользователь которого вы ищите, не существует"
      />
    );

  return (
    <main>
      <UserDetails
        data={user!}
        lists={lists}
        loadingLists={loadingLists}
        loadingProfile={loadingProfile}
      />
    </main>
  );
});

export default ProfilePage;
