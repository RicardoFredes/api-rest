import dotenv from 'dotenv'
import app from './app'

dotenv.config()

const PORT = process.env.PORT || 3000

// tslint:disable-next-line: no-console
app.listen(PORT, () => console.log(`App running on http://localhost:${PORT}`))
