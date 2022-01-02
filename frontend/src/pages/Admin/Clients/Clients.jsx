import { faUser, faUserCheck, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useEffect, useState } from "react";
import PageLayout from "../../../components/PageLayout";
import InfoCard from "../../../components/sub/InfoCard";
import { useUser } from "../../../provider/UserProvider";
import ClientStyles from "./ClientsStyles";
import RegisteredClients from "./RegisteredClients";

const Clients = () => {
    const [dataLoaded, setDataLoaded] = useState(false);
    const [clients, setClients] = useState([]);
    const { authenticatedFetch } = useUser();

    const loadClientsData = useCallback(async () => {
        const response = await authenticatedFetch("company/client");
        console.log(response);
        setClients(response.data);
        setDataLoaded(true);
    }, [authenticatedFetch]);

    useEffect(() => loadClientsData(), [loadClientsData]);

    return (
        <PageLayout pageTitle="Clientes" pageSubTitle="Bem-vindo ao painel de clients" loaded={dataLoaded}>
            <ClientStyles className="row">
                <InfoCard color="#876CFF" icon={faUser} content={clients.length} description={"Usuarios registrados"} />
                <InfoCard color="#4287f5" icon={faUserCheck} content={clients.length} description={"Usuarios ativos no ultimo mês"} />
                <InfoCard color="#e642f5" icon={faUserPlus} content={clients.length} description={"Novos usuarios no utlimo mês"} />
                <RegisteredClients clients={clients} refreshClients={loadClientsData} />
            </ClientStyles>
        </PageLayout>
    );
};

export default Clients;
