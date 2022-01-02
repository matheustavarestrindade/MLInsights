import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageLayout from "../../../../components/PageLayout";
import { useUser } from "../../../../provider/UserProvider";
import EmployeeScheduleCalendar from "./EmployeeScheduleCalendar";

const EditEmployeeSchedule = () => {
    const [dataLoaded, setDataLoaded] = useState(false);
    const { authenticatedFetch } = useUser();
    const { employee_id } = useParams();
    const [employee, setEmployee] = useState();

    const loadEmployee = useCallback(async () => {
        const response = await authenticatedFetch("company/employee/single", {
            body: {
                employee_id,
            },
        });

        if (response.data && response.data.code === 1) {
            // Set error employee not found
            return;
        }
        setEmployee(response.data);
        setDataLoaded(true);
    }, [employee_id, authenticatedFetch]);

    useEffect(() => {
        setDataLoaded(false);
        if (employee_id !== null) {
            loadEmployee();
        }
    }, [employee_id, loadEmployee]);

    return (
        <PageLayout pageTitle="Horarios de atendimento" pageSubTitle="Bem-vindo ao painel de edição de horarios" loaded={dataLoaded}>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <h6 className="card-title">Horarios do funcionario: {employee && employee.first_name + " " + employee.last_name}</h6>
                        </div>
                    </div>
                </div>
                <div className="col-12 mt-3">
                    <div className="card">
                        <div className="card-body">
                            <h6 className="card-title">Calendario de atendimento</h6>
                            <EmployeeScheduleCalendar employee={employee} />
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
};

export default EditEmployeeSchedule;
