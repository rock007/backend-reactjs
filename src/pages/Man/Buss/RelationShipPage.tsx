import * as React from 'react';
import {Panel,Checkbox,Breadcrumb,Loading, Button, ButtonGroup, Table} from 'tinper-bee';
import loadsh from  'lodash';
import moment from "moment";

import multiSelect from "tinper-bee/lib/multiSelect.js";

import Alert from '../../../components/Alert';
import FactoryComp from '../../../components/RowField/FactoryComp';

import ManService from '../../../services/ManService';
import { PageModel } from '../../../services/Model/Models';
import { Info, uuid } from '../../../utils';


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
    isLoading:boolean,
    showAlert:boolean
}

export default class RelationShipPage extends React.Component<IPageProps,IPageState> {
    
    grid:any
    manId:string=''
    checkedRows=[]
    oldData=[]

    state:IPageState={
        data:[],
        isLoading:false,
        showAlert:false
    }
   
    isPage=()=>{

      return this.props.match&&this.props.history;
    }

    componentDidMount() {

      if(this.isPage()){

        this.manId=this.props.match.params.id;
      }else{
        //in dailog
        const m1=new RegExp('/man-relate/:id'.replace(':id','\w?'));
        this.manId=this.props.url.replace(m1,'');
      }

      if(this.manId!='0'){

        this.loadData();
      }
    }

    loadData=async ()=>{

      this.setState({isLoading:true});

      let result = await ManService.searchRelate({manId:this.manId}) as PageModel<any>;

      this.setState({data:result.data,isLoading:false});
    }

    saveData= async (args:Array<any>)=>{

      this.setState({isLoading:true});

      for(var i=0;i<args.length;i++){
        args[i].birthday = args[i].birthday!=null?args[i].birthday.format('YYYY-MM-DD'):"";
        args[i].id=args[i].id==0?'':args[i].id;
      }

      ManService.submitRelate(args)
        .then((resp)=>{

          this.setState({editModel:null});
          this.loadData();

        })
        .catch((err)=>{

          Error('保存数据出错');

        }).finally(()=>{

          this.setState({isLoading:false});
        });
    }

