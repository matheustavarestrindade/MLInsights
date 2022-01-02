import express from "express";
import CompanyPaymentGatewaysModel from "../../../database/models/Company/CompanyPaymentGatewaysModel";
import CompanyEmployeeRole from "../../../enums/CompanyEmployeeRoleEnum";
const router = express.Router();

/*

    ERROR CODES:
    4 - Unknow error

*/

router.post("/gateways", async (req, res) => {
    const user = req.user;

    const cpf_cnpj = user.cpf_cnpj;

    const gateways = await CompanyPaymentGatewaysModel.findAll({
        where: {
            company_cpf_cnpj: cpf_cnpj,
        },
    });

    const gatewaysFormated = !gateways ? [] : gateways.map((g) => g.toJSON());
    res.status(200).json(gatewaysFormated);
});

export default router;
