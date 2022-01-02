import { faSearch, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useRef, useState } from "react";
import ClientCard from "./ClientCard";
import CreateClient from "./CreateClient";

const RegisteredClients = ({ clients, refreshClients }) => {
    const registerUserButtonRef = useRef();
    const [searchedClients, setSearchedClients] = useState([]);
    const [loading, setSearchLoading] = useState(false);

    const handleClientSearch = useCallback(
        (e) => {
            if (clients === null) {
                setSearchLoading(false);
                return;
            }
            if (!e.target.value || e.target.value.length < 1) {
                setSearchedClients(clients);
                setSearchLoading(false);
                return;
            }

            setSearchLoading(true);
            const timeoutId = setTimeout(() => {
                const searchParams = e.target.value.toLowerCase();
                const find = [];
                for (const client of clients) {
                    if (String(client.first_name).toLowerCase().includes(searchParams)) {
                        find.push(client);
                        continue;
                    } else if (String(client.last_name).toLowerCase().includes(searchParams)) {
                        find.push(client);
                        continue;
                    } else if (String(client.phone).toLowerCase().includes(searchParams)) {
                        find.push(client);
                        continue;
                    } else if (String(client.cpf_cnpj).toLowerCase().includes(searchParams)) {
                        find.push(client);
                        continue;
                    }
                }
                setSearchedClients(find);
                setSearchLoading(false);
            }, 1000);
            return () => clearTimeout(timeoutId);
        },
        [clients]
    );

    useEffect(() => {
        if (clients) setSearchedClients(clients);
    }, [clients]);

    return (
        <>
            <CreateClient buttonRef={registerUserButtonRef} refreshClients={refreshClients} />
            <div className="col-12">
                <div className="card">
                    <div className="card-body">
                        <div className="d-flex align-items-center justify-content-between mb-3">
                            <h4 className="card-title">Clientes Registrados</h4>
                            <button className="text-white btn btn-success" ref={registerUserButtonRef}>
                                <FontAwesomeIcon icon={faUserPlus} className="me-2" />
                                Adiconar
                            </button>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">
                                <FontAwesomeIcon icon={faSearch} />
                            </span>
                            <input type="text" className="form-control" placeholder="Pesquisar Usuario" onChange={handleClientSearch} />{" "}
                            {loading && (
                                <span className="input-group-text" id="basic-addon1">
                                    <div className="spinner-border spinner-border-sm" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </span>
                            )}
                        </div>
                        <ul className="list-group">{searchedClients && searchedClients.map((client, id) => <ClientCard client={client} key={id} refreshClients={refreshClients} />)}</ul>
                    </div>
                </div>
            </div>
        </>
    );
};
export default RegisteredClients;
