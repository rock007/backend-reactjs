import * as React from 'react';
import {Panel,  FormControl, Form, Icon,LoadingState, Button ,Label,Radio } from 'tinper-bee';

import {getValidateFieldsTrim,Warning,Info} from "../../../utils";

import FormError from '../../../components/FormError';

import ManService from '../../../services/ManService';

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
}

class ForHelpView extends React.Component<IPageProps,IPageState> {
    
    id:string='';

    state:IPageState={
        isLoading:false,
        record:{},
    }
    
    isPage=()=>{

        return this.props.match&&this.props.history;
    }

    componentDidMount() {
    
        if(this.isPage()){
            this.id=this.props.match.params.id;
        }else{
            //in dailog
            const m1=new RegExp('/forhelp-detail/:id'.replace(':id','\w?'));
            this.id=this.props.url.replace(m1,'');
        }

        if(this.id!='0'){

            this.loadData(this.id);
        }
    }

    loadData=async (id)=>{

        this.setState({isLoading:true});
        let result = await ManService.find4HelpById(id);

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
                    <Label>类型</Label>
                    <strong>{this.state.record.helpType}</strong>
                </FormItem>
                <FormItem  style={{display:'flex'}}>
                    <Label>时间</Label>
                    <strong>{this.state.record.createDate}</strong>
                </FormItem>
                <FormItem>
                    <Label>内容</Label>
                    <strong>{this.state.record.content}</strong>
                </FormItem>
                <FormItem>
                    <Label>回复</Label>
                    <p>{this.state.record.respContent}</p>
                </FormItem>
                <FormItem>
                    <Label>回复人</Label>
                    <strong>{this.state.record.respUser}</strong>
                </FormItem>
                <FormItem>
                    <Label>回复时间</Label>
                    <strong>{this.state.record.respDate}</strong>
                </FormItem>

                </Form>
               
        </Panel>)
    }
}

export default ForHelpView;