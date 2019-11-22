import express from 'express'
import routes from './routes'
const app = express();

app.use(express.json());

app.use("/api", routes);
app.get("/", function(_, res) {
  res.send("Hello world!");
});

export default app;
