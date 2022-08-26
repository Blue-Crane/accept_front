import { IUser, IUserContext } from '@custom-types/data/IUser';
import { isSuccessful, sendRequest } from '@requests/request';
import { getCookie, setCookie } from '@utils/cookies';
import {
  FC,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

const UserContext = createContext<IUserContext>(null!);

export const UserProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const whoAmI = useCallback(async () => {
    const cookie_user = getCookie('user');
    if (!cookie_user) {
      const res = await sendRequest<{}, IUser>('auth/whoami', 'GET');
      if (!res.error) {
        const accessLevel = res.response.role.accessLevel;
        const user = res.response;
        setCookie('user', JSON.stringify(user), {
          'max-age': 10 * 60,
          path: '/',
        });
        setValue((prev) => ({
          ...prev,
          user: res.response,
          accessLevel,
          isUser: accessLevel > 0,
          isStudent: accessLevel > 1,
          isTeacher: accessLevel > 2,
          isAdmin: accessLevel > 50,
        }));
      } else {
        setValue((prev) => ({
          ...prev,
          user: undefined,
          accessLevel: 0,
          isUser: false,
          isStudent: false,
          isTeacher: false,
          isAdmin: false,
        }));
      }
    } else {
      try {
        const user = JSON.parse(cookie_user) as IUser;
        setValue((prev) => ({
          ...prev,
          user: user,
          accessLevel: user.role.accessLevel,
          isUser: user.role.accessLevel > 0,
          isStudent: user.role.accessLevel > 1,
          isTeacher: user.role.accessLevel > 2,
          isAdmin: user.role.accessLevel > 50,
        }));
      } catch (error) {
        setCookie('user', '', { 'max-age': 0 });
        whoAmI();
      }
    }
  }, []);

  const refresh = useCallback(async () => {
    const res = await isSuccessful('auth/refresh', 'GET');
    if (!res.error) {
      await whoAmI();
    }
  }, [whoAmI]);

  const signIn = useCallback(
    async (login: string, password: string) => {
      const res = await isSuccessful('auth/signin', 'POST', {
        login: login,
        password: password,
      });
      if (!res.error) {
        await whoAmI();
        return true;
      }
      return false;
    },
    [whoAmI]
  );

  const signOut = useCallback(async () => {
    const res = await isSuccessful('auth/signout', 'GET');
    if (!res.error) {
      setValue((prev) => ({
        ...prev,
        user: undefined,
        accessLevel: 0,
        isUser: false,
        isStudent: false,
        isTeacher: false,
        isAdmin: false,
      }));
      return true;
    }
    return false;
  }, []);

  const refreshAccess = useCallback(() => {
    if (getCookie('access_token_cookie')) {
      whoAmI();
      return 0;
    }
    if (getCookie('refresh_token_cookie')) {
      refresh();
      return 1;
    }
    setValue((prev) => ({
      ...prev,
      user: undefined,
      accessLevel: 0,
      isUser: false,
      isStudent: false,
      isTeacher: false,
      isAdmin: false,
    }));
    return 2;
  }, [refresh, whoAmI]);

  const [value, setValue] = useState<IUserContext>(() => ({
    user: undefined,
    accessLevel: 0,
    isUser: false,
    isStudent: false,
    isTeacher: false,
    isAdmin: false,
    signIn,
    signOut,
    refresh,
    refreshAccess,
  }));

  useEffect(() => {
    refreshAccess();
  }, [refreshAccess]);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export function useUser() {
  return useContext(UserContext);
}
