import { observable, action } from 'mobx';
import loadsh from  'lodash';

import AccountService from '../services/account/AccountService';
import { MenuModel,PermissionModel,RoleModel } from '../services/dto/SystemModel';
import AppConsts from '../lib/appconst';

//系统信息
class SystemStore {
  
  @observable data: any ;

  //@observable menus: Array<MenuModel> =[];

  @observable title: string ;

  @observable orgName: string ;

  @observable realName: string ;

  @observable unReadNum: number ;

  //private _permissions:Array<PermissionModel>=[];

  roles:Array<RoleModel>=[];

  @action
  public loadData = async () => {
    
    const data= await AccountService.myProfile();
    this.data =data;

    //set
    AppConsts.session={
      userId:data.id, //'402881f73e1c4ba4013e1c4c08470001',
      userName:data.userName,
      realName:data.trueName,
      sex:data.sex==1?'男':data.sex==0?'女':'',
      orgName:data.orgName,
      orgId:data.orgId,
      roles:data.roles
    };

    this.title="社区戒毒康复人员网格化管控服务平台";
    this.realName=data.trueName;
    this.unReadNum=data.unReadNum;
    this.orgName=data.orgName;
  
    //this._permissions=data.permission;
    
    //AppConsts.permissions=data.permission;

    this.roles=data.roles;

   // this._initMenu();
  };
/** 
  private _initMenu=()=>{

    if(this.menus.length===0&&this._permissions!=null&&this._permissions.length>0){

      this.menus=this._getMenuChild(0);
    }
    return this.menus;
  }

  private _getChild(parentId:number):Array<PermissionModel>{

    if(this._permissions===null||this._permissions.length===0) return [];
    return this._permissions.filter((v,i,arr)=>v.parentId===parentId);
  }

  private _getMenuChild(parentId:number):Array<MenuModel>{

    if(this._permissions===null||this._permissions.length===0) return [];

    const mm= this._permissions.filter((v,i,array)=>v.parentId===parentId&&v.type==1)
              .sort((m1,m2)=>{
               
                  //if (m2.index||0 > m1.index||0) return 1;
                  //if (m2.index||0 < m1.index||0) return -1;
                  return m2.index||0  - m1.index||0;
                }
              )
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

  public getPermissonByUrl(url:string):PermissionModel{

      const list= this._permissions.filter((v,i,array)=>v.url===url)
              .map((v,i,arr)=>{
              return v as PermissionModel;
            });

       if(list.length>0) return list[0];
       
       return null;
  }

  public getPermissonById(id:number):PermissionModel{

    const one= this._permissions.find((v,i,array)=>v.id===id);
    return one;
  }

  public getMenuArray():Array<MenuModel>{

    return  loadsh.cloneDeep(this.menus);
  }
***/
}

export default SystemStore;
