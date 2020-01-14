import * as React from 'react';
import {Panel,Tabs,Timeline, Loading,Row, Col,Form,Breadcrumb } from 'tinper-bee';
import moment from 'moment'

import {IPageDetailProps, IPageDetailState} from '../../../services/Model/Models';

import FlowPanel from '../../../components/WorkFlow';
import SysService from '../../../services/SysService';

moment.locale('zh-cn');

interface IOtherProps {
    
} 

interface IOtherState {
    procId:string
}

type IPageProps = IOtherProps & IPageDetailProps;
type IPageState = IOtherState & IPageDetailState;

 class FlowPage extends React.Component<IPageProps,IPageState> {

    id:string=''
    
    state:IPageState={
        isLoading:false,
        record:[],
        procId:''
    }

    isPage=()=>{

        return this.props.match&&this.props.history;
    }
    componentDidMount() {
        if(this.isPage()){

            this.id=this.props.match.params.id;
        }else{
            //in dailog
            const m1=new RegExp('/sys/flow/:id'.replace(':id','\w?'));
            this.id=this.props.url.replace(m1,'');
        }

        if(this.id!=null&&this.id!='0'){

            this.setState({procId:this.id});
            this.loadData(this.id);
        }
    }
    
loadData=async (id)=>{

    const  data=await SysService.getFlowInfoBy(id);
      
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
        const { getFieldProps, getFieldError } = this.props.form;

        const dateRang=(dateStr1:string,dateStr2:string):string=>{

            const date1=moment(dateStr1);
            const date2=moment(dateStr2);
            const date3=date2.diff(date1,'minute');

            if(date3<60) return date3+'分钟';

            const h=Math.floor(date3/60);//相差的小时数

            if(h<24) return h+'小时';

            const d=Math.floor(date3/(60*24));//相差的小时数
            
            return d+'天';
        };

        return ( <Panel>
            <Loading container={this} show={this.state.isLoading}/>
              {
                  this.isPage()?<Breadcrumb>
                  <Breadcrumb.Item href="#">
                    工作台
                  </Breadcrumb.Item>
                  <Breadcrumb.Item href="#">
                    系统管理
                  </Breadcrumb.Item>
                  <Breadcrumb.Item href="#">
                    工作流
                  </Breadcrumb.Item> 
                  <Breadcrumb.Item active>
                    查看
                  </Breadcrumb.Item>
                  <a style={{float:'right'}}  className='btn-link' onClick={this.goBack.bind(this,0)} >返回</a>
              </Breadcrumb>:null
              }
           
            <Row>
                <Col md="12">

                <Tabs
                        defaultActiveKey="1">
                    <Tabs.TabPane tab='处理过程' key="1">
                    <Loading show={this.state.isLoading} container={this} /> 
            {this.props.children} 
            <Timeline>
                {
                    this.state.record.filter((m,i)=>m.activityType=='userTask').map((item,index)=>{

                       return (<Timeline.Item >
                         <p>
                            <ul>
                                <li>时间：{item.time} {item.activityName}</li>
                                <li>操作者:{item.assignee}</li>
                                <li>耗时:{dateRang(item.startTime, item.endTime)}</li>
                            </ul>
                         </p>   
                        </Timeline.Item>)
                    })
                }
            </Timeline>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab='图示' key="2">
                        <FlowPanel procId={this.state.procId} />
                    </Tabs.TabPane>
                </Tabs>
                    
                </Col>
            </Row>
               

        </Panel >)
    }
}

export default Form.createForm()(FlowPage);