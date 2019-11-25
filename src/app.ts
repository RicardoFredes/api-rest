import express, { Request, Response } from 'express'
import routes from './routes'
const app = express()

app.use(express.json())
app.use('/api', routes)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world!')
})

export default app
