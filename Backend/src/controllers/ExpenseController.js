const errorHandler = require("../helper/errorHandler");
const Expense = require("../models/ExpenseModel")

const index = async (req, res) => {
    try {
        const data = await Expense.findAll({
            where: { fkuser_id: req.user.id }
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
        const expense = await Expense.create({
            ...data,
            fkuser_id: req.user.id
        })
        res.status(201).json({ success: true, data: expense, msg: "Expense Added Successfully" })
    } catch (error) {
        console.log(error)
        const errors = errorHandler(error)
        res.status(500).json({ errors: errors, sucesss: false, msg: "Somthing went wrong" });
    }
}

const find = async (req, res) => {
    try {
        const expense = await Expense.findOne({
            where: {
                ex_id: req.params.id, fkuser_id: req.user.id
            }
        });
        if (!expense) {
            return res.status(404).json({ msg: "Expense Record Not Found" })
        };
        res.status(200).json({ success: true, data: expense })

    } catch (error) {
        console.log(error)
        const errors = errorHandler(error)
        res.status(500).json({ errors: errors, sucesss: false, msg: "Somthing went wrong" });
    }
}

const update = async (req, res) => {
    const data = req.body;
    try {
        const expense = await Expense.findOne({
            where: { ex_id: req.params.id, fkuser_id: req.user.id }
        })

        if (!expense) {
            return res.status(404).json({ msg: "expense data not found" })
        }
      await expense.update(data);
        res.status(200).json({ success: true, data: expense, msg: "Expense Upadte Successfully" })
    } catch (error) {
        console.log(error)
        const errors = errorHandler(error)
        res.status(500).json({ errors: errors, sucesss: false, msg: "Somthing went wrong" });
    }
}

const deleteE = async (req, res) => {
    try {
        const expense = await Expense.findOne({
            where: { ex_id: req.params.id, fkuser_id: req.user.id }
        })
        if (!expense) {
            return res.status(404).json({ msg: "expense data not Found" })
        }
        await expense.destroy();
        res.status(200).json({ success: true, msg: "Expense data Delete succssfully" })
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
    deleteE
}