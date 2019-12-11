import * as React from 'react';
import {Panel, Loading,Icon,Select, FormControl,Row, Col,Label,Form,LoadingState,Button,Radio, Breadcrumb } from 'tinper-bee';

import BussService from '../../services/BussService';
import { IPageDetailProps, IPageDetailState} from '../../services/Model/Models';

import { Info, Warning } from '../../utils';
import { RefGridTreeTableSelect } from '../../components/RefViews/RefGridTreeTableSelect';

const FormItem = Form.FormItem;

interface IOtherProps {
    
} 

interface IOtherState {
    selectedValue:string
}

type IPageProps = IOtherProps & IPageDetailProps;
type IPageState = IOtherState & IPageDetailState;

 class CellUnitEditPage extends React.Component<IPageProps,IPageState> {

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
            const m1=new RegExp('/grid-unit/:id'.replace(':id','\w?'));
            this.id=this.props.url.replace(m1,'');
        }

        if(this.id!=null&&this.id!='0'){

            this.loadData(this.id);
        }
    }
    loadData=async (id)=>{

        const  data=await BussService.getUnitById(id);
      
        this.setState({record:data,isLoading:false});
    }
    submit=(e)=>{

        this.props.form.validateFields((err, values) => {

        if(this.state.record==null||this.state.record["id"]==null){
            //编辑状态
            if(this.state.selectedValue==null){

                Warning("请选择权限上一级");
                return;
            }

            values['parentId']=this.state.selectedValue;
            values['id']=this.id!=='0'?this.id:null;
        }

        if (err) {
            console.log('校验失败', values);
            Warning("请检查输入数据，验证失败");
        } else {
            console.log('提交成功', values);

            this.setState({isLoading:true});
            BussService.submitUnit(values)
                .then((resp)=>{
    
                    Info(resp);
                    this.goBack();
                })
                .catch((resp)=>{
    
                    this.setState({isLoading:false});
                    Warning(resp.data);
                });
        }
    });

}

goBack=()=>{
    if(this.isPage()){
        this.props.history.goBack();
    }else{
        this.props.handlerBack();
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
                    包办单位
                  </Breadcrumb.Item> 
                  <Breadcrumb.Item active>
                    {this.id==='0'?"添加":"编辑"}
                  </Breadcrumb.Item>
                  <a style={{float:'right'}}  className='btn-link' onClick={this.goBack} >返回</a>
              </Breadcrumb>:null
              }
           
            <Row>
                <Col md="12">

                <Form className='edit_form_pop'>
                    <FormItem>
                        <Label>名称</Label>
                        <FormControl placeholder="请输入名称"
                            {...getFieldProps('unitName', {
                                initialValue: this.state.record.unitName,
                                validateTrigger: 'onBlur',
                                rules: [{
                                    required: true, message: <span><Icon type="uf-exc-t"></Icon><span>请输入名称</span></span>,
                                }],
                            }) }
                        />
                        <span className='error'>
                            {getFieldError('unitName')}
                        </span>
                    </FormItem>
                    <FormItem>
                        <Label>简称</Label>
                        <FormControl placeholder="请输入简称"
                            {...getFieldProps('shortName', {
                                initialValue: this.state.record.shortName,
                                validateTrigger: 'onBlur',
                                rules: [{
                                    required: true, message: <span><Icon type="uf-exc-t"></Icon><span>请输入简称</span></span>,
                                }],
                            }) }
                        />
                        <span className='error'>
                            {getFieldError('shortName')}
                        </span>
                    </FormItem>
                   
                    <FormItem>
                        <Label>负责人</Label>
                        <FormControl placeholder="请输入负责人" 
                            {
                            ...getFieldProps('chargeMan', {
                                initialValue: this.state.record.chargeMan
                            }) 
                            }/>
                    </FormItem>
                    <FormItem>
                        <Label>联系电话</Label>
                        <FormControl placeholder="请输入联系电话"
                            {...getFieldProps('linkPhone', {
                                initialValue: this.state.record.linkPhone,
                                validateTrigger: 'onBlur',
                                rules: [{
                                    required: true, message: <span><Icon type="uf-exc-t"></Icon><span>请输入联系电话</span></span>,
                                }],
                            }) }
                        />
                        <span className='error'>
                            {getFieldError('linkPhone')}
                        </span>
                    </FormItem>
                    <FormItem>
                        <Label>联系地址</Label>
                        <FormControl placeholder="请输入联系地址"
                            {...getFieldProps('address', {
                                initialValue: this.state.record.address,
                                validateTrigger: 'onBlur',
                                rules: [{
                                    required: true, message: <span><Icon type="uf-exc-t"></Icon><span>请输入联系地址</span></span>,
                                }],
                            }) }
                        />
                        <span className='error'>
                            {getFieldError('address')}
                        </span>
                    </FormItem>
                    <FormItem>
                        <Label>所属网格</Label>
                        <RefGridTreeTableSelect {...getFieldProps('cellId', {
                                initialValue: this.state.record.cellId,
                                rules: [{
                                    required: true, message: <span><Icon type="uf-exc-t"></Icon><span>请输入所属网格</span></span>,
                                }],
                            }) }/>
                        <span className='error'>
                            {getFieldError('cellId')}
                        </span>
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

export default Form.createForm()(CellUnitEditPage);