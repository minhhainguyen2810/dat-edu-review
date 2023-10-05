import { AuthContext } from 'app/providers/auth';
import { useContext } from 'react';

export const useUserInfo = () => {
  const session = useContext(AuthContext);

  return {
    session,
    isAdmin: session?.user?.role === 'admin'
  };
};
