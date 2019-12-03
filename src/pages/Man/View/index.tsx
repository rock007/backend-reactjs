import * as React from 'react';
import {Panel, Tabs,Button,Icon,Label,Row, Col,Breadcrumb } from 'tinper-bee';

import './index.scss';
import ManInfoBussPanel from '../../../components/Buss/ManInfoPanel';
import ProcessInfoBussPanel from '../../../components/Buss/ProcessInfoPanel';
import PopDialog from '../../../components/Pop';
import TimelinePanel from '../../../components/Buss/TimelinePanel';
import {PageModel,IPageDetailProps,IPageDetailState,PopPageModel} from '../../../services/Model/Models';
import ManService from '../../../services/ManService';
import PageDlog from '../../../components/PageDlg';

interface IOtherProps {
    
} 

interface IOtherState {
	isShowProcessPop:boolean,
	isPopPage:boolean,
    pageModel: PopPageModel,
}

type IPageProps = IOtherProps & IPageDetailProps;
type IPageState = IOtherState & IPageDetailState;

class ManView extends React.Component<IPageProps,IPageState> {
	
	id:string='';

    state:IPageState={
		isLoading:false,
		record:{},
		isShowProcessPop:false,
		    
        isPopPage:false,
        pageModel:new PopPageModel(),
    }

	isPage=()=>{

        return this.props.match&&this.props.history;
    }
    componentDidMount() {
		if(this.isPage()){

            this.id=this.props.match.params.id;
        }else{
            //in dailog
            const m1=new RegExp('/man-view/:id'.replace(':id','\w?'));
            this.id=this.props.url.replace(m1,'');
        }

        if(this.id!='0'){

            this.loadData(this.id);
        }
	}
	
	loadData=async (id)=>{

        this.setState({isLoading:true});
        let result = await ManService.findManById(id);

        this.setState({record:result,isLoading:false});
    }

    goBack=()=>{
        if(this.isPage()){
            this.props.history.goBack();
        }else{
            this.props.handlerBack();
        }
    }
	go2Page=(url,title:string='查看',isPage:boolean=true,size:'sm'|'lg'|"xlg"='lg')=>{
        
        if(isPage){
            this.props.history.push(url);
        }else{
            const model=new PopPageModel(title,url);

            model.size=size;

            this.setState({isPopPage:true,pageModel:model});
        }
	}
	
	//查看社戒详细
	go2ProcessDetail=(processId)=>{
		this.go2Page('/process-view/'+processId,'社戒执行情况',false);
	}
	//查看全部业务
	go2BussDetail=(manId)=>{
		this.go2Page('/man-buss/'+manId,'戒毒人员所有业务',false);
	}
    render() {
        
        return ( <Panel>
			{
				this.isPage()?<Breadcrumb>
			    <Breadcrumb.Item href="#">
			      工作台
			    </Breadcrumb.Item>
                <Breadcrumb.Item href="#">
                  档案库
			    </Breadcrumb.Item>
			    <Breadcrumb.Item active>
                   详细
			    </Breadcrumb.Item>
                <a style={{float:'right'}}  className='btn-link' onClick={()=>this.goBack()} >返回</a>
			</Breadcrumb>
			:null}

            <Row>
            <Col md={5} style={{paddingLeft:'15px'}}>
                <ManInfoBussPanel />
            </Col>
            <Col md={7} style={{paddingLeft:'20px'}}>
                <Tabs defaultActiveKey="1">
                    <Tabs.TabPane tab='概览' key="1">
                    当前状态：进行中 
                    <div className="form-view">
                    <table>
			<tbody><tr>
				<th colSpan={4} style={{textAlign:"left"}}>
                    <a  className='btn-link' onClick={()=>{this.go2ProcessDetail('0001')}}>第一次</a>
				</th>
			</tr>	
			<tr>
				<th>
					报到社区:
				</th>
				<td>
					清泉镇中心戒毒社区
				</td>
				<th>
					报到时间
				</th>
				<td>
					2018-07-11
				</td>
			</tr>
			<tr>
				<th>
					网格单元
				</th>
				<td>
					清泉镇
				</td>
				<th>
					网格员
				</th>
				<td>
					
				</td>
			</tr>
			<tr>
					
				<th>人员分类</th>
				<td>
					社区戒毒
				</td>
				<th>风险级别</th>
				<td>中风险</td>	
			</tr>
		</tbody>
		</table>

        <table>
			<tbody><tr>
				<th colSpan={4} style={{textAlign:"left"}}>
                <a   className='btn-link' onClick={()=>{this.setState({isShowProcessPop:true})}}>第二次</a>
				</th>
			</tr>	
			<tr>
				<th>
					报到社区:
				</th>
				<td>
					清泉镇中心戒毒社区
				</td>
				<th>
					报到时间
				</th>
				<td>
					2018-07-11
				</td>
			</tr>
			<tr>
				<th>
					网格单元
				</th>
				<td>
					清泉镇
				</td>
				<th>
					网格员
				</th>
				<td>
					
				</td>
			</tr>
			<tr>
					
				<th>人员分类</th>
				<td>
					社区戒毒
				</td>
				<th>风险级别</th>
				<td>中风险</td>	
			</tr>
		</tbody></table>

        <table>
			<tbody><tr>
				<th colSpan={4} style={{textAlign:"left"}}>
                    <a  className='btn-link' onClick={()=>{this.setState({isShowProcessPop:true})}}>第三次</a>
				</th>
			</tr>	
			<tr>
				<th>
					报到社区:
				</th>
				<td>
					清泉镇中心戒毒社区
				</td>
				<th>
					报到时间
				</th>
				<td>
					2018-07-11
				</td>
			</tr>
			<tr>
				<th>
					网格单元
				</th>
				<td>
					清泉镇
				</td>
				<th>
					网格员
				</th>
				<td>
					
				</td>
			</tr>
			<tr>
					
				<th>人员分类</th>
				<td>
					社区戒毒
				</td>
				<th>风险级别</th>
				<td>中风险</td>	
			</tr>
		</tbody></table>
		<Label className='btn-link'  onClick={()=>{this.go2BussDetail('0001')}}>查看全部业务</Label>
        </div>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab='操作日志' key="2">
                        <TimelinePanel></TimelinePanel>
                    </Tabs.TabPane>
                </Tabs>
            </Col>
            </Row>

            <PageDlog  isShow={this.state.isPopPage} model={this.state.pageModel}
                    onClose={()=>this.setState({isPopPage:false})} >
            </PageDlog>

        </Panel >)
    }
}

export default ManView;