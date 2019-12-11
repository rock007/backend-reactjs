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
import MsgPanel from '../../pages/Sys/Msg/Panel';

import { getCookie} from '../../utils/index';
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
    this.props.systemStore.loadData();
  }
}

go2Page=async (item)=>{
 
  //this.props.history.push('/forhelp');
 
  const route=appRouters.find((v,i)=>v.title==item.name);
  if(route!=null){
    console.log('go2Page:'+route.path);
    this.props.history.push(route.path);
  }else{
    this.props.history.push('/exception?code=404');
  }
 
}

initMenuChilds=(route:MenuModel)=>{

  return (
      <SubMenu key={route.name} 
          title={<span> {route.icon==null||route.icon===''?'': <Icon type={route.icon} />} <span>{route.name}</span> </span>}  >
     
          {route.children
            .map((route: any, index: number) => {
                return this.initMenuItem(route);
            })}
      </SubMenu>)
}


initMenuItem=(route:MenuModel)=>{
  
  if(route.children!=null&&route.children.length>0){

    return this.initMenuChilds(route);

  }

  return (
    <Menu.Item key={route.name} onClick={this.go2Page.bind(this,route)}>
      {route.icon==null||route.icon==''?'':<Icon type={'uf-'+route.icon} />} 
      <span>{route.name}</span>
    </Menu.Item>
  );

}

render() {
 
  const {
    history,
    location: { pathname },
  } = this.props;

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
                  .map((route: MenuModel, index: number) => {

                      if(route.children!=null&&route.children.length>0){

                        return this.initMenuChilds(route);
                      }else{

                        return this.initMenuItem(route);
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
    <Drawer closeIcon={<Icon type="uf-close-c"/>} showMask={true} width={'450px'} showClose={true}  title={"消息"} show={this.state.showRightDrawer} placement='right' onClose={this.closeRightDrawer}>
          <MsgPanel unReadNum={this.props.systemStore.unReadNum}></MsgPanel>
    </Drawer>

  </div>);

  return <DocumentTitle title={utils.getPageTitle(pathname)}>{layout}</DocumentTitle>;
}

}

export default AppLayout;
