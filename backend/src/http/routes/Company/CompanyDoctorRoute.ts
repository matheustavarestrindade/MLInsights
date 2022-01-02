import express from "express";
import DoctorClientsRouter from "./Doctor/DoctorClientsRoute";
const router = express.Router();

/*

    ERROR CODES:
    4 - Unknow error

*/

router.use("/client", DoctorClientsRouter);

export default router;
