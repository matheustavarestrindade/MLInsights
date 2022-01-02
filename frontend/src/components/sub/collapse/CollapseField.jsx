import { useEffect, useState } from "react";

const CollapseField = ({ children, buttonRef }) => {
    const [id] = useState(makeid(10));
    useEffect(() => {
        if (!buttonRef || !buttonRef.current) {
            return;
        }
        buttonRef.current.setAttribute("data-bs-toggle", "collapse");
        buttonRef.current.setAttribute("href", "#" + id);
    }, [id, children, buttonRef]);
    return (
        <div className="collapse multi-collapse" id={id}>
            {children}
        </div>
    );
};

function makeid(length) {
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export default CollapseField;
