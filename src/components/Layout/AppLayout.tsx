import './AppLayout.scss';

import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Redirect, Switch,HashRouter } from 'react-router-dom';

import DocumentTitle from 'react-document-title';

import { PageLayout,Icon,Menu ,Drawer } from 'tinper-bee';

import ProtectedRoute from '../../components/Router/ProtectedRoute';

import { appRouters } from '../Router/router.config';
import utils from '../../utils/utils';
import AppConsts from '../../lib/appconst';
import Footer from '../Footer';
import Header from '../Header';
import { getCookie} from '../../utils/index';
import AccountService from '../../services/account/AccountService'

import SystemStore from '../../stores/SystemStore';
import Store from '../../stores/StoreIdentifier';
import { MenuModel } from '../../services/dto/SystemModel';

const SubMenu = Menu.SubMenu;

interface IPageProps {
  history:any,
  match:any,
  location:any,
  systemStore:SystemStore
}
interface IPageState {
  collapsed:boolean,
  showRightDrawer:boolean,
  data:any
}

@inject(Store.SystemStore)
@observer
class AppLayout extends React.Component<IPageProps,IPageState> {
 
  state:IPageState={
    collapsed: false,
    showRightDrawer:false,
    data:{}
}

closeRightDrawer=()=>{
  this.setState({
    showRightDrawer: false
  })
}

componentDidMount() {
  const token= getCookie('login_token');

  if(token==null){
    
    window.location.href='/#/account/login';

  }else{
    AppConsts.authorization.token=token;

    //this.loadData();
    this.props.systemStore.loadData();
  }
}

loadData=async ()=>{

  const data= await AccountService.myProfile();

  this.setState({data:data});

  debugger;

}

render11() {
  
  const {
    history,
    location: { pathname },
  } = this.props;

  let initMenuChilds=(route:MenuModel)=>{

    return (
        <SubMenu key={route.name} 
            title={<span> <Icon type={route.icon} /> <span>{route.name}</span> </span>}  >
       
            {route.children
              //.filter((item: any) => !item.isLayout /**&& item.showInMenu**/)
              .map((route: any, index: number) => {
                  return initMenuItem(route);
              })}
        </SubMenu>)
  }
  
  let initMenuItem=(route:MenuModel)=>{
  
    //if (route.permission && !AppConsts.isGranted(route.permission)) return null;
  
    if(route.children!=null&&route.children.length>0){
  
      return initMenuChilds(route);
  
    }
    //routeList.push(route);

    //if(!route.showInMenu) return null;
    return (
      <Menu.Item key={route.name} onClick={() => history.push(route.url)}>
        <Icon type={'uf-'+route.icon} />
        <span>{route.name}</span>
      </Menu.Item>
    );
  
  }

  const layout = (
    <div  className="main">
      <Header handler_msg={()=>this.setState({showRightDrawer:true})} 
              title={this.props.systemStore.title}
              orgName={this.props.systemStore.orgName}
              realName={this.props.systemStore.realName}
              unReadNum={this.props.systemStore.unReadNum}
      />
    <PageLayout>
        <PageLayout.Content>
            <PageLayout.LeftContent md="2">

            <Menu  mode="inline" defaultOpenKeys={['process_mg']} >
      {this.props.systemStore.menus
        //.filter((item: any) => !item.isLayout /***&& item.showInMenu**/)
        .map((route: MenuModel, index: number) => {

          if(route.children!=null&&route.children.length>0){

            return initMenuChilds(route);
          }else{

            return initMenuItem(route);
          }

        })}
    </Menu>
           
            </PageLayout.LeftContent>
            <PageLayout.RightContent md="10">
            
            <Switch>
            {appRouters
              .filter((item: any) => !item.isLayout&&item.path!=null)
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
  </div>);

  return <DocumentTitle title={utils.getPageTitle(pathname)}>{layout}</DocumentTitle>;
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
        <Header handler_msg={()=>this.setState({showRightDrawer:true})} 
                title={this.props.systemStore.title}
                orgName={this.props.systemStore.orgName}
                realName={this.props.systemStore.realName}
                unReadNum={this.props.systemStore.unReadNum}
        />
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
