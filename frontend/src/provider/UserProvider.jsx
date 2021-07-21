import { createContext, useContext } from "react";

const userProvider = createContext();

export const useUser = () => useContext(userProvider);

const UserProvider = ({ children }) => {
    const values = {};

    return <userProvider.Provider value={values}>{children}</userProvider.Provider>;
};

export default UserProvider;
