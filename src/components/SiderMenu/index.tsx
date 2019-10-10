import './index.less';

import * as React from 'react';

import { Avatar, Col, Icon, Row, Menu ,SubMenu} from 'tinper-bee';
import AppConsts from '../../lib/appconst';

import { appRouters } from '../../components/Router/router.config';

export interface ISiderMenuProps {
  path: any;
  collapsed: boolean;
  onCollapse: any;
  history: any;
}

export default class SiderMenu extends React.Component<ISiderMenuProps> {

  componentDidMount() {

  }

  render() {

    const { collapsed, history, onCollapse } = this.props;

    let initMenuChilds=(route:any)=>{
  
      return (<SubMenu key={route.path} 
        title={<span> <Icon type={route.icon} /> <span>{route.title}</span> </span>}  >
         
          {route.childs
            .filter((item: any) => !item.isLayout && item.showInMenu)
            .map((route: any, index: number) => {
  
              return initMenuItem(route);
  
            })}
        </SubMenu>)
    }
    
    let initMenuItem=(route:any)=>{
    
      if (route.permission && !AppConsts.isGranted(route.permission)) return null;
    
      if(route.childs!=null&&route.childs.length>0){
    
        return initMenuChilds(route.childs);
    
      }
    
      return (
        <Menu.Item key={route.path} onClick={() => history.push(route.path)}>
          <Icon type={route.icon} />
          <span>{route.title}</span>
        </Menu.Item>
      );
    
    }
  
    return (
      
        <Menu  mode="inline">
          {appRouters
            .filter((item: any) => !item.isLayout && item.showInMenu)
            .map((route: any, index: number) => {
  
              return initMenuItem(route);
            })}
        </Menu>
      
    );
  }
}

