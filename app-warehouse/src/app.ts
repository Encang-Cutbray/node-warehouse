import express from 'express';
import Model from './models/index'

const app: express.Application = express()

app.get('/', async (req: express.Request, res: express.Response, next: Function) => {
    const user = await Model.User.findAll()
    res.json(user)

})
export default app