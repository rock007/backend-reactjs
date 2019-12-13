import * as React from 'react';

import 'ac-multi-tabs/dist/index.css';

import { Panel,Loading ,Breadcrumb,SearchPanel, FormControl,Row, Col,Label,Form,Radio,Menu  } from 'tinper-bee';
import { IPageDetailProps, IPageDetailState } from '../../../services/Model/Models';
import SysService from '../../../services/SysService';

const FormItem = Form.FormItem;


interface IOtherProps {
    
} 

interface IOtherState {

}

type IPageProps = IOtherProps & IPageDetailProps;
type IPageState = IOtherState & IPageDetailState;

export  class MyProfile extends React.Component<IPageProps,IPageState> {

    id:string=''
    
    state:IPageState={
        isLoading:false,
        record:{},
    }

    isPage=()=>{

        return this.props.match&&this.props.history;
    }
    componentDidMount() {
        if(this.isPage()){

            this.id=this.props.match.params.id;
        }else{
            //in dailog
            const m1=new RegExp('/my-profile/:id'.replace(':id','\w?'));
            this.id=this.props.url.replace(m1,'');
        }

        if(this.id!=null&&this.id!='0'){

            this.loadData(this.id);
        }
    }
    loadData=async (id)=>{

        const  data=await SysService.getRoleById(id);
      
        this.setState({record:data,isLoading:false});
    }
    goBack=()=>{
        if(this.isPage()){
            this.props.history.goBack();
        }else{
            this.props.handlerBack();
        }
    }
    render() {

        return (  <Panel>
            <Loading container={this} show={this.state.isLoading}/>
              {
                  this.isPage()?<Breadcrumb>
                  <Breadcrumb.Item href="#">
                    工作台
                  </Breadcrumb.Item>
                  <Breadcrumb.Item active>
                    个人信息
                  </Breadcrumb.Item>
                  <a style={{float:'right'}}  className='btn-link' onClick={this.goBack} >返回</a>
              </Breadcrumb>:null
              }
               <Row>
                <Col md="6">
                <Form className='edit_form_pop'>
                    <FormItem>
                        <Label>用户名</Label>
                        <strong>444444</strong>
                    </FormItem>
                    <FormItem>
                        <Label>姓名</Label>
                        <strong>444444</strong>
                    </FormItem>
                    <FormItem>
                        <Label>性别</Label>
                        <strong>444444</strong>
                    </FormItem>
                    <FormItem>
                        <Label>手机号</Label>
                        <strong>444444</strong>
                    </FormItem>
                    <FormItem>
                        <Label>组织部门</Label>
                        <strong>444444</strong>
                    </FormItem>
                    <FormItem>
                        <Label>角色</Label>
                        <strong>444444</strong>
                    </FormItem>
                    <FormItem>
                        <Label>状态</Label>
                        <strong>444444</strong>
                    </FormItem>

                </Form>
                </Col>
                <Col md="6">333333333</Col>   
                </Row> 
            </Panel>)
    }
}

export default MyProfile;