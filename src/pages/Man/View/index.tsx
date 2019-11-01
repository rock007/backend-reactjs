import * as React from 'react';
import {Panel, Tabs,Button,Icon,Select,Row, Col,Breadcrumb } from 'tinper-bee';

import './index.scss';
import ManInfoBussPanel from '../../../components/Buss/ManInfoPanel';
import ProcessInfoBussPanel from '../../../components/Buss/ProcessInfoPanel';
import PopDialog from '../../../components/Pop';
import TimelinePanel from '../../../components/Buss/TimelinePanel';

interface IPageProps {
    form:any,
    match:any;
	history: any
}
interface IPageState {
    isShowProcessPop:boolean,
    
}

class ManView extends React.Component<IPageProps,IPageState> {
    
    state:IPageState={
        isShowProcessPop:false,
    }

    componentDidMount() {

    }

    render() {
        
        return ( <Panel>
            <Breadcrumb>
			    <Breadcrumb.Item href="#">
			      工作台
			    </Breadcrumb.Item>
                <Breadcrumb.Item href="#">
                  档案库
			    </Breadcrumb.Item>
			    <Breadcrumb.Item active>
                   详细
			    </Breadcrumb.Item>
                <a style={{float:'right'}}  className='btn-link' onClick={()=>this.props.history.goBack()} >返回</a>
			</Breadcrumb>

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
                    <a  className='btn-link' onClick={()=>{this.setState({isShowProcessPop:true})}}>第一次</a>
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
        </div>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab='操作日志' key="2">
                        <TimelinePanel></TimelinePanel>
                    </Tabs.TabPane>
                </Tabs>
            </Col>
            </Row>
            <PopDialog title="社戒详情" size='xlg' show={this.state.isShowProcessPop} close={()=>this.setState({isShowProcessPop:false})}>
                <ProcessInfoBussPanel/>
            </PopDialog>
        </Panel >)
    }
}

export default ManView;