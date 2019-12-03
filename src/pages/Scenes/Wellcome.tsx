import * as React from 'react';
import {Panel, Table ,Navbar,Icon,Select, FormControl,Row, Col,Label,Form,Radio, Breadcrumb } from 'tinper-bee';

import Chart from '../../components/Chart';
import Editor from '../../components/Editor';

const format = "YYYY";

interface ISceneProps {
    
}
interface ISceneState {
    expanded:boolean,
    current:any,
    selectedkey:any
}

export default class WellcomeScene extends React.Component<ISceneProps,ISceneState> {
    
    state:ISceneState={
        expanded:false,
        current:null,
        selectedkey:null
    }

    componentDidMount() {

    }

    render() {
        const columns = [
            { title: "员工编号", dataIndex: "a", key: "a", width: 150 },
            { title: "员工姓名", dataIndex: "b", key: "b", width:100},
            { title: "性别", dataIndex: "c", key: "c", width: 100},
            { title: "部门", dataIndex: "d", key: "d", width: 100 },
            { title: "职级", dataIndex: "e", key: "e", width: 100 }
          ];
          
          const data = [
            { a: "ASVAL_20190328", b: "小张", c: "男", d: "财务二科", e: "M1", key: "1" },
            { a: "ASVAL_20190320", b: "小明", c: "男", d: "财务一科", e: "T1", key: "2" },
            { a: "ASVAL_20190312", b: "小红", c: "女", d: "财务一科", e: "T2", key: "3" }
          ];
        return ( <div>
            <h3>欢迎使用系统</h3>

            <div style={{display:'flex'}}>
                <Panel header="戒毒人员修改审批">
                    <Table
                        columns={columns}
                        data={data}
                        showRowNum={true}
                    />
                </Panel>
                <Panel header="正在执行通知函">
                    <Table
                        columns={columns}
                        data={data}
                        showRowNum={true}
                    />
                </Panel>
               
            </div>

            <div>
                <Panel header="待尿检人员">
                    <Table
                        columns={columns}
                        data={data}
                        showRowNum={true}
                    />
                </Panel>
                <Panel header="尿检已过期">
                    <Table
                        columns={columns}
                        data={data}
                        showRowNum={true}
                    />
                </Panel>
                <Panel header="待走访人员">
                    <Table
                        columns={columns}
                        data={data}
                        showRowNum={true}
                    />
                </Panel>
            </div>
        </div>)
    }
}
