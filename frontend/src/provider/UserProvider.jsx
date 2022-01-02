import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";

const userProvider = createContext();

export const useUser = () => useContext(userProvider);

const UserProvider = ({ children }) => {
    const history = useHistory();
    const [jwtToken, setJwtToken] = useState("");
    const [user, setUser] = useState({});

    const validateJWT = useCallback(
        async (jwt) => {
            try {
                const data = await fetch(process.env.REACT_APP_SERVER_IP + "/validator", {
                    method: "post",
                    headers: {
                        Authorization: jwt,
                    },
                });
                const status = data.status;
                if (status === 200) {
                    const userJson = await data.json();
                    setJwtToken(jwt);
                    setUser(userJson);
                    console.log(userJson);
                } else {
                    console.log("JWT invalid!");
                    history.push("/login");
                }
            } catch (err) {
                console.log("JWT invalid!");
                history.push("/login");
            }
        },
        [history]
    );
    useEffect(() => {
        if (history.location.pathname === "/login") {
            return;
        }
        if (!localStorage.getItem("jwt")) {
            history.push("/login");
            console.log("No JWT");
            return;
        }
        const jwt = localStorage.getItem("jwt");
        validateJWT(jwt);
    }, [history, validateJWT]);

    const authenticatedFetch = useCallback(
        async (route, body) => {
            if (!body) {
                body = {};
            }
            if (!body.headers) {
                body.headers = {};
            }

            if (body.body && typeof body.body === "object") {
                body.body = JSON.stringify(body.body);
            }

            body.method = "POST";
            body.headers["Authorization"] = jwtToken;
            body.headers["Content-Type"] = "application/json";
            console.log(body);
            const userJson = await fetch(`${process.env.REACT_APP_SERVER_IP}/${route}`, body);
            if (userJson.status === 401) {
                history.push("/login");
                return {};
            }
            const jsonData = await userJson.json();
            return { status: userJson.status, data: jsonData };
        },
        [history, jwtToken]
    );

    const values = {
        authenticatedFetch,
        user,
    };

    return <userProvider.Provider value={values}>{jwtToken && children}</userProvider.Provider>;
};

export default UserProvider;
