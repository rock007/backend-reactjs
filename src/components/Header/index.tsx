import './index.scss';

import * as React from 'react';

import { Avatar, Badge, Col, Dropdown, Icon, Menu, Navbar,FormControl } from 'tinper-bee';

import { Link } from 'react-router-dom';

import profilePicture from '../../images/user.png';

interface IHeaderState {
  expanded:boolean,
  collapsed:boolean,
  current:any,
  selectedkey:any
}

export interface IHeaderProps {
  expanded?: any;
  toggle?: any;
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
    selectedkey:null
}

toggle = () => {
  this.setState({
    collapsed: !this.state.collapsed,
  });
};

onToggle = (value) => {
  this.setState({expanded: value});
}

handleSelect = (index) => {
  this.setState({selectedkey: index});
}

  render() {
    return (
      <Navbar
          
      expanded={this.state.expanded}
      onToggle={this.onToggle}>
      <Navbar.Header>
          <Navbar.Brand>
              <a href="#">标题在这里</a>
          </Navbar.Brand>
          <Navbar.Toggle />
      </Navbar.Header>

      <Navbar.Collapse>
          <Navbar.Nav
              selectedkey={this.state.selectedkey}
              onSelect={this.handleSelect}>
              <Navbar.NavItem eventKey={1}>选项</Navbar.NavItem>
              <Navbar.NavItem href="#" eventKey={2}>
                  选项
              </Navbar.NavItem>
          </Navbar.Nav>
          
          <Navbar.Form pullRight>
              <FormControl type="text" placeholder="Search"/>
          </Navbar.Form>
      </Navbar.Collapse>
  </Navbar>
    );
  }
}

export default Header;
