import { useCallback, useEffect, useState } from "react";
import PageLayout from "../../../components/PageLayout";
import { useUser } from "../../../provider/UserProvider";
import EmployeeStyles from "./EmployeeStyles";
import RegisteredEmployees from "./RegisteredEmployees";

const Employees = () => {
    const [dataLoaded, setDataLoaded] = useState(false);
    const [clients, setClients] = useState([]);
    const { authenticatedFetch } = useUser();

    const loadClientsData = useCallback(async () => {
        const response = await authenticatedFetch("company/employee");
        const employees = response.data ? response.data : [];
        const employeesFormated = [];
        /* Remove the owner from the list */
        for (const employee of employees) {
            if (employee.cpf_cnpj !== employee.company_cpf_cnpj) {
                employeesFormated.push(employee);
            }
        }
        setClients(employeesFormated);
        setDataLoaded(true);
    }, [authenticatedFetch]);

    useEffect(() => loadClientsData(), [loadClientsData]);

    return (
        <PageLayout pageTitle="Funcionarios" pageSubTitle="Bem-vindo ao painel de funcionarios" loaded={dataLoaded}>
            <EmployeeStyles className="row">
                <RegisteredEmployees clients={clients} refreshEmployees={loadClientsData} />
            </EmployeeStyles>
        </PageLayout>
    );
};

export default Employees;
