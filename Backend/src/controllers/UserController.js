const errorHandler = require("../helper/errorHandler");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const { saveRAMFiles } = require("../middleware/memoryUpload");
const { deleteUploadedFiles } = require("../middleware/deleteUpload");

const register = async (req, res) => {
    try {
        const data = req.body;
        const hashPassword = await bcrypt.hash(data.password, 10);
        const user = await User.create({ ...data, password: hashPassword });
        res.status(201).json({ data: user, success: true, msg: "user Register sucessfully" });
    } catch (error) {
        console.log(error)
        const errors = errorHandler(error)
        res.status(400).json({ errors: errors, sucesss: false, msg: "user Register failed" });
    }
}

const login = async (req, res) => {
    try {
        const data = req.body;

        const findUser = await User.findOne({
            where: { email: data.email }
        });
        if (!findUser) {
            return res.status(401).json({ success: false, msg: "Invalid Credential" });
        }
        const matchpass = await bcrypt.compare(data.password, findUser.password);
        if (!matchpass) {
            return res.status(401).json({ success: false, msg: "Invalid Credentials" });
        }

        const payload = {
            id: findUser.id,
            email: findUser.email
        }
        const token = jwt.sign(payload, "mv9mtmgrg7494dd", {
            expiresIn: "1h"
        })
        res.status(200).json({ token, findUser });
    } catch (error) {
        console.log(error)
        const errors = errorHandler(error)
        res.status(500).json({ errors: errors, sucesss: false, msg: "user Login failed" });
    }
}

const index = async (req, res) => {
    try {
        let users;
        if (req.user.status === "admin") {
            users = await User.findAll()
        } else {
            users = await User.findAll({ where: { id: req.user.id } })
        }
        res.status(200).json({ success: true, data: users })
    } catch (error) {
        console.log(error)
        const errors = errorHandler(error)
        res.status(500).json({ errors: errors, sucesss: false, msg: "Something went worng" });
    }
}

const find = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id)
        if (!user) {
            return res.status(404).json({ success: false, msg: "user not found" })
        }
        res.status(200).json({ success: true, data: user })
    } catch (error) {
        console.log(error)
        const errors = errorHandler(error)
        res.status(500).json({ errors: errors, sucesss: false, msg: "Something went worng" });
    }
}


const update = async (req, res) => {
    const data = req.body;
    try {
        const user = await User.findByPk(req.params.id);
        console.log(user);

        if (!user) {
            return res.status(404).json({ success: false, msg: "user not found" })
        }

        const oldProfileImage = user.user_image;
        
        await user.update(data);
        await saveRAMFiles(req.tempFiles);
        
        if (data.user_image !== oldProfileImage) {
            deleteUploadedFiles({ file: oldProfileImage });
        }

        res.status(200).json({ success: true, data: user, msg: "user update sucessfully" })
    } catch (error) {
        console.log(error)
        const errors = errorHandler(error)
        res.status(500).json({ errors: errors, sucesss: false, msg: "Something went worng" });
    }
}

const deleteU = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ error, msg: "user not found" })
        }
         deleteUploadedFiles({ file: user.user_image });
        await user.destroy();
        res.status(200).json({ success: true, data: user, msg: "user delete sucessfully" })

    } catch (error) {
        console.log(error)
        const errors = errorHandler(error)
        res.status(500).json({ errors: errors, sucesss: false, msg: "Something went worng" });
    }
}

module.exports = {
    login,
    register,

    index,

    find,
    update,
    deleteU
}