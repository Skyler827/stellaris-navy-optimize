import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import shell from 'shelljs';
import appRoot from "app-root-path";
const app = express();
const port = 3000;
console.log("starting up...");

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});

app.use('/', express.static(path.join(__dirname, 'web')));
app.get('/joblists', function(_req:Request, res:Response, next:NextFunction) {
  const pathToJobsFolder = [appRoot.path,'dist','web','stellaris_common','pop_jobs'].join(path.sep);
  console.log("pathToJobsFolder: "+pathToJobsFolder);
  res.status(200).send(shell.ls(pathToJobsFolder));
  next();
});