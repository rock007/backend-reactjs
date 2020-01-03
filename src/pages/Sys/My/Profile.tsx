import * as React from 'react';

import 'ac-multi-tabs/dist/index.css';

import { Panel,Loading ,Breadcrumb,Row, Col,Label,Form } from 'tinper-bee';
import { IPageDetailProps, IPageDetailState } from '../../../services/Model/Models';
import SysService from '../../../services/SysService';
import AppConsts from '../../../lib/appconst';
import UploadFile from '../../../components/UploadFile';
import { convertFile } from '../../../utils/tools';
import ReportService from '../../../services/ReportService';

const FormItem = Form.FormItem;


interface IOtherProps {
    
} 

interface IOtherState {
    report:any;
}

type IPageProps = IOtherProps & IPageDetailProps;
type IPageState = IOtherState & IPageDetailState;

export  class MyProfile extends React.Component<IPageProps,IPageState> {

    state:IPageState={
        isLoading:false,
        record:{},
        report:{}
    }

    isPage=()=>{

        return this.props.match&&this.props.history;
    }
    componentDidMount() {

        this.loadData();
        
    }
    loadData=async ()=>{

        const  data=await SysService.getAccountById(AppConsts.session.userId);

        let result ={};
 
        if(!(data.roles.indexOf('系统管理员')==-1||data.roles.indexOf('社区管理员')==-1)){
            result = await ReportService.findWorkDescById(AppConsts.session.userId);
        }

        this.setState({record:data,report:result,isLoading:false});
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
                    {this.state.report.userId?
                    <ul>
                        <li>关联戒毒人员数量:<span>{this.state.report.ingNum||0}</span> </li>
                        <li>社区戒毒人员:<span>{this.state.report.manShejie||0}</span> </li>
                        <li>社区康复人员:<span>{this.state.report.manShejie||0}</span> </li>
                        <li>其它人员:<span>{this.state.report.manOther||0}</span></li>
                        <li>走访:<span>{this.state.report.vistorNum||0}</span></li>
                        <li>尿检:<span>{this.state.report.niaojian||0}</span></li>
                        <li>审核请假:<span>{this.state.report.dayoff||0}</span> </li>
                        <li>回复求助:<span>{this.state.report.helpNum||0}</span> </li>
                        <li>标记签到:<span>{this.state.report.checkin||0}</span> </li>
                        <li>见面（人次）:<span>{this.state.report.manShejie||0}</span> </li>
                    </ul>:null
                    }
                
                </Col>   
                </Row> 
            </Panel>)
    }
}

export default MyProfile;