import express from 'express';

const router = express.Router();


router.post("/get", (req, res) => {
    const data = req.body;
    // const result = await validateLoginData(data, ADMIN_ROLE_ID);
    // attachAuthToken(result);
    // res.json(result);
})

router.post("/getAll", (req, res) => {

})

router.post("/add", (req, res) => {

})

router.post("/update", (req, res) => {

})

router.post("/delete", (req, res) => {

})

export default router;
