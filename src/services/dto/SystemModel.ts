export interface MenuModel {
  id:number
  name: string
  icon: string
  url:string
  attr:string
  children:Array<MenuModel>
  page:any
}

export interface ActionModel {
  id:string;
  name: string;
  icon: string;
  url:string;
  attr:string;
}

export interface PermissionModel {
    id:number;
    type: number;
    name: string;
    icon: string;
    remarks:string;
    url:string;
    attr:string;
    parentId:number;
    index:number;
    status:number;
}

export interface RoleModel {
  id:string;
  roleName: string;
}
  