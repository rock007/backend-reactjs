import * as React from 'react';
import {Panel,Loading } from 'tinper-bee';

import 'bee-calendar/build/Calendar.css';

import ManService from '../../services/ManService';
import {PageModel,IPageCommProps,IListPageState,PopPageModel} from '../../services/Model/Models';
import UploadFile from '../UploadFile';
import { convertFiles } from '../../utils/tools';

interface IOtherProps {
  manId:string,
	processId?:string
} 

interface IOtherState {
  data:any,
  isLoading:boolean
}

type IPanelProps = IOtherProps ;
type IPanelState = IOtherState ;

//社区报到
export default class ManRegistPanel extends React.Component<IPanelProps,IPanelState> {
    
    state:IPanelState={
      data:{},
      isLoading:false
    }
    componentDidMount() {

      if(this.props.processId!=null&&this.props.processId!==''){

        this.loadData(this.props.processId);
      }
      
    }
    componentWillReceiveProps(nextProps:IPanelProps) {
      
      if (nextProps.processId !== this.props.processId) {
       
        if(nextProps.processId!=null&&nextProps.processId!=''){
          this.loadData(nextProps.processId);
        }
      }
    }

    loadData=async (id)=>{
      
      this.setState({isLoading:true});
      let data = await ManService.getProcessFiles(id) ;
      this.setState({data:data,isLoading:false});
    }
  
    render() {
        
        return (<div>
             <Loading container={this} show={this.state.isLoading}/>
			<table >
<tr>
<td style={{width:"20%"}}>类型</td>
<td style={{width:"80%"}}>附件</td>
</tr>
<tr>
<td>报到时间</td>
<td>
    <strong>2019-10-12</strong>		 
</td>
</tr>
<tr>
<td>社区戒毒协议书</td>
<td>
      <UploadFile disabled={true} defaultFileList={convertFiles(this.state.data.fileIds0)}/>
</td>
</tr>
<tr>
<td>
	担保书
</td>
<td>
    <UploadFile  disabled={true}   defaultFileList={convertFiles(this.state.data.fileIds1)}/>
</td>
</tr>
<tr>
	<td>社区康复决定书</td>
	<td>
      <UploadFile   disabled={true}  defaultFileList={convertFiles(this.state.data.fileIds2)}/>
	</td>
</tr>
<tr>
	<td>人员分类审批表</td>
	<td>
    <UploadFile  disabled={true}  defaultFileList={convertFiles(this.state.data.fileIds3)}/>
	</td>
</tr>
</table>
            </div>);
    }
}
