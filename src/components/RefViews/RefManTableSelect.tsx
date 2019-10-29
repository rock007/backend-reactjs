import * as React from 'react';

import {FormControl ,Radio} from 'tinper-bee';

import { RefMultipleTableWithInput,SearchPanelItem } from 'ref-multiple-table'
import 'ref-multiple-table/lib/index.css';

interface IComponentProps {
   // form:any
}
interface IComponentState {
    loading:boolean,
    pageCount:number,
    totalElements:number,
    treeData:any,
    matchData?:any,
    value?:string
    showModal:boolean
}
export  class RefManTableSelect extends React.Component<IComponentProps,IComponentState> {

    state:IComponentState={
        loading:false,
        pageCount:-1,
        totalElements:0,
        treeData:[],
        matchData:[{name:'用友集团',refname:'用友集团',code:'001'}],
        value:JSON.stringify({
                refname: "用友集团",
                refpk: "001",  //value中指定的refpk要等于valueField对应的字段
        }),
        showModal:false
    }
    componentDidMount() {

        //let data = await SysService.getDetpTree();
        //this.setState({treeData:data.childs});
    }
    canClickGoOn = async () =>{
        //this.loadData();
        //let data = await SysService.getDetpTree();
        
        //this.setState({treeData: treeData.children});
        return true;//必须要有
    }
   

    onSave = (result) =>{
        this.setState({
            matchData:result,
        })
    }
    clearFunc = () =>{
        this.setState({
            matchData:[],
        },()=>{
         //   this.props.form.setFieldsValue({table3:''});
        })
      }
      searchFilterInfo = (value) => {
        alert('搜索' + JSON.stringify(value))
      }
    
      /**
       * 跳转到制定页数的操作
       * @param {number} index 跳转页数
       */
      handlePagination = (index) => {
        //this.page.currPageIndex = index;
        //this.setState({ number: Math.random() })
      }
        /**
         * 选择每页数据个数
         */
      dataNumSelect = (index, pageSize) => {
        console.log(index, pageSize)
      }
      onCancel = () => {
        this.setState({ showModal: false })
      }
    render() {

        const fliterFormInputs=[];

        fliterFormInputs.push(
            <SearchPanelItem key="001" name="name1" text="姓名">
              <FormControl size={'sm'} />
            </SearchPanelItem>
          );

          fliterFormInputs.push(
            <SearchPanelItem key="002" name="linkPhone" text="联系方式">
              <FormControl size={'sm'} />
            </SearchPanelItem>
          );

        const columns = [
            {
                title: " ",
                dataIndex: "a1",
                key: "a1",
                width: 45,
                render(text, record, index) {

                  return (
                    <Radio.RadioGroup
                      name={record.key}
                      selectedValue={record._checked ? record.key : null}
                    >
                      <Radio value={record.title}></Radio>
                    </Radio.RadioGroup>
                  )
                }
            },
            { title: '用户名', dataIndex: 'a', key: 'a', width: 100 },
            { title: '性别', dataIndex: 'b', key: 'b', width: 100 },
            { title: '年龄', dataIndex: 'c', key: 'c', width: 200 },
            {
              title: '操作', dataIndex: '', key: 'd', render() {
                return <a href="#">一些操作</a>;
              },
            },
          ];
          
          const data = [
            { a: '令狐冲', b: '男', c: 41, key: '1' },
            { a: '杨过', b: '男', c: 67, key: '2' },
            { a: '郭靖', b: '男', c: 25, key: '3' },
          ];

        return ( <RefMultipleTableWithInput

            valueField={"a"}
            inputDisplay={"a"}
            displayField={"key"}

            emptyBut={true}
            miniSearch={false}
            multiple= {false}
            title="选择戒毒人员"
            showLoading={false}
            showModal={true}
            columnsData={columns}
            tableData={data}
            fliterFormInputs={fliterFormInputs}
            searchFilterInfo={this.searchFilterInfo}
            dataNumSelect= {this.dataNumSelect}
            handlePagination= {this.handlePagination}
            onSave={this.onSave}
            onCancel= {this.onCancel}
            searchPlaceholder="fffffff"
          />)
    }
}

export default RefManTableSelect;