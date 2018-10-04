const expect = require ('expect');
const request= require('supertest');
const{ObjectID}=require('mongodb');

const{app}=require('./../server');
const{Todo}= require('./../models/todo');

const todos =[{
    _id: new ObjectID(),
    text: 'first test todo'
},{
    _id: new ObjectID(),
    text: 'second test todo',
    completed: true,
    completedAt: 333
}];

beforeEach((done)=>{
Todo.remove({}).then(()=>{
  return  Todo.insertMany(todos);
}).then(()=>done());
});


describe('Post/todos',()=>{
    it('should create a new todo',(done)=>{
var text = 'test todo text';

request(app)
.post('/todos')
.send({text})
.expect(200)
.expect((res)=>{
    expect(res.body.text).toBe(text);
})
.end((err,res)=>{
if (err){
   return done(err);
}
Todo.find({text}).then((todos)=>{
    expect(todos.length).toBe(1);
    expect(todo[0].text).toBe(text);
    done();

}).catch((e)=>done());
});
    });
    it('should not create todo with invalid data',(done)=>{
request(app)
.post('/todos')
.send({})
.expect(400)
    
    .end((err, res)=>{
        if(err){
            return done(err);
        }
        Todo.find().then((todos)=>{
            expect(todos.length).toBe(2);
            done();
        }).catch((e)=>done(e));
    });
});
});
describe('GET/todos',()=>{
    it('should get all todos',(done)=>{
request(app)
.get('/todos')
.expect(200)
.expect((res)=>{
    expect(res.body.todos.length).toBe(2);

}).end(done);
    });
});

describe('Get/todos/:id',()=>{
    it('should get the todo by id',(done)=>{
        request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res)=>{
            expect(res.body.todo.text).toBe(todo[0].text);
        });
        done();
    });
    it('shouuld return a 404 if todo not found',(done)=>{
var _id = new ObjectID()
request(app)
.get(`/todos/${todos}._id.toHexString()`)
.expect(404)
.end(done);

    });
it('should retun 404 for non-object ids',(done)=>{
// var _id= new ObjectID()
 request(app)
// .get(`/todos/${todos}._id.toHexString(()=>{
//     if(!ObjectID.isValid(id))}
// )
//     `)
.get('/todos/123abc')
.expect(404)
.end(done);
});
});
describe('Delete/todos:id',()=>{
    it ('should remove a todo',(done)=>{
        // var id= new ObjectID();
         var hexId= todos[0]._id.toHexString();
        request(app)
        .delete(`/todos/${hexId}`)
        .expect(200)
        .expect((res)=>{
expect ((res.body.todo._id).toBe(hexId));
        })
        .end((err,res)=>{
            if(err){
                return done(err);
            }
            Todo.findById(hexId).then((todo)=>{
expect(todo).toNotExist();
done();
            }).catch ((e)=>done());

        });
    });
     it('should return 404 if todo not found',(done)=>{
        var _id = new ObjectID()
        request(app)
        .delete(`/todos/${todos._id}`)
        .expect(404)
        .end(done);
        
   });
    it('should return 404 if object id is invalid',(done)=>{
       request(app)
        .delete('/todos/123abc')
.expect(404)
.end(done);
});
});
  
describe('Patch/todos/:id',()=>{
    it('should update the todo',(done)=>{
var hexId = todos[0]._id.toHexString();
var text ="this should be the new text";

request(app)
.patch(`/todos/${hexId}`)
.send({
    completed : true,
    text
})
.expect(200)
.expect((res)=>{
    expect(res.body.todo.text).toBe(text);
    expect(res.body.todo.completed).toBe(true);
    expect(res.body.todo.completedAt).toBe('number');
})
.end(done);
    });

    it('should clear completed at when the todo is not completed',(done)=>{
        var hexId = todos[1]._id.toHexString();
        var text ="this should be the new text!!";
        
        request(app)
        .patch(`/todos/${hexId}`)
        .send({
            completed:false,
            text
        })
        .expect(200)
        .expect((res)=>{
            expect(res.body.todo.text).toBe(text);
            expect(res.body.todo.completed).toBe(false);
            expect(res.body.todo.completedAt).toNotExist();
        })
        .end(done);
            });
    });
