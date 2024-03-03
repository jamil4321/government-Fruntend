/* eslint-disable */
import React, { createContext, useEffect, useLayoutEffect, useState } from 'react';
import CryptoJS from 'crypto-js';


export const UserContext = createContext()


const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    useLayoutEffect(() => {
        const data = localStorage.getItem('user')
        if (data) {
            const storedState = CryptoJS.AES.decrypt(data, 'secret key 123');;
            console.log(storedState.toString(CryptoJS.enc.Utf8),"user from useEffect")
            if(typeof storedState.toString(CryptoJS.enc.Utf8) === 'object'){
                setUser(JSON.parse(storedState.toString(CryptoJS.enc.Utf8)));
            }
        }
    }, []);
    useEffect(() => {
        console.log(user,"user begning")
            let cypher = CryptoJS.AES.encrypt(user ? JSON.stringify(user) :user, 'secret key 123').toString();
            localStorage.setItem('user', cypher);
    }, [user]);
    const login = (user) => {
        console.log(user,"user")
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