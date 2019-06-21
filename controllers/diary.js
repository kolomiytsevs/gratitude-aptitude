const mongoose = require("mongoose") 
const {DateTime} = require('luxon')
const uuidv1 = require('uuid/v1')

const User = require("../models/user")
const DiaryEntry = require("../models/diaryEntry")
const SubmittedField = require("../models/SubmittedField")

exports.diary_create_entry = (req, res, next) => {
  const standardDate = DateTime.local().toFormat(`yyMMdd`)
  const entryDate = DateTime.local().toFormat(`dd/MM/yy`)
  const msDateNow = Date.now()
  
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