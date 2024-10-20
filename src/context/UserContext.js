'user clint';
import React, { createContext, useState } from 'react';

export const User_Data = createContext();

function UserContext({ children }) {
    const [userEmail, setUserEmail] = useState('userEmail teste');
    const [userName, setUserName] = useState('userName teste');
    const [userId, setUserId] = useState('userIDTeste');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <User_Data.Provider
            value={{
                userEmail,
                setUserEmail,
                userName,
                setUserName,
                userId,
                setUserId,
                isLoggedIn,
                setIsLoggedIn,
            }}
        >
            {children}
        </User_Data.Provider>
    );
}
export default UserContext;
