import * as React from 'react';

import {Select, FormControl,Form,Radio } from 'tinper-bee';
import {FormListItem}from '../../components/FormList';
import {RefWalsinLevel, RefIuapDept} from '../../components/RefViews'
import SelectDict from '../../components/SelectDict';
import ManCateSelect from '../../components/ManCateSelect';

/**
 * not work,fail
 */
interface IPageProps {
   // form:any
}
interface IPageState {
    
}

const FormItem = FormListItem;

export  class SearchCondition extends React.Component<IPageProps,IPageState> {

    state:IPageState={
       
    }
    componentDidMount() {

    }
    render() {
        
        let me=this;
        //const { getFieldProps, getFieldError } = this.props.form;

        return (  <React.Fragment>
                    <FormItem
                        label="姓名"
                    >
                        <FormControl placeholder='精确查询' />
                    </FormItem>

                    <FormItem
                        label="联系方式"
                    >
                        <FormControl placeholder='请输入联系方式' />
                    </FormItem>
                    <FormItem
                        label="身份证号"
                    >
                        <FormControl placeholder='请输入身份证号' />
                    </FormItem>
                    <FormItem
                        label="性别"
                    >
                        <Select >
                            <Select.Option value="">(请选择)</Select.Option>
                            <Select.Option value="1">男</Select.Option>
                            <Select.Option value="0">女</Select.Option>
                        </Select>
                    </FormItem>
                    <FormItem
                        label="人员分类">
                            <ManCateSelect/>
                    </FormItem>
                    <FormItem
                        label="风险等级">
                        <SelectDict onChange={()=>{}} type={31}/>
                    </FormItem>

                    <FormItem
                        label="网格"
                    >
                        <RefWalsinLevel
                            disabled={false}
                            placeholder="请选择网格"
                            backdrop={false}
                        />
                    </FormItem>
            </React.Fragment>)
    }
}

export default SearchCondition;