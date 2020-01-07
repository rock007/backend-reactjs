import './AppLayout.scss';

import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Redirect, Switch,HashRouter } from 'react-router-dom';

import DocumentTitle from 'react-document-title';

import { PageLayout,Icon,Menu ,Drawer } from 'tinper-bee';

import Alert from '../../components/Alert';
import ProtectedRoute from '../../components/Router/ProtectedRoute';

import { appRouters } from '../Router/router.config';
import utils from '../../utils/utils';
import AppConsts from '../../lib/appconst';
import Footer from '../Footer';
import Header from '../Header';
import MsgPanel from '../../pages/Sys/Msg/Panel';

import { getCookie, setCookie} from '../../utils/index';
import SystemStore from '../../stores/SystemStore';
import Store from '../../stores/StoreIdentifier';
import { MenuModel,PermissionModel } from '../../services/dto/SystemModel';
import SiderMenu from '../SiderMenu';
import SysService from '../../services/SysService';

interface IPageProps {
  history:any,
  match:any,
  location:any,
  systemStore:SystemStore
}
interface IPageState {
  collapsed:boolean,
  showRightDrawer:boolean,
  data:Array<any>,
  isLoading:boolean,
  isLogoffAlert:boolean,

}

@inject(Store.SystemStore)
@observer
class AppLayout extends React.Component<IPageProps,IPageState> {
 
  state:IPageState={
    collapsed: false,
    showRightDrawer:false,
    data:[],
    isLoading:true,
    isLogoffAlert:false
}

closeRightDrawer=()=>{
  this.setState({
    showRightDrawer: false
  })
}

componentDidMount() {
  const token= AppConsts.getToken();

  if(token==null){
    
    window.location.href='/#/account/login';

  }else{

    this.props.systemStore.loadData();
    this.loadData();
  }

}

loadData=async ()=>{

  let result = await SysService.getMyMenu();

  AppConsts.permissions=result;
  this.setState({data:result,isLoading:false});
}

go2Page=async (item)=>{
 
  const route=appRouters.find((v,i)=>v.title===item.name);
  if(route!=null){
    console.log('go2Page:'+route.path);
    this.props.history.push(route.path);
  }else{
    this.props.history.push('/exception?code=404');
  }
}

pushPage=(url:string)=>{
  
  this.setState({showRightDrawer:false});

  this.props.history.push(url);
}

handlerLogoff=()=>{

  this.setState({isLogoffAlert:false});

  //setCookie('login_name','');
  //setCookie('login_pwd','');

  setCookie('login_token','');

  window.location.href='/#/account/login';
  window.location.reload(true);
}
render() {
 
  const {
    history,
    location: { pathname },
  } = this.props;

  const layout = (
    <div  className="main">
      <Header handler_msg={()=>this.setState({showRightDrawer:true})}
              handler_logoff={()=>this.setState({isLogoffAlert:true})} 
              go2page={this.pushPage}
              title={this.props.systemStore.title}
              orgName={this.props.systemStore.orgName}
              realName={this.props.systemStore.realName}
              unReadNum={this.props.systemStore.unReadNum}
      />
    <PageLayout>
        <PageLayout.Content>
            <PageLayout.LeftContent md="2">
            <SiderMenu handleSelect={this.go2Page} isLoading={this.state.isLoading}
              permissions={this.state.data} path={pathname}></SiderMenu>
         
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
    <Drawer closeIcon={<Icon type="uf-close-c"/>} showMask={true} width={'450px'} showClose={true}  
      title={"消息"} 
      show={this.state.showRightDrawer} placement='right' onClose={this.closeRightDrawer}>
          <MsgPanel unReadNum={this.props.systemStore.unReadNum}  go2page={this.pushPage} ></MsgPanel>
    </Drawer>
    <Alert show={this.state.isLogoffAlert} context="确定要退出登录?"
                           confirmFn={() => {
                               this.handlerLogoff();
                           }}
                           cancelFn={() => {
                              this.setState({isLogoffAlert:false})
                           }}
    />
  </div>);

  return <DocumentTitle title={utils.getPageTitle(pathname)}>{layout}</DocumentTitle>;
}

}

export default AppLayout;
