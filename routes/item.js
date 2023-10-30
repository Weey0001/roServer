let express = require('express'),
router = express.Router(),
Item = require('./itemSchema');

router.route('/')

  .get((req,res)=>{
    
    Item.find()
      .then(data=>res.json(data))
      .catch(err=>res.status(400).json('Error '+ err));
  })
  
router.route("/:typeItem")
  .get((req,res)=>{
    Item.find({itemType : req.params.typeItem})
      .then(types=>{
        res.json(types)
      })
      .catch(err => res.status(400).json("Error " + err))
  })
   
router.route('/add')
  .post((req,res)=>{
    
    let nameItem = req.body.itemImg;
    // console.log(nameItem.length)

    nameItem.forEach(element => {
      
      
      
      let desData = element.split("."),
      name = desData[0],
      key = name.toLowerCase(),
      ImgItem = `http://localhost:5000/static/images/${name}.jpg`,
      ImgItemIp=`http://192.168.123.2:5000/static/images/${name}.jpg`,
      {
        itemType,
        itemCountry,
        itemCity,
        itemPrice,
        itemPhone,
        itemEmail,
        itemShopId
        
      }= req.body,
      item = {
        itemType:itemType,
        itemShopId:itemShopId,
        itemName:name,
        itemKey:key,
        itemImg:ImgItem,
        itemImgIp:ImgItemIp,
        itemPrice:itemPrice,
        itemCountry:itemCountry,
        itemCity:itemCity,
        itemPhone:itemPhone,
        itemEmail:itemEmail,
      }
      
      const newItem = new Item(item)
      
      newItem.save()
      .then(()=>res.json('Item Added'))
      .catch(err => res.status(400).json("Error " + err))
    });

  })
  
router.route('/search')
  .post((req,res)=>{
    
    let itemKey = req.body.itemName,
    key = itemKey.toLowerCase();
    console.log(key)
    Item.find({ key: {$regex: key }})
      .then(results=>{
        console.log(JSON.stringify(results))
        res.json(results)
      })
      .catch(err=>console.log(err))

  })
  
router.route('/:id')
  .delete((req,res)=>{
    
    Item.findByIdAndDelete(req.params.id)
      .then(()=>{
        Item.find()
          .then(users=>{
            res.json(users)
          })
      })
      .catch(err => res.status(400).json("Error " + err))
      
  })
  
router.route('/:id')
  .get((req,res)=>{
    
    Item.findById(req.params.id)
      .then(item=>{
        res.json(item)
      })
      .catch(err=>res.status(400).json("Error " + err))
      
  })
router.route('/update/:id')
  .post((req,res)=>{
    
    Item.findById(req.params.id)
    
      .then(item=>{
        
        item.itemType = req.body.itemType;
        item.itemName = req.body.itemName;
         
        item.save()
          .then(() => res.json("Item updated!"))
          .catch(err => res.status(400).json("Error " + err))
          
      })       
  })
   
  
  module.exports = router