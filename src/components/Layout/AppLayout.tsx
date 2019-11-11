import './AppLayout.scss';

import * as React from 'react';

import { Redirect, Switch,HashRouter } from 'react-router-dom';

import DocumentTitle from 'react-document-title';

import { PageLayout,Icon,Menu ,Drawer } from 'tinper-bee';

import ProtectedRoute from '../../components/Router/ProtectedRoute';

import { appRouters } from '../Router/router.config';
import utils from '../../utils/utils';
import AppConsts from '../../lib/appconst';
import Footer from '../Footer';
import Header from '../Header';
const SubMenu = Menu.SubMenu;

interface IPageProps {
  history:any,
  match:any,
  location:any
}
interface IPageState {
  collapsed:boolean,
  showRightDrawer:boolean
}

class AppLayout extends React.Component<IPageProps,IPageState> {
 
  state:IPageState={
    collapsed: false,
    showRightDrawer:false
}

closeRightDrawer=()=>{
  this.setState({
    showRightDrawer: false
  })
}

  render() {

    const {
      history,
      location: { pathname },
    } = this.props;

    var routeList=[];

    let initMenuChilds=(route:any)=>{

      return (
          <SubMenu key={route.name} 
              title={<span> <Icon type={route.icon} /> <span>{route.title}</span> </span>}  >
         
              {route.childs
                .filter((item: any) => !item.isLayout /**&& item.showInMenu**/)
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
    
      routeList.push(route);

      if(!route.showInMenu) return null;
      return (
        <Menu.Item key={route.name} onClick={() => history.push(route.path)}>
          <Icon type={'uf-'+route.icon} />
          <span>{route.title}</span>
        </Menu.Item>
      );
    
    }
    
    const layout = (
      <div  className="main">
      <Header handler_msg={()=>this.setState({showRightDrawer:true})}/>
      <PageLayout>
          <PageLayout.Content>
              <PageLayout.LeftContent md="2">

              <Menu  mode="inline" defaultOpenKeys={['process_mg']} >
        {appRouters
          .filter((item: any) => !item.isLayout /***&& item.showInMenu**/)
          .map((route: any, index: number) => {

            if(route.childs!=null&&route.childs.length>0){

              return initMenuChilds(route);
            }else{

              return initMenuItem(route);
            }

          })}
      </Menu>
             
              </PageLayout.LeftContent>
              <PageLayout.RightContent md="10">
              
              <Switch>
              {routeList
                .filter((item: any) => !item.isLayout)
                .map((route: any, index: any) => (

                  <ProtectedRoute key={index} path={route.path} component={route.component} permission={route.permission} />
                  
                ))}

              <Redirect from="/" to="/dashboard" />
              </Switch>
            
              </PageLayout.RightContent>
          </PageLayout.Content>
      </PageLayout>
      <Footer/>
      <Drawer closeIcon={<Icon type="uf-close-c"/>} showClose={true}  title={"消息"} show={this.state.showRightDrawer} placement='right' onClose={this.closeRightDrawer}>
                    <div style={{paddingLeft: "20px"}}>
                        <p>这是第一行文字</p>
                        <p>这是第二行文字</p>
                        <p>这是第三行文字，啦啦啦~</p>                                                 
                    </div>
      </Drawer>
  </div>
    );

    return <DocumentTitle title={utils.getPageTitle(pathname)}>{layout}</DocumentTitle>;
  }
}

export default AppLayout;
