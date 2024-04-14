import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
const app = express();
const port = 3000;
console.log("starting up...");

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})
app.use('/', express.static(path.join(__dirname, 'web'), {

}));
