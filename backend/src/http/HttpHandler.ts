import passport, { Passport } from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import AuthRouter from "./routes/AuthRoute";
import UserRouter from "./routes/UserRoute";
import CompanyRouter from "./routes/CompanyRoute";
import ValidatorRoute from "./routes/ValidationRoute";
import { config } from "dotenv";
import cors from "cors";
import { Express, Request, Response } from "express";
import JwtStrategy from "passport-jwt/lib/strategy";
import LogUtils from "../log/LogUtils";
import CompanyClientModel from "../database/models/Company/Clients/CompanyClientModel";
import CompanyEmployeeModel from "../database/models/Company/Employees/CompanyEmployeeModel";
config();

declare global {
    namespace Express {
        interface User {
            id: number;
            company_cpf_cnpj: number;
            cpf_cnpj: number;
            first_name: string;
            last_name: string;
            email: string;
            phone: string;
            password: string;
            address_zip: string;
            address_street: string;
            address_neighborhood: string;
            address_number: string;
            address_country: string;
            address_state: string;
            birthday: Date;
            role?: string;
            createdAt: Date;
            updatedAt: Date;
        }
    }
}

export default class HttpHandler {
    express_app: Express;
    auth_strategy: JwtStrategy;

    constructor(express_app: Express) {
        this.express_app = express_app;
        this.registerRoutes();
        this.auth_strategy = new Strategy(
            {
                jwtFromRequest: ExtractJwt.fromHeader("authorization"),
                secretOrKey: process.env.PRIVATE_KEY,
            },
            async (jwt_payload: any, done: Function) => {
                try {
                    const user = await CompanyClientModel.findOne({ where: { cpf_cnpj: jwt_payload.cpf_cnpj, company_cpf_cnpj: jwt_payload.company_cpf_cnpj } });
                    const employee = await CompanyEmployeeModel.findOne({ where: { cpf_cnpj: jwt_payload.cpf_cnpj, company_cpf_cnpj: jwt_payload.company_cpf_cnpj } });
                    if (user) {
                        const jsonUser = user.toJSON();
                        return done(null, jsonUser);
                    } else if (employee) {
                        const jsonEmployee = employee.toJSON();
                        return done(null, jsonEmployee);
                    } else {
                        return done(null, false);
                    }
                } catch (err) {
                    return done(err, false);
                }
            }
        );
        passport.use("jwt", this.auth_strategy);
    }

    registerRoutes() {
        LogUtils.info({ message: "Registering express routes", params: "" });

        this.express_app.use(cors());

        LogUtils.subInfo({ message: "Registering route", params: "/auth" });
        this.express_app.use("/auth", AuthRouter);

        LogUtils.subInfo({ message: "Registering route", params: "/user" });
        this.express_app.use("/user", authorized, UserRouter);

        LogUtils.subInfo({ message: "Registering route", params: "/validator" });
        this.express_app.use("/validator", authorized, ValidatorRoute);

        LogUtils.subInfo({ message: "Registering route", params: "/company" });
        LogUtils.subInfo({ message: "Registering subroute", params: "/company/payment" });
        LogUtils.subInfo({ message: "Registering subroute", params: "/company/client" });
        LogUtils.subInfo({ message: "Registering subroute", params: "/company/doctor" });
        this.express_app.use("/company", authorized, CompanyRouter);
    }
}

function authorized(request: Request, response: Response, next: Function) {
    passport.authenticate("jwt", { session: false }, async (error, token) => {
        if (error || !token) {
            response.status(401).json({ message: "Unauthorized" });
            return;
        }
        request.user = token;
        next();
    })(request, response, next);
}
