import * as React from 'react';
import {Panel,  Loading, Form, Label,Radio } from 'tinper-bee';

import UploadFile from '../../../components/UploadFile';
import './index.scss';
import ManService from '../../../services/ManService';
import { convertFiles } from '../../../utils/tools';

const FormItem = Form.FormItem;;

interface IPageProps {
    form:any,
    //in page
    history:any,
    match:any,

    //in pop
    isPage?:boolean,
    url?:string,
    handlerBack?:(flag:number)=>void
}
interface IPageState {

    isLoading:boolean,

    record:any
}

class VisitView extends React.Component<IPageProps,IPageState> {
    
    id:string='';

    state:IPageState={
    
        isLoading:false,
        
        record:{}
    }
    
    isPage=()=>{

        return this.props.match&&this.props.history;
    }

    componentDidMount() {

        if(this.isPage()){

            this.id=this.props.match.params.id;
        }else{
            //in dailog
            const m1=new RegExp('/visit-detail/:id'.replace(':id','\w?'));
            this.id=this.props.url.replace(m1,'');
        }

        if(this.id!='0'){

            this.loadData(this.id);
        }else{
            this.forceUpdate();
        }
    }

    loadData=async (id)=>{

        this.setState({isLoading:true});
        let result = await ManService.findVisitById(id);

        if(result!=null){

            //const files=this.getFiles(result);
            this.setState({record:result,isLoading:false});
        }

    }

    goBack=(flag:number=0)=>{
        if(this.isPage()){
            this.props.history.goBack();
        }else{
            this.props.handlerBack(flag);
        }
    }

    render() {
        if(this.id!=='0'&&this.state.record.id==null){

            return ( <Panel><Loading container={this} show={true}/></Panel>)
        }
        return (<Panel>
                
                <Form className='edit_form_pop'>
                <FormItem>
                    <Label>戒毒人员</Label>
                    <strong>{this.state.record.toUser}</strong>
                </FormItem>
                <FormItem>
                    <Label>被访人</Label>
                    <strong>{this.state.record.toVisitor}</strong>
                </FormItem>
                <FormItem>
                    <Label>和戒毒人员关系</Label>
                    <strong>{this.state.record.toVisitorRelationship}</strong>
                </FormItem>
                <FormItem>
                    <Label>联系方式</Label>
                    <strong>{this.state.record.toVisitorPhone}</strong>
                </FormItem>
                <FormItem  style={{display:'flex'}}>
                    <Label>走访时间</Label>
                    <strong>{this.state.record.visitorDate}</strong>
                </FormItem>

                <FormItem>
                    <Label>走访地点</Label>
                    <strong>{this.state.record.address}</strong>
                </FormItem>
                <FormItem>
                        <div style={{ width: '150px', float: 'left'}}><Label>1：社区戒毒人员及家庭状况</Label></div>
                       
                        <strong>{this.state.record.key1}</strong>
                </FormItem>
                <FormItem>
                        <div style={{ width: '150px', float: 'left'}}><Label>2:社区戒毒人员工作（生产）状况</Label></div>
                       
                        <strong>{this.state.record.key2}</strong>
                </FormItem>
                <FormItem>
                        <div style={{ width: '150px', float: 'left'}}><Label>3:对社区戒毒康复工作办公室的意见和建议</Label></div>
                        <strong>{this.state.record.key3}</strong>
                </FormItem>
                <FormItem>
                        <div style={{ width: '150px', float: 'left'}}><Label>4:目前您最突出的困难是什么</Label></div>
                       
                        <strong>{this.state.record.key4}</strong>
                </FormItem>
                <FormItem>
                        <div style={{ width: '150px', float: 'left'}}><Label>5:基它问题</Label></div>
                        
                        <strong>{this.state.record.key5}</strong>
                </FormItem>
                <FormItem>
                <div style={{ width: '150px', float: 'left'}}><Label>说明</Label></div>
                    <strong>{this.state.record.content}</strong>
                </FormItem>
                <FormItem style={{display:'flex'}}>
                    <Label>附件</Label>
                    <div style={{display:'inline-block',width:'auto'}}>
                        <UploadFile defaultFileList={ convertFiles(this.state.record.files)}  disabled={true}/>
                    </div>
                </FormItem>
                <FormItem>
                    <Label>走访结果</Label>
                    <strong>{this.state.record.result}</strong>
                </FormItem>
                <FormItem>
                    <Label>走访人</Label>
                    <strong>{this.state.record.visitorName}</strong>
                </FormItem>
                </Form>
        </Panel>)
    }
}

export default VisitView;