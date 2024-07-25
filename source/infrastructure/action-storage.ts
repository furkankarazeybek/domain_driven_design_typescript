// tüm projeye ulaşabilir
// json objesi olacak

export interface ActionConfig {
    application: string;
    className: string;
    param: string;
  }
  
  export interface ActionStorage {
    [key: string]: ActionConfig;
  }
  
  const actionStorage: ActionStorage = {
    getUserList: { application: "user", className: "UserServiceHandler", param: "users" }, /// direkt metodu param olarak gönder
    getRoleList: { application: "user", className: "UserServiceHandler", param: "roles" },
  };
  
  export default actionStorage;
  

