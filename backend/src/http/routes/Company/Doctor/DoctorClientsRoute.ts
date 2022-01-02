import express from "express";
import { Op } from "sequelize";
import CompanyClientMarkedScheduleModel from "../../../../database/models/Company/Clients/CompanyClientMarkedScheduleModel";
import CompanyClientModel from "../../../../database/models/Company/Clients/CompanyClientModel";
const router = express.Router();

const MOUNTH_TIME = 1000 * 60 * 60 * 24 * 30;

/*

    ERROR CODES:
    4 - Unknow error

*/

router.post("/", async (req, res) => {
    const user = req.user;
    const cpf_cnpj = user.cpf_cnpj;

    const clients = await CompanyClientModel.findAll({
        where: {
            company_cpf_cnpj: cpf_cnpj,
        },
    });

    if (!clients) {
        return res.status(200).json([]);
    }

    const clientsFormated = [];
    for (const client of clients) {
        const clientJson: any = client.toJSON();
        delete clientJson.password;

        const hasScheduleWithDoctor = await CompanyClientMarkedScheduleModel.findOne({
            where: {
                client_id: client.id,
                employee_id: user.id,
            },
        });
        if (hasScheduleWithDoctor) {
            clientsFormated.push(clientJson);
        }
    }

    res.status(200).json(clientsFormated);
});

export default router;
