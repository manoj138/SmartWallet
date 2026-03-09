const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Expense = sequelize.define(
    "Expense",
    {
        ex_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        ex_source: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Expense source is required" },
            },
        },

        ex_amount: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                notNull: { msg: "Amount is required" },
                min: { args: [0], msg: "Amount must be positive" },
            },
        },

        ex_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                notNull: { msg: "Date is required" },
                isDate: { msg: "Must be a valid date" },
            },
        },

        ex_time: {
            type: DataTypes.TIME,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Time is required" },
            },
        },

        ex_payment_method: {
            type: DataTypes.ENUM(
                "Cash",
                "UPI",
                "Net Banking",
                "Debit Card",
                "Credit Card"
            ),
            allowNull: false,
            defaultValue: "💸 Cash",
        },

        fkuser_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName: "Expense",
        timestamps: true,
    }
);

Expense.sync()

module.exports = Expense;