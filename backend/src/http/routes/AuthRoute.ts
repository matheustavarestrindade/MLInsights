import express, { Response, Request } from "express";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import bcrypt from "bcrypt";
import { Op } from "sequelize";
import CompanyModel from "../../database/models/Company/CompanyModel";
import CompanyClientModel from "../../database/models/Company/Clients/CompanyClientModel";
import CompanyEmployeeModel from "../../database/models/Company/Employees/CompanyEmployeeModel";
import CompanyEmployeeRole from "../../enums/CompanyEmployeeRoleEnum";

/*
    ERROR CODES:

    1 - E-mail already in use
    2 - Failed to register user (Unknow)
    3 - Invalid User or Password
    4 - Unknow error

*/

const router = express.Router();
config();

router.post("/user/login", async (req: Request, res: Response) => {
    const { cpf_cnpj, company_cpf_cnpj, password } = req.body;

    try {
        const user = await CompanyClientModel.findOne({
            where: {
                cpf_cnpj,
                company_cpf_cnpj,
            },
        });

        if (!user) {
            return res.status(401).json({
                error: "Invalid user or password",
                error_code: 3,
            });
        }

        const rightPassword = await bcrypt.compare(password, user.password);
        if (!rightPassword) {
            return res.status(401).json({
                error: "Invalid user or password",
                error_code: 3,
            });
        }

        const userJson: any = user.toJSON();
        delete userJson.password;
        delete userJson.createdAt;
        delete userJson.updatedAt;

        // append the company cpf cnpj
        userJson.company_cpf_cnpj = Number(company_cpf_cnpj);

        const JWTToken = jwt.sign(userJson, process.env.PRIVATE_KEY, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });
        res.setHeader("Authorization", JWTToken);
        res.setHeader("Access-Control-Expose-Headers", "Authorization");
        res.status(200).send();
    } catch (err) {
        res.status(401).json({
            error_code: 4,
            error: "Unknow",
        });
    }
});

router.post("/company/login", async (req: Request, res: Response) => {
    const { cpf_cnpj, company_cpf_cnpj, password } = req.body;

    try {
        const user = await CompanyEmployeeModel.findOne({
            where: {
                cpf_cnpj,
                company_cpf_cnpj,
            },
        });

        if (!user) {
            return res.status(401).json({
                error: "Invalid user or password",
                error_code: 3,
            });
        }

        const rightPassword = await bcrypt.compare(password, user.password);
        if (!rightPassword) {
            return res.status(401).json({
                error: "Invalid user or password",
                error_code: 3,
            });
        }

        const userJson: any = user.toJSON();
        delete userJson.password;
        delete userJson.createdAt;
        delete userJson.updatedAt;

        userJson.company_cpf_cnpj = Number(company_cpf_cnpj);

        const JWTToken = jwt.sign(userJson, process.env.PRIVATE_KEY, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });
        res.setHeader("Authorization", JWTToken);
        res.setHeader("Access-Control-Expose-Headers", "Authorization");
        res.status(200).send();
    } catch (err) {
        res.status(401).json({
            error_code: 4,
            error: "Unknow",
        });
    }
});

router.post("/company/create", async (req: Request, res: Response) => {
    let {
        company_name,
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
        role,
    } = req.body;

    cpf_cnpj = Number(String(cpf_cnpj).replace(/[^0-9.]/g, ""));

    if (role !== CompanyEmployeeRole.ADMIN) {
        return res.status(401).json({
            error: "ADMIN users can only be registered on company route",
            error_code: 1,
        });
    }

    try {
        const company = await CompanyModel.findOne({
            where: {
                cpf_cnpj,
            },
        });

        if (company) {
            return res.status(401).json({
                error: "CPF/CNPJ already in use.",
                error_code: 1,
            });
        }

        const registered = await CompanyModel.registerNewCompany({
            company_name,
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
            role,
        });
        if (!registered) {
            return res.status(401).json({
                error: "E-mail or CPF already in use.",
                error_code: 1,
            });
        }

        res.status(200).json({
            success: "Company successfully created",
        });
    } catch (err) {
        console.log(err);
        res.status(401).json({
            error_code: 4,
            error: "Unknow",
        });
    }
});

export default router;
