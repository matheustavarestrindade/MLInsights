import express from "express";
import CompanyClientModel from "../../../database/models/Company/Clients/CompanyClientModel";
import { StatusCodes } from "http-status-codes";
import CompanyClientMarkedScheduleModel from "../../../database/models/Company/Clients/CompanyClientMarkedScheduleModel";
import { Op } from "sequelize";
import CompanyEmployeeModel from "../../../database/models/Company/Employees/CompanyEmployeeModel";
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
    const last_mounth_date = new Date(new Date().getTime() - MOUNTH_TIME);

    for (const client of clients) {
        const clientJson: any = client.toJSON();
        delete clientJson.password;

        const isActive = await CompanyClientMarkedScheduleModel.findOne({
            where: {
                client_id: client.id,
                createdAt: {
                    [Op.gte]: last_mounth_date,
                },
            },
        });

        if (new Date(clientJson.createdAt).getTime() > last_mounth_date.getTime()) {
            clientJson.is_new = true;
        } else {
            clientJson.is_new = false;
        }

        if (isActive) {
            clientJson.is_active = true;
        } else {
            clientJson.is_active = false;
        }

        clientsFormated.push(clientJson);
    }

    res.status(200).json(clientsFormated);
});

router.post("/delete", async (req, res) => {
    const user = req.user;
    const company_cpf_cnpj = user.cpf_cnpj;

    const { cpf_cnpj } = req.body;

    const client = await CompanyClientModel.findOne({
        where: {
            company_cpf_cnpj,
            cpf_cnpj,
        },
    });
    if (!client) {
        res.status(StatusCodes.BAD_REQUEST).json({
            error: "Client not found on the database",
            code: 2,
        });
        return;
    }

    await client.destroy();

    res.status(200).json({
        success: true,
    });
});

router.post("/update", async (req, res) => {
    const user = req.user;
    const company_cpf_cnpj = user.cpf_cnpj;

    const { cpf_cnpj, first_name, last_name, email, phone, address_zip, address_street, address_neighborhood, address_number, address_country, address_city, address_state, birthday } = req.body;

    const client = await CompanyClientModel.findOne({
        where: {
            company_cpf_cnpj,
            cpf_cnpj,
        },
    });
    if (!client) {
        res.status(StatusCodes.BAD_REQUEST).json({
            error: "Client not found on the database",
            code: 3,
        });
        return;
    }

    try {
        const updatedClient = await CompanyClientModel.update(
            {
                first_name,
                last_name,
                email,
                phone,
                address_zip,
                address_street,
                address_neighborhood,
                address_number,
                address_country,
                address_city,
                address_state,
                birthday,
            },
            {
                where: {
                    company_cpf_cnpj,
                    cpf_cnpj,
                },
            }
        );
        if (!updatedClient) {
            res.status(StatusCodes.BAD_REQUEST).json({
                error: "Error updating client",
                code: 1,
            });
            return;
        }
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({
            error: err,
            code: 1,
        });
        return;
    }

    res.status(200).json({
        success: true,
    });
});

router.post("/create", async (req, res) => {
    const user = req.user;
    const company_cpf_cnpj = user.cpf_cnpj;

    const {
        cpf_cnpj,
        first_name,
        last_name,
        email,
        phone,
        password,
        address_zip,
        address_street,
        address_neighborhood,
        address_number,
        address_country,
        address_city,
        address_state,
        birthday,
    } = req.body;

    const employee = await CompanyEmployeeModel.findOne({
        where: {
            company_cpf_cnpj,
            cpf_cnpj,
        },
    });
    if (employee) {
        res.status(StatusCodes.BAD_REQUEST).json({
            error: "employee with this cpf already registered",
            code: 2,
        });
        return;
    }
    const client = await CompanyClientModel.findOne({
        where: {
            company_cpf_cnpj,
            cpf_cnpj,
        },
    });
    if (client) {
        res.status(StatusCodes.BAD_REQUEST).json({
            error: "User with this cpf already registered",
            code: 1,
        });
        return;
    }

    try {
        const createdClient = await CompanyClientModel.create({
            cpf_cnpj,
            company_cpf_cnpj,
            first_name,
            last_name,
            email,
            phone,
            password,
            address_zip,
            address_street,
            address_neighborhood,
            address_number,
            address_country,
            address_city,
            address_state,
            birthday,
        });

        if (!createdClient) {
            res.status(StatusCodes.BAD_REQUEST).json({
                error: "Error creating client",
                code: 1,
            });
            return;
        }
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({
            error: err,
            code: 1,
        });
        return;
    }

    res.status(200).json({
        success: true,
    });
});

export default router;
