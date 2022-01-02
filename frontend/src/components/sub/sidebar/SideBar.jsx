import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faCalendarPlus, faCreditCard, faMoneyBill, faMoneyCheck, faReceipt, faStream, faTachometerAlt, faUserCheck, faUserClock, faUsers } from "@fortawesome/free-solid-svg-icons";
import { SideBarStyled } from "./SideBarStyles";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { useUser } from "../../../provider/UserProvider";
import { useLocalStorage } from "../../../hooks/LocalStorageHook";

const SideBar = ({ onActive }) => {
    const [active, setActive] = useLocalStorage("sidebar", false);
    const [location, setLocation] = useState();
    const history = useHistory();
    const { user } = useUser();

    useEffect(() => {
        setLocation(history.location.pathname.split("/")[1]);
    }, [history]);

    useEffect(() => {
        if (onActive) {
            onActive(active);
        }
    }, [active, onActive]);

    return (
        <SideBarStyled active={active}>
            <div className="sidebar-toggler">
                <div className="title h4">
                    <p className="text-dark">Navegação</p>
                </div>
                <div className="icon" onClick={() => setActive((a) => !a)}>
                    <FontAwesomeIcon icon={faStream} />
                </div>
            </div>
            {user.role === "ADMIN" && (
                <ul className="sidebar-items">
                    <li className="sidebar-item title">
                        <p>Principal</p>
                    </li>
                    <Link className={`sidebar-item ${location === "dashboard" ? "selected" : ""}`} to="/dashboard">
                        <div className="icon">
                            <FontAwesomeIcon icon={faTachometerAlt} />
                        </div>
                        <div className="description">Dashboard</div>
                    </Link>
                    <li className="sidebar-item title">
                        <p>Pessoas</p>
                    </li>
                    <Link className={`sidebar-item ${location === "employees" ? "selected" : ""}`} to="/employees">
                        <div className="icon">
                            <FontAwesomeIcon icon={faUsers} />
                        </div>
                        <div className="description">Funcionarios</div>
                    </Link>
                    <Link className={`sidebar-item ${location === "clients" ? "selected" : ""}`} to="/clients">
                        <div className="icon">
                            <FontAwesomeIcon icon={faUserCheck} />
                        </div>
                        <div className="description">Clientes</div>
                    </Link>
                    <li className="sidebar-item title">
                        <p>Contábil</p>
                    </li>
                    <Link className={`sidebar-item ${location === "payment" ? "selected" : ""}`} to="/payment">
                        <div className="icon">
                            <FontAwesomeIcon icon={faCreditCard} />
                        </div>
                        <div className="description">Opções de pagamento</div>
                    </Link>
                    <Link className={`sidebar-item ${location === "revenue" ? "selected" : ""}`} to="/revenue">
                        <div className="icon">
                            <FontAwesomeIcon icon={faMoneyBill} />
                        </div>
                        <div className="description">Faturamento</div>
                    </Link>
                    <Link className={`sidebar-item ${location === "billing" ? "selected" : ""}`} to="/billing">
                        <div className="icon">
                            <FontAwesomeIcon icon={faMoneyCheck} />
                        </div>
                        <div className="description">Cobrança manual</div>
                    </Link>
                </ul>
            )}
            {user.role === "DOCTOR" && (
                <ul className="sidebar-items">
                    <li className="sidebar-item title">
                        <p>Principal</p>
                    </li>
                    <Link className={`sidebar-item ${location === "dashboard" ? "selected" : ""}`} to="/dashboard">
                        <div className="icon">
                            <FontAwesomeIcon icon={faTachometerAlt} />
                        </div>
                        <div className="description">Dashboard</div>
                    </Link>
                    <li className="sidebar-item title">
                        <p>Pacientes</p>
                    </li>
                    <Link className={`sidebar-item ${location === "clients" ? "selected" : ""}`} to="/clients">
                        <div className="icon">
                            <FontAwesomeIcon icon={faUsers} />
                        </div>
                        <div className="description">Meus pacientes</div>
                    </Link>
                    <li className="sidebar-item title">
                        <p>Consultas</p>
                    </li>
                    <Link className={`sidebar-item ${location === "revenue" ? "selected" : ""}`} to="/revenue">
                        <div className="icon">
                            <FontAwesomeIcon icon={faUserClock} />
                        </div>
                        <div className="description">Consultas Pendentes</div>
                    </Link>
                    <Link className={`sidebar-item ${location === "revenue" ? "selected" : ""}`} to="/revenue">
                        <div className="icon">
                            <FontAwesomeIcon icon={faUserCheck} />
                        </div>
                        <div className="description">Consultas Finalizadas</div>
                    </Link>
                    <li className="sidebar-item title">
                        <p>Calendário</p>
                    </li>
                    <Link className={`sidebar-item ${location === "schedule" ? "selected" : ""}`} to="/schedule">
                        <div className="icon">
                            <FontAwesomeIcon icon={faCalendarAlt} />
                        </div>
                        <div className="description">Horarios de Atendimento</div>
                    </Link>
                    <Link className={`sidebar-item ${location === "billing" ? "selected" : ""}`} to="/billing">
                        <div className="icon">
                            <FontAwesomeIcon icon={faCalendarPlus} />
                        </div>
                        <div className="description">Atendimento extra</div>
                    </Link>
                </ul>
            )}
            {!user.role && (
                <ul className="sidebar-items">
                    <li className="sidebar-item title">
                        <p>Principal</p>
                    </li>
                    <Link className={`sidebar-item ${location === "dashboard" ? "selected" : ""}`} to="/dashboard">
                        <div className="icon">
                            <FontAwesomeIcon icon={faTachometerAlt} />
                        </div>
                        <div className="description">Dashboard</div>
                    </Link>
                    <li className="sidebar-item title">
                        <p>Consultas</p>
                    </li>
                    <Link className={`sidebar-item ${location === "consults" ? "selected" : ""}`} to="/consults">
                        <div className="icon">
                            <FontAwesomeIcon icon={faUserCheck} />
                        </div>
                        <div className="description">Minhas Consultas</div>
                    </Link>
                    <Link className={`sidebar-item ${location === "schedule" ? "selected" : ""}`} to="/schedule">
                        <div className="icon">
                            <FontAwesomeIcon icon={faCalendarAlt} />
                        </div>
                        <div className="description">Marcar Consulta</div>
                    </Link>
                    <li className="sidebar-item title">
                        <p>Contábil</p>
                    </li>
                    <Link className={`sidebar-item ${location === "payment" ? "selected" : ""}`} to="/payment">
                        <div className="icon">
                            <FontAwesomeIcon icon={faCreditCard} />
                        </div>
                        <div className="description">Faturas Pendentes</div>
                    </Link>
                    <Link className={`sidebar-item ${location === "revenue" ? "selected" : ""}`} to="/revenue">
                        <div className="icon">
                            <FontAwesomeIcon icon={faReceipt} />
                        </div>
                        <div className="description">Recibos</div>
                    </Link>
                </ul>
            )}
        </SideBarStyled>
    );
};

export default SideBar;
