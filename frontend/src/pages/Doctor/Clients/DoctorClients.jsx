import { useCallback, useEffect, useState } from "react";
import PageLayout from "../../../components/PageLayout";
import { useUser } from "../../../provider/UserProvider";
import DoctorClientStyles from "./DoctorClientsStyles";

const DoctorClients = () => {
    const [dataLoaded, setDataLoaded] = useState(false);
    const [clients, setClients] = useState([]);
    const { authenticatedFetch } = useUser();

    const loadClientsData = useCallback(async () => {
        const response = await authenticatedFetch("company/doctor/client");
        console.log(response);
        setClients(response.data);
        setDataLoaded(true);
    }, [authenticatedFetch]);

    useEffect(() => loadClientsData(), [loadClientsData]);

    return (
        <PageLayout pageTitle="Pacientes" pageSubTitle="Bem-vindo ao painel de pacientes" loaded={dataLoaded}>
            <DoctorClientStyles className="row">
                <h2>Doctor page</h2>
            </DoctorClientStyles>
        </PageLayout>
    );
};

export default DoctorClients;
