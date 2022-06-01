declare namespace API {
  type Menu = {
    id: number;
    type: 0 | 1 | 2;
    icon: string;
    name: string;
    router: string;
    perms: string;
    orderNum: number;
    viewPath: string;
    parentId: number;
    isShow: boolean;
    keepAlive: boolean;
  };
  type PermMenu = {
    menus: Menu[];
    perms: string[];
  };
  type AdminUserInfo = {
    id: number;
    name: string;
    username: string;
    password: string;
    nickname: string;
    headImg: string;
    email: string;
    phone: string;
    roles: number[];
    departmentId: number;
  };
}
