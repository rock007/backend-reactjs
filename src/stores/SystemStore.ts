import { observable, action } from 'mobx';
import AccountService from '../services/account/AccountService';
import { MenuModel,ActionModel,PermissionModel,RoleModel } from '../services/dto/SystemModel';
import { appRouters } from '../components/Router/router.config';

//系统信息
class SystemStore {
  
  @observable data: any ;

  @observable menus: Array<MenuModel> =[];

  @observable title: string ;

  @observable orgName: string ;

  @observable realName: string ;

  @observable unReadNum: number ;

  private _permissions:Array<PermissionModel>=[];

  roles:Array<RoleModel>=[];

  @action
  public loadData = async () => {
    
    const data= await AccountService.myProfile();
    this.data =data;

    this.title="社区戒毒康复人员网格化管控服务平台";
    this.realName=data.realName;
    this.unReadNum=data.unReadNum;
    this.orgName=data.orgName;
  
    this._permissions=data.permission;
    this.roles=data.roles.map((v,i)=>{ 
      return {
        id:v.id,
        roleName:v.roleName
      } as RoleModel
    });

    this._getMenus();
  };

  private _getMenus=()=>{

    if(this.menus.length==0&&this._permissions!=null&&this._permissions.length>0){

      this.menus=this._getMenuChild(0);
    }
    return this.menus;
  }

  private _getChild(parentId:number):Array<PermissionModel>{

    if(this._permissions==null||this._permissions.length==0) return [];
    return this._permissions.filter((v,i,arr)=>v.parentId==parentId);
  }

  private _getMenuChild(parentId:number):Array<MenuModel>{

    if(this._permissions==null||this._permissions.length==0) return [];

    const mm= this._permissions.filter((v,i,array)=>v.parentId==parentId)
      .map((v,i,arr)=>{

        return {
          id:v.id,
          name: v.name,
          icon: v.icon,
          url:v.url,
          attr:v.attr,
          children:this._getMenuChild(v.id),
          page:null//appRouters.appRouters[2]

        } as MenuModel;
      });

      return mm;
  }

}

export default SystemStore;
