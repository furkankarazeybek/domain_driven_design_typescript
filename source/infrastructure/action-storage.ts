// tüm projeye ulaşabilir
// json objesi olacak

export interface ActionConfig {
    application: string;
    className: string;
    permissionId: string;
  }
  
  export interface ActionStorage {
    [key: string]: ActionConfig;
  }
  
  const actionStorage: ActionStorage = {
    getUserList: { application: "user", className: "UserServiceHandler", permissionId:"1" }, 
    getRoleList: { application: "user", className: "UserServiceHandler", permissionId:"2" }, 
    addUser: { application: "user", className: "UserServiceHandler", permissionId:"3" }, 
    loginUser: { application: "user", className: "UserServiceHandler", permissionId:"" }, 
    addUserRole: { application: "user", className: "UserServiceHandler", permissionId:"4" }, 
    getProductList: { application: "product", className: "ProductServiceHandler", permissionId:"5" }, 
    
  };
  
  export default actionStorage;
  

