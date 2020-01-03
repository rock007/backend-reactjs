import * as React from 'react';
import {Form,Label,Breadcrumb,Panel,Loading,Icon,Select,Step,Button} from 'tinper-bee';

import {getValidateFieldsTrim, Warning, Info} from "../../../utils";

import moment from "moment";
import DatePicker from "bee-datepicker";
import AppConsts from '../../../lib/appconst';
import UploadFile from '../../../components/UploadFile';
import { convertFiles } from '../../../utils/tools';
import { IPageDetailProps, IPageDetailState } from '../../../services/Model/Models';
import ManService from '../../../services/ManService';
import SelectScheduleTemplate from '../../../components/SelectScheduleTemplate';

/**
 * 社区报到
 */
const FormItem = Form.FormItem;
const Steps = Step.Steps;

const format = "YYYY-MM-DD";

interface IOtherProps {
    
} 

interface IOtherState {
    fileIds0:Array<String>,
    fileIds1:Array<String>,
    fileIds2:Array<String>,
    fileIds3:Array<String>,
    current:number
}

type IPageProps = IOtherProps & IPageDetailProps;
type IPageState = IOtherState & IPageDetailState;

class ManRegistPage extends React.Component<IPageProps,IPageState> {
    
    id:string='';

    state:IPageState={

        isLoading:false,
        record:{},

        fileIds0:[],
        fileIds1:[],
        fileIds2:[],
        fileIds3:[],
        current:0
    }

    isPage=()=>{

        return this.props.match&&this.props.history;
    }
    componentDidMount() {

        if(this.isPage()){

            this.id=this.props.match.params.id;
        }else{
            //in dailog
            const m1=new RegExp('/process-regist/:id'.replace(':id','\w?'));
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
        let result = await ManService.getProcessFiles(id);

        this.setState({record:result,isLoading:false});
    }

    goBack=(flag:number=0)=>{
        if(this.isPage()){
            this.props.history.goBack();
        }else{
            this.props.handlerBack(flag);
        }
    }

    handler_uploadChange=(files:Array<any>,where:string)=>{

        const m1=files.map((m,i)=>m.uid);
        const o1={};
        o1[where]=m1;

        this.setState(o1);
    }

    submit=()=>{

        this.props.form.validateFields((err, _values) => {
            let values = getValidateFieldsTrim(_values);

            if (!err) {

                values.registDate = values.registDate!=null?values.registDate.format('YYYY-MM-DD'):"";

                values['fileIds0']=this.state.fileIds0.join(',');
                values['fileIds1']=this.state.fileIds1.join(',');
                values['fileIds2']=this.state.fileIds2.join(',');
                values['fileIds3']=this.state.fileIds3.join(',');

                values['processId']=this.id;

                //values['niaojianTemplateNo']='';
                //values['visitTemplateNo']='';

                this.setState({isLoading:true});

                ManService.submitRegist(values).then(()=>{

                    this.goBack(1)
                })
                .catch((err)=>{
                    Error('保存操作失败');
                }).finally(()=>{
                    this.setState({isLoading:false});
                });

            }else{
                Warning('输入验证不通过，请检查');
            }
        } );


    }

    next() {
        const current = this.state.current + 1;
        this.setState({ current: current});
      }
      prev() {
        const current = this.state.current - 1;
        this.setState({ current: current });
      }

    render() {
        let {getFieldProps, getFieldError} = this.props.form;

        if(this.id!=='0'&&this.state.record.status==null){

            return ( <Panel><Loading container={this} show={true}/></Panel>)
        }

        const steps = [{
            title: '上传报到文书',
            content: <Form className='edit_form_pop'>
            <FormItem>
               <div style={{ width: '100px', float: 'left'}}><Label>社区戒毒协议书</Label></div>
               <div>
                   <UploadFile   maxSize={3}  from="fileIds0" uploadChange={this.handler_uploadChange}/>
               </div>
           </FormItem>
           <FormItem>
               <div style={{ width: '100px', float: 'left'}}><Label>担保书</Label></div>
               <div>
                   <UploadFile   maxSize={3}    from="fileIds1" uploadChange={this.handler_uploadChange} />
               </div>
           </FormItem>
           <FormItem>
               <div style={{ width: '100px', float: 'left'}}><Label>社区康复决定书</Label></div>
               <div>
                   <UploadFile   maxSize={3}    from="fileIds2" uploadChange={this.handler_uploadChange} />
               </div>
           </FormItem>
           <FormItem>
               <div style={{ width: '100px', float: 'left'}}><Label>人员分类审批表</Label></div>
               <div>
                   <UploadFile  maxSize={3}  from="fileIds3" uploadChange={this.handler_uploadChange} />
               </div>
           </FormItem>
       </Form>,
        }, {
            title: '安排检查计划',
            content: <Form className='edit_form_pop'>
           <FormItem>
                <div style={{ width: '100px', float: 'left'}}><Label>报到时间</Label></div>
                <div>
               <DatePicker  format={format}
                       {   ...getFieldProps('registDate', {
                           initialValue:   this.state.record.registDate,
                           validateTrigger: 'onBlur',
                           rules: [{required: true, message: '请选择报到时间'}],
                       })}
                />
               <span className='error'>
                   {getFieldError('registDate')}
               </span>
               </div>
           </FormItem>
        
           <FormItem>
               <div style={{ width: '100px', float: 'left'}}><Label>尿检计划</Label></div>
               <div>
                    <SelectScheduleTemplate  {   ...getFieldProps('niaojianTemplateNo', {
                           initialValue:   '',
                           rules: [{required: true, message: '请选择尿检计划模板'}],
                       })}/>
                    <span className='error'>
                        {getFieldError('niaojianTemplateNo')}
                    </span>
               </div>
           </FormItem>
           <FormItem>
               <div style={{ width: '100px', float: 'left'}}><Label>走访计划</Label></div>
               <div>
                   <SelectScheduleTemplate  {   ...getFieldProps('visitTemplateNo', {
                           initialValue:   '',
                           rules: [{required: true, message: '请选择尿检计划模板'}],
                       })}/>
                  <span className='error'>
                        {getFieldError('visitTemplateNo')}
                  </span>
               </div>
           </FormItem>
       </Form>
        }];

        return (<div>
             	{
				this.isPage()?<Breadcrumb>
			    <Breadcrumb.Item href="#">
			      工作台
			    </Breadcrumb.Item>
                <Breadcrumb.Item href="#">
				  社戒管理
			    </Breadcrumb.Item>
			    <Breadcrumb.Item active>
                   社区报到
			    </Breadcrumb.Item>
                <a style={{float:'right'}}  className='btn-link' onClick={()=>this.goBack()} >返回</a>
			</Breadcrumb>
			:null}

        <div>
        <Steps current={this.state.current}>
          {steps.map(item => <Step key={item.title} title={item.title} />)}
        </Steps>
        <div className="steps-content">{steps[this.state.current].content}</div>
        <div className="steps-action">
          {
            this.state.current > 0
            &&
            <Button bordered style={{ marginRight: 8 }} onClick={() => this.prev()}>
              上一步
            </Button>
          }
          {
            this.state.current < steps.length - 1
            &&
            <Button colors="primary" onClick={() => this.next()}>下一步</Button>
          }
          {
            this.state.current === steps.length - 1
            &&
            <Button colors="primary" onClick={this.submit}>完成</Button>
          }
        </div>
      </div>
                 
        </div >)
    }
}

export default Form.createForm()(ManRegistPage)