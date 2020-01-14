import * as React from 'react';
import {Panel, Loading,Icon,Select, FormControl,Row, Col,Label,Form,LoadingState,Button,Radio, Breadcrumb } from 'tinper-bee';

import SysService from '../../../services/SysService';
import {IPageDetailProps, IPageDetailState} from '../../../services/Model/Models';

import {RefOrgTreeSelect} from '../../../components/RefViews/RefOrgTreeSelect';
import {RefAreaTreeSelect} from '../../../components/RefViews/RefAreaTreeSelect';
import { getValidateFieldsTrim } from '../../../utils/tools';
import { Info, Warning } from '../../../utils';

const FormItem = Form.FormItem;

interface IOtherProps {
    
} 

interface IOtherState {
  
}

type IPageProps = IOtherProps & IPageDetailProps;
type IPageState = IOtherState & IPageDetailState;

 class OrgEditPage extends React.Component<IPageProps,IPageState> {

    id:string=''
    
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
            const m1=new RegExp('/org-edit/:id'.replace(':id','\w?'));
            this.id=this.props.url.replace(m1,'');
        }

        if(this.id!=null&&this.id!='0'){

            this.loadData(this.id);
        }
    }
    loadData=async (id)=>{

        const  data=await SysService.getOrgById(id);
        
        this.setState({record:data,isLoading:false});
    }
    submit=(e)=>{

        this.props.form.validateFields((err, _values) => {

            let values = getValidateFieldsTrim(_values);

            if (err) {
                console.log('校验失败', values);
                Warning("请检查输入数据，验证失败");
            } else {
                console.log('提交成功', values);

                this.setState({isLoading:true});

                values.orgId=values.orgId!=null?JSON.parse(values.orgId).refpk:'';
                //eg:{"refname":"漫水乡中心戒毒社区","refpk":"001001005"}

                if(values.areaId!=null){

                    let areaSelect=JSON.parse(values.areaId);

                    if(areaSelect!=null){
                        values.areaId=areaSelect.refpk;
                        values.areaName=areaSelect.refName;
                    }
                }

                if(values.superId!=null){

                    let objSelect=JSON.parse(values.superId);

                    if(objSelect!=null){
                        values.superId=objSelect.refpk;
                        values.superName=objSelect.refName;
                    }
                }

                values['id']=this.id!=='0'?this.id:null;

                SysService.submitOrg(values)
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
                    组织机构
                  </Breadcrumb.Item> 
                  <Breadcrumb.Item active>
                    {this.id==='0'?"添加":"编辑"}
                  </Breadcrumb.Item>
                  <a style={{float:'right'}}  className='btn-link' onClick={this.goBack.bind(this,0)} >返回</a>
              </Breadcrumb>:null
              }
           
            <Row>
                <Col md="12">

                <Form className='edit_form_pop'>
                    <FormItem>
                        <Label>上一级</Label>
                        <RefOrgTreeSelect  
                            disabled={this.state.record.id!=null}
                            {...getFieldProps('superId', {
                            initialValue: JSON.stringify({ 'refpk':this.state.record.id!=null? this.state.record.superId||'0':'','refname':this.state.record.id!=null?this.state.record.superName||'root':''}),
                            rules: [{
                                required: true, message: '请选择组织社区',
                                pattern: /[^{"refname":"","refpk":""}|{"refpk":"","refname":""}]/
                            }]
                            })}
                        />
                        <span className='error'>
                            {getFieldError('superId')}
                        </span>
                    </FormItem>
                  
                    <FormItem>
                        <Label>名称</Label>
                        <FormControl placeholder="请输入名称"
                            {...getFieldProps('deptName', {
                                initialValue: this.state.record.deptName,
                                validateTrigger: 'onBlur',
                                rules: [{
                                    required: true, message: <span><Icon type="uf-exc-t"></Icon><span>请输入名称</span></span>,
                                }],
                            }) }
                        />
                        <span className='error'>
                            {getFieldError('deptName')}
                        </span>
                    </FormItem>
                   
                    <FormItem>
                        <Label>联系电话</Label>
                        <FormControl placeholder="请输入联系电话"
                            {...getFieldProps('deptPhone', {
                                initialValue: this.state.record.deptPhone,
                                validateTrigger: 'onBlur',
                                rules: [{
                                    required: false, message: <span><Icon type="uf-exc-t"></Icon><span>请输入联系电话</span></span>,
                                }],
                            }) }
                        />
                        <span className='error'>
                            {getFieldError('deptPhone')}
                        </span>
                    </FormItem>
                    <FormItem>
                        <Label>联系地址</Label>
                        <FormControl placeholder="请输入联系地址"
                            {...getFieldProps('deptAddress', {
                                initialValue: this.state.record.deptAddress,
                                validateTrigger: 'onBlur',
                                rules: [{
                                    required: true, message: <span><Icon type="uf-exc-t"></Icon><span>请输入联系地址</span></span>,
                                }],
                            }) }
                        />
                        <span className='error'>
                            {getFieldError('deptAddress')}
                        </span>
                    </FormItem>

                    <FormItem>
                        <Label>所在地区</Label>
                         <RefAreaTreeSelect  
                            {...getFieldProps('areaId', {
                            initialValue: JSON.stringify({ 'refpk':this.state.record.areaId,'refname':this.state.record.areaName}),
                            rules: [{
                                required: true, message: '请选择所在地区',
                                  pattern: /[^{"refname":"","refpk":""}|{"refpk":"","refname":""}]/
                            }]
                            })}
                        />
                        <span className='error'>
                            {getFieldError('areaId')}
                        </span>
                    </FormItem>

                    <FormItem>
                        <Label>说明</Label>
                        <FormControl placeholder="请输入说明" 
                            {
                            ...getFieldProps('deptDesc', {
                                initialValue: this.state.record.deptDesc
                            }) 
                            }/>
                    </FormItem>
                 
                    <FormItem>
                        <Label>排序值</Label>
                        <FormControl  placeholder="请输入排序值" {
                            ...getFieldProps('deptSort', {
                                initialValue: this.state.record.deptSort,
                                validateTrigger: 'onBlur',
                                rules: [{
                                    pattern: /[0-9]$/, 
                                    message: <span><Icon type="uf-exc-t"></Icon><span>只能输入数字</span></span>,
                                }],
                            }) 
                            }/>
                    </FormItem>
                    <FormItem>
                        <Label>是否受限</Label>
                        <Radio.RadioGroup
                            {
                            ...getFieldProps('isDisable', {
                                initialValue: this.state.record.isDisable+'',
                                rules: [{ required: true }]
                            }) }>
                            <Radio value="0">正常</Radio>
                            <Radio value="-1">受限</Radio>
                        </Radio.RadioGroup>
                        <span className='error'>
                            {getFieldError('isDisable')}
                        </span>
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

export default Form.createForm()(OrgEditPage);