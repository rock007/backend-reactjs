import * as React from 'react';
import {Panel, Table,Loading,Tag,Label} from 'tinper-bee';
import ManService from '../../services/ManService';
import BussService from '../../services/BussService';
import { PageModel } from '../../services/Model/Models';
import { convertWarnTypeText, convertBussModifyTypeText } from '../../utils/tools';
import { isArray } from 'util';

interface ISceneProps {
    
}
interface ISceneState {
    warnsPage:PageModel<any>,//待操作的通知函
    manModifyPage:PageModel<any>,//档案信息修改
    planNiaojianTodo:PageModel<any>,//待尿检
    planNiaojianOver:PageModel<any>,//已过期尿检

    isLoading:boolean
}

export default class WellcomeScene extends React.Component<ISceneProps,ISceneState> {
    
    pageIndex=1
    pageSize=5
    orderBy=[]

    state:ISceneState={
        planNiaojianTodo:new PageModel<any>(),
        planNiaojianOver:new PageModel<any>(),
        warnsPage:new PageModel<any>(),
        manModifyPage:new PageModel<any>(),
        isLoading:false
    }

    componentDidMount() {
        this.loadData();
    }

    loadData=async ()=>{

        this.setState({isLoading:true});

        let page1 = await BussService.searchWarn({state:1}, this.pageIndex,this.pageSize) as PageModel<any>;
        let page2 = await ManService.searchBussModify({status:0}, this.pageIndex,this.pageSize) as PageModel<any>;

        let page3 = await ManService.searchNiaojianPlan({status:1}, this.pageIndex,this.pageSize) as PageModel<any>;
        let page4 = await ManService.searchNiaojianPlan({status:3}, this.pageIndex,this.pageSize) as PageModel<any>;

        this.setState({warnsPage:page1,manModifyPage:page2,planNiaojianTodo:page3,planNiaojianOver:page4,isLoading:false});

    }

    render() {
        const columns = [
            { title: '姓名', dataIndex: 'realName', key: 'realName',textAlign:'center', width: 100 },
            { title: '性别', dataIndex: 'sex', key: 'sex', textAlign:'center',width: 80 },
            { title: '联系方式', dataIndex: 'linkPhone', key: 'linkPhone',textAlign:'center', width: 120 },
            { title: '时间区间', dataIndex: 'startDate', key: 'startDate', textAlign:'center',width: 180,render(text,record,index) {

                return text+'~'+record.endDate;
            }},
            { title: '第几年', dataIndex: 'year', key: 'year', textAlign:'center',width: 80 }
          ];

          const modifyColumns =[
            { title: '姓名', dataIndex: 'realName', key: 'realName',textAlign:'center', width: 150 },
            { title: '性别', dataIndex: 'sex', key: 'sex',textAlign:'center', width: 100 },

            { title: '类型', dataIndex: 'modifyType', key: 'modifyType',textAlign:'center', width: 100 ,
                render(text, record, index){
                    return convertBussModifyTypeText(text);
            }},
            { title: '原值', dataIndex: 'oldText', key: 'oldText', textAlign:'center',width: 200 },
            { title: '修改为', dataIndex: 'newText', key: 'newText',textAlign:'center', width: 150 },
            { title: '操作人', dataIndex: 'createUser', key: 'createUser',textAlign:'center', width: 150 },
            { title: '创建时间', dataIndex: 'createDate', key: 'createDate',textAlign:'center', width: 200 }
          ];

          const warnColumns = [
            { title: '姓名', dataIndex: 'manName', key: 'manName',textAlign:'center', width: 150 },
            { title: '性别', dataIndex: 'sex', key: 'sex',textAlign:'center', width: 100 },

            { title: '类型', dataIndex: 'warnType', key: 'warnType',textAlign:'center', width: 100 ,
                render(text,record,index) {

                return convertWarnTypeText(text);
              }},
            { title: '内容', dataIndex: 'content', key: 'content', textAlign:'center',width: 200 },
            { title: '节点', dataIndex: 'tasks', key: 'tasks',textAlign:'center', width: 150,render(text,record,index) {
                  
                if(isArray(text)&&text.length>0){
                    
                    return <Tag colors="info">{text[text.length-1].activityName}</Tag>
                }
                return <Tag colors="info">{text}</Tag>

            } },
            { title: '社工', dataIndex: 'linkName', key: 'linkName',textAlign:'center', width: 150 },
            { title: '民警', dataIndex: 'mjName', key: 'mjName',textAlign:'center', width: 150 },
            { title: '创建时间', dataIndex: 'createDate', key: 'createDate',textAlign:'center', width: 200 }
          ];
        
        return ( <div>
            <h3>欢迎使用系统</h3>
            <Loading container={this} show={this.state.isLoading}/>
            <div style={{display:'flex'}}>
                <Panel header={"戒毒人员修改审批,共计"+this.state.manModifyPage.dataCount+"条"}>
                    <Table
                        columns={modifyColumns}
                        data={this.state.manModifyPage.data}
                        showRowNum={false}
                    />
                </Panel>
            </div>
            <div>
                <Panel header={"正在执行通知函,共计"+this.state.warnsPage.dataCount+"条"}>
                    <Table
                        columns={warnColumns}
                        data={this.state.warnsPage.data}
                        showRowNum={false}
                    />
                </Panel>
            </div>
            <div>
                <Panel header={"待尿检人员"+this.state.planNiaojianTodo.dataCount+"条"}>
                    <Table
                        columns={columns}
                        data={this.state.planNiaojianTodo.data}
                        showRowNum={true}
                    />
                </Panel>
                <Panel header={"尿检已过期"+this.state.planNiaojianOver.dataCount+"条"}>
                    <Table
                        columns={columns}
                        data={this.state.planNiaojianOver.data}
                        showRowNum={true}
                    />
                </Panel>

            </div>
        </div>)
    }
}
/** 
<Panel header="待走访人员">
<Table
    columns={columns}
    data={data}
    showRowNum={true}
/>
</Panel>
***/