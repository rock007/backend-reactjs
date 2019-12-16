import * as React from 'react';
import {Panel, Loading,Icon,Select, FormControl,Row, Col,Label,Form,LoadingState,Button,Radio, Breadcrumb } from 'tinper-bee';

import SysService from '../../../services/SysService';
import {PageModel, PopPageModel, IPageDetailProps, IPageDetailState} from '../../../services/Model/Models';

import { getValidateFieldsTrim } from '../../../utils/tools';
import { Info, Warning } from '../../../utils';
import RefAreaTreeSelect from '../../../components/RefViews/RefAreaTreeSelect';

const FormItem = Form.FormItem;

interface IOtherProps {
    
} 

interface IOtherState {
    selectedValue:string
}

type IPageProps = IOtherProps & IPageDetailProps;
type IPageState = IOtherState & IPageDetailState;

 class AreaEditPage extends React.Component<IPageProps,IPageState> {

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
            const m1=new RegExp('/sys/area-edit/:id'.replace(':id','\w?'));
            this.id=this.props.url.replace(m1,'');
        }

        if(this.id!=null&&this.id!='0'){

            this.loadData(this.id);
        }
    }
    loadData=async (id)=>{

        const  data=await SysService.getAreaById(id);
      
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

            if(values.superId!=null){

                let supertObjSelect=JSON.parse(values.superId);

                if(supertObjSelect!=null){
                    values.superId=supertObjSelect.refpk;
                    values.superName=supertObjSelect.refName;
                }
            }

            values['id']=this.id!=='0'?this.id:null;
            this.setState({isLoading:true});
            SysService.submitArea(values)
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
                    地区管理
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
                        <Label>上一级</Label>
                        <RefAreaTreeSelect  
                            {...getFieldProps('superId', {
                            initialValue: JSON.stringify({ 'refpk':this.state.record.superId,'refname':this.state.record.superName}),
                            rules: [{
                                required: true, message: '请选择上级地区',
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
                            {...getFieldProps('disName', {
                                initialValue: this.state.record.disName,
                                validateTrigger: 'onBlur',
                                rules: [{
                                    required: true, message: <span><Icon type="uf-exc-t"></Icon><span>请输入名称</span></span>,
                                }],
                            }) }
                        />
                        <span className='error'>
                            {getFieldError('disName')}
                        </span>
                    </FormItem>
                   
                    <FormItem>
                        <Label>说明</Label>
                        <FormControl placeholder="请输入地区说明" 
                            {
                            ...getFieldProps('disDesc', {
                                initialValue: this.state.record.disDesc
                            }) 
                            }/>
                    </FormItem>
                 
                    <FormItem>
                        <Label>排序值</Label>
                        <FormControl  placeholder="请输入排序值" {
                            ...getFieldProps('disSort', {
                                initialValue: this.state.record.disSort,
                                validateTrigger: 'onBlur',
                                rules: [{
                                    pattern: /[0-9]$/, 
                                    message: <span><Icon type="uf-exc-t"></Icon><span>只能输入数字</span></span>,
                                }],
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

export default Form.createForm()(AreaEditPage);