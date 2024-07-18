import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState
} from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

export type AuthUser = {
    userId: string;
};

type AuthContextType = {
    authUser: AuthUser | null;
    setAuthUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);

export const useAuthContext = (): AuthContextType => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            'useAuthContext must be used within an AuthContextProvider'
        );
    }

    return context;
};

type AuthContextProviderProps = {
    children: ReactNode;
};

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
    const [authUser, setAuthUser] = useState<AuthUser | null>(null);

    useEffect(() => {
        const token = Cookies.get('jwt');
        try {
            if (token) {
                const decodedToken: AuthUser = jwtDecode(token);
                setAuthUser(decodedToken);
                return;
            }
            // throw new Error('token not found')
        } catch (error) {
            console.error('Failed to decode token:', error);
        }
    }, []);

    const contextValue: AuthContextType = {
        authUser,
        setAuthUser
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};
