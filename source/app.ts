import express from 'express';
import bodyParser from 'body-parser';
import actionStorage, { ActionConfig, ActionStorage } from './infrastructure/action-storage';
import connectDB from './utils/db';
import { TYPES } from '../types';
import { ApplicationStorage } from './infrastructure/application-storage';
import { container } from '../inversify.config';


connectDB();

const applicationStorage = container.get<ApplicationStorage>(TYPES.ApplicationStorage);

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/api', async (req, res) => {
  const { param } = req.body;
  if (!param) {
    return res.status(400).json({ error: 'Param is required' });
  }
  let actionConfig: ActionConfig | undefined = undefined;
  let actionName= "" ;

  for (const key in actionStorage) {
    if (key === param) {
      actionConfig = actionStorage[key];
      actionName = key;

      break;
    }
  }

  if (!actionConfig) {
    return res.status(400).json({ error: 'Invalid param' });
  }


  try {
      const handlerClassName = actionConfig.className;
      const handlerApplicationName = actionConfig.application;

      return await applicationStorage.executeApplicationMethod(param); // * 
  
  
  } 
   catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
