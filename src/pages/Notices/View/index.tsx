import * as React from 'react';
import {Panel,  Form,Label,Loading } from 'tinper-bee';

import BussService from '../../../services/BussService';
import { convertLevelText } from '../../../utils/tools';

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

class NoticeView extends React.Component<IPageProps,IPageState> {
    
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
            const m1=new RegExp('/notice-detail/:id'.replace(':id','\w?'));
            this.id=this.props.url.replace(m1,'');
        }

        if(this.id!='0'){

            this.loadData(this.id);
        }
    }

    loadData=async (id)=>{

        this.setState({isLoading:true});
        let result = await BussService.findNoticeById(id);

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
                 <Loading show={this.state.isLoading} container={this} />
                <Form className='edit_form_pop'>
                <FormItem>
                    <Label>戒毒人员</Label>
                    <strong>{this.state.record.realName}</strong>
                    
                </FormItem>
                <FormItem>
                    <Label>社区</Label>
                    <strong>{this.state.record.orgName}</strong>
                </FormItem>
                <FormItem  style={{display:'flex'}}>
                    <Label>网险等级</Label>
                    <strong>{convertLevelText(this.state.record.level)}</strong>
                </FormItem>
                <FormItem>
                    <Label>内容</Label>
                    <strong>{this.state.record.content}</strong>
                </FormItem>
                <FormItem>
                    <Label>接收者</Label>
                    <strong>{this.state.record.receiveName}</strong>
                </FormItem>

                <FormItem>
                    <Label>发送时间</Label>
                    <strong>{this.state.record.createDate}</strong>
                </FormItem>
                </Form>
               
        </Panel>)
    }
}

export default Form.createForm()(NoticeView);