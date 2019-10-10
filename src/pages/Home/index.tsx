import * as React from 'react';

import AcMultiTabs from 'ac-multi-tabs';
import 'ac-multi-tabs/dist/index.css';

import { PageLayout,Navbar ,SearchPanel, FormControl,Row, Col,Label,Form,Radio,Menu  } from 'tinper-bee';
import Grid from "bee-complex-grid";

import './index.scss';

let HeadContainer = SearchPanel.HeadContainer;
let AdvancedContainer = SearchPanel.AdvancedContainer;

const FormItem = Form.FormItem;

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const NavItem = Navbar.NavItem;
const Header = Navbar.Header;
const Brand = Navbar.Brand;
const Collapse = Navbar.Collapse;
const Toggle = Navbar.Toggle;
const Nav = Navbar.Nav;

interface IPageProps {
    form:any
}
interface IPageState {
    expanded:boolean,
    current:any,
    menus: any[],
    selectedkey:any
}
export  class Home extends React.Component<IPageProps,IPageState> {

    state:IPageState={
        expanded:false,
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
    componentDidMount() {

    }

    search=()=>{
        this.props.form.validateFields((err, values) => {
            if (err) {
                console.log(err);
            } else {
                console.log('提交成功', values)
            }
        });
    }
    clear=()=>{
        this.props.form.resetFields()
    }
    onChange = () => {
        this.setState({expanded: !this.state.expanded})
    }

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

    onToggle = (value) => {
        this.setState({expanded: value});
    }

    handleSelect = (index) => {
        this.setState({selectedkey: index});
    }

    render() {
        const Header = PageLayout.Header;
        const SearchArea = PageLayout.SearchArea;
        const Content = PageLayout.Content;
        const TableContent = PageLayout.TableContent;
        const LeftContent = PageLayout.LeftContent;
        const RightContent = PageLayout.RightContent;

        const { getFieldProps, getFieldError } = this.props.form;

        const columns = [
            { title: '用户名', dataIndex: 'a', key: 'a', width: 100 },
            { id: '123', title: '性别', dataIndex: 'b', key: 'b', width: 100 },
            { title: '年龄', dataIndex: 'c', key: 'c', width: 200 },
            {
              title: '操作', dataIndex: '', key: 'd', render() {
                return <a href="#">一些操作</a>;
              },
            },
          ];
          
          const data = [
            { a: '令狐冲', b: '男', c: 41, key: '1' },
            { a: '杨过', b: '男', c: 67, key: '2' },
            { a: '郭靖', b: '男', c: 25, key: '3' },
          ];

          const { menus } = this.state;

        return (
            <div className="main">
                <div className="header-container">
                    <Navbar
                    
                    expanded={this.state.expanded}
                    onToggle={this.onToggle}>
                    <Header>
                        <Brand>
                            <a href="#">标题在这里</a>
                        </Brand>
                        <Toggle />
                    </Header>

                    <Collapse>
                        <Nav
                            selectedkey={this.state.selectedkey}
                            onSelect={this.handleSelect}>
                            <NavItem eventKey={1}>选项</NavItem>
                            <NavItem href="#" eventKey={2}>
                                选项
                            </NavItem>
                        </Nav>
                        
                        <Navbar.Form pullRight>
                            <FormControl type="text" placeholder="Search"/>
                        </Navbar.Form>
                    </Collapse>
                </Navbar>
                </div>
                <PageLayout>
                    <Content>
                        <LeftContent md="3">
                        <Menu onClick={this.handleClick}  defaultOpenKeys={['sub1']} selectedKeys={[this.state.current]} mode="inline">
                <SubMenu key="sub1" title={<span><span>档案管理</span></span>}>
                    <Menu.Item key="1">人员档案</Menu.Item>
                    <Menu.Item key="2">执行管理</Menu.Item>
                    <Menu.Item key="3">异常人员管理</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" title={<span><span>组织 2</span></span>}>
                    <Menu.Item key="5">选项 5</Menu.Item>
                    <Menu.Item key="6">选项 6</Menu.Item>
                    <SubMenu key="demo3sub3" title="子项">
                        <Menu.Item key="7">选项 7</Menu.Item>
                        <Menu.Item key="8">选项 8</Menu.Item>
                    </SubMenu>
                </SubMenu>
                <SubMenu key="sub3" title={<span><span>组织 3</span></span>}>
                    <Menu.Item key="9">选项 9</Menu.Item>
                    <Menu.Item key="10">选项 10</Menu.Item>
                    <Menu.Item key="11">选项 11</Menu.Item>
                    <Menu.Item key="12">选项 12</Menu.Item>
                </SubMenu>
            </Menu>
                        </LeftContent>
                        <RightContent md="9">

                            <TableContent>
            5555
                            </TableContent>
                        </RightContent>
                    </Content>
                </PageLayout>
            </div>
        )
    }
}

export default Form.createForm()(Home);