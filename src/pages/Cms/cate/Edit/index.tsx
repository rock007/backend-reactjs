import * as React from 'react';
import {Panel, Loading,Icon,Select, FormControl,Row, Col,Label,Form,LoadingState,Button,Radio, Breadcrumb } from 'tinper-bee';

import CmsService from '../../../../services/CmsService';
import {PageModel, PopPageModel, IPageDetailProps, IPageDetailState} from '../../../../services/Model/Models';

import { getValidateFieldsTrim } from '../../../../utils/tools';
import { Info, Warning } from '../../../../utils';
import UploadFile from '../../../../components/UploadFile';
import AppConsts from '../../../../lib/appconst';
import { RefArticleCateTreeSelect } from '../../../../components/RefViews/RefArticleCateTreeSelect';

const FormItem = Form.FormItem;

interface IOtherProps {
    
} 

interface IOtherState {
    parentItem:any
}

type IPageProps = IOtherProps & IPageDetailProps;
type IPageState = IOtherState & IPageDetailState;

 class CateEditPage extends React.Component<IPageProps,IPageState> {

    id:string=''
    logo:string=''

    state:IPageState={
        isLoading:false,
        record:{},
        parentItem:{}
    }

    isPage=()=>{

        return this.props.match&&this.props.history;
    }
    componentDidMount() {

        if(this.isPage()){

            this.id=this.props.match.params.id;
        }else{
            //in dailog
            const m1=new RegExp('/cms/cate-edit/:id'.replace(':id','\w?'));
            this.id=this.props.url.replace(m1,'');
        }

        if(this.id!=null&&this.id!='0'){

            this.loadData(this.id);
        }else{
            this.forceUpdate();
        }
    }
    loadData=async (id)=>{

        const  data=await CmsService.findCateById(id);
        let parentItem={};
        if(data!=null){

            parentItem=await CmsService.findCateById(data.parentId);
        }
        this.setState({record:data,parentItem:parentItem,isLoading:false});
    }
    submit=(e)=>{

        this.props.form.validateFields((err, _values) => {

            let values = getValidateFieldsTrim(_values);

        if (err) {
            console.log('校验失败', values);
            Warning("请检查输入数据，验证失败");
        } else {
            console.log('提交成功', values);

            if(values.parentId!=null){

                let supertObjSelect=JSON.parse(values.parentId);

                if(supertObjSelect!=null){
                    values.parentId=supertObjSelect.refpk;
                    values.parentName=supertObjSelect.refName;
                }
            }

            values['cateId']=this.id!=='0'?this.id:null;
            values['logo']=this.logo;
            this.setState({isLoading:true});
            CmsService.submitCate(values)
                .then((resp)=>{

                    //Info(resp);
                    this.goBack(1);
                })
                .catch((resp)=>{
                    
                    Warning(resp.data);

            }).finally(()=>this.setState({isLoading:false}));
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

handler_uploadChange=(files:Array<any>)=>{

    if(files.length>0){

        this.logo= files[0].url.replace(AppConsts.uploadUrl,'');
    }else{
        this.logo='';
    }
}

render() {
        const { getFieldProps, getFieldError } = this.props.form;

        if(this.id!=='0'&&this.state.record.cateId==null){

            return ( <Panel><Loading container={this} show={true}/></Panel>)
        }

        return ( <Panel>

              {
                  this.isPage()?<Breadcrumb>
                  <Breadcrumb.Item href="#">
                    工作台
                  </Breadcrumb.Item>
                  <Breadcrumb.Item href="#">
                    系统管理
                  </Breadcrumb.Item>
                  <Breadcrumb.Item href="#">
                    信息分类
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
                        <RefArticleCateTreeSelect isShowRoot={true} 
                        disabled={this.state.record.cateId!=null}
                        {...getFieldProps('parentId', {
                            initialValue: JSON.stringify({refpk:this.state.record.cateId!=null?this.state.parentItem.cateId||'':'',refname:this.state.record.cateId!=null?this.state.parentItem.title||'':''}),
                            rules: [{
                                required: true, message: <span><span>请选择上级</span></span>,
                            }]
                        })}/>
                        <span className='error'>
                            {getFieldError('parentId')}
                        </span>
                    </FormItem>

                    <FormItem>
                        <Label>名称</Label>
                        <FormControl placeholder="请输入名称"
                            {...getFieldProps('title', {
                                initialValue: this.state.record.title,
                                validateTrigger: 'onBlur',
                                rules: [{
                                    required: true, message: <span><Icon type="uf-exc-t"></Icon><span>请输入名称</span></span>,
                                }],
                            }) }
                        />
                        <span className='error'>
                            {getFieldError('title')}
                        </span>
                    </FormItem>
                   
                    <FormItem style={{display:'flex'}}>
                    <Label>封面</Label>
                        <div style={{display:'inline-block',width:'auto'}}>
                            <UploadFile  uploadChange={this.handler_uploadChange} 
                                defaultFileList={this.state.record.cateId!=null?[{
                                    uid:this.state.record.cateId,
                                    name:'封面',
                                    url:AppConsts.uploadUrl +this.state.record.logo
                                }]:null}/>
                        </div>
                    </FormItem>
                    <FormItem>
                        <Label>排序值</Label>
                        <FormControl  placeholder="请输入排序值" {
                            ...getFieldProps('index', {
                                initialValue: this.state.record.index,
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
                        <LoadingState colors="primary"  onClick={this.submit}>保存</LoadingState>
                    </FormItem>
                </Form>
            </Col>
            </Row>
        </Panel >)
    }
}

export default Form.createForm()(CateEditPage);