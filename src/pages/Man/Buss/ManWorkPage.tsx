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
    {title: "止时",dataIndex: "endDate",key: "endDate",width: 100,  render: (text, record, index) => {
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
    {title: "所在单位",dataIndex: "company",key: "company",width: 120,  render: (text, record, index) => {
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
    {title: "职位",dataIndex: "postion",key: "postion",width: 150,  render: (text, record, index) => {
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
    {title: "职业",dataIndex: "job",key: "job",width: 150,  render: (text, record, index) => {
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

        this.loadData();
      }
    }

    loadData=async ()=>{

      this.setState({isLoading:true});

      let result = await ManService.searchWork({manId:this.manId}) as PageModel<any>;

      this.setState({data:result.data,isLoading:false});
    }

    saveData= async (args:any)=>{

       this.setState({isLoading:true});
       ManService.submitWork(args)
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

    doDelete= async ()=>{
      const me=this;
      
      this.setState({isLoading:true,showAlert:false});

      let ids:string='';
      this.checkedRows.map((item,index)=>{
          ids=ids+','+item.id;
      });
      ManService.deleteWork(ids).then(()=>{

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
      
      if(this.checkedRows.length==0){
        Info('请勾选要保存的记录');
        return;
      }
      if (this.isVerifyData(this.checkedRows)) {

        this.saveData(this.checkedRows);
        
      } else {
        Info('数据填写不完整')
      }
    
    }

    handler_cancel=()=>{
      
      this.oldData = [];

      this.setState({editModel:null});
      this.loadData();
    }

    onValidate = (field, flag, index) => {
/** old
      if (this.oldData.length > 0) {
          this.oldData[index][`_${field}Validate`] = (flag == null);
      }
***/
      let _sourseData = loadsh.cloneDeep(this.state.data);

      if (_sourseData.length > 0) {
        _sourseData[index][`_${field}Validate`] = (flag == null);
      }

      this.setState({data:_sourseData});
    }

    changeAllData = (field, value, index,refname) => {

        let _sourseData = loadsh.cloneDeep(this.state.data);
        _sourseData[index][field] = value;
  
        if(refname){
            _sourseData[index][field+"Name"] = refname;
        }

        //if (!_sourseData[index]['_checked']) {
        //    _sourseData[index]['_checked'] = true;
       // }

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
