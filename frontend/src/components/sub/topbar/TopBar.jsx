import { faCog, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUser } from "../../../provider/UserProvider";
import { TopBarStyled } from "./TopBarStyles";

const TopBar = () => {
    const { user } = useUser();

    return (
        <TopBarStyled className="bg-white">
            <div className="d-flex w-100 align-items-center justify-content-end h-100">
                <div className={`top-bar-items ${!user.role && "me-2"}`}>
                    <div className="top-bar-item">
                        {user.role && (
                            <div className="icon me-2">
                                <FontAwesomeIcon icon={faUser} />
                            </div>
                        )}
                        {capitalizeFirstLetter(user.first_name) + " " + capitalizeFirstLetter(user.last_name)}
                        {!user.role && (
                            <div className="icon ms-2">
                                <FontAwesomeIcon icon={faUser} />
                            </div>
                        )}
                    </div>
                </div>
                {user.role && (
                    <div className="top-bar-config">
                        <FontAwesomeIcon icon={faCog} />
                    </div>
                )}
            </div>
        </TopBarStyled>
    );
};

function capitalizeFirstLetter(string) {
    if (!string) {
        return string;
    }
    string = string.toLowerCase();
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default TopBar;
