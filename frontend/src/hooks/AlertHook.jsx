import { useCallback, useState } from "react";
import styled from "styled-components";

const useAlert = () => {
    const [alert, setAlert] = useState("");

    const createAlert = useCallback((text, type, floating) => {
        setAlert(
            <AlertStyles floating={floating} className={`alert alert-${type} alert-dismissible show`} role="alert">
                {text}
                <button type="button" className="btn-close" onClick={() => setAlert("")}></button>
            </AlertStyles>
        );
    }, []);

    return [alert, createAlert];
};

const AlertStyles = styled.div`
    ${(props) =>
        props.floating &&
        `
    position: absolute;
    z-index: 10;
    bottom: 0;
    right: 15px;
    max-width: 50%;
    transition: 0.3s;
    `}
`;

export default useAlert;
