import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTachometerAlt } from "@fortawesome/free-solid-svg-icons";
import { SideBarStyled } from "./SideBarStyles";
import { useState } from "react";

const SideBar = () => {
    const [active, setActive] = useState(true);

    return (
        <SideBarStyled active={active}>
            <div className="sidebar-toggler">
                <FontAwesomeIcon icon={faBars} />
            </div>
            <ul className="sidebar-items">
                <li className="sidebar-item">
                    <div className="icon">
                        <FontAwesomeIcon icon={faTachometerAlt} />
                    </div>
                    <div className="description">Dashboard</div>
                </li>
            </ul>
        </SideBarStyled>
    );
};

export default SideBar;
