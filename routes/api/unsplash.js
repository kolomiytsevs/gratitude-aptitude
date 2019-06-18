const express =require('express')
const router = express.Router()
const Unsplash = require('unsplash-js').default


require('dotenv').config()

const unsplash = new Unsplash({
    applicationId: process.env.UNSPLASH_ACCESS_KEY,
    secret: process.env.UNSPLASH_SECRET
  });

  router.route('/unsplash_random_api').get((req, res)=>{

    unsplash.photos.getRandomPhoto({
        width:1500, 
        height:1000, 
        query:'nature', 
        featured:true, 
        orientation:'landscape'
    })
    .then(res=> res.json())
    .then(json => { 
        res.json({
            imgUrl : json.urls.custom,
            author: json.user.name
        })
    })
    .catch(err =>{
        console.log(err)
    }) 
  })

  module.exports = router