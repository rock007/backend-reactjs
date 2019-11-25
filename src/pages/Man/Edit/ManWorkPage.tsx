import * as React from 'react';
import {Panel,Checkbox,Breadcrumb,Loading, Button, ButtonGroup, Table} from 'tinper-bee';
import loadsh from  'lodash';

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

/**
 * 工作经历
 */
export default class ManWorkPage extends React.Component<IPageProps,IPageState> {
    
    grid:any
    manId:string=''
    checkedRows=[]
    oldData=[]

    state:IPageState={
        data:[],
      
        isLoading:false,
        showAlert:false
    }
       
   columns = [
    {title: "起时",dataIndex: "startDate",key: "startDate",width: 100,  render: (text, record, index) => {
      return   <FactoryComp
            type='textInput'
            value={text}
            field='startDate'
            index={index}
            required={true}
            record={record}
            onChange={this.changeAllData}
            onValidate={this.onValidate}
      />
    }},
    {title: "止时",dataIndex: "endDate",key: "endDate",width: 80,  render: (text, record, index) => {
      return   <FactoryComp
          type='textInput'
          value={text}
          field='endDate'
          index={index}
          required={true}
          record={record}
          onChange={this.changeAllData}
        onValidate={this.onValidate}
      />
    }},
    {title: "所在单位",dataIndex: "company",key: "company",width: 100,  render: (text, record, index) => {
      return   <FactoryComp
          type='textInput'
          value={text}
          field='company'
          index={index}
          required={true}
          record={record}
          onChange={this.changeAllData}
          onValidate={this.onValidate}
      />
    }},
    {title: "职位",dataIndex: "postion",key: "postion",width: 100,  render: (text, record, index) => {
      return   <FactoryComp
          type='textInput'
          value={text}
          field='postion'
          index={index}
          required={true}
          record={record}
          onChange={this.changeAllData}
          onValidate={this.onValidate}
      />
    }},
    {title: "职业",dataIndex: "job",key: "job",width: 100,  render: (text, record, index) => {
      return   <FactoryComp
          type='textInput'
          value={text}
          field='job'
          index={index}
          required={true}
          record={record}
          onChange={this.changeAllData}
          onValidate={this.onValidate}
      />
    }}  
  ]

    isPage=()=>{

      return this.props.match&&this.props.history;
    }

    componentDidMount() {

      if(this.isPage()){

        this.manId=this.props.match.params.id;
      }else{
        //in dailog
        const m1=new RegExp('/man-work/:id'.replace(':id','\w?'));
        this.manId=this.props.url.replace(m1,'');
      }

      if(this.manId!='0'){

        this.loadData(this.manId);
      }
    }

    loadData=async (id)=>{

      this.setState({isLoading:true});

      let result = await ManService.searchWork({manId:id}) as PageModel<any>;

      this.setState({data:result.data,isLoading:false});
    }

    saveData= async (args:any)=>{

       this.setState({isLoading:true});
       ManService.submitWork(args)
              .then((resp)=>{

                debugger;
              })
              .catch((err)=>{
                Error('保存数据出错');
              }).finally(()=>{
                this.setState({isLoading:false});
        });
    }

    delData= async (ids:string)=>{
      let result =  await ManService.deleteRelate(ids);

      debugger;

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
      
      //同步list数据状态
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

isVerifyData = (data) => {
    let flag = true;
    let pattern = /Validate\b/;

    data.forEach((item, index) => {
        
        let keys = Object.keys(item);

        if (flag) {
            for (let i = 0; i < keys.length; i++) {
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
  
      let tmp = {
          key: uuid(),
          _edit: true,
          _isNew: true,
          _checked: false,
          _disabled: false,
          _flag: false,
   
          startDate:'',
          endDate:'',
          company:'',
          postion:'',
          job:'',
          id:0,
          manId:this.manId
      }

      if (this.oldData.length <= 0) {

         this.oldData=loadsh.cloneDeep(this.state.data);

          newData.forEach(item => {
              item['_disabled'] = true;
              item['_checked'] = false;
          });
      }

      //this.oldData.unshift(tmp);
      newData.unshift(tmp);

      /** 
      if(this.oldData.length != 0 ){
          for (let index = 0; index < this.oldData.length; index++) {
              const element = this.oldData[index];
              for (let i = 0; i < newData.length; i++) {
                  if(element.key ===  newData[i].key){
                      newData[i] = {...element};
                      break;
                  }
              }
          }
      }
      **/

      this.setState({data:newData,editModel:'add'});
  }

  handler_modify=()=>{
      
      this.oldData=loadsh.cloneDeep(this.state.data);

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
      this.setState({  showAlert: true });
    }

    handler_save=async ()=>{
      
        let filterResult = null;
    
        let msg = "请勾选数据后再新增";

        switch (this.state.editModel) {
            case 'add':
                filterResult = this.filterList(this.oldData, this.state.data, 'key');
                break;
            case 'edit':
                filterResult = this.filterList(this.oldData, this.state.data, 'id');
                msg = '请勾选数据后再更新';
                break;
            default:
                break;
        }

        if (filterResult.selectList.length > 0) {

            //检查是否验证通过
            if (this.isVerifyData(filterResult.selectList)) {

                this.saveData(filterResult.selectList);

            } else {
                Info('数据填写不完整')
            }
        } else {
            Info(msg);
        }
    }

    handler_cancel=()=>{
      
      this.setState({editModel:null,data:this.oldData});
      this.oldData = [];
    }

    onValidate = (field, flag, index) => {

      if (this.oldData.length > 0) {
          this.oldData[index][`_${field}Validate`] = (flag == null);
      }
    }

    changeAllData = (field, value, index,refname) => {

      let oldData = this.oldData;
      let _sourseData = loadsh.cloneDeep(this.state.data);
      oldData[index][field] = value;

      if(refname){
          oldData[index][field+"Name"] = refname;
      }
      //有字段修改后去同步左侧对号checkbox
      if (!_sourseData[index]['_checked']) {
          _sourseData[index]['_checked'] = true;
          //actions.inlineEdit.updateState({ list: _sourseData });
          this.setState({data:_sourseData});
      }
      oldData[index]['_checked'] = true;
      
      this.oldData = oldData;
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

  onClickPopUnSaveOK = () => {
    //重置store内的数据
    //actions.inlineEdit.resetData(true);
    //清空选中的数据
    //actions.inlineEdit.updateState({ selectData: [], rowEditStatus: true });
    this.setState({ showAlert: false });
    this.oldData = [];
  }

  onClickPopUnSaveCancel = () => {
    this.setState({ showAlert: false });
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
                context="数据未保存，确定离开 ?"
                confirmFn={this.onClickPopUnSaveOK}
                cancelFn={this.onClickPopUnSaveCancel}
          />
        </React.Fragment>);
    }
}