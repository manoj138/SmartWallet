const errorHandler = require("../helper/errorHandler");
const Income = require("../models/IncomeModel")

const index = async (req, res) => {
    try {
        const data = await Income.findAll({
            where: { user_id: req.user.id },
        });
        res.status(200).json({ success: true, data: data })
    } catch (error) {
        console.log(error)
        const errors = errorHandler(error)
        res.status(500).json({ errors: errors, sucesss: false, msg: "Somthing went wrong" });
    }
}

const store = async (req, res) => {
    try {
        const data = req.body;
        const income = await Income.create({
            ...data,
            user_id: req.user.id
        })
        res.status(201).json({ success: true, data: income, msg: 'Income added successfully' })
    } catch (error) {
        console.log(error)
        const errors = errorHandler(error)
        res.status(500).json({ errors: errors, sucesss: false, msg: "Somthing went wrong" });
    }
}


const find = async (req, res) => {
    try {
        const income = await Income.findOne({
            where: { income_id: req.params.id, user_id: req.user.id }
        });
        if (!income) {
            return res.status(404).json({ msg: "Income Record not found" })
        }
        res.status(200).json({ success: true, data: income })
    } catch (error) {
        console.log(error)
        const errors = errorHandler(error)
        res.status(500).json({ errors: errors, sucesss: false, msg: "Somthing went wrong" });
    }
}


const update = async (req, res) => {
    const data = req.body
    try {
        const income = await Income.findOne({
            where: { income_id: req.params.id, user_id: req.user.id }
        });

        if (!income) {
            return res.status(404).json({ msg: "income data not found" })
        }
        await income.update(data);
        res.status(200).json({ success: true, data: income, msg: "Income Update successfully" })
    } catch (error) {
        console.log(error)
        const errors = errorHandler(error)
        res.status(500).json({ errors: errors, sucesss: false, msg: "Somthing went wrong" });
    }
}


const deleteI = async (req, res) => {
    try {
const income = await Income.findOne({
    where:{income_id:req.params.id, user_id:req.user.id}
})
  if (!income) {
            return res.status(404).json({ msg: "income data not found" })
        }
        await income.destroy();
        res.status(200).json({success:true, msg: "Income deleted Successfully" })
    } catch (error) {
console.log(error)
        const errors = errorHandler(error)
        res.status(500).json({ errors: errors, sucesss: false, msg: "Somthing went wrong" });
    }
}


module.exports = {
    index,
    store,
    find,
    update,
    deleteI
}
