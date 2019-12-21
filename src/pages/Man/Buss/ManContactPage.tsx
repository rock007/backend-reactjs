import * as React from 'react';
import {Panel,Checkbox,Breadcrumb,Select,Icon,FormControl,Form,Label, Button, ButtonGroup, Table} from 'tinper-bee';
import loadsh from  'lodash';

import multiSelect from "tinper-bee/lib/multiSelect.js";

import RefUserTreeTableSelect from '../../../components/RefViews/RefUserTreeTableSelect';

import Alert from '../../../components/Alert';
import ManService from '../../../services/ManService';
import { PageModel } from '../../../services/Model/Models';
import { Info,Warning,Error,getValidateFieldsTrim } from '../../../utils';
import { isObject } from 'util';
import { convertContactManTypeText } from '../../../utils/tools';


const FormItem = Form.FormItem;

const MultiSelectTable = multiSelect(Table, Checkbox);

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
    editModel?:'add'|'edit',
    data:Array<any>,
    record:any,//当前编辑记录
    isLoading:boolean,
    showAlert:boolean,

    postion:string
}

/**
 * 六保一联系人
 */
class ManContactPage extends React.Component<IPageProps,IPageState> {
    
    grid:any
    manId:string=''
    checkedRows=[]

    state:IPageState={
        data:[],
        record:{},
        isLoading:false,
        showAlert:false,

        postion:''
    }
       
   columns = [
    {title: "职务",dataIndex: "postion",key: "postion",width: 200,render(text,rec,e){
      return convertContactManTypeText(text);
    }},
    {title: "姓名",dataIndex: "name",key: "name",width: 120},
    {title: "单位",dataIndex: "company",key: "company",width: 150},
    {title: "联系方式",dataIndex: "phone",key: "phone",width: 100},
    {title: "职责",dataIndex: "duty",key: "duty",width: 100}
  ]

    isPage=()=>{

      return this.props.match&&this.props.history;
    }

    componentDidMount() {

      if(this.isPage()){

        this.manId=this.props.match.params.id;
      }else{
        //in dailog
        const m1=new RegExp('/man-contact/:id'.replace(':id','\w?'));
        this.manId=this.props.url.replace(m1,'');
      }

      if(this.manId!='0'){

        this.loadData();
      }
    }

    loadData=async ()=>{

      this.setState({isLoading:true});

      let result = await ManService.searchContact({manId:this.manId}) as PageModel<any>;

      this.setState({data:result.data,isLoading:false});
    }

    goBack=()=>{
      
      if(this.isPage()){
        this.props.history.goBack();
      }else{
        this.props.handlerBack();
      }
    }

    
    getSelectedDataFunc = (selectData, record, index) => {
        
      this.checkedRows=selectData;

      let _list =loadsh.cloneDeep(this.state.data);
      
      if (index != undefined) {
          _list[index]['_checked'] = !_list[index]['_checked'];
      } else {//点击了全选
          if (selectData.length > 0) {//全选
              _list.map(item => {
                  if (!item['_disabled']) {
                      item['_checked'] = true
                  }
              });
          } else {//反选
              _list.map(item => {
                  if (!item['_disabled']) {
                      item['_checked'] = false
                  }
              });
          }
      }
      this.setState({data:_list});
}

handler_save=async ()=>{

      const me=this;
      this.props.form.validateFields((err, _values) => {
        let values = getValidateFieldsTrim(_values);
        
        if (!err) {

          if(values['manId']==null) values['manId']=this.manId;
          if(values['postion']==null) values['postion']=this.state.postion;

          if(values.name!=null){

            try{
              const obj=JSON.parse(values.name);

              if(obj!=null&&isObject(obj)){
                values.name=obj.refname;
                values.linkUid=obj.refpk;
              }
            }catch {

            }
            
          }

          values['id']=this.state.record.id;
          this.setState({isLoading:true});
          ManService.submitContact(values)
            .then((resp)=>{
             
              this.setState({editModel:null});
              me.loadData();
            })
            .catch((err)=>{
              //Error('保存数据出错');
            }).finally(()=>{
              this.setState({isLoading:false});
            });

        }else{
          Warning('输入验证不通过，请检查');
        }
      })

    }

  handler_delete=async ()=>{

     const me=this;
      this.setState({isLoading:true,showAlert:false});

      let ids:string='';
      this.checkedRows.map((item,index)=>{
          ids=ids+','+item.id;
      });
     await ManService.deleteContact(ids).then(()=>{

          this.setState({editModel:null});
          //Info('删除操作成功');
          me.loadData()
      })
      .catch((err)=>{
        //Error('删除操作失败');
      }).finally(()=>{
          this.setState({isLoading:false});
      });
  }

    handler_cancel=()=>{
      this.setState({editModel:null});
    }

