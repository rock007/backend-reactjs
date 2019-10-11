import './AppLayout.scss';

import * as React from 'react';

import { Redirect, Switch } from 'react-router-dom';

import DocumentTitle from 'react-document-title';

import 'ac-multi-tabs/dist/index.css';

import { PageLayout,Icon,Menu  } from 'tinper-bee';

import ProtectedRoute from '../../components/Router/ProtectedRoute';

import { appRouters } from '../Router/router.config';
import utils from '../../utils/utils';
import AppConsts from '../../lib/appconst';
import Footer from '../Footer'
import Header from '../Header'
const SubMenu = Menu.SubMenu;

interface IPageProps {
  history:any,
  match:any,
  location:any
}
interface IPageState {
  expanded:boolean,
  collapsed:boolean,
  current:any,
  menus: any[],
  selectedkey:any
}

class AppLayout extends React.Component<IPageProps,IPageState> {
 
  state:IPageState={
    expanded:false,
    collapsed: false,
    current:null,
    menus:[{
        id: 0,
        router: 'visitor',
        title: "visitor"
    },{
        id: 1,
        router: 'niaojian',
        title: "niaojian"
    }],
    selectedkey:null
}



  onCollapse = (collapsed: any) => {
    this.setState({ collapsed });
  };

  handleClick = (e) => {
    console.log(e);

    this.setState({
        current: e.key,
    });
}

handleChange = (v) => {
    console.log(v)
    this.setState({
        menus : v
    })
}


  render() {

    const {
      history,
      location: { pathname },
    } = this.props;

    const { path } = this.props.match;
    const { collapsed } = this.state;

    var routeList=[];

    let initMenuChilds=(route:any)=>{

      return (
          <SubMenu key={route.name} 
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
    
      routeList.push(route);
      return (
        <Menu.Item key={route.name} onClick={() => history.push(route.path)}>
          <Icon type={'uf-'+route.icon} />
          <span>{route.title}</span>
        </Menu.Item>
      );
    
    }
    
    const layout = (
      <div  className="main">

      <Header/>
     
      <PageLayout>
          <PageLayout.Content>
              <PageLayout.LeftContent md="2">

              <Menu  mode="inline" defaultOpenKeys={['man_mg']} >
        {appRouters
          .filter((item: any) => !item.isLayout && item.showInMenu)
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
  </div>
    );

    return <DocumentTitle title={utils.getPageTitle(pathname)}>{layout}</DocumentTitle>;
  }
}

export default AppLayout;