    doDelete= ()=>{

      const me=this;
      
      this.setState({isLoading:true,showAlert:false});

      let ids:string='';
      this.checkedRows.map((item,index)=>{
          ids=ids+','+item.id;
      });
      ManService.deleteRelate(ids).then(()=>{

          this.setState({editModel:null});
       
          me.loadData();
      })
      .catch((err)=>{
        //Error('删除操作失败');
      }).finally(()=>{
          this.setState({isLoading:false});
      });


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

  columns = [
    {title: "关系",dataIndex: "relationship",key: "relationship",width: 100,  render: (text, record, index) => {
      return   <FactoryComp
          type='relationship'
          value={text}
          field='relationship'
          index={index}
          required={true}
          record={record}
          onChange={this.changeAllData}
          onValidate={this.onValidate}
      />
    }},
    {title: "姓名",dataIndex: "name",key: "name",width: 100,  render: (text, record, index) => {
      return   <FactoryComp
            type='textInput'
            value={text}
            field='name'
            index={index}
            required={true}
            record={record}
            onChange={this.changeAllData}
            onValidate={this.onValidate}
      />
    }},
    {title: "性别",dataIndex: "sex",key: "sex",width: 100,  render: (text, record, index) => {
      return   <FactoryComp
          type='sex'
          value={text}
          field='sex'
          index={index}
          required={true}
          record={record}
          onChange={this.changeAllData}
        onValidate={this.onValidate}
      />
    }},
    {title: "出生年月",dataIndex: "birthday",key: "birthday",width: 150,  render: (text, record, index) => {
      return   <FactoryComp
          type='dateInput'
          value={ text }
          field='birthday'
          index={index}
          required={false}
          record={record}
          onChange={this.changeAllData}
          onValidate={this.onValidate}
      />
    }},
    {title: "身份证号",dataIndex: "idCard",key: "idCard",width: 180,  render: (text, record, index) => {
      return   <FactoryComp
          type='textInput'
          value={text}
          field='idCard'
          index={index}
          required={false}
          record={record}
          onChange={this.changeAllData}
          onValidate={this.onValidate}
      />
    }},
    {title: "联系方式",dataIndex: "phone",key: "phone",width: 120,  render: (text, record, index) => {
      return   <FactoryComp
          type='textInput'
          value={text}
          field='phone'
          index={index}
          required={true}
          record={record}
          onChange={this.changeAllData}
          onValidate={this.onValidate}
      />
    }},
    {title: "家庭住址",dataIndex: "address",key: "address",width: 200,  render: (text, record, index) => {
      return  <FactoryComp
        type='textInput'
        value={text}
        field='address'
        index={index}
        required={false}
        record={record}
        onChange={this.changeAllData}
        onValidate={this.onValidate}
      />
    }}
  ]

  filterList = (oldData,data, key) => {

    let newData = data.slice();
    let selectList = [];

    oldData.forEach((_old) => {
        newData.forEach((item, i) => {

            if (_old[key] === item[key] && item['_checked']) {
                item['_validate'] = true;
                selectList.push(_old)
            }
        });
    });
    return {
        newData,
        selectList
    };
  }

/**
 * 验证数据否正确
 *
 * @param {array} data 欲验证的数据
 * @returns {bool}
 */
isVerifyData = (data) => {

    let flag = true;
    let pattern = /Validate\b/;//校验的正则结尾

    data.forEach((item, index) => {
        
        let keys = Object.keys(item);
        //如果标准为false直接不参与计算说明已经出现了错误
        if (flag) {
            for (let i = 0; i < keys.length; i++) {

                console.log(JSON.stringify(pattern)+' key:'+ keys[i]+'');
                if (pattern.test(keys[i])) {

                    if (data[index][keys[i]]) {
                        flag = true;
                    } else {
                        flag = false;
                        break;
                    }
                }
            }
        }
    });
    return flag
  }

  handler_add=()=>{
    
      let newData = loadsh.cloneDeep(this.state.data);
  
      //这里是新增后的新数据模板，用于默认值
      let tmp = {
          key: uuid(),
          _edit: true,
          _isNew: true,
          _checked: false,
          _disabled: false,
          _flag: false,
   
          relationship:'',
          name:'',
          sex:'',
          birthday:'',
          idCard:'',
          phone:'',
          address:'',
          id:'0',
          manId:this.manId
      }
      //当第一次新增的时候
      // 禁用其他checked
      //重置表头状态
      if (this.oldData.length <= 0&&this.state.editModel==null) {

          this.oldData=loadsh.cloneDeep(this.state.data);

          newData.forEach(item => {
              item['_disabled'] = true;
              item['_checked'] = false;
          });
      }

      newData.unshift(tmp);

      this.setState({data:newData,editModel:'add'});
  }

  handler_modify=()=>{
      
      this.oldData=this.state.data;

      let editData = this.state.data.map(item => {
            item['_edit'] = true;
            item['_checked'] = false;
            item['_status'] = 'edit';
            return item
        });

      this.setState({data:editData,editModel:'edit'}); 
    }

    handler_delete=()=>{
      
      if(this.checkedRows.length==0){
        Info('请勾选要删除的记录');
        return;
      }

      if(this.state.editModel=='add'){

        let newData = loadsh.cloneDeep(this.state.data);

        this.checkedRows.forEach((m,i)=>{
          newData=  newData.filter(o=>o.key !== m.key);
        })

        this.setState({data:newData});

      }else {

        this.setState({  showAlert: true });
      }
      
    }

    handler_save=async ()=>{
    
      //let msg = "请勾选数据后再新增";

      if(this.checkedRows.length==0){
        Info('请勾选要保存的记录');
        return;
      }
 /**   
      switch (this.state.editModel) {
            case 'add':
                filterResult = this.filterList(this.oldData, this.state.data, 'key');
               
                break;
            case 'edit':
                filterResult = this.filterList(this.oldData, this.state.data, 'id');
                //msg = '请勾选数据后再更新';
                break;
            default:
                break;
        }
     
        if (filterResult.selectList.length > 0) {

            if (this.isVerifyData(filterResult.selectList)) {

                this.saveData(filterResult.selectList);
                
            } else {
                Info('数据填写不完整')
            }
        } else {
            Info(msg);
        }
****/
      if (this.isVerifyData(this.checkedRows)) {

          this.saveData(this.checkedRows);
          
      } else {
          Info('数据填写不完整')
      }

    }

    handler_cancel=()=>{
      
      //this.setState({editModel:null,data:this.oldData});
      this.oldData = [];

      this.setState({editModel:null});
      this.loadData();

    }
    onValidate = (field, flag, index) => {

      let _sourseData = loadsh.cloneDeep(this.state.data);

      if (_sourseData.length > 0) {
        _sourseData[index][`_${field}Validate`] = (flag == null);
      }

      this.setState({data:_sourseData});
    }

    changeAllData = (field, value, index,refname) => {

      //let oldData = this.oldData;
      let _sourseData = loadsh.cloneDeep(this.state.data);
      //oldData[index][field] = value;
      _sourseData[index][field] = value;

      if(refname){
          //oldData[index][field+"Name"] = refname;
          _sourseData[index][field+"Name"] = refname;
      }

      //有字段修改后去同步左侧对号checkbox
      //if (!_sourseData[index]['_checked']) {
      //    _sourseData[index]['_checked'] = true;
      //}

      //oldData[index]['_checked'] = true;
      //_sourseData[index]['_checked'] = true;
      
      //this.oldData = oldData;

      this.setState({data:_sourseData});
    }

    hasCheck = () => {
      //let { selectData, list } = this.props;
      let flag = false;
      this.checkedRows.forEach(item => {
          if (item._checked == true) {
              flag = true;
          }
      });
      this.state.data.forEach(item => {
          if (item._checked == true) {
              flag = true;
          }
      });
      return flag
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
                <Button onClick={this.handler_add}  disabled={this.state.editModel=='edit'}>新增</Button>
                <Button onClick={this.handler_modify} disabled={this.state.editModel=='add'}>修改</Button>
                <Button onClick={this.handler_delete} >删除</Button>
                <Button onClick={this.handler_save} disabled={this.state.editModel==null}>保存</Button>
                <Button onClick={this.handler_cancel} disabled={this.state.editModel==null} >取消</Button>
            </ButtonGroup>
            <MultiSelectTable 
                ref={(el) => this.grid = el}
                rowKey={r => r.manId ? r.manId : r.key}
                columns={this.columns} 
                data={this.state.data}
                getSelectedDataFunc={this.getSelectedDataFunc} />
          </Panel>
          <Alert
                show={this.state.showAlert}
                context="确定要删除记录?"
                confirmFn={this.doDelete}
                cancelFn={()=>this.setState({ showAlert: false })}
          />
          <Loading container={this} show={this.state.isLoading}/>
        </React.Fragment>);
    }
}
