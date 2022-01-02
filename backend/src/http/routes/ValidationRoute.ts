import express, { Request, Response } from "express";
const router = express.Router();

router.post("/", (req: Request, res: Response) => {
    const user: any = { ...req.user };
    delete user.password;

    res.status(200).json(user);
});

export default router;