    renderEditModel=(rec:any)=>{
    
      let {getFieldProps, getFieldError} = this.props.form;

      return (<Form className='edit_form_pop'>
        <FormItem>
            <Label>职务</Label>
            <Select
              defaultValue={this.state.postion}
              disabled={this.state.record.id==null?false:true}
              style={{ width: 200, marginRight: 6 }}
              onChange={(v)=>this.setState({postion:v})}>
              <Select.Option value="1">主任</Select.Option>
              <Select.Option value="2">(村/社区)责任人</Select.Option>
              <Select.Option value="3">家庭成员及其监护人（担保人）</Select.Option>
              <Select.Option value="4">专（兼）职社工</Select.Option>
              <Select.Option value="7">社区网格员</Select.Option>
              <Select.Option value="5">社区民警</Select.Option>
              <Select.Option value="6">社区医护人员</Select.Option>
              <Select.Option value="8">禁毒志愿者</Select.Option>
            </Select>
            <span className='error'>
                 {getFieldError('postion')}
            </span>
        </FormItem>
        <FormItem>
            <Label>姓名</Label>
            {
              this.state.postion==='4'||this.state.postion==='5'||this.state.postion==='6'||this.state.postion==='7'?

              <RefUserTreeTableSelect {...getFieldProps('name', {
                initialValue: JSON.stringify({refpk:this.state.record.linkUid,refname:this.state.record.name}),
                validateTrigger: 'onBlur',
                rules: [{
                    required: true, message: <span><Icon type="uf-exc-t"></Icon><span>请输入姓名</span></span>,
                }],
                }) }></RefUserTreeTableSelect>:
              <FormControl placeholder="请输入姓名"
                        {...getFieldProps('name', {
                            initialValue:this.state.record.name,
                            validateTrigger: 'onBlur',
                            rules: [{
                                required: true, message: <span><Icon type="uf-exc-t"></Icon><span>请输入姓名</span></span>,
                            }],
                        }) }
              />
            }
            
            <span className='error'>
                 {getFieldError('name')}
            </span>
        </FormItem>
        <FormItem>
            <Label>联系方式</Label>
            <FormControl placeholder="请输入联系方式"
                        {...getFieldProps('phone', {
                            initialValue:this.state.record.phone,
                            validateTrigger: 'onBlur',
                            rules: [{
                                required: true, message: <span><Icon type="uf-exc-t"></Icon><span>请输入联系方式</span></span>,
                            }],
                        }) }
            />
            <span className='error'>
                 {getFieldError('phone')}
            </span>
        </FormItem>
        <FormItem>
            <Label>单位</Label>
            <FormControl placeholder="请输入单位"
                        {...getFieldProps('company', {
                            initialValue:this.state.record.company,
                            validateTrigger: 'onBlur',
                            rules: [{
                                required: false, message: <span><Icon type="uf-exc-t"></Icon><span>请输入单位</span></span>,
                            }],
                        }) }
            />
            <span className='error'>
                 {getFieldError('company')}
            </span>
        </FormItem>
        <FormItem>
            <Label>职责</Label>
            <FormControl placeholder="请输入职责"
                        {...getFieldProps('duty', {
                            initialValue:this.state.record.duty,
                            validateTrigger: 'onBlur',
                            rules: [{
                                required: false, message: <span><Icon type="uf-exc-t"></Icon><span>请输入职责</span></span>,
                            }],
                        }) }
            />
            <span className='error'>
                 {getFieldError('duty')}
            </span>
      </FormItem>
</Form>);
  }

  render() {
  
    return (<React.Fragment>
           <Panel>
           {this.isPage()?(
              <Breadcrumb>
			          <Breadcrumb.Item href="#">
			            工作台
			          </Breadcrumb.Item>
                <Breadcrumb.Item href="#">
                  档案库
			          </Breadcrumb.Item>
                <Breadcrumb.Item active>
                    亲属关系
			          </Breadcrumb.Item>
                  <a style={{float:'right'}}  className='btn-link' onClick={this.goBack} >返回</a>
                </Breadcrumb>)
                :null
            }
            <ButtonGroup style={{ margin: 10 }}>
                <Button onClick={()=>{
                  this.setState({editModel:'add',record:{}});
                }}  disabled={this.state.editModel!=null}>新增</Button>
                <Button onClick={()=>{
                  if(this.checkedRows.length==0){
                    Info('请勾选要编辑的记录');
                    return;
                  }
            
                  this.setState({record:this.checkedRows[0],postion:this.checkedRows[0].postion+'',editModel:'edit'});
                }} disabled={this.state.editModel!=null}>修改</Button>
                <Button onClick={()=>{
                    if(this.checkedRows.length==0){
                      Info('请勾选要删除的记录');
                      return;
                    }
              
                    this.setState({  showAlert: true });
                }} disabled={this.state.editModel!=null}>删除</Button>
                <Button onClick={this.handler_save} disabled={this.state.editModel==null}>保存</Button>
                <Button onClick={this.handler_cancel} disabled={this.state.editModel==null} >取消</Button>
            </ButtonGroup>

            {this.state.editModel==null?
            (<MultiSelectTable 
              ref={(el) => this.grid = el}
              rowKey={r => r.manId ? r.manId : r.key}
              columns={this.columns} 
              data={this.state.data}
              getSelectedDataFunc={this.getSelectedDataFunc} />):
              this.renderEditModel(this.state.record)}
               
          </Panel>
          <Alert
                show={this.state.showAlert}
                context="确定要删除记录?"
                confirmFn={this.handler_delete}
                cancelFn={()=>this.setState({ showAlert: false })}
          />
        </React.Fragment>);
    }
}

export default Form.createForm()(ManContactPage)