let express = require("express"),
  router = express.Router(),
  User = require('./userSchema'),
  nodemailer = require('nodemailer');
 
  router.route('/')
    .get((req,res)=>{
      
      User.find()
        .then(users=>res.json(users))
        .catch(err=>res.status(400).json('Error ' + err))
      
    })
   
  router.route('/add')
    .post((req,res)=>{
      
      let {
        boutique,
        countryId,
        cityId,
        firstName,
        lastName,
        email,
        phone,
        pass
      } = req.body ;

      // console.log(String(email))

      let emailVal = email.trim();

      User.find({email: emailVal})
        .then(result=>{
          if(result.length>0){
            res.json("already exist")
          }else{
            let user = {        
              boutique:boutique,
              countryId:countryId,
              cityId:cityId,
              firstName:firstName,
              lastName:lastName,
              email:email,
              phone:phone,
              pass:pass
            };
            
            const newUser = new User(user)
          
            newUser.save()
              .then(()=>{
                User.find({email:email})
                  .then(result=>{
                    res.json(result[0]._id)
                  })
              })
              .catch(err=> res.status(400).json('Error ' + err))
          }
        })
      

    })
    
  router.route('/login')
    .post((req,res)=>{
      let {email,pass} = req.body,
      emailVal= email.trim(),
      passVal = pass.trim()

      console.log(email)
      
      User.find({email: emailVal,pass: passVal})
        .then(ident=>{
          if(ident.length>0){
            res.json(ident)
          }else{
            res.json("false")
          }
        })
        .catch(err=>console.log(err))
        
    })
  
  router.route('/passSend')
    .post((req,res)=>{
      let {email} = req.body;

      User.findOne({email:email})
        .then(result=>{
          if(result!==null){
            var transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: 'weedy1aina@gmail.com',
                pass: 'bockwrqspfrrcqhf'
              }
            });
            
            var mailOptions = {
              from: 'weedy1aina@gmail.com',
              to: `${result.email}`,
              subject: `"Your password Ombinay"`,
              text: `Your password: ${result.pass}`
            };
            
            transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                res.json(error)
                console.log(error)
              } else {
                console.log('Email sent: ' + info.response);
                res.json("Your password was sending to your mailbox")
              }
            });
            
          }else{
            console.log(result)
          }
        })
        .catch(err=>res.json(err))
    })
     
  router.route('/:id')
    .delete((req,res)=>{
      
      User.findByIdAndDelete(req.params.id)
        .then(()=>{
          User.find()
            .then((users)=>{
              res.json(users)
            })
            .catch(err => res.status(400).json("Error " + err))
        })
        .catch(err => res.status(400).json("Error " + err))
      
    })
     
  router.route('/update/:id')
    .post((req,res)=>{
      
      User.findById(req.params.id)
      
        .then(user=>{
          
          user.firstName = req.body.firstName;
          user.lastName = req.body.lastName;
          user.email = req.body.email;
          user.phone = req.body.phone;
           
          user.save()
            .then(() => res.json("User updated!"))
            .catch(err => res.status(400).json("Error " + err))
            
        })
        .catch(err => res.status(400).json("Error " + err)) 
    })
   
module.exports = router;