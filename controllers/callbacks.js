const mysqlCon = require('../connection/connect.js');

const getUsers = (req, res) => {
    mysqlCon.query('SELECT * FROM hereglegch', (error, results, fields)=>{
        if(error) res.status(404).send("Something went wrong in server");
        res.status(200).send(JSON.stringify(results));
    }) 
}

const getLanguages = (req, res) => {
    mysqlCon.query('SELECT * FROM programchlaliin_hel', (error, results, fields) => {
        if(error) res.status(404).send("Something went wrong in server");
        res.status(200).send(JSON.stringify(results));
    }); 
}

//when inserting user detail encrypt password ...


const userLogin = (req, res) => {
    //validate -> user email, password 
    
    mysqlCon.query() 
}

const userRegister = (req, res) => {
    //validate -> every single input

}


module.exports  = {
    getUsers,
    getLanguages,
    userLogin
}