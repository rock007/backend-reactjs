import * as React from 'react';
import {Tabs } from 'tinper-bee';
import Calendar from 'bee-calendar';
import 'bee-calendar/build/Calendar.css';

import zhCN from "rc-calendar/lib/locale/zh_CN";
import TableDemoPanel from './TableDemoPanel';

interface IPanelProps {
    param?:any
}
interface IPanelState {
	type:string
}

export default class ProcessInfoBussPanel extends React.Component<IPanelProps,IPanelState> {
    
    state:IPanelState={
		type:'date'
    }
    componentDidMount() {

	}
	onTypeChange(type) {
        this.setState({
            type,
        });
    }
    render() {
        
        return ( <Tabs defaultActiveKey="1">
		<Tabs.TabPane tab='社区报到' key="1">
		 
			<table >
<tr>
<td style={{width:"20%"}}>类型</td>
<td style={{width:"80%"}}>附件</td>
</tr>
<tr>
<td>社区戒毒协议书</td>
<td>
		   
			 <div id="file_182" className="qq-upload-button" style={{float:"left",marginTop:"8px",marginLeft:"10px"}}>	
				<img alt="" src="http://219.138.141.28:10005/jiedu2/upfiles//2019-08-21/b9d45b9ac1234e4f82aa51bcd5b767f8.jpg" style={{width:"77px",height:"77px"}}/>
			</div>	
		 
</td>
</tr>
<tr>
<td>
	担保书
</td>
<td>
		
			 <div id="file_183" className="qq-upload-button" style={{float:"left",marginTop:"8px",marginLeft:"10px"}}>	
				<img alt="" src="http://219.138.141.28:10005/jiedu2/upfiles//2019-08-21/762404c77ced4c7997365b6d04dc2cb6.jpg" style={{width:"77px",height:"77px"}}/>
			</div>	
					 
</td>

</tr>
<tr>
	<td>社区康复决定书</td>
	<td>
	 <div id="holder_2">
			
			 <div id="file_1375" className="qq-upload-button" style={{float:"left",marginTop:"8px",marginLeft:"10px"}}>	
				<img alt="" src="http://219.138.141.28:10005/jiedu2/upfiles//2019-10-12/992765e9e58444258b44fee9724645ca.jpg" style={{width:"77px",height:"77px"}} />
			</div>	
			   
	 </div>
					
	</td>
</tr>
<tr>
	<td>人员分类审批表</td>
	<td>
	 <div id="holder_2">
			   
	 </div>
					
	</td>
</tr>
</table>
		</Tabs.TabPane>
		<Tabs.TabPane tab='尿检记录' key="2">
			<span>第一年</span>
			<div style={{display:"flex",flexDirection:"row",flexWrap:"wrap"}}>
					<div className="block-view">
						<span>2019-01-01</span>
						<span>阴性</span>
					</div>
					<div className="block-view">
						<span>2019-01-01</span>
						<span>阴性</span>
					</div>
					<div className="block-view">
						<span>2019-01-01</span>
						<span>阴性</span>
					</div>
					<div className="block-view">
						<span>2019-01-01</span>
						<span>阴性</span>
					</div>
					<div className="block-view">
						<span>2019-01-01</span>
						<span>阴性</span>
					</div>
					<div className="block-view">
						<span>2019-01-01</span>
						<span>阴性</span>
					</div>
					<div className="block-view">
						<span>2019-01-01</span>
						<span>阴性</span>
					</div>
					<div className="block-view">
						<span>2019-01-01</span>
						<span>阴性</span>
					</div>
					<div className="block-view">
						<span>2019-01-01</span>
						<span>阴性</span>
					</div>
					<div className="block-view">
						<span>2019-01-01</span>
						<span>阴性</span>
					</div>
					<div className="block-view">
						<span>2019-01-01</span>
						<span>阴性</span>
					</div>
					<div className="block-view">
						<span>2019-01-01</span>
						<span>阴性</span>
					</div>
			</div>
			<span>第二年</span>
			<div style={{display:"flex",flexDirection:"row",flexWrap:"wrap"}}>
					<div className="block-view">
						<span>2019-01-01</span>
						<span>阴性</span>
					</div>
					<div className="block-view">
						<span>2019-01-01</span>
						<span>阴性</span>
					</div>
					<div className="block-view">
						<span>2019-01-01</span>
						<span>阴性</span>
					</div>
					<div className="block-view">
						<span>2019-01-01</span>
						<span>阴性</span>
					</div>
					<div className="block-view">
						<span>2019-01-01</span>
						<span>阴性</span>
					</div>
					<div className="block-view">
						<span>2019-01-01</span>
						<span>阴性</span>
					</div>
			</div>
			<span>第三年</span>
			<div style={{display:"flex",flexDirection:"row",flexWrap:"wrap"}}>
					<div className="block-view">
						<span>2019-01-01</span>
						<span>阴性</span>
					</div>
					<div className="block-view">
						<span>2019-01-01</span>
						<span>阴性</span>
					</div>
					<div className="block-view">
						<span>2019-01-01</span>
						<span>阴性</span>
					</div>
			</div>
			<span>随机尿检</span>
			<div style={{display:"flex",flexDirection:"row",flexWrap:"wrap"}}>
					<div className="block-view">
						<span>2019-01-01</span>
						<span>阴性</span>
					</div>
					<div className="block-view">
						<span>2019-01-01</span>
						<span>阴性</span>
					</div>
					<div className="block-view">
						<span>2019-01-01</span>
						<span>阴性</span>
					</div>
			</div>
		</Tabs.TabPane>
		<Tabs.TabPane tab='走访记录' key="3">
			<TableDemoPanel/>
		</Tabs.TabPane>
		<Tabs.TabPane tab='签到' key="4">
		<Calendar
	   style={{ margin: 10 }}
	   fullscreen={true}
	   locale={zhCN}
	   onSelect={()=>{}}
	   type={this.state.type}
	   onTypeChange={this.onTypeChange.bind(this)}
	   //dateCellContentRender={(v)=>{	return <span>{v.format('YYYY-MM-DD')}</span>}}

   />
		</Tabs.TabPane>
		<Tabs.TabPane tab='请假' key="5">
			<TableDemoPanel>
				<span>请假了</span>
			</TableDemoPanel>
		</Tabs.TabPane>
		<Tabs.TabPane tab='求助' key="6">
			<TableDemoPanel/>
		</Tabs.TabPane>
		<Tabs.TabPane tab='位置跟踪' key="7">
			<TableDemoPanel/>
		</Tabs.TabPane>
	</Tabs>)
    }
}
