const mysqlCon = require('../connection/connect.js');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const getUsers = (req, res) => {
    mysqlCon.query('SELECT * FROM hereglegch', (error, results, fields)=>{
        if(error) res.status(404).send("Something went wrong in server");
        res.status(200).send(JSON.stringify(results));
    }) 
}

const getLanguages = async (req, res) => {
    mysqlCon.query('SELECT * FROM programchlaliin_hel', (error, results, fields) => {
        if(error) res.status(404).send("Something went wrong in server");
        res.status(200).send(JSON.stringify(results));
    }); 
}

//when inserting user detail encrypt password ...


const userLogin = (req, res) => {

    const schema = Joi.object({
        Email:  Joi
            .string()
            .email({tlds: { allow: ['com'] } })
            .required(),
        Password: Joi
            .string()
            .pattern(/^[a-zA-Z0-9_-]{6,21}$/)
            .required()
    });

    const {error, value} = schema.validate({Email: req.body.email, Password: req.body.password});

    if(error) {
        return res.status(500).send(error.details);
    }


    mysqlCon.query('CALL GetUser(?)', [value.Email], (error, results, fields) => {
        if(error) return res.status(500).send("Сервер дээр алдаа гарсан байна");
        if(results[0].length === 0) return res.status(404).send("Сервер дээр хэрэглэгч олдсонгүй");

        //check passwords is right (decrypt user password) 

        const accessToken = generateAccessToken({user: value.Email});
        // const refreshToken = generateRefreshToken({user: value.Email});

        console.log(results);
        return res.status(200).send(JSON.stringify({"accessToken": accessToken }));
    });   
}

const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "10min"}); 
}

// let refreshTokens = []; 

// const generateRefreshToken = (user) => {
//     const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "15   min"});
//     refreshTokens.push(refreshToken);
//     return refreshToken;
// }


const userRegister = (req, res) => {
    //validate -> every single input
}


module.exports  = {
    getUsers,
    getLanguages,
    userLogin
}