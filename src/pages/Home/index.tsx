import * as React from 'react';
import { PageLayout } from 'tinper-bee';

import { SearchPanel, FormControl,Row, Col,Label,Form,Radio,Menu  } from 'tinper-bee';
import Grid from "bee-complex-grid";

let HeadContainer = SearchPanel.HeadContainer;
let AdvancedContainer = SearchPanel.AdvancedContainer;

const FormItem = Form.FormItem;

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

interface IPageProps {
    form:any
}
interface IPageState {
    expanded:boolean,
    current:any
}
export  class Home extends React.Component<IPageProps,IPageState> {

    state:IPageState={
        expanded:false,
        current:null
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

          
        return (
            <div className="demo2">
                <PageLayout>
                    <Header>
                        我是Header区域
                    </Header>
                    <Content>
                        <LeftContent>
                        <Menu onClick={this.handleClick} style={{ width: 240 }} defaultOpenKeys={['demo3sub1']} selectedKeys={[this.state.current]} mode="inline">
                <SubMenu key="sub1" title={<span><span>组织 1</span></span>}>
                    <MenuItemGroup title="组 1">
                        <Menu.Item key="1">选项 1</Menu.Item>
                        <Menu.Item key="2">选项 2</Menu.Item>
                    </MenuItemGroup>
                    <MenuItemGroup title="组 2">
                        <Menu.Item key="3">选项 3</Menu.Item>
                        <Menu.Item key="4">选项 4</Menu.Item>
                    </MenuItemGroup>
                    <SubMenu key="sub11" title={<span><span>组织 11</span></span>}>
                        <Menu.Item key="15">选项 15</Menu.Item>
                        <Menu.Item key="16">选项 16</Menu.Item>
                        <SubMenu key="sub111" title="子项">
                            <Menu.Item key="17">选项 17</Menu.Item>
                            <Menu.Item key="18">选项 18</Menu.Item>
                            <SubMenu key="sub1111" title={<span><span>组织 111</span></span>}>
                                <Menu.Item key="115">选项 115</Menu.Item>
                                <Menu.Item key="116">选项 116</Menu.Item>
                                <SubMenu key="demo3sub3" title="子项">
                                    <Menu.Item key="117">选项 117</Menu.Item>
                                    <Menu.Item key="118">选项 118</Menu.Item>
                                </SubMenu>
                            </SubMenu>
                        </SubMenu>
                    </SubMenu>
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
                        <RightContent>
                            <SearchArea>
                                
                                <SearchPanel
                title='条件筛选'
                onSearch={this.search}
                onReset={this.clear}
                expanded={this.state.expanded}
                onChange={this.onChange}
                onPanelChangeStart={status => {
                    console.log(status, "start")
                }}
                onPanelChangeIng={status => {
                    console.log(status, "ing")
                }}
                onPanelChangeEnd={status => {
                    console.log(status, "end")
                }}>
                <HeadContainer>
                    <div className='demo-head'>
                        <Form>
                            <Row>
                                <Col xs={12} sm={6} md={4} lg={3}>
                                    <FormItem>
                                            <Label>名 称</Label>
                                            <FormControl size="sm"
                                                {
                                                ...getFieldProps('name', {
                                                    initialValue: '',
                                                })
                                                }
                                            />
                                    </FormItem>
                                </Col>

                                <Col xs={12} sm={6} md={4}  lg={3}>
                                    <FormItem>
                                            <Label>电话</Label>
                                            <FormControl size="sm"
                                                {
                                                ...getFieldProps('phone', {
                                                    initialValue: '',
                                                })
                                                }
                                            />
                                    </FormItem>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </HeadContainer>
                
                <AdvancedContainer>
                    <div className='demo-body'>
                        <Form>
                            <Row>

                                <Col xs={12} sm={6} md={4} lg={3}>
                                    <FormItem>
                                            <Label>联系人</Label>
                                            <FormControl size="sm"
                                                {
                                                ...getFieldProps('people', {
                                                    initialValue: '',
                                                })
                                                }
                                            />
                                    </FormItem>
                                </Col>

                                <Col xs={12} sm={6} md={4}  lg={3}>
                                    <FormItem>
                                            <Label>供应商</Label>
                                            <FormControl size="sm"
                                                {
                                                ...getFieldProps('supplier', {
                                                    initialValue: '',
                                                })
                                                }
                                            />
                                    </FormItem>
                                </Col> 

                                <Col xs={12} sm={6} md={4}  lg={3}>
                                    <FormItem>
                                            <Label>地址</Label>
                                            <FormControl size="sm"
                                                {
                                                ...getFieldProps('address', {
                                                    initialValue: '',
                                                })
                                                }
                                            />
                                    </FormItem>
                                </Col> 


                                <Col xs={12} sm={6} md={4}  lg={3}>
                                    <FormItem>
                                            <Label>车牌</Label>
                                            <FormControl size="sm"
                                                {
                                                ...getFieldProps('carNumber', {
                                                    initialValue: '',
                                                })
                                                }
                                            />
                                    </FormItem>
                                </Col>

                                <Col xs={12} sm={6} md={4}  lg={3}>
                                    <FormItem>
                                            <Label>备注</Label>
                                            <FormControl size="sm"
                                                {
                                                ...getFieldProps('remark', {
                                                    initialValue: '',
                                                })
                                                }
                                            />
                                    </FormItem>
                                </Col>

                                <Col xs={12} sm={6} md={4}  lg={3}>
                                    <FormItem>
                                            <Label>编号</Label>
                                            <FormControl size="sm"
                                                {
                                                ...getFieldProps('id', {
                                                    initialValue: '',
                                                })
                                                }
                                            />
                                    </FormItem>
                                </Col>

                            </Row>
                        </Form>
                    </div>                 
                </AdvancedContainer>
            </SearchPanel>

                            </SearchArea>
                            <TableContent>
                            <Grid
            columns={columns}
            data={data}
          />
                            </TableContent>
                        </RightContent>
                    </Content>
                </PageLayout>
            </div>
        )
    }
}

export default Form.createForm()(Home);