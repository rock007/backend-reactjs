/**
 * 业务组件工厂函数
 */

//React所需导入
import React, { Component } from 'react';

//文本输入组件
import TextField from './TextField';
//下拉选择组件
import SelectField from './SelectField';
//数值选择组件
import NumberField from './NumberField';
//年份选择组件
import YearField from './YearField';
//参照部门
import RefDept from './RefDept';
//参照职级
import RefLevel from './RefLevel';
//日期组件
import DateField from './DateField';
      
const renderComponentMap = {
    relationship: {
        component: SelectField,
        selectList: [{
            key: "请选择",
            value: "",
            disabled: true
        }, {
            key: "父母",
            value: "父母"
        }, {
            key: "配偶",
            value: "配偶"
        }, {
            key: "子女",
            value: "子女"
        }, {
            key: "朋友",
            value: "朋友"
        }, {
            key: "其他",
            value: "其他"
        }],
        type: 'select'
    },
    name: {//姓名
        component: TextField,
        type: 'text'
    },
    sex: {//性别
        component: SelectField,
        selectList: [{
            key: "请选择",
            value: '',
            disabled: true
        }, {
            key: "男",
            value: '1'
        }, {
            key: "女",
            value: '0'
        }],
        type: 'select'
    },
    birthday: {
        //component: DateField,
        //type: 'date'
        component: TextField,
        type: 'text'
    },
    idCard: {
        component: TextField,
        type: 'text'
    },
    phone: {
        component: TextField,
        type: 'text'
    },
    address: {
        component: TextField,
        type: 'text'
    },
    contact_postion: {
        component: SelectField,
        selectList: [{
            key: "请选择",
            value: "",
            disabled: true
        }, {
            key: "主任",
            value: "主任"
        }, {
            key: "(村/社区)责任人",
            value: "(村/社区)责任人"
        }, {
            key: "家庭成员及其监护人（担保人）",
            value: "家庭成员及其监护人（担保人）"
        }, {
            key: "专（兼）职社工",
            value: "专（兼）职社工"
        }, {
            key: "社区网格员",
            value: "社区网格员"
        }, {
            key: "社区民警",
            value: "社区民警"
        }, {
            key: "社区医护人员",
            value: "社区医护人员"
        }, {
            key: "禁毒志愿者",
            value: "禁毒志愿者"
        }],
        type: 'select'
    },
    textInput: {
        component: TextField,
        type: 'text'
    },
    dateInput:{
        component: DateField,
        type: 'date'
    }
  };
  
class FactoryComp extends Component<any,any> {
    constructor(props) {
        super(props);
    }

    /**
     * 渲染组件函数
     *
     * @returns JSX
     */
    renderComp = () => {
        let { type, value, record } = this.props;
        let renderMap = renderComponentMap[type];
        if (renderMap) {
            let { component: Com, type: comType, props } = renderMap;
            let _props = props || {};
            let { _edit, _status, _validate } = record;
            let _value;
            switch (comType) {
                case 'dateYear':
                case 'date':
                case 'text': _value = value; break;
                case 'number':
                    if (props.precision && props.precision > 0) {
                        _value = (typeof value) === 'number' ? value.toFixed(props.precision) : ""
                    } else {
                        _value = value
                    }
                    break;
                case 'select':
                    let { selectList } = renderMap;
                    let selected = selectList.find(item => item.value === value);
                    _value = selected ? selected.key : '';
                    break;
                case 'ref': _value = record[renderMap.valueKey]; break;
                default: _value = ''; break;
            }
            return (
                _edit ? (
                    <Com
                        status={_status}
                        validate={_validate}
                        {..._props}
                        {...this.props}
                        data={renderMap.selectList}
                    />
                ) : (
                    <div>{_value}</div>
                )
            )
        } else {
            return (<div>组件类型错误</div>)
        }


    }
    render() {
        return (<div>
            {this.renderComp()}
        </div>);
    }
}

export default FactoryComp;