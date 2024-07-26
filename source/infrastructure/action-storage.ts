// tüm projeye ulaşabilir
// json objesi olacak

export interface ActionConfig {
    application: string;
    className: string;
  }
  
  export interface ActionStorage {
    [key: string]: ActionConfig;
  }
  
  const actionStorage: ActionStorage = {
    getUserList: { application: "user", className: "UserServiceHandler" }, 
    getRoleList: { application: "user", className: "UserServiceHandler" },
    getProductList: { application: "product", className: "ProductServiceHandler" },

  };
  
  export default actionStorage;
  

