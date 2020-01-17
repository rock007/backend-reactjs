import * as React from 'react';
import {Panel, Breadcrumb,Col,Label,Form,Row} from 'tinper-bee';

import ReportService from '../../../services/ReportService';
import {IPageDetailProps,IPageDetailState} from '../../../services/Model/Models';
import UploadFile from '../../../components/UploadFile';
import { convertFile } from '../../../utils/tools';

const FormItem = Form.FormItem;
interface IOtherProps {
    
} 

interface IOtherState {

}

type IPageProps = IOtherProps & IPageDetailProps;
type IPageState = IOtherState & IPageDetailState;

 class WorkerPage extends React.Component<IPageProps,IPageState> {

    id:string='';

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
            const m1=new RegExp('/manager/:id'.replace(':id','\w?'));
            this.id=this.props.url.replace(m1,'');
        }

        if(this.id!='0'){

            this.loadData(this.id);
        }
    }

    loadData=async (id)=>{

        this.setState({isLoading:true});
        let result = await ReportService.findWorkDescById(id);

        this.setState({record:result,isLoading:false});
    }
    goBack=()=>{
        if(this.isPage()){
            this.props.history.goBack();
        }else{
            this.props.handlerBack(0);
        }
    }

  render() {

        const me=this;
       
        return ( <Panel>

            {this.isPage()?(
              <Breadcrumb>
			        <Breadcrumb.Item href="#">
			            工作台
			        </Breadcrumb.Item>
                    <Breadcrumb.Item href="#">
                        社工管理
			        </Breadcrumb.Item>
                    <Breadcrumb.Item active>
                        查看
			        </Breadcrumb.Item>
                    <a style={{float:'right'}}  className='btn-link' onClick={this.goBack} >返回</a>
                </Breadcrumb>)
                :null
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
                        <strong>{this.state.record.postion}</strong>
                    </FormItem>
                </Form>
                </Col>
                <Col md="6">
                <ul>
                    <li>关联戒毒人员数量:<span>{this.state.record.ingNum||0}</span> </li>
                    <li>社区戒毒人员:<span>{this.state.record.manShejie||0}</span> </li>
                    <li>社区康复人员:<span>{this.state.record.manShejie||0}</span> </li>
                    <li>其它人员:<span>{this.state.record.manOther||0}</span></li>
                    <li>走访:<span>{this.state.record.vistorNum||0}</span></li>
                    <li>尿检:<span>{this.state.record.niaojian||0}</span></li>
                    <li>审核请假:<span>{this.state.record.dayoff||0}</span> </li>
                    <li>回复求助:<span>{this.state.record.helpNum||0}</span> </li>
                    <li>标记签到:<span>{this.state.record.checkin||0}</span> </li>
                    <li>见面（人次）:<span>{this.state.record.manShejie||0}</span> </li>
                </ul>
                </Col>   
                </Row> 

        </Panel >)
    }
}

export default WorkerPage;