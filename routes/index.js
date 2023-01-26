var express = require('express');
var router = express.Router();
const user = require('../models/userModel')
const task = require('../models/taskModel')
var excel = require('exceljs')
var emailValid = require('email-validator');
// var moment = require('mo')
/* GET home page. */
router.get('/', function (req, res, next) {
res.render('index')
});


/* GET home page. */
router.get('/user', function (req, res, next) {
  user.find().then((alluser) => {
    res.render('user', { user: alluser });
  }).catch((err) => {
    res.send(err)
  })
});




router.get('/task', function(req, res, next) {
  task.find().then((alltask) => {
    res.render('task', { task: alltask });
  }).catch((err) => {
    console.log(err)
  }) 
});
router.post('/task', function(req, res, next) {
 task.create(req.body).then((task)=>{
         res.redirect("/task")
 }).catch((err)=>{
   console.log(err)
 })
 //  res.render('task')   
});
router.get('/home', function (req, res, next) {
  user.find().then((alluser) => {
    res.render('home', { user: alluser });
  }).catch((err) => {
    res.send(err)
  })
  // res.render('home',{});
});
router.post('/create', function (req, res, next) {
  if (emailValid.validate(req.body.email)) {
    user.create(req.body).then((createuser) => {
      res.redirect("/user")
    }).catch((err) => {
      res.send(err)
    })
  } else {
    res.send("please type valid email")
  }

});
router.get('/get', function (req, res, next) {
  user.find().then((user) => {
    const workbook = new excel.Workbook();
    const workbook2 = new excel.Workbook();
    const worksheet = workbook.addWorksheet('Users');
    const worksheet2 = workbook2.addWorksheet('tasks');
    worksheet.columns = [
      { header: 'S.no', key: 's_no', width: 10 },
      { header: 'Name', key: 'name', width: 10 },
      { header: 'Email', key: 'email', width: 10 },
      { header: 'Number', key: 'number', width: 10 },
      { header: 'id', key: 'id', width: 10 },
    ];
    worksheet2.columns = [
      { header: 'S.no', key: 's_no' },
      { header: 'Name', key: 'name' },
      { header: 'type', key: 'type' },
      { header: 'taskfor_ID', key: 'taskfor' },
    ];

    let count = 1;
    user.forEach((user) => {
      user.s_no = count;
      worksheet.addRow(user);
      count++;
      worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
        workbook.xlsx.writeFile('users.xlsx').then((data) => {
          res.redirect("/")
        }).catch((err) => {
          console.log(err)
        })
      })
    })
    task.find().then((task) => {
      task.forEach((task) => {
        task.s_no = count;
        worksheet2.addRow(task);
        count++;
        worksheet2.getRow(1).eachCell((cell) => {
          cell.font = { bold: true };
          workbook2.xlsx.writeFile('task.xlsx').then((data) => {
            res.redirect("/")
          }).catch((err) => {
            console.log(err)
          })
        })
      })
    })

  })
});

module.exports = router;
