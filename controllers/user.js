const mongoose = require("mongoose").set('debug', true); 
const bcrypt = require("bcrypt") 
const jwt = require("jsonwebtoken") 
const {DateTime} = require('luxon')
const uuidv1 = require('uuid/v1')

const db = mongoose.connection

const User = require("../models/user")
const DiaryEntry = require("../models/diaryEntry")
const SubmittedField = require("../models/SubmittedField")


exports.user_signup = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Mail exists"
        }) 
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            }) 
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash
            }) 
            user
              .save()
              .then(result => {
                console.log(result) 
                res.status(201).json({
                  message: "User created"
                }) 
              })
              .catch(err => {
                console.log(err) 
                res.status(500).json({
                  error: err
                }) 
              }) 
          }
        }) 
      }
    }) 
} 

exports.user_login = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "user not found"
        }) 
      }
      console.log(user[0].entries.length < 1)
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "incorrect password"
          }) 
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id
            },
            process.env.JWT_KEY,
            {
              expiresIn: "30d"
            }
          ) 
          return res.status(200).json({
            message: "Auth successful",
            token: token
          }) 
        }
        res.status(401).json({
          message: "Auth failed"
        }) 
      }) 
    })
    .catch(err => {
      console.log(err) 
      res.status(500).json({
        error: err
      }) 
    }) 
} 

exports.user_delete = (req, res, next) => {
  User.remove({ _id: req.params.userId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "User deleted"
      }) 
    })
    .catch(err => {
      console.log(err) 
      res.status(500).json({
        error: err
      }) 
    }) 
} 

exports.diary_create_entry = (req, res, next) => {
    const currentDateTime = new Date()
    const standardDate = DateTime.local().toFormat(`yyMMdd`)
    const entryDate = DateTime.local().toFormat(`dd/MM/yy`)
    const msDateNow = Date.now()
    const calendarDate = currentDateTime.getDate() + "-" + (currentDateTime.getMonth() + 1) + "-" + currentDateTime.getFullYear()
    
    const submittedField = new SubmittedField({
        _id: new mongoose.Types.ObjectId(),
        uid:uuidv1(),
        dateId: standardDate,
        date: msDateNow,
        field:req.body.field,
        text:req.body.text
    })

    const entry = new DiaryEntry({
        _id: new mongoose.Types.ObjectId(),
        uid:uuidv1(),
        dateId: standardDate,
        date: msDateNow,
        entryDate: entryDate,
        submittedFields: [submittedField]
    }) 

    /*const newEntry = () => User.findOneAndUpdate(
        { email: req.body.email }, 
        { $push: {entries: entry} 
        })
    .then(result => {
        console.log(result) 
        res.status(201).json({
          message: "entry added"
        }) 
      })
      .catch(err => {
        console.log(err) 
        res.status(500).json({
          error: err
        }) 
      }) */ 

    const newField = () => User
    .findOneAndUpdate(
        { email: req.body.email }, 
        { $push: {"entries.0.submittedFields": submittedField} 
        })
    .then(result => {
        console.log(result) 
        res.status(201).json({
          message: "field added"
        }) 
      })
      .catch(err => {
        console.log(err) 
        res.status(500).json({
          error: err
        }) 
      })    

    //User.findOne({"entries.0.dateId": req.body.dateId}, function(err,obj) { console.log(obj); })  

    /*User.find({ "entries.0.dateId": req.body.dateId })
    .exec()
    .then(user => {
      console.log(user[0].entries[0][dateId]) 
    })
    .catch(err => {
      console.log(err) 
      res.status(500).json({
        error: err
      }) 
    })*/

    const newEntry = () => User.update(
      {email: req.body.email}, 
      {$push: {entries: {
        $sort:{dateId:-1},
        $each:[entry]        
        }}}
    )
    .then(result => {
      console.log(result)  
      res.status(201).json({
        message: "entry added"
      }) 
    })
    .catch(err => {
      console.log(err) 
      res.status(500).json({
        error: err
      }) 
    })


    User.find({ email: req.body.email })
    .exec()
    .then(user => {
      
      if (user.length < 1) {
        return res.status(401).json({
          message: "user not found"
        }) 
      }
      else{
          if(user[0].entries.length < 1 || user[0].entries[0].dateId!=standardDate){
              newEntry()
          }else{
              
              newField()
          }
      } 
    })
    .catch(err => {
      console.log(err) 
      res.status(500).json({
        error: err
      }) 
    })


    /*const entry = new DiaryEntry({
        _id: new mongoose.Types.ObjectId(),
        date: new Date(),
        intention: req.body.intention,
        gratitude: req.body.gratitude,
        highlight: req.body.highlight,
        love: req.body.love
      })*/
    
    /*User.findOneAndUpdate(
        { email: req.body.email }, 
        { $push: {entries: entry} 
        })
    .then(result => {
        console.log(result) 
        res.status(201).json({
          message: "entry added"
        }) 
      })
      .catch(err => {
        console.log(err) 
        res.status(500).json({
          error: err
        }) 
      })*/
      
    /*User.findOneAndUpdate({email:req.body.email}, {$set: {entries:entrie}}, {new:true})
    .then(result => {
        console.log(result) 
        res.status(201).json({
          message: "entrie added"
        }) 
      })
      .catch(err => {
        console.log(err) 
        res.status(500).json({
          error: err
        }) 
      })*/

    /*User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "user not found"
        }) 
      } else {
        const entrie = new DiaryEntry({
            _id: new mongoose.Types.ObjectId(),
            date: new Date(),
            intention: req.body.intention,
            gratitude: req.body.gratitude,
            highlight: req.body.highlight,
            love: req.body.love
          }) 
          console.log(user[0].entries)
          user[0].entries
            .push(entrie)
            .save()
            .then(result => {
              console.log(result) 
              res.status(201).json({
                message: "entrie added"
              }) 
            })
            .catch(err => {
              console.log(err) 
              res.status(500).json({
                error: err
              }) 
            })
      }
    })*/ 
  } 


  exports.diary_get_entries = (req, res, next) => {
    User.findOne({ email: req.body.email })
    .exec()
    .then(user => {
      
      if (user.length < 1) {
        return res.status(401).json({
          message: "user not found"
        }) 
      }
      else{
          if(user.entries.length < 1){
              res.json({
                message:"no entries"
              })
          }else{
              
             res.json(user.entries)
          }
      } 
    })
    .catch(err => {
      console.log(err) 
      res.status(500).json({
        error: err
      }) 
    })
  }

