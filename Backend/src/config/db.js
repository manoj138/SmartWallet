const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    {
        dialect:"sqlite",
        storage:'./src/config/database.sqlite',
        logging:false
    }
) 
sequelize.authenticate()

.then(()=>{
    console.log("sqlite database connection sucessfully"); 
})
.catch((error)=>{
     console.log("sqlite unable to connect database");
})

module.exports = sequelize;