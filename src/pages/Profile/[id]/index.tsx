import { useParams } from "react-router-dom";
import { useUserProfile } from "@/hooks/useUserProfile";
import { ErrorState, UserDetails } from "@/components";

const ProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const { user, lists, loadingProfile, loadingLists, error } =
    useUserProfile(id);

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
        userId={id!}
      />
    </main>
  );
};

export default ProfilePage;
