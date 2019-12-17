import * as React from 'react';
import {Panel, Loading,Icon,Select, FormControl,Row, Col,Label,Form,LoadingState,Button,Radio, Breadcrumb } from 'tinper-bee';

import SysService from '../../../services/SysService';
import {PageModel, PopPageModel, IPageDetailProps, IPageDetailState} from '../../../services/Model/Models';

import { getValidateFieldsTrim } from '../../../utils/tools';
import { Info, Warning } from '../../../utils';
import RefAreaTreeSelect from '../../../components/RefViews/RefAreaTreeSelect';
import RefUserTreeTableSelect from '../../../components/RefViews/RefUserTreeTableSelect';

const FormItem = Form.FormItem;

interface IOtherProps {
    
} 

interface IOtherState {
    selectedValue:string
}

type IPageProps = IOtherProps & IPageDetailProps;
type IPageState = IOtherState & IPageDetailState;

 class GridEditPage extends React.Component<IPageProps,IPageState> {

    id:string=''
    
    state:IPageState={
        isLoading:false,
        record:{},
        selectedValue:''
    }

    isPage=()=>{

        return this.props.match&&this.props.history;
    }
    componentDidMount() {
        if(this.isPage()){

            this.id=this.props.match.params.id;
        }else{
            //in dailog
            const m1=new RegExp('/sys/grid-edit/:id'.replace(':id','\w?'));
            this.id=this.props.url.replace(m1,'');
        }

        if(this.id!=null&&this.id!='0'){

            this.loadData(this.id);
        }
    }
    loadData=async (id)=>{

        const  data=await SysService.getGridById(id);
      
        this.setState({record:data,isLoading:false});
    }

    submit=(e)=>{

        this.props.form.validateFields((err, _values) => {

        let values = getValidateFieldsTrim(_values);
       
        if (err) {
            console.log('校验失败', values);
            Warning("请检查输入数据，验证失败");
        } else {

            //this.doSave(values);
            this.setState({isLoading:true});

            if(values.areaId&&values.areaId!=''){

                let oo=JSON.parse(values.areaId);
                values.areaId=oo.refpk;
                values.areaName=oo.refname;
            }
            if(values.linkUid&&values.linkUid!=''){

                let oo=JSON.parse(values.linkUid);
                values.linkUid=oo.refpk;
                values.linkUserName=oo.refname;
            }

            values['cellId']=this.id!=='0'?this.id:null;

            SysService.submitGrid(values)
                .then((resp)=>{
    
                    Info(resp);
                    this.goBack(1);
                })
                .catch((resp)=>{
    
                    this.setState({isLoading:false});
                    Warning(resp.data);
                });
        }
    });

}

goBack=(flag:number=0)=>{
    if(this.isPage()){
        this.props.history.goBack();
    }else{
        this.props.handlerBack(flag);
    }
}

  render() {
        const { getFieldProps, getFieldError } = this.props.form;

        return ( <Panel>
            <Loading container={this} show={this.state.isLoading}/>
              {
                  this.isPage()?<Breadcrumb>
                  <Breadcrumb.Item href="#">
                    工作台
                  </Breadcrumb.Item>
                  <Breadcrumb.Item href="#">
                    系统管理
                  </Breadcrumb.Item>
                  <Breadcrumb.Item href="#">
                    网格管理
                  </Breadcrumb.Item> 
                  <Breadcrumb.Item active>
                    {this.id==='0'?"添加":"编辑"}
                  </Breadcrumb.Item>
                  <a style={{float:'right'}}  className='btn-link' onClick={()=>this.goBack} >返回</a>
              </Breadcrumb>:null
              }
           
            <Row>
                <Col md="12">

                <Form className='edit_form_pop'>
                    <FormItem>
                        <Label>所在地区</Label>
                        <RefAreaTreeSelect  
                            {...getFieldProps('areaId', {
                            initialValue: JSON.stringify({ 'refpk':this.state.record.areaId,'refname':this.state.record.areaName}),
                            rules: [{
                                required: true, message: '请选择地区',
                                  pattern: /[^{"refname":"","refpk":""}|{"refpk":"","refname":""}]/
                            }]
                            })}
                        />
                        <span className='error'>
                            {getFieldError('areaId')}
                        </span>
                    </FormItem>
                    <FormItem>
                        <Label>名称</Label>
                        <FormControl placeholder="请输入网格名称"
                            {...getFieldProps('cellName', {
                                initialValue: this.state.record.cellName,
                                validateTrigger: 'onBlur',
                                rules: [{
                                    required: true, message: <span><Icon type="uf-exc-t"></Icon><span>请输入网格名称</span></span>,
                                }],
                            }) }
                        />
                        <span className='error'>
                            {getFieldError('cellName')}
                        </span>
                    </FormItem>
                    <FormItem>
                        <Label>简称</Label>
                        <FormControl placeholder="请输入网格简称"
                            {...getFieldProps('shortName', {
                                initialValue: this.state.record.shortName,
                                validateTrigger: 'onBlur',
                                rules: [{
                                    required: true, message: <span><Icon type="uf-exc-t"></Icon><span>请输入网格简称</span></span>,
                                }],
                            }) }
                        />
                        <span className='error'>
                            {getFieldError('shortName')}
                        </span>
                    </FormItem>
                    <FormItem>
                        <Label>网格管理员</Label>
                        <RefUserTreeTableSelect  {
                            ...getFieldProps('linkUid', {
                                validateTrigger: 'onBlur',
                                initialValue: JSON.stringify({refpk:this.state.record.linkUid,refname:this.state.record.linkName}),
                                rules: [{ required: true }],message: <span><Icon type="uf-exc-t"></Icon><span>请选择网格管理员</span></span>
                            }
                        )}/>
                        <span className='error'>
                            {getFieldError('linkUid')}
                        </span>
                    </FormItem>
                   
                   
                    <FormItem>
                        <Label>联系人</Label>
                        <FormControl placeholder="请输入联系人" 
                            {
                            ...getFieldProps('contactMan', {
                                initialValue: this.state.record.contactMan
                            }) 
                            }/>
                    </FormItem>
                    <FormItem>
                        <Label>联系电话</Label>
                        <FormControl placeholder="请输入联系电话" 
                            {
                            ...getFieldProps('contactPhone', {
                                initialValue: this.state.record.contactPhone
                            }) 
                            }/>
                    </FormItem>
                   
                    <FormItem>
                        <Label>备注</Label>
                        <FormControl placeholder="请输入备注"
                        {
                            ...getFieldProps('remarks', {
                                initialValue: this.state.record.remarks
                            }) 
                        }
                        />
                    </FormItem>
                   
                    <FormItem style={{'paddingLeft':'106px'}}>
                        <Button shape="border" style={{"marginRight":"8px"}} onClick={this.goBack} >取消</Button>
                        <Button colors="primary"  onClick={this.submit}>保存</Button>
                    </FormItem>
                </Form>
            </Col>
            </Row>
        </Panel >)
    }
}
/**
                     <FormItem>
                        <Label>包办单位</Label>
                        <Select 
                                {...getFieldProps('method', {
                                    initialValue: this.state.record.method,
                                    rules: [{
                                        required: true, message: '请选择请求方法',
                                    }],
                                })}
                        >
                            <Select.Option value={"post"}>post</Select.Option>
                            <Select.Option value={"get"}>get</Select.Option>
                        </Select>
                        <span className='error'>
                            {getFieldError('method')}
                        </span>
                    </FormItem>
 */
export default Form.createForm()(GridEditPage);