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
    getUserList: { application: "user", className: "UserServiceHandler", permissionId:"" },
    getRoleList: { application: "user", className: "UserServiceHandler", permissionId:"2" },
    addUser: { application: "user", className: "UserServiceHandler", permissionId:"" },
    loginUser: { application: "user", className: "UserServiceHandler", permissionId:"" },
    addUserRole: { application: "user", className: "UserServiceHandler", permissionId:"4" },
    getProductList: { application: "product", className: "ProductServiceHandler", permissionId:"" },
    getProductCategoriesList: { application: "product", className: "ProductServiceHandler", permissionId:"" },
    addProduct: { application: "product", className: "ProductServiceHandler", permissionId:"" },
    addProductCategory: { application: "product", className: "ProductServiceHandler", permissionId:"" },
    getUserById: { application: "user", className: "UserServiceHandler", permissionId:"" },
    deleteUser: { application: "user", className: "UserServiceHandler", permissionId:"7" },
    updateUser: { application: "user", className: "UserServiceHandler", permissionId:"8" },

  };

  export default actionStorage;


