import { useState } from "react";
import PageLayout from "../../../components/PageLayout";

const DoctorSchedule = () => {
    const [dataLoaded, setDataLoaded] = useState(false);
    return <PageLayout pageTitle="Horarios de Atendimento" pageSubTitle="Bem-vindo ao painel de horarios" loaded={dataLoaded}></PageLayout>;
};

export default DoctorSchedule;
