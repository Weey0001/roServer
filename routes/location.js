let express = require("express"),
router = express.Router(),
Country= require("./countrySchema"),
City = require("./citySchema");

router.route('/')
  .get((req,res)=>{
    Country.find()
      .then(country=>{
        res.json(country)
      })
      .catch(err => res.status(400).json("Error " + err))
  })
  
router.route('/addCountry')
  .post((req,res)=>{
    
    let data = {
      country:req.body.country
    },

    newCountry = new Country(data);
    
    newCountry.save()
      .then(()=>{
        Country.find()
          .then(countries=>res.json(countries))
          .catch(err=>console.log(err))
      })
      .catch(err => res.status(400).json("Error " + err))
    
  })
  
router.route("/addCity")
  .post((req,res)=>{
    
    let {countryId} = req.body,
      city = req.body.city,
      newCity = {
        city:city.trim(),
        countryId:countryId.trim()
      },
      NewCity = new City(newCity);

      NewCity.save()
        .then(_=>{
          res.json("City added")
        })
        .catch(err=>res.json(err))
  })

router.route('/allcities')
  .post((req,res)=>{
    let {countryId} = req.body;
    // console.log(countryId)

    City.find({countryId: countryId})
      .then(results=>{
        res.json(results)
      })
      .catch(err=>res.json(err))
  })
  
  
module.exports = router