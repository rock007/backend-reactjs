import * as React from 'react';
import {Icon,Checkbox, Button, ButtonGroup, Table} from 'tinper-bee';
import TextField from '../RowField/TextField';
import multiSelect from "tinper-bee/lib/multiSelect.js";

const MultiSelectTable = multiSelect(Table, Checkbox);


interface IPanelProps{
   //children?: React.ReactNode
}
type IFooBar = IPanelProps & any;

interface IPanelState {
    expanded:boolean,
    current:any,
    selectedkey:any
}

export default class ManContactPanel extends React.Component<IFooBar,IPanelState> {
    
    state:IPanelState={
        expanded:false,
        current:null,
        selectedkey:null
    }
    componentDidMount() {

    }
    render() {
        
const columns04 = [
    {title: "职务",dataIndex: "orderCode",key: "orderCode",width: 200,  render: (text, record, index) => {
      return   <TextField {...this.props}
      status={record['_status']}
      validate={record['_validate']}
      />
    }},
    {title: "姓名",dataIndex: "supplierName",key: "supplierName",width: 200,  render: (text, record, index) => {
      return   <TextField {...this.props}
      status={record['_status']}
      validate={record['_validate']}
      />
    }},
    {title: "单位",dataIndex: "type_name",key: "type_name",width: 200,  render: (text, record, index) => {
      return   <TextField {...this.props}
      status={record['_status']}
      validate={record['_validate']}
      />
    }},
    {title: "联系方式",dataIndex: "orderCode",key: "orderCode",width: 200,  render: (text, record, index) => {
      return   <TextField {...this.props}
      status={record['_status']}
      validate={record['_validate']}
      />
    }},
    {title: "职责",dataIndex: "purchasing",key: "purchasing",width: 200,  render: (text, record, index) => {
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

            {this.props.children} 
            ...{this.props.others}
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
            </React.Fragment>);
    }
}
