const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define(
    'User',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Name is required'
                },
                len: {
                    args: [2, 50],
                    msg: "Name must be 2 and 50 character"
                }
            }
        },
        user_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'User Name is required'
                },
                len: {
                    args: [2, 50],
                    msg: "Name must be 2 and 50 character"
                }
            }
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:{
                msg:'Email already exist'
            },
            validate:{
                notEmpty:{
                    msg:'Email is required'
                },
                isEmail:{
                    msg:'Enter a Valid Email'
                }
            }
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty:{
                    msg:"Password is Required"
                }
            }
        },
        status:{
            type:DataTypes.ENUM('admin', 'user'),
            allowNull:false,
            validate:{
                notEmpty:{
                    msg:"Status is required"
                }
            }
        }
        
    },{
        tableName:'User',
        timestamps:true
    }
)
User.sync()

module.exports = User;