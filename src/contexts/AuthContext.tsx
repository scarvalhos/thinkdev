import {
    createContext,
    useEffect,
    useState,
    useContext
} from "react";

import { toast } from "react-toastify";

import { api } from "../services/api";

type User = {
    id?: number;
    name?: string;
    username: string;
    password: string;
}

type SignInData = {
    username: string;
    password: string;
}

type RegisterData = {
    name: string;
    username: string;
    password: string;
}

type AuthContextType = {
    user: User | null;
    users: User[] | null;
    isAuthenticated: boolean;
    signIn: (user: SignInData, callback: VoidFunction) => void;
    signUp: (user: RegisterData, callback: VoidFunction) => void;
    signOut: (callback: VoidFunction) => void;
}


export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({children}: any) {
    const [user, setUser] = useState<User | null>(JSON.parse(`${localStorage.getItem('auth')}`) || null);
    const [users, setUsers] = useState<User[] | null>(JSON.parse(`${localStorage.getItem('users')}`) || null);
    
    const isAuthenticated = !!user;

    const getUser = async () => {
        try {
            const { data }: any = await api.get('/me', {})

            if(data) {
                setUser(data)
            }
        } catch (error: any) {
        }
    }

    useEffect(() => {
        getUser()
    }, [isAuthenticated])

    const signIn = async ({ username, password }: SignInData, callback: VoidFunction) => {
        try {
            const response = await api.post('/login', { username, password });

            if(response) {
                setUser({ username, password })
                callback();
                toast.success('Usuário logado com sucesso!')
            }
            
        } catch (error: any) {
            toast.error(error.message);
        }
    }

    const signUp = async ({ name, username, password }: RegisterData, callback: VoidFunction) => {
        try {
            const response = await api.post('/register', { name, username, password });
            
            if(response) {
                await api.post('/login', { username, password });
                setUser({ username, password })
                callback()
                toast.success('Usuário cadastrado com sucesso!')
            }
        } catch (error: any) {
            toast.error(error.message)
        }
    }

    const signOut = async (callback: VoidFunction) => {
        try {
            const response = await api.post('/logout', {})
            
            if(response) {
                setUser(null)
                callback()
            }
        } catch (error: any) {
            toast.error(error.message)
        }
    }

    return (
        <AuthContext.Provider value={{
            user,
            users,
            isAuthenticated,
            signIn,
            signUp,
            signOut
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext);
  }