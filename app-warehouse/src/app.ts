import express from 'express';

const app = express()

app.get('/', (req: express.Request, res: express.Response, next: Function) => {
    console.log(express);
    res.json()
})
export default app