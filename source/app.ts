import express from 'express';
import bodyParser from 'body-parser';
import actionStorage, { ActionConfig } from './infrastructure/action-storage';
import connectDB from './utils/db';
import { TYPES } from '../types';
import { ApplicationStorage } from './infrastructure/application-storage';
import container  from '../inversify.config';
import 'reflect-metadata';


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
  let actionName: string | undefined;
  let actionApplicationName: string | undefined;

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
  actionApplicationName = actionConfig.className;

  const applicationData = applicationStorage.getApplication(actionApplicationName);
  if (!applicationData) {
    return res.status(400).json({ error: 'Invalid application name' });
  }

  try {
    console.log(applicationData);
    
    const data = await applicationData[actionName as string].call(applicationData,param);


    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
