import express from 'express';
import bodyParser from 'body-parser';
import actionStorage, { ActionConfig } from './infrastructure/action-storage';
import connectDB from './utils/db';
import { TYPES } from '../types';
import { ApplicationStorage } from './infrastructure/application-storage';
import container  from '../inversify.config';
import 'reflect-metadata';
import Authorize from './infrastructure/authorize';


connectDB();

const applicationStorage = container.get<ApplicationStorage>(TYPES.ApplicationStorage); // authorize da böyle
const authorize = container.get<Authorize>(TYPES.Authorize); 

const app = express();
app.use(express.json());


const port = 3000;



app.post('/api', async (req, res) => {

  const { param } = req.body;
  if (!param) {
    return res.status(400).json({ error: 'Param is required' });
  }

  let actionConfig: ActionConfig | undefined = undefined;
  let actionName: string | undefined;
  let actionApplicationName: string | undefined;
  let permissionIdsArray: string[] = [];

  
  for (const key in actionStorage) {
    if (key === param) {
      actionConfig = actionStorage[key];
      actionName = key;

      permissionIdsArray.push(...actionConfig.permissionId); 
      
      break;
    }


  }
   // rollerin permissionu var, 
   // actionConfigten tüm permissionları authorize'a gönder
   // authorizede eşleştir eğer o permssion o rolde varsa işlem yapabilir yoksa yapamaz
  if (!actionConfig) {
    return res.status(400).json({ error: 'Invalid param' });
  }
  actionApplicationName = actionConfig.className;

  const applicationData = applicationStorage.getApplication(actionApplicationName);
  if (!applicationData) {
    return res.status(400).json({ error: 'Invalid application name' });
  }

  try {
    

    // const token = data["token"];
    const token = req.headers['authorization']?.split(' ')[1] || '';
    const isAuthorized = await authorize.hasPermissionFromPermissionIds(permissionIdsArray, token);

    console.log("Authorize mı  ?", isAuthorized);

    if(isAuthorized)  {
      const data = await applicationData[actionName as string].call(applicationData, req.body);
      res.status(200).json(data);
    }
    else {
      res.status(403).json("You are not authorized !");

     }
    
    console.log(token);

  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
