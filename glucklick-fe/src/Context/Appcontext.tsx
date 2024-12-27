import React, { createContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
    auth: { token: string } | null;
    login: (token: string) => void;
    logout: () => Promise<void>;
    handleLogin: (username: string, password: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [auth, setAuth] = useState<{ token: string } | null>(() => {
        const token = Cookies.get('token');
        return token ? { token } : null;
    });

    const navigate = useNavigate();

    const login = (token: string) => {
        Cookies.set('token', token, { expires: 7, secure: true, sameSite: 'Strict' });
        setAuth({ token });
        navigate('/');
    };

    const logout = async () => {
        try {
            const token = auth?.token;
            if (token) {
                await revokeTokenOnServer(token);
            }
        } catch (error) {
            console.error('Failed to revoke token:', error);
        } finally {
            Cookies.remove('token');
            setAuth(null);
            navigate('/login');
        }
    };

    const handleLogin = async (username: string, password: string) => {
        try {
            const token = await fetchTokenFromServer(username, password);
            if (token) {
                login(token);
            } else {
                console.error('Login failed: No token received');
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            setAuth({ token });
        }
    }, []);

    return (
        <AuthContext.Provider value={{ auth, login, logout, handleLogin }}>
            {children}
        </AuthContext.Provider>
    );
};

const fetchTokenFromServer = async (username: string, password: string): Promise<string> => {
    const response = await fetch('https://example.com/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data.token; // Assuming the token is in the `token` property of the JSON response
};

const revokeTokenOnServer = async (token: string): Promise<void> => {
    const response = await fetch('https://example.com/api/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
};

