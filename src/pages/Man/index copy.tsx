import * as React from 'react';


import {Tree , PageLayout,Navbar,Icon ,SearchPanel, FormControl,Row, Col,Label,Form,Radio,Menu  } from 'tinper-bee';
import Grid from "bee-complex-grid";
import 'bee-complex-grid/build/Grid.css';

import './index.scss';

let HeadContainer = SearchPanel.HeadContainer;
let AdvancedContainer = SearchPanel.AdvancedContainer;

const FormItem = Form.FormItem;

interface IPageProps {
    form:any
}
interface IPageState {
    expanded:boolean,
    current:any,
    menus: any[],
    selectedkey:any
}
export  class Man extends React.Component<IPageProps,IPageState> {

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

    getSelectedDataFunc = data => {
        console.log("data", data);
      };
    
      selectedRow = (record, index) => {};
      /**
       * 请求页面数据
       */
      freshata=()=>{
    
      }
     
      onDataNumSelect=()=>{
        console.log('选择每页多少条的回调函数');
      }
    export = ()=>{
        console.log('export=======');
    }
    /**
     *批量修改操作
     */
    dispatchUpdate = ()=>{
      console.log('--dispatch---update')
    }
    /**
     *批量删除
     */
    dispatchDel = ()=>{
      console.log('--dispatch---del')
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

          const toolBtns = [{
            value:'新增',
            
            bordered:false,
            colors:'primary'
        },{
            value:'导出',
            iconType:'uf-search',
            onClick:this.export
        },{
            value:'上传',
            iconType:'uf-cloud-up',
        },{
            value:'批量操作',
            //onClick:this.dispatchOpt,
            children:[
                {
                    value:'修改',  
                    onClick:this.dispatchUpdate
                },{
                    value:'删除',  
                    onClick:this.dispatchDel
                }
            ]
        },{
            iconType:'uf-copy',
        }];

        let paginationObj = {
            items:10,//一页显示多少条
            total:100,//总共多少条、
            freshData:this.freshata,//点击下一页刷新的数据
            onDataNumSelect:this.onDataNumSelect, //每页大小改变触发的事件
            showJump:false,
            noBorder:true
          }
          
        return (

                <PageLayout>
                    <Content>
                        <LeftContent md="3">
                        <Tree className="myCls" showLine checkable

					checkStrictly
					showIcon
					cancelUnSelect={true}
					
	      >
	        <Tree.TreeNode title="parent 1" key="0-0"  icon={<Icon type="uf-treefolder"  />}>
	          <Tree.TreeNode title="parent 1-0" key="0-0-0" disabled  icon={<Icon type="uf-treefolder" />}>
	            <Tree.TreeNode title="leaf" key="0-0-0-0" disableCheckbox icon={<Icon type="uf-list-s-o" />}/>
	            <Tree.TreeNode title="leaf" key="0-0-0-1" icon={<Icon type="uf-list-s-o" />}/>
	          </Tree.TreeNode>
	          <Tree.TreeNode title="parent 1-1" key="0-0-1" icon={<Icon type="uf-treefolder" />}>
	            <Tree.TreeNode title={<span>sss</span>} key="0-0-1-0" icon={<Icon type="uf-list-s-o" />}/>
	          </Tree.TreeNode>
	        </Tree.TreeNode>
	      </Tree>
                        </LeftContent>
                        <RightContent md="9">
                        
                            <Row>
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

                        <Form>
                        <Form.FormItem>
                <Label>用户名</Label>
                <FormControl placeholder="请输入用户名"
                    {...getFieldProps('username', {
                        validateTrigger: 'onBlur',
                        rules: [{
                            required: true, message: <span><Icon type="uf-exc-t"></Icon><span>请输入用户名</span></span>,
                        }],
                    }) }
                />
            </Form.FormItem>

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
                               

                                <Col  md={3} >
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
                           
                        </Form>
                    
                </HeadContainer>
                
                <AdvancedContainer>
                    <div className='demo-body'>
                        <Form>
                            <Row>

                                <Col  md={3} >
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

                                <Col  md={3} >
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

                                <Col  md={3} >
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


                                <Col  md={3} >
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

                                <Col  md={3} >
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

                                <Col  md={3} >
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
            </Row>
                         
                            <TableContent>
                            <Grid.GridToolBar toolBtns={toolBtns} btnSize='sm' />
        <Grid
          columns={columns}
          data={data}
          getSelectedDataFunc={this.getSelectedDataFunc}
          paginationObj={paginationObj}
        />
                            </TableContent>
                        </RightContent>
                    </Content>
                </PageLayout>
           
        )
    }
}

export default Form.createForm()(Man);