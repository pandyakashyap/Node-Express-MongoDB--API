var express = require('express');
var router = express.Router();
var router = express.Router();
const mongoose  = require('mongoose');
const { response } = require('../app');
const studentmodel = require('../models/student.model');



/* GET Student listing. */
router.get('/', function(req, res, next) {
  res.send('Student Route Created.....');
});


router.post('/add', function(req, res, next) {
    
        let newstudent = new studentmodel({
          
            name:req.body.name,
            surname:req.body.surname,
            department:req.body.department,
            age:req.body.age
        });

        newstudent.save(function(err,newstudent){
            if(err)
                res.send(err);
            else
                res.send({status:200,message:'Student Added Succesfully...',studentobj:newstudent});
        });
  });


  //Get Students Details :=>
  router.get('/listdata',function(req,res,next){
         studentmodel.find(function(err,response){
            if(err)
            res.send(err)
            else
            res.send({status:200,student:response});
         });
  });


  //Update Students :=>
  // router.put('/updatestudent',function(req,res,next){
  //       const id = req.query.studentId;
  //       const fname = req.query.name;
  //       console.log()
  //       studentmodel.findByIdAndUpdate(id,{name:fname},function(err,response){
  //               if(err)
  //               res.send(err)
  //               else
  //               res.send({status:200,student:response});
  //       }); 
  // });

router.put('/updatestudent',function(req,res){
    //console.log('student id',req.params.id);
    const name = req.query.name;
    //const department = req.query.department;
    studentmodel.updateOne({age:25},{name:name},function(err,response){
        if(err)
        res.send(err)
        else
        res.send({status:200,student:response});
        console.log("Student Data Updated Succesfully.....");
    });
});


  //delete Students :=>
// router.delete('/deletestudent/:id',function(req,res,next){
//     const id = req.query.userId;
//     studentmodel.findByIdAndDelete(id,function(err,res){
//         if(err){console.log(err);
//         res.send(err);
//         }
//         else
//         res.send({status:200,student:response});
//     });
// });


// Delete Data :=>
router.delete('/deletestudent/:id',async function(req,res){

    console.log("student id",req.params.id);
    const post = await studentmodel.findOneAndDelete({
        _id: req.params.id,
      });
      if (!post) {
        throw new Error(`Id Not Found..... ${req.params.id}`);
      }
      res.status(200).send("done");
});

module.exports = router;


//Pagination Code :=>
  // router.get('/listdata',function(req,res,ne) {
  //   try{
  //      const { page = 1,limit = 3} = req.query;
  //      const studentmodel = studentmodel.find().limit(limit*1).skip((page-1)*limit);
  //      res.status(200);
  //   }
  //   catch(error){
  //       console.log(error);
  //       res.status(500);
  //   }
  // });

  
// Limit :=> set limit here it show only 2 records ....
// db.students.find().limit(2)

// Skip :=> Skip Record , here 5 record skip show other records ....
// db.students.find().skip(2)

// Sort :=> value ascending and desending .....
// db.students.find().sort({"name":-1});
