var mongoose= require('mongoose');
var Todo= mongoose.model('Todo',{
    text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
    
    },
    completed:{
    type: Boolean,
    default:false
    },
    completedAt:{
    type: Number,
    default: null
    }
    });
module.exports={Todo};

    // // var newTodo = new Todo({
// //     text: 'Learn learn and learn',
// //     completed:false,
// //     completedAt: 2018/20/13 
// // });

// // newTodo.save().then((doc)=>{
// // console.log('saved todo', doc)
// // },(e)=>{
// //     console.log('unable to save todo');
// // });
// var newTodo = new Todo({
//     text: 'Learn learn and learn till you learn',
// });
// newTodo.save().then((doc)=>{
//     console.log('saved todo', doc);
// }, (e)=>{
// console.log('unable to add todo');
// });
