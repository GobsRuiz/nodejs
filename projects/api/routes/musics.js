const express = require("express");
const router = express.Router();
const mysql = require("../mysql").pool;
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/musics")
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage })

router.get("/", (req, res, next) => {
    return res.status("201").send({message: "Adicionado com sucesso!"});
})

router.post("/", upload.single("file_music"), (req, res, next) => {
    console.log(req.file)

    return res.status("201").send({message: "Adicionado com sucesso!"});
})

module.exports = router