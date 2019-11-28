import * as React from 'react';
import {Panel, Form,Label} from 'tinper-bee';

import UploadFile from '../../../components/UploadFile';
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
    handlerBack?:()=>void
}
interface IPageState {
    isLoading:boolean,
    record:any,
}

class NiaojianView extends React.Component<IPageProps,IPageState> {
    
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
            const m1=new RegExp('/niaojian-detail/:id'.replace(':id','\w?'));
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
        
        const _this = this;

        return (<Panel >
                <Form className='edit_form_pop'>
                <FormItem>
                    <Label>戒毒人员</Label>
                    <strong>{this.state.record.toUser}</strong>
                </FormItem>
                <FormItem>
                    <Label>尿检类型</Label>
                    <strong>{this.state.record.testType==0?'常规':'随机'}</strong>
                </FormItem>
                <FormItem  style={{display:'flex'}}>
                    <Label>尿检时间</Label>
                    <strong>{this.state.record.testDate}</strong>
                </FormItem>

                <FormItem>
                    <Label>尿检结果</Label>
                    <strong>{this.state.record.result}</strong>
                </FormItem>
                <FormItem>
                    <Label>是否本地</Label>
                    <strong>{this.state.record.isLocal==1?'是':'否'}</strong>
                </FormItem>
                <FormItem>
                    <Label>尿检地点</Label>
                    <strong>{this.state.record.address}</strong>
                </FormItem>
                <FormItem>
                    <Label>说明</Label>
                    <strong>{this.state.record.remarks}</strong>
                </FormItem>
                <FormItem style={{display:'flex'}}>
                    <Label>尿检人</Label>
                    <div style={{display:'inline-block',width:'auto'}}>
                    <UploadFile defaultFileList={ convertFiles(this.state.record.files1)}  disabled={true}></UploadFile>
                    
                    </div>
                </FormItem>
                
                <FormItem  style={{display:'flex'}}>
                    <Label>尿检报告</Label>
                    <div style={{display:'inline-block',width:'auto'}}>
                    <UploadFile defaultFileList={ convertFiles(this.state.record.files2)}  disabled={true}></UploadFile>
                   
                    </div>

                </FormItem>
                <FormItem  style={{display:'flex'}}>
                    <Label>谈话记录</Label>
                    <div style={{display:'inline-block',width:'auto'}}>
                    <UploadFile defaultFileList={ convertFiles(this.state.record.files3)}  disabled={true}></UploadFile>
                    </div>

                </FormItem>
             
                </Form>
        </Panel>)
    }
}

export default NiaojianView;