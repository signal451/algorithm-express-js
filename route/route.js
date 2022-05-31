const express = require('express'); 
const mysqlCon = require('../connection/connect.js');
const router = express.Router(); 
const contoller = require('../controllers/callbacks.js'); 



// function getUsers() {
//     mysqlCon.query('SELECT * FROM hereglegch', function (error, results, fields) {
//         if(error) throw error;
//         console.log('The result: ', results);
//     });
// }

router.get('/api/users', contoller.getUsers);

router.post('/api/login', contoller.userLogin);



router.get('/api/users/:userID', (req, res) => {
    // validate input 
    // -> can't be empty
    // -> must be int 
    // -> if that user empty send not found message. 
    let userID = parseInt(req.params.userID, 10);
    if(isNaN(userID)) {
        res.status(400).send("Хүсэлт алдаатай байна");
        return;
    }

    mysqlCon.query('SELECT * FROM `hereglegch` WHERE Hereglegch_id = ?', [userID], (error, results, fields) =>{
        if(error) return res.status(404).send("Сервер дээр алдаа гарсан байна");
        if(results.length === 0) return res.status(404).send("Сервер дээр хүсэлтийн утга олдсонгүй");
        return res.status(200).send(JSON.stringify(results));
    });
});


router.post('/api/users', (req, res) => {
  
    // mysqlCon.query('', (error, results, fields) => {
    //     if(error) res.status(404).send("Something went wrong in server");
    //     res.status(200).send(JSON.stringify(results));
    // }) 
});



router.get('/api/languages', contoller.getLanguages);

router.get('/api/course/users/:userID', (req, res) => {
    let query = req.query;
    mysqlCon.query('SELECT hicheel.Hicheeliin_id, hicheel.Hicheeliin_ner, hicheel.Tailbar '
        + 'FROM `Hereglegch` hereglegch INNER JOIN `Songosn_hicheel` s_hicheel '
        + 'ON hereglegch.Hereglegch_id = s_hicheel.Hereglegch_id '
        + 'INNER JOIN `Hicheel` hicheel ON s_Hicheel.Hicheeliin_id = hicheel.Hicheeliin_id '
        + 'WHERE hereglegch.Hereglegch_id = ?', [1], (error, results, fields) => {
        if(error) res.status(404).send(error.message);  
        res.status(200).send(JSON.stringify(results));
    });
});




// router.get('/api/course/users/items/:userID', (req, res) => {
//     mysqlCon.query('CALL  GetUserCourse(?);', [1], (error, results, fields) => {
//         if(error) res.status(404).send(error.message);  
//         res.status(200).send(JSON.stringify(results));
//     })
// }) 

router.post('/api/courses', (req, res) => {

    console.log(req.query.code);

    mysqlCon.query('SELECT hicheel.Hicheeliin_id FROM `Programchlaliin_hel` hel INNER JOIN `Hicheel` hicheel ' +
    'ON hel.Programchlaliin_hel_code = hicheel.Programchlaliin_hel ' + 
    'WHERE hicheel.Programchlaliin_hel = ?', ['py'],
    (error, results, fields) => {
        if(error) res.status(404).send(error.message);  
        res.status(200).send(JSON.stringify(results));
    })
});


module.exports = router;