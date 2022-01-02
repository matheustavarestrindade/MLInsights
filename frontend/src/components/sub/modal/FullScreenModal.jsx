import { useEffect, useState } from "react";

const FullScreenModal = ({ title, children, toggleButtonRef }) => {
    const [modalId] = useState(makeid(20));

    useEffect(() => {
        if (!(toggleButtonRef && toggleButtonRef.current)) {
            return;
        }
        toggleButtonRef.current.setAttribute("data-bs-toggle", "modal");
        toggleButtonRef.current.setAttribute("data-bs-target", "#" + modalId);
    }, [toggleButtonRef, modalId]);

    return (
        <div className="modal fade" id={modalId} tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
};

const FullScreenModalBody = ({ children }) => {
    return <div className="modal-body">{children}</div>;
};

const FullScreenModalFooter = ({ children }) => {
    return <div className="modal-footer">{children}</div>;
};

const FullScreenCloseButton = ({ children, className, onClick }) => {
    return (
        <button className={className ? className : ""} onClick={onClick ? onClick : () => {}} data-bs-dismiss="modal">
            {children}
        </button>
    );
};

function makeid(length) {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export { FullScreenModalBody, FullScreenModalFooter, FullScreenCloseButton };
export default FullScreenModal;
