import express from "express";
const router = express.Router();

/*

    ERROR CODES:
    4 - Unknow error

*/

router.post("/info", (req, res) => {
    res.json({
        message: "User Route",
    });
});

export default router;
