import express from 'express';
import bodyParser from 'body-parser';
import actionStorage, { ActionConfig, ActionStorage } from './infrastructure/action-storage';
import connectDB from './utils/db';
import { UserServiceHandler } from './application/user-service/user';

connectDB();

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
  
  for (const key in actionStorage) {
    if (actionStorage[key].param === param) {
      actionConfig = actionStorage[key];
      actionName = key;
      console.log(actionConfig);

      break;
    }
  }

  if (!actionConfig) {
    return res.status(400).json({ error: 'Invalid param' });
  }


  try {
     const module = await import(`./application/${actionConfig.application}-service/${actionConfig.application}`);
    const HandlerClass = module[actionConfig.className];
    // const applicatonInfo =  this[actionConfig.application].[actionName];
    const handler = new HandlerClass();

    handler.getUserData;
     const classMethods = Object.getOwnPropertyNames(HandlerClass.prototype).filter(
     (prop) => prop !== 'constructor'
     );

    console.log('Methods in HandlerClass (class methods):', classMethods);
    console.log('actionName',actionName);
 
    // int methodIndis = "";
    // for(let i =0 ; i < classMethods.length ; i++) {
    //  if(classMethods[i] === actionName ) {
    //    methodIndis = i;
    //  } 
    // }
    const result = await HandlerClass.actionName;
    
    console.log("handler class ismi" ,handler);
 
    res.json(result);
 

    // const denemeSınıf = new UserServiceHandler();
    // const deneme1 = await denemeSınıf.getRoleList();
    // console.log(deneme1); 
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
