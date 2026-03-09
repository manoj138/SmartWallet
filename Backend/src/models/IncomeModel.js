const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./UserModel");

const Income = sequelize.define(
    'Income',
    {
        income_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        income_source: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Source is required"
                }
            }
        },
        income_amount: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                isFloat: {
                    msg: "Income amount must be a number",
                },
                min: {
                    args: [0],
                    msg: "Income amount cannot be negative",
                },
            },
        },
        income_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Income Date is required"
                },
                isDate: {
                    msg: "provide a valid date"
                }
            }
        },
        income_time: {
            type: DataTypes.TIME,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Income time is required'
                },

            }
        },
        user_id:{
            type:DataTypes.INTEGER,
            allowNull:false
        }

    },
    {
        tableName: "Incomes",
        timestamps: true

    }
)

Income.sync()
module.exports = Income