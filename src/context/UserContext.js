'user client';
import React, { createContext, useState } from 'react';

export const User_Data = createContext();

function UserContext({ children }) {
    const [userId, setUserId] = useState(null);
    const [userName, setUserName] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
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
