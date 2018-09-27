// const MongoClient= require('mongodb').MongoClient;
const {MongoClient, ObjectID}= require('mongodb');

// var obj= new ObjectID();
// console.log(obj);

// var user={name:'Raygon',age:25};
// var{name}=user;
// console.log(name);

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{
if(err){
  return  console.log('unable to connect ');
}
console.log('connected successfully');
// const db=client.db('TodoApp')
// db.collection('Todos').insertOne({
// text: 'Something to do',
// completed: false
// },(err,result)=>{
//     if(err){
//         return console.log('unable to insert todo',err);
//     }
//     console.log(JSON.stringify(result.ops,undefined,2))
// });
// db.collection('Users').insertOne({
   
//     name: 'Raygon',
//     age: 24,
//     location: 'Kathmandu'
// }, (err, result)=>{
//     if(err){
//         return console.log('unable to add users');

//     }console.log(JSON.stringify(result.ops[0]._id.getTimestamp()));
// });
client.close();
});