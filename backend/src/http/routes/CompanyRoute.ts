import express, { Request, Response } from "express";
import CompanyPaymentsRouter from "./Company/CompanyPaymentsRoute";
import CompanyClientsRouter from "./Company/CompanyClientsRoute";
import CompanyEmployeeRouter from "./Company/CompanyEmployeesRoute";
import CompanyDoctorRouter from "./Company/CompanyDoctorRoute";
import CompanyEmployeeRole from "../../enums/CompanyEmployeeRoleEnum";
import { StatusCodes } from "http-status-codes";
const router = express.Router();

/*

    ERROR CODES:
    4 - Unknow error

*/

router.use("/payment", AdminRoleMiddleware, CompanyPaymentsRouter);
router.use("/client", AdminRoleMiddleware, CompanyClientsRouter);
router.use("/doctor", DoctorRoleMiddleware, CompanyDoctorRouter);
router.use("/employee", AdminRoleMiddleware, CompanyEmployeeRouter);

function AdminRoleMiddleware(req: Request, res: Response, next: Function) {
    const user = req.user;

    if (!user.role || user.role !== CompanyEmployeeRole.ADMIN) {
        return res.status(StatusCodes.UNAUTHORIZED).send();
    }

    next();
}
function DoctorRoleMiddleware(req: Request, res: Response, next: Function) {
    const user = req.user;

    if (!user.role || (user.role !== CompanyEmployeeRole.DOCTOR && user.role !== CompanyEmployeeRole.ADMIN)) {
        return res.status(StatusCodes.UNAUTHORIZED).send();
    }

    next();
}

export default router;
