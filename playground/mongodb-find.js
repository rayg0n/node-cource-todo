const{MongoClient, ObjectID}= require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{
    if (err){
       return console.log('unable to connect to database');

    }
    console.log('Connected to the database');
    const db=client.db('Users')
//     db.collection('Todos').find({
//         _id: new ObjectID('5bacc03521780207c46bd91b')
//     }).toArray().then((docs)=>{
// console.log('Todos');
// console.log(JSON.stringify(docs,undefined,2));

//     }, (err)=>{
//         console.log ('unable to fetch',err);

//     });
// db.collection('Todos').find().count().then((count)=>{
// console.log(`Todos count: ${count}`);


// }, (err)=>{
//     console.log ('unable to fetch',err);

// });
//
db.collection('Users').find({name: 'Raygon'}).toArray().then((docs)=>{
    console.log('Users');
    console.log(JSON.stringify(docs, undefined, 2));
}, (err)=>{
    console.log('unable to fetch',err);
});
client.close();

});