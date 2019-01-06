const expect = require('expect');
const request = require('supertest');

const {app} = require('./server');
const {Todo} = require('./models/todo');

// beforeEach((done) => {
//     Todo.remove({}).then(() => done());
// });

let todoCount;

beforeEach((done) => {
    Todo.find().count().then((count) => {
        todoCount = count;
        done();
    });
})

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        const text = 'Wash the clothes';
        request(app).post('/todos')
                    .send({
                        text: text
                    })
                    .expect(200)
                    .expect((res) => {
                        expect(res.body.text).toBe(text);
                    })
                    .end((err, resp) => {
                        if (err) return done(err);
                        Todo.find()
                            .then((todos) => {
                                expect(todos.length).toBeGreaterThan(1);
                                expect(todos.findIndex(t => t.text == text)).toBeGreaterThan(-1);
                                done();
                            }).catch((e) => done(e));
                    }); 
        
    });

    it('should not create a todo with invalid text data', (done) => {
        request(app).post('/todos')
                    .send({ text: ''})
                    .expect(400)
                    .end((err, resp) => {
                        if (err) return done(err);
                        Todo.find()
                            .then((todos) => {
                                expect(todos.length).toBe(todoCount);
                                done();
                            }).catch((e) => done(e));
                    })
    });
});

describe('GET /todos', () => {
    it('should return all the todos', (done) => {
        request(app).get('/todos')
                    .send()
                    .expect(200)
                    .expect((resp) => {
                        expect(resp.body.todos.length).toBe(todoCount)
                    })
                    .end(done);
    })
})