exports.diary_delete_field = (req, res, next) => {
  User.findOne({ email: req.body.email })
  .exec()
  .then(user => {
    
    if (user.length < 1) {
      return res.status(401).json({
        message: "user not found"
      }) 
    }
    else{
        if(user.entries.length < 1){
            res.json({
              message:"no entries to delete"
            })
        }else{

          /*User.update(
            {"entries.submittedFields.date":req.body.date}, 
            {$pull: {entries: {
              submittedFields :{
                $elemMatch:{
                  date:req.body.date
                }
              }       
              }}}
          )*/
          User.updateOne(
            {"entries.submittedFields.uid":req.params.fieldId}, 
            {$pull: {
              "entries.$.submittedFields": {uid: req.params.fieldId}
            }}
          )
          .then(result => {
            console.log(result)  
            res.status(201).json({
              message: "field deleted"
            }) 
          })
          .catch(err => {
            console.log(err) 
            res.status(500).json({
              error: err
            }) 
          })
        }
    } 
  })
  .catch(err => {
    console.log(err) 
    res.status(500).json({
      error: err
    }) 
  })
}

exports.diary_update_field = (req, res, next) => {
  User.findOne({ email: req.body.email })
  .exec()
  .then(user => {
    
    if (user.length < 1) {
      return res.status(401).json({
        message: "user not found"
      }) 
    }
    else{
        if(user.entries.length < 1){
            res.json({
              message:"no entries to edit"
            })
        }else{
          User.updateOne(
            {email:req.body.email}, 
            {$set: 
              {'entries.$[outer].submittedFields.$[inner].text': req.body.text}
            },
            {
              arrayFilters: [
                {"outer.dateId": req.body.dateId}, 
                {"inner.uid": req.params.fieldId}
              ]
            })
          .then(result => {
            console.log(result)  
            res.status(201).json({
              message: "field updated"
            }) 
          })
          .catch(err => {
            console.log(err) 
            res.status(500).json({
              error: err
            }) 
          })
        }
    } 
  })
  .catch(err => {
    console.log(err) 
    res.status(500).json({
      error: err
    }) 
  })
}
  