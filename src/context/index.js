/* eslint-disable */
import React, { createContext, useEffect, useLayoutEffect, useState } from 'react';
import CryptoJS from 'crypto-js';


export const UserContext = createContext()


const UserProvider = ({ children }) => {
    const [user, setUser] = useState();
    useLayoutEffect(() => {
        const data = localStorage.getItem('user')

        if (data) {
            const storedState = CryptoJS.AES.decrypt(data, 'secret key 123');;
            setUser(JSON.parse(storedState.toString(CryptoJS.enc.Utf8)));
        }
    }, []);
    useEffect(() => {
        if (user) {
            let cypher = CryptoJS.AES.encrypt(JSON.stringify(user), 'secret key 123').toString();
            localStorage.setItem('user', cypher);
        }
    }, [user]);
    const login = (user) => {
        setUser(user);
    };
    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };
    return (
        <UserContext.Provider
            value={{ user, login, logout }}
        >
            {children}
        </UserContext.Provider>
    );
};
export default UserProvider;