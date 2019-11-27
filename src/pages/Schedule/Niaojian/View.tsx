import * as React from 'react';
import {Panel,  Form, Label} from 'tinper-bee';

import ManService from '../../../services/ManService';

import './index.scss';

const FormItem = Form.FormItem;;

interface IPageProps {
    form:any,
    //in page
    history:any,
    match:any,

    //in pop
    isPage?:boolean,
    url?:string,
    handlerBack?:()=>void
}
interface IPageState {
   
    isLoading:boolean,
    record:any,

    file1Ids:Array<any>,
    file2Ids:Array<any>,
    file3Ids:Array<any>,
}

class NiaojianScheduleView extends React.Component<IPageProps,IPageState> {
    
    id:string='';
    state:IPageState={
        isLoading:false,
        record:{},
        file1Ids:[],
        file2Ids:[],
        file3Ids:[]
    }
    isPage=()=>{

        return this.props.match&&this.props.history;
    }
  
    componentDidMount() {

        if(this.isPage()){
            this.id=this.props.match.params.id;
        }else{
            //in dailog
            const m1=new RegExp('/niaojian-schedule-detail/:id'.replace(':id','\w?'));
            this.id=this.props.url.replace(m1,'');
        }

        if(this.id!='0'){

            this.loadData(this.id);
        }
    }

    loadData=async (id)=>{

        this.setState({isLoading:true});
        let result = await ManService.findNiaojianById(id);

        this.setState({record:result,isLoading:false});
    }

    goBack=()=>{
        if(this.isPage()){
            this.props.history.goBack();
        }else{
            this.props.handlerBack();
        }
    }

    render() {

        return (<Panel >
                <Form className='edit_form_pop'>
                <FormItem>
                    <Label>戒毒人员</Label>
                    <strong>{this.state.record.realName}</strong>
                </FormItem>
                <FormItem>
                    <Label>时间区间</Label>
                    <strong>{this.state.record.startDate}~{this.state.record.startDate}</strong>
                </FormItem>
                <FormItem>
                    <Label>类型</Label>
                    <strong>{this.state.record.examType==0?'尿检':(this.state.record.examType==1?'评估':this.state.record.examType==2?'走访':'未知')}</strong>
                </FormItem>
                <FormItem>
                    <Label>状态</Label>
                    <strong>{this.state.record.status==0?'未到':this.state.record.status==1?'待执行':this.state.record.status==2?'已完成':this.state.record.status==3?'已过期':'未知'}</strong>
                </FormItem>
                <FormItem>
                    <Label>完成时间</Label>
                    <strong>{this.state.record.finishDate}</strong>
                </FormItem>
                <FormItem>
                    <Label>结果</Label>
                    <strong>{this.state.record.result}</strong>
                </FormItem>
             
                </Form>
               
        </Panel>)
    }
}

export default NiaojianScheduleView;