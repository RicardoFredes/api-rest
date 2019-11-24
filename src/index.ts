import app from './app'
import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT || 3000

app.listen(PORT, function() {
  console.log(`App running on http://localhost:${PORT}`)
})
