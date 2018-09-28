// const{MongoClient, ObjectID}= require('mongodb');
const MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{
    if (err){
       return console.log('unable to connect to database');

    }
    console.log('Connected to the database');
    const db=client.db('Todos')
// db.collection('Todos').deleteMany({text:'listen to song'}).then((result)=>{
// console.log(result);
// db.collection('Todos').deleteOne({completed: false}).then((result)=>{
//     console.log(result)
// });
db.collection('Todos').findOneAndDelete({completed: false}).then((result)=>{
console.log(result);
});
});
