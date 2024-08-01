import http from 'http';
import { IncomingMessage, ServerResponse } from 'http';
import actionStorage, { ActionConfig } from './infrastructure/action-storage';
import connectDB from './utils/db';
import { TYPES } from '../types';
import { ApplicationStorage } from './infrastructure/application-storage';
import container from '../inversify.config';
import 'reflect-metadata';
import Authorize from './infrastructure/authorize';

connectDB();

const applicationStorage = container.get<ApplicationStorage>(TYPES.ApplicationStorage);
const authorize = container.get<Authorize>(TYPES.Authorize);

const port = 3000;

const server = http.createServer(async (req: IncomingMessage, res: ServerResponse) => {

  res.setHeader('Access-Control-Allow-Origin', '*'); // * yazan kısma ip adresi gelcek. sadece burdan gelen istekler kabul edilecek.
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); 
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); 

  if (req.method === 'OPTIONS') {
    res.writeHead(204); // 204 = içerik gelmez ama başarılı olduğunu gösterir
    res.end();
    return;
  }

  if (req.method !== 'POST') {
    res.writeHead(405, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Method Not Allowed' }));
    return;
  }

  let body = '';
  req.on('data', chunk => {  
    body += chunk.toString();
  });

  req.on('end', async () => { // bodyden datayı aldıktan sonra tetiklenir
    try {
      const parsedBody = JSON.parse(body);
      const { param } = parsedBody;

      if (!param) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Param is required' }));
        return;
      }

      let actionConfig: ActionConfig | undefined = undefined;
      let actionName = '';
      let actionApplicationName = '';

      for (const key in actionStorage) {
        if (key === param) {
          actionConfig = actionStorage[key];
          actionName = key;
          break;
        }
      }

      if (!actionConfig) {
        res.writeHead(400, { 'Content-Type': 'application/json' }); // application/json tarayıcı için gerekli 
        res.end(JSON.stringify({ error: 'Invalid param' }));
        return;
      }

      const token = req.headers['authorization']?.toString().split(' ')[1] || '';
      const isAuthorized = await authorize.hasPermission(actionName, token);

      console.log("Authorize mı  ?", isAuthorized);

      if (isAuthorized) {
        actionApplicationName = actionConfig.className;
        const applicationData = applicationStorage.getApplication(actionApplicationName);

        if (!applicationData) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Invalid application name' }));
          return;
        }

        const data = await applicationData[actionName as string].call(applicationData, parsedBody);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(data));
      } else {
        res.writeHead(403, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'You are not authorized!' }));
      }
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Internal Server Error' }));
    }
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
