const request = require('supertest');
const app = require('../app');

describe('Testando rotas de usuários...', () => {
    it('POST: /users', async () => {
        const response = await request(app)
        .post('/users')
        .send({
            nome: 'Luiza',
            email: 'luiza.biassi@gmail.com',
            senha: '********'
        })
        expect(response.body.error).toBe(false)
    })

    it('GET: /users', async () => {
        const response = await request(app)
        .get('/users')
        expect(response.body).toHaveProperty('result')
    })

    it('GET: /users/id', async () => {
        const response = await request(app)
        .get('/users/1')
        expect(response.body).toHaveProperty('result')
    })

    it('PUT: /users/id', async () => {
        const response = await request(app)
        .put('/users/4')
        .send({
            nome: 'Luiza Biassi Alves',
            email: 'luiza.biassi@outlook.com',
            senha: '******'
        })
        expect(response.body).toHaveProperty('message')
    })

    it('DELETE: /users/id', async () => {
        const response = await request(app)
        .delete('/users/4')
        expect(response.body).toHaveProperty('message')
    })
})

describe('Testando rotas de tarefas...', () => {
    it('POST: /tasks', async () => {
        const response = await request(app)
        .post('/tasks')
        .send({
            titulo: 'Arrumar Casa',
            descricao: 'Varrer o chão e limpar os móveis.',
            status: 'A Fazer',
            data_criacao: "2021-07-22",
            userId: 1
        })
        expect(response.body.error).toBe(false)
    })

    it('GET: /tasks', async () => {
        const response = await request(app)
        .get('/tasks')
        expect(response.body).toHaveProperty('result')
    })

    it('GET: /tasks/id', async () => {
        const response = await request(app)
        .get('/tasks/1')
        expect(response.body).toHaveProperty('result')
    })

    it('PUT: /tasks/id', async () => {
        const response = await request(app)
        .put('/tasks/7')
        .send({
            titulo: 'Ir no Shopping',
            descricao: 'Comprar roupas e ir no cinema',
            status: 'Feito',
            data_criacao: "2021-08-28",
            userId: 4
        })
        expect(response.body).toHaveProperty('message')
    })

    it('DELETE: /tasks/id', async () => {
        const response = await request(app)
        .delete('/tasks/7')
        expect(response.body).toHaveProperty('message')
    })
})