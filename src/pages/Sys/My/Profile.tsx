import * as React from 'react';

import 'ac-multi-tabs/dist/index.css';

import { Panel,Loading ,Breadcrumb,SearchPanel, FormControl,Row, Col,Label,Form,Radio,Menu  } from 'tinper-bee';
import { IPageDetailProps, IPageDetailState } from '../../../services/Model/Models';
import SysService from '../../../services/SysService';
import AppConsts from '../../../lib/appconst';
import UploadFile from '../../../components/UploadFile';
import { convertFile } from '../../../utils/tools';

const FormItem = Form.FormItem;


interface IOtherProps {
    
} 

interface IOtherState {

}

type IPageProps = IOtherProps & IPageDetailProps;
type IPageState = IOtherState & IPageDetailState;

export  class MyProfile extends React.Component<IPageProps,IPageState> {

    state:IPageState={
        isLoading:false,
        record:{},
    }

    isPage=()=>{

        return this.props.match&&this.props.history;
    }
    componentDidMount() {

        this.loadData();
        
    }
    loadData=async ()=>{

        const  data=await SysService.getAccountById(AppConsts.session.userId);
      
        this.setState({record:data,isLoading:false});
    }
    goBack=(flag:number=0)=>{
        if(this.isPage()){
            this.props.history.goBack();
        }else{
            this.props.handlerBack(flag);
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
                  <a style={{float:'right'}}  className='btn-link' onClick={()=>this.goBack} >返回</a>
              </Breadcrumb>:null
              }
               <Row>
                <Col md="6">
                <Form className='edit_form_pop'>
                    <FormItem style={{display:'flex'}}>
                        <Label>头像</Label>
                        <div style={{display:'inline-block',width:'auto'}}>
                            <UploadFile defaultFileList={ convertFile(this.state.record.avatar)}  disabled={true}/>
                        </div>
                    </FormItem>
                    <FormItem>
                        <Label>用户名</Label>
                        <strong>{this.state.record.userName}</strong>
                    </FormItem>
                    <FormItem>
                        <Label>姓名</Label>
                        <strong>{this.state.record.trueName}</strong>
                    </FormItem>
                    <FormItem>
                        <Label>性别</Label>
                        <strong>{this.state.record.sex==1?'男':this.state.record.sex==0?'女':this.state.record.sex}</strong>
                    </FormItem>
                    <FormItem>
                        <Label>手机号</Label>
                        <strong>{this.state.record.mobile}</strong>
                    </FormItem>
                    <FormItem>
                        <Label>组织部门</Label>
                        <strong>{this.state.record.orgName}</strong>
                    </FormItem>
                    <FormItem>
                        <Label>角色</Label>
                        <strong>{this.state.record.roles}</strong>
                    </FormItem>
                </Form>
                </Col>
                <Col md="6">
                <ul>
                    <li>关联戒毒人员数量:<span>120</span> 排行第12位</li>
                    <li>社区戒毒人员:<span>120</span> 排行第12位</li>
                    <li>社区康复人员:<span>120</span> 排行第12位</li>
                    <li>其它人员:<span>120</span> 排行第12位</li>
                    <li>走访:<span>120</span> 排行第12位</li>
                    <li>尿检:<span>120</span> 排行第12位</li>
                    <li>审核请假:<span>120</span> 排行第12位</li>
                    <li>回复求助:<span>120</span> 排行第12位</li>
                    <li>标记签到:<span>120</span> 排行第12位</li>
                    <li>见面（人次）:<span>120</span> 排行第12位</li>

                </ul>
                </Col>   
                </Row> 
            </Panel>)
    }
}

export default MyProfile;