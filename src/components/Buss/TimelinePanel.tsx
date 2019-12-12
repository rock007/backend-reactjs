import * as React from 'react';
import moment from 'moment'

import {Icon, Timeline,Loading} from 'tinper-bee';

import ManService from '../../services/ManService';

interface IPanelProps {
   manId:string
}
interface IPanelState {
    isLoading:boolean,
    record:Array<any>,
}

moment.locale('zh-cn');
export default class TimelinePanel extends React.Component<IPanelProps,IPanelState> {
    
    state:IPanelState={
        isLoading:false,
        record:[]
    }
    componentDidMount() {
        
        if(this.props.manId!=null&&this.props.manId!=''){
            this.loadData(this.props.manId);
        }
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
        let result = await ManService.getManLog(id);

        if(result==null) result=[];
        
        this.setState({record:result,isLoading:false});
    }
    render() {
  
        return (<div>
            <Loading show={this.state.isLoading} container={this} /> 
            {this.props.children} 
            <Timeline>
                {
                    this.state.record.map((item,index)=>{

                       return (<Timeline.Item >
                             时间:{item.createDate}, {item.actType} :{item.content}
                        </Timeline.Item>)
                    })
                }
            </Timeline>
            {
                    this.state.record==null||this.state.record.length==0?<span>暂无数据</span>:null
                }
            </div>);
    }
}
