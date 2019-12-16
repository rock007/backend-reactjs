import * as React from 'react';
import {Panel, Loading,Icon,Select, FormControl,Row, Col,Label,Form,LoadingState,Button,Radio, Breadcrumb } from 'tinper-bee';

import SysService from '../../../services/SysService';
import {IPageDetailProps, IPageDetailState} from '../../../services/Model/Models';

import { getValidateFieldsTrim } from '../../../utils/tools';
import { Info, Warning } from '../../../utils';

const FormItem = Form.FormItem;

interface IOtherProps {
    
} 

interface IOtherState {
    selectedValue:string
}

type IPageProps = IOtherProps & IPageDetailProps;
type IPageState = IOtherState & IPageDetailState;

 class RoleEditPage extends React.Component<IPageProps,IPageState> {

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
            const m1=new RegExp('/role-edit/:id'.replace(':id','\w?'));
            this.id=this.props.url.replace(m1,'');
        }

        if(this.id!=null&&this.id!='0'){

            this.loadData(this.id);
        }
    }
    loadData=async (id)=>{

        const  data=await SysService.getRoleById(id);
      
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

                values['id']=this.id!=='0'?this.id:null;
                this.setState({isLoading:true});
                SysService.submitRole(values)
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
                    角色管理
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
                        <Label>名称</Label>
                        <FormControl placeholder="请输入角色名称"
                            {...getFieldProps('roleName', {
                                initialValue: this.state.record.roleName,
                                validateTrigger: 'onBlur',
                                rules: [{
                                    required: true, message: <span><Icon type="uf-exc-t"></Icon><span>请输入名称</span></span>,
                                }],
                            }) }
                        />
                        <span className='error'>
                            {getFieldError('roleName')}
                        </span>
                    </FormItem>
                   
                    <FormItem>
                        <Label>说明</Label>
                        <FormControl placeholder="请输入角色说明" 
                            {
                            ...getFieldProps('roleDesc', {
                                initialValue: this.state.record.roleDesc
                            }) 
                            }/>
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

export default Form.createForm()(RoleEditPage);