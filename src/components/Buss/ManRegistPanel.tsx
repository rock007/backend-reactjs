import * as React from 'react';
import {Panel,Tag} from 'tinper-bee';

import Calendar from 'bee-calendar';
import 'bee-calendar/build/Calendar.css';
import zhCN from "rc-calendar/lib/locale/zh_CN";

import ManService from '../../services/ManService';
import {PageModel,IPageCommProps,IListPageState,PopPageModel} from '../../services/Model/Models';

interface IOtherProps {
    
} 

interface IOtherState {
  page:PageModel<any>,
  isLoading:boolean,
  type:string
}

type IPanelProps = IOtherProps ;
type IPanelState = IOtherState ;


export default class ManRegistPanel extends React.Component<IPanelProps,IPanelState> {
    
    pageIndex=1
    pageSize=10

    state:IPanelState={
      page:new PageModel<any>(),
      isLoading:false,
      type:'date'
    }
    componentDidMount() {

      this.loadData({});
    }
    loadData=async (args:any)=>{
        
      let page = await ManService.searchDayoff(args,this.pageIndex,this.pageSize) as PageModel<any>;
      this.setState({page:page,isLoading:false});
    }
  
    render() {
        
        return (<div>
             
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
            </div>);
    }
}
