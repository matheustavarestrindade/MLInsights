import { faBoxes, faMedal, faPortrait } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useEffect } from "react";
import PageLayout from "../../../components/PageLayout";
import { useUser } from "../../../provider/UserProvider";
import { DoctorDashBoardStyles } from "./DoctorDashBoardStyles";
import InfoCard from "../../../components/sub/InfoCard";

const DoctorDashBoard = () => {
    const { authenticatedFetch } = useUser();

    const loadData = useCallback(async () => {
        const data = await authenticatedFetch("user/info", {});
        console.log(data);
    }, [authenticatedFetch]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    return (
        <PageLayout pageTitle="Dashboard" pageSubTitle="Bem-vindo ao seu dashboard">
            <DoctorDashBoardStyles className="row">
                <InfoCard content="1º" description="Seu lugar em relação aos seus concorrentes." icon={faMedal} color="var(--bs-primary)" />
                <InfoCard content="1.2K" description="Produtos vendidos esse mês" icon={faBoxes} color="#876CFF" />
                <InfoCard content="5" description="Vendedores acompanhados" icon={faPortrait} color="#4DC14D" />
            </DoctorDashBoardStyles>
        </PageLayout>
    );
};

export default DoctorDashBoard;
