import * as React from 'react';
import {Panel,Checkbox,Breadcrumb,Loading, Button, ButtonGroup, Table} from 'tinper-bee';

import multiSelect from "tinper-bee/lib/multiSelect.js";
import TextField from '../../../components/RowField/TextField';

const MultiSelectTable = multiSelect(Table, Checkbox);

interface IPanelProps {
   children?: React.ReactNode,
   history:any
}
interface IPanelState {
    expanded:boolean,
    current:any,
    selectedkey:any
}

export default class RelationShipPage extends React.Component<IPanelProps,IPanelState> {
    
    id:string=''

    state:IPanelState={
        expanded:false,
        current:null,
        selectedkey:null
    }
    componentDidMount() {

    }
    goBack=()=>{
      this.props.history.goBack();
    }

    render() {
        
        
const columns04 = [
    {title: "序号",dataIndex: "index",key: "index",width: 80, 
        render(text, record, index) {
            return index + 1;
        }
    },
    {title: "姓名",dataIndex: "orderCode",key: "orderCode",width: 200,  render: (text, record, index) => {
      return   <TextField {...this.props}
      status={record['_status']}
      validate={record['_validate']}
      />
    }},
    {title: "身份证号",dataIndex: "supplierName",key: "supplierName",width: 200,  render: (text, record, index) => {
      return   <TextField {...this.props}
      status={record['_status']}
      validate={record['_validate']}
      />
    }},
    {title: "性别",dataIndex: "type_name",key: "type_name",width: 200,  render: (text, record, index) => {
      return   <TextField {...this.props}
      status={record['_status']}
      validate={record['_validate']}
      />
    }},
    {title: "出生年月",dataIndex: "orderCode",key: "orderCode",width: 200,  render: (text, record, index) => {
      return   <TextField {...this.props}
      status={record['_status']}
      validate={record['_validate']}
      />
    }},
    {title: "关系",dataIndex: "purchasing",key: "purchasing",width: 200,  render: (text, record, index) => {
      return   <TextField {...this.props}
      status={record['_status']}
      validate={record['_validate']}
      />
    }},
    {title: "联系方式",dataIndex: "purchasingGroup",key: "purchasingGroup",width: 200,  render: (text, record, index) => {
      return   <TextField {...this.props}
      status={record['_status']}
      validate={record['_validate']}
      />
    }},
    {title: "家庭住址",dataIndex: "voucherDate",key: "voucherDate",width: 300,  render: (text, record, index) => {
      return   <TextField {...this.props}
      status={record['_status']}
      validate={record['_validate']}
      />
    }}
  ];
  
  const data04 = [
    { 
      orderCode:"NU0391025", 
      supplierName: "xx供应商",
      type_name: "1",
      purchasing:'组织c', 
      purchasingGroup:"aa",
      voucherDate:"2018年03月18日",
      key: "1"
    }, 
    { 
      orderCode:"NU0391026", 
      supplierName: "xx供应商",
      type_name: "2",
      purchasing:'组织a', 
      purchasingGroup:"bb",
      voucherDate:"2018年02月05日",
      key: "2"
    },
    { 
      orderCode:"NU0391027", 
      supplierName: "xx供应商",
      type_name: "3",
      purchasing:'组织b', 
      purchasingGroup:"aa",
      voucherDate:"2018年07月01日",
      key: "3"
    },
    { 
      orderCode:"NU0391028", 
      supplierName: "xx供应商",
      type_name: "4",
      purchasing:'组织c', 
      purchasingGroup:"cc",
      voucherDate:"2019年03月01日",
      key: "4"
    },
    { 
      orderCode:"NU0391029", 
      supplierName: "xx供应商",
      type_name: "5",
      purchasing:'组织d', 
      purchasingGroup:"ss",
      voucherDate:"2019年02月14日",
      key: "5"
    },
    { 
      orderCode:"NU0391030", 
      supplierName: "xx供应商",
      type_name: "1",
      purchasing:'组织e', 
      purchasingGroup:"zz",
      voucherDate:"2019年02月18日",
      key: "6"
    },
    { 
      orderCode:"NU0391031", 
      supplierName: "xx供应商",
      type_name: "2",
      purchasing:'组织f', 
      purchasingGroup:"qq",
      voucherDate:"2019年01月01日",
      key: "7"
    },
    { 
      orderCode:"NU0391032", 
      supplierName: "xx供应商",
      type_name: "3",
      purchasing:'组织g', 
      purchasingGroup:"pp",
      voucherDate:"2019年01月31日",
      key: "8"
    },
  ];
        return (<React.Fragment>
           <Panel>

              <Breadcrumb>
			    <Breadcrumb.Item href="#">
			      工作台
			    </Breadcrumb.Item>
                <Breadcrumb.Item href="#">
                  档案库
			    </Breadcrumb.Item>
                <Breadcrumb.Item href="#">
                    亲属关系
			    </Breadcrumb.Item>
			    <Breadcrumb.Item active>
                  {this.id==''?"添加":"编辑"}
			    </Breadcrumb.Item>
                <a style={{float:'right'}}  className='btn-link' onClick={this.goBack} >返回</a>
			</Breadcrumb>
            {this.props.children} 
            <ButtonGroup style={{ margin: 10 }}>
                <Button >新增</Button>
                <Button >修改</Button>
                <Button >删除</Button>
                <Button >保存</Button>
                <Button >取消</Button>
            </ButtonGroup>
            <MultiSelectTable 
                className="demo04" 
                columns={columns04} 
                data={data04} />
                </Panel>
            </React.Fragment>);
    }
}
