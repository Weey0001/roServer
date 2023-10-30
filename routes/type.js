let express = require('express'),
router = express.Router(),
TypeItem = require('./typeSchema');

router.route("/")
  .get((req,res)=>{
    TypeItem.find()
      .then(types=>{
        res.json(types)
      })
      .catch(err => res.status(400).json("Error " + err))
  })
  
router.route('/add')
  .post((req,res)=>{
    let itemType = {
      TypeItem:req.body.TypeItem
    };
    let newTypeItem = new TypeItem(itemType);
    newTypeItem.save()
      .then(()=>{
        TypeItem.find()
          .then(types=>res.json(types))
          .catch(err=>console.log(err))
      })
      .catch(err => res.status(400).json("Error " + err))
  })
  
router.route('/:id')
  .delete((req,res)=>{
    TypeItem.findByIdAndDelete(req.params.id)
      .then(()=>{
        TypeItem.find()
          .then(types=>res.json(types))
          .catch(err=>console.log(err))
      })
      .catch(err=>console.log(err))
  })
  
module.exports = router