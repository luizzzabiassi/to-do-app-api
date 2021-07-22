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
})

describe('Testando rotas de tarefas...', () => {
    it('POST: /tasks', async () => {
        const response = await request(app)

        .post('/tasks')
        .send({
            titulo: 'Arrumar Casa',
            descricao: 'Varrer o chão e limpar os móveis.',
            status: 'A Fazer'
        })
        expect(response.body.error).toBe(false)
    })

    it('GET: /tasks', async () => {
        const response = await request(app)
        
        .get('/tasks')
        expect(response.body).toHaveProperty('result')
    })
})