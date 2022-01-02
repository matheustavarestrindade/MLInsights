import { useCallback, useEffect, useState } from "react";
import PageLayout from "../../../components/PageLayout";
import { useUser } from "../../../provider/UserProvider";
import PaymentGatewayMercadoPago from "./PaymentGatewayMercadoPago";
import { PaymentStyles } from "./PaymentStyles";

const Payment = () => {
    const [dataLoaded, setDataLoaded] = useState(false);
    const { authenticatedFetch } = useUser();
    const loadData = useCallback(async () => {
        const data = await authenticatedFetch("company/payment/gateways");
        console.log(data);
        setDataLoaded(true);
    }, [authenticatedFetch]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    return (
        <PageLayout pageTitle="Opções de pagamento" pageSubTitle="Bem-vindo as opções de pagamento" loaded={dataLoaded}>
            <PaymentStyles className="row">
                <PaymentGatewayMercadoPago />
            </PaymentStyles>
        </PageLayout>
    );
};

export default Payment;
