import './index.scss';

import * as React from 'react';
import { Dropdown, Icon, Menu, Navbar } from 'tinper-bee';
import { Link } from 'react-router-dom';

import ConnectPanel from '../Connect';

//import profilePicture from '../../images/user.png';

interface IHeaderState {
  expanded:boolean,
  collapsed:boolean,
  current:any,
  selectedkey:any,
  isFullscreen:boolean
}

export interface IHeaderProps {
  title?:string,
  orgName?:string,
  realName?:string,
  unReadNum:number,
  handler_msg:()=>void,
  handler_logoff:()=>void,
  go2page:(url:string)=>void,
}

const userDropdownMenu = (
  <Menu>
    <Menu.Item key="2">
      <Link to="/logout">
        <Icon type="logout" />
        <span> {'Logout'}</span>
      </Link>
    </Menu.Item>
  </Menu>
);

export class Header extends React.Component<IHeaderProps> {

  state:IHeaderState={
    expanded:false,
    collapsed: false,
    current:null,
    selectedkey:null,
    isFullscreen:false
}

toggle = () => {
  this.setState({
    collapsed: !this.state.collapsed,
  });
};

onToggle = (value) => {
  this.setState({expanded: value});
}

handleSelect = (index,e) => {
  this.setState({selectedkey: index});
 
  if(index==3){
    this.props.handler_msg();
  }else if(index==2){
    this.props.go2page('/my-todo');
  }else if(index==1){
    //全屏
    if(document.fullscreen ){

      document.exitFullscreen();
      this.setState({isFullscreen:false});
    }else{
      document.body.requestFullscreen({navigationUI:'auto'});
      this.setState({isFullscreen:true});
    }
    //this.forceUpdate();
  }

}
 full=(ele)=> {
  if (ele.requestFullscreen) {
      ele.requestFullscreen();
  } else if (ele.mozRequestFullScreen) {
      ele.mozRequestFullScreen();
  } else if (ele.webkitRequestFullscreen) {
      ele.webkitRequestFullscreen();
  } else if (ele.msRequestFullscreen) {
      ele.msRequestFullscreen();
  }
}

onSelect=( {key} )=> {

  if(key==1){
    this.props.go2page('/my-profile');
  }else if(key==2){
    this.props.go2page('/change-pwd');
  }else if(key==3){
    this.props.handler_logoff()
  }else if(key==4){
    //window.open('http://www.baidu.com','_black');
  }
}

  render() {

    const menu2 = (
      <Menu
        onSelect={this.onSelect}>
            <Menu.Item key="1"><Icon type='uf-userset' />个人信息</Menu.Item>
            <Menu.Item key="2"><Icon type='uf-pencil-s' />修改密码</Menu.Item>
            <Menu.Item key="3"><Icon type='uf-close-c-o' />退出登录</Menu.Item>
            <Menu.Item key="4"><Icon type='uf-uf-bulb-2' />在线帮助</Menu.Item>
      </Menu>
  );

    return (
    <Navbar
      className="header"
      expanded={this.state.expanded}
      onToggle={this.onToggle}>
      <Navbar.Header>
          <Navbar.Brand>
              <a href="/#/" className='white'>{this.props.title}</a>
          </Navbar.Brand>
              <Navbar.Brand style={{fontSize:"9px",color:'white'}}>{this.props.orgName}</Navbar.Brand>
          <Navbar.Toggle />
      </Navbar.Header>

      <Navbar.Collapse>
   
          <Navbar.Form pullRight>

          <Navbar.Nav 
             // selectedkey={this.state.selectedkey}

              onSelect={this.handleSelect}>
              <Navbar.NavItem eventKey={5} className='white'><ConnectPanel/></Navbar.NavItem>
              {
                document.fullscreenEnabled?
                this.state.isFullscreen ? <Navbar.NavItem eventKey={1} className='white'>退出全屏</Navbar.NavItem>
                :<Navbar.NavItem eventKey={1} className='white'>全屏</Navbar.NavItem>
                :null
              }
              
              <Navbar.NavItem  eventKey={2} className='white'>
                  待办
              </Navbar.NavItem>
              <Navbar.NavItem eventKey={3} className='white'>
                  消息({this.props.unReadNum})
              </Navbar.NavItem>
              <Navbar.NavItem  eventKey={4}>
                  
              <Dropdown 
                    trigger={['hover']}
                    overlay={menu2}
                    animation="slide-up">
                      <span className='white'>欢迎:{this.props.realName}</span> 
                </Dropdown> 
              </Navbar.NavItem>
                        
          </Navbar.Nav>
        
          </Navbar.Form>

      </Navbar.Collapse>
  </Navbar>
 
    );
  }
}

export default Header;
