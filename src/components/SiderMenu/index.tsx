
import * as React from 'react';

import { Icon,Menu ,Loading} from 'tinper-bee';
import { MenuModel,PermissionModel } from '../../services/dto/SystemModel';

interface ISiderMenuProps {
  path: any;
  collapsed: boolean;
  onCollapse: ()=>void;
  
  permissions:Array<PermissionModel>,
  handleSelect:(item:MenuModel)=>void,
  isLoading:boolean
}

interface ISiderMenuState{

}

 class SiderMenu extends React.Component<ISiderMenuProps,ISiderMenuState> {

  static defaultProps= {
    path: '/',
    collapsed: false,
    onCollapse: ()=>{} ,
    isLoading:true
  }

  state:ISiderMenuState={
    //permissions:[],
    //menus:[],
    //isLoading:false
}

private _getMenuChild(parentId:number):Array<MenuModel>{

    if(this.props.permissions===null||this.props.permissions.length===0) return [];

    const mm= this.props.permissions.filter((v,i,array)=>v.parentId===parentId&&v.type==1)
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
 
   getPermissonByUrl(url:string):PermissionModel{

    const list= this.props.permissions.filter((v,i,array)=>v.url===url)
            .map((v,i,arr)=>{
            return v as PermissionModel;
          });

     if(list.length>0) return list[0];
     
     return null;
}

 getPermissonById(id:number):PermissionModel{

  const one= this.props.permissions.find((v,i,array)=>v.id===id);
  return one;
}

initMenuChilds=(route:MenuModel)=>{

  return (
    <Menu.SubMenu key={route.id} 
        title={route.name}  >
   
        {route.children
          .map((route: any, index: number) => {
              return this.initMenuItem(route);
          })}
    </Menu.SubMenu>)
}

 initMenuItem=(route:MenuModel)=>{

  if(route.children!=null&&route.children.length>0){

    return this.initMenuChilds(route);
  }

  return (
    <Menu.Item key={route.id} onClick={this.props.handleSelect.bind(this,route)}>
      {route.icon==null||route.icon==''?'':<Icon type={'uf-'+route.icon} />} 
      <span>{route.name}</span>
    </Menu.Item>
  );

}


  render() {
    
    if(this.props.isLoading){

      return ( <div><Loading container={this} show={true}/></div>)
    }

  const menus=this._getMenuChild(0);

  const permission= this.getPermissonByUrl(this.props.path);

  let defaultOpenKey='';
  let defaultSelectedKey='';

  if(permission!=null){

     defaultSelectedKey=permission.id+'';

     const permissionParent= this.getPermissonById(permission.parentId);

     if(permissionParent!=null){

      defaultOpenKey=permissionParent.id+'';
    }
  }

    return (
      <Menu theme="light"  mode="inline" 
          defaultOpenKeys={[defaultOpenKey]}  
          defaultSelectedKeys={[defaultSelectedKey]}>
           {
            menus.map((route: MenuModel, index: number) => {

                if(route.children!=null&&route.children.length>0){

                  return this.initMenuChilds(route);
                  
                }else{

                  return this.initMenuItem(route);
                }
            })}
    </Menu>)
  }
}

export default SiderMenu;