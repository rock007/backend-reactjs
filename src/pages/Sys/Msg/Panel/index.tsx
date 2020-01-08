import React, { useState, useEffect } from 'react';

import { Panel,Label,Loading} from 'tinper-bee';

import './index.scss';
import SysService from '../../../../services/SysService';
import { PageModel } from '../../../../services/Model/Models';
import { Info } from '../../../../utils';
import { convertBussTypeText } from '../../../../utils/tools';

interface IPanelProps {
    unReadNum:number,
    go2page:(url:string)=>void,
}
interface IPanelState {
    records: Array<any>,
    isLoading:boolean,
    page:PageModel<any>,
}
export  class MsgPanel extends React.Component<IPanelProps,IPanelState> {

    state:IPanelState={
        records:[],
        isLoading:false,
        page:new PageModel()
    }
    componentDidMount() {
        this.loadData()
    }
    loadData= async ()=>{
        this.setState({isLoading:true});
        let page = await SysService.searchMessage({status:0},1,20) ;
        this.setState({page:page,isLoading:false});
    }

    handler_read=async (ids)=>{

        this.setState({isLoading:true});

        SysService.readMessage(ids).then(()=>{

            Info('已读操作成功');
            this.loadData();
        })
        .catch((err)=>{
            Error('已读操作失败');
        }).finally(()=>{
            this.setState({isLoading:false});
        });
    }
    handler_delete=async (ids)=>{

        this.setState({isLoading:true});

        SysService.deleteMessage(ids).then(()=>{

            Info('删除操作成功');
            this.loadData();
        })
        .catch((err)=>{
            Error('删除操作失败');
        }).finally(()=>{
            this.setState({isLoading:false});
        });
    }
  
    render() {

        return (  <div>
                    <Loading container={this} show={this.state.isLoading}/>
                    
                    {
                        this.state.page.data.map((item,index)=>{

                            return(<MsgItem item={item} onRead={this.handler_read} onDelete={this.handler_delete}></MsgItem>)
                        })
                    }
                    <Label className="link-go" onClick={()=>this.props.go2page('/my-message')}>查看全部</Label>
            </div>)
    }
}
export default MsgPanel;


function MsgItem(param){

    const {item,onRead,onDelete}=param;

    const [isShowAct, setIsShowAct] = useState(false);
/** 

  
    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
      // Update the document title using the browser API
     //!! document.title = `You clicked ${count} times`;
    });
  ***/
    const handler_mouseEnter=()=>{
        setIsShowAct(true);
    }
    const handler_mouseLeave=()=>{
        setIsShowAct(false);
    }

    return (
        <Panel header={item.createDate+','+convertBussTypeText(item.msgType) } onMouseEnter ={handler_mouseEnter}  onMouseLeave={handler_mouseLeave} >
                                {item.content}
                                {isShowAct?(<p >
                                    <Label className='link-go' onClick={onRead.bind(this,item.id)}>已读</Label>
                                    <Label className='link-go' onClick={onDelete.bind(this,item.id)}>删除</Label>
                                </p>):null}
                            </Panel>
    );
}