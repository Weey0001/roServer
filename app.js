let express = require('express'),
cors = require('cors'),
mongoose = require('mongoose'),
app = express(),
port = 5000,
// uri = 'mongodb+srv://weedy0001:darina1985@cluster0-s8bfb.mongodb.net/test?retryWrites=true&w=majority',
// options = {
  
//   user:"weedy0001",
//   pass:"darina1985",
//   dbName:"wadadb",
//   useUnifiedTopology: true ,
//   useNewUrlParser: true
  
// };

uri = "mongodb://127.0.0.1:27017",
options={
  dbName:"wadadb",
  useUnifiedTopology: true ,
  useNewUrlParser: true
};

app.use(cors())
app.use(express.json())
app.use('/static', express.static('public'));

mongoose.connect(uri,options)

const connection = mongoose.connection;

connection.once(
  
  'open',
  
  ()=>{
    
    console.log('Mongodb database connection established ...')
  
  }
)

let userRouter = require('./routes/users'),
 itemRouter = require('./routes/item'),
 typeRouter = require('./routes/type'),
 countryRouter = require('./routes/location')

app.use('/users',userRouter)
app.use('/items',itemRouter)
app.use('/types',typeRouter)
app.use('/countries',countryRouter)

app.listen(
  port,
  ()=>{
    console.log('Server running ...')
  })