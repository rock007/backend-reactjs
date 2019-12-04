import * as React from 'react';
import {Label,Loading} from 'tinper-bee';

import { PopPageModel, PageModel } from '../../services/Model/Models';
import ManService from '../../services/ManService';
import { convertLevelText } from '../../utils/tools';

interface IPanelProps {
	manId:string,
	handler_goto:(url:string,title:string,isPage:boolean)=>void
}

interface IPanelState {
	isLoading:boolean,
	record:PageModel<any>
}

//戒毒人员的社戒列表
export default class ManProcessListPanel extends React.Component<IPanelProps,IPanelState> {
    
    state:IPanelState={
		isLoading:false,
		record:new PageModel<any>()
    }
	componentWillReceiveProps(nextProps:IPanelProps) {
       
        if (nextProps.manId !== this.props.manId) {

			if(nextProps.manId!=null&&nextProps.manId!=''){
				this.loadData(nextProps.manId);
			}
        }
    }
	
	loadData=async (id)=>{

        this.setState({isLoading:true});
        let result = await ManService.searchProces({manId:id});

        this.setState({record:result,isLoading:false});
	}
	
	//查看社戒详细
	go2ProcessDetail=(processId)=>{
		this.props.handler_goto('/process-view/'+processId,'社戒执行情况',false);
	}
	//查看全部业务
	go2BussDetail=(manId)=>{
		this.props.handler_goto('/man-buss/'+manId,'戒毒人员所有业务',false);
	}
    render() {
		
		const data= this.state.record.data;
		let statusText='';

		if(data.length>0){
			let one=data[0];

			if(one.status!=null){

				if(one.status==0){
					statusText='未报到';
				}else if(one.status==1){
					statusText='进行中';
				}else if(one.status==100){
					statusText='已完成';
				}
			}
		}

        return (  
			<div className="form-view">
				<Loading show={this.state.isLoading} container={this} /> 
				<strong>当前状态：{statusText}</strong> 
				{
					this.state.record.data.map((item,index)=>{

						return (
<table>
	<tbody>

		<tr>
		<th colSpan={4} style={{textAlign:"left"}}>
			<a  className='btn-link' onClick={()=>{this.go2ProcessDetail(item.processId)}}>第{index+1}次</a>
		</th>
	</tr>	
	<tr>
		<th>
			报到社区:
		</th>
		<td>
			{item.orgName}
		</td>
		<th>
			报到时间
		</th>
		<td>
			{item.regsitDate}
		</td>
	</tr>
	<tr>
		<th>
			网格单元
		</th>
		<td>
			{item.cellName}
		</td>
		<th>
			网格员
		</th>
		<th>
			{item.linkCellName}
		</th>
		<td>
			
		</td>
	</tr>
	<tr>
			
		<th>人员分类</th>
		<td>
			{item.cateTypeText}
		</td>
		<th>风险级别</th>
		<td>{convertLevelText(item.level)}</td>	
	</tr>
</tbody>
</table>
						)
					})
				}
<Label className='btn-link'  onClick={()=>{this.go2BussDetail('0001')}}>查看全部业务</Label>
</div>)
    }
}
