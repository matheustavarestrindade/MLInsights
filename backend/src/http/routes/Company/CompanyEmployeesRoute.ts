import express from "express";
import CompanyClientModel from "../../../database/models/Company/Clients/CompanyClientModel";
import { StatusCodes } from "http-status-codes";
import CompanyEmployeeModel from "../../../database/models/Company/Employees/CompanyEmployeeModel";
const router = express.Router();

/*

    ERROR CODES:
    4 - Unknow error

*/

router.post("/", async (req, res) => {
    const user = req.user;
    const cpf_cnpj = user.cpf_cnpj;

    const employees = await CompanyEmployeeModel.findAll({
        where: {
            company_cpf_cnpj: cpf_cnpj,
        },
    });

    if (!employees) {
        return res.status(200).json([]);
    }

    const employeesFormated = [];

    for (const employee of employees) {
        const employeeJson: any = employee.toJSON();
        delete employeeJson.password;

        employeesFormated.push(employeeJson);
    }

    res.status(200).json(employeesFormated);
});

router.post("/single", async (req, res) => {
    const user = req.user;
    const cpf_cnpj = user.cpf_cnpj;
    const { employee_id } = req.body;

    const employee = await CompanyEmployeeModel.findOne({
        where: {
            company_cpf_cnpj: cpf_cnpj,
            id: employee_id,
        },
    });

    if (!employee) {
        return res.status(StatusCodes.NOT_FOUND).json({
            error: "Employee not found on the database",
            code: 1,
        });
    }
    const employeeFormated: any = employee.toJSON();
    delete employeeFormated.password;

    res.status(StatusCodes.OK).json(employeeFormated);
});

router.post("/delete", async (req, res) => {
    const user = req.user;
    const company_cpf_cnpj = user.cpf_cnpj;

    const { cpf_cnpj } = req.body;

    const employee = await CompanyEmployeeModel.findOne({
        where: {
            company_cpf_cnpj,
            cpf_cnpj,
        },
    });
    if (!employee) {
        res.status(StatusCodes.BAD_REQUEST).json({
            error: "Employee not found on the database",
            code: 3,
        });
        return;
    }

    await employee.destroy();

    res.status(200).json({
        success: true,
    });
});

router.post("/update", async (req, res) => {
    const user = req.user;
    const company_cpf_cnpj = user.cpf_cnpj;

    const { role, cpf_cnpj, first_name, last_name, email, phone, address_zip, address_street, address_neighborhood, address_number, address_country, address_city, address_state, birthday } = req.body;

    const employee = await CompanyEmployeeModel.findOne({
        where: {
            company_cpf_cnpj,
            cpf_cnpj,
        },
    });
    if (!employee) {
        res.status(StatusCodes.BAD_REQUEST).json({
            error: "Employee not found on the database",
            code: 3,
        });
        return;
    }

    try {
        const updatedEmployee = await CompanyEmployeeModel.update(
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
                role,
            },
            {
                where: {
                    company_cpf_cnpj,
                    cpf_cnpj,
                },
            }
        );
        if (!updatedEmployee) {
            res.status(StatusCodes.BAD_REQUEST).json({
                error: "Error updating employee",
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
        role,
    } = req.body;

    const employee = await CompanyEmployeeModel.findOne({
        where: {
            company_cpf_cnpj,
            cpf_cnpj,
        },
    });

    console.log(employee);

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
    console.log(client);
    if (client) {
        res.status(StatusCodes.BAD_REQUEST).json({
            error: "User with this cpf already registered",
            code: 1,
        });
        return;
    }

    try {
        console.log({
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
            role,
        });
        const createdEmployee = await CompanyEmployeeModel.create({
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
            role,
        });
        console.log(createdEmployee);

        if (!createdEmployee) {
            res.status(StatusCodes.BAD_REQUEST).json({
                error: "Error creating client",
                code: 1,
            });
            return;
        }
    } catch (err) {
        console.log(err);
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
