import { createContext, useState, useEffect } from "react";

import { createUserDocumentFromAuth, onAuthStateChangedListener } from '../utils/firebase/firebase.utils';


// as the acutal value you want to access 
export const UserContext = createContext({
    //Set default Value
    currentUser: null,
    setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
    const [ currentUser, setCurrentUser ] = useState(null);
    const value = { currentUser, setCurrentUser };


    useEffect(() => {
        
        //unsubscribe-function returned whenever auth state changed 
        const unsubscribe = onAuthStateChangedListener((user) => {
            if (user) {
                createUserDocumentFromAuth(user);
            };
            setCurrentUser(user);
        })

        //cleanup function that runs when the component unmounts
        return unsubscribe;
    }, [])

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

