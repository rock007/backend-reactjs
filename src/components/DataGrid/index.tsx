import React, {Component} from "react";
import BeeGrid from "bee-complex-grid";
import 'bee-complex-grid/build/Grid.css';
import loadsh from  'lodash';

import './index.scss'
import { PageModel } from "../../services/Model/Models";

interface IComponentProps {
    isLoading?:boolean
    columns:any,
    page:PageModel<any>,
    toolBtns?:any[],
    pageChange?:(pageIndex:number,pageSize:number,orderBy?:Array<any>)=>void
    getSelectedDataFunc:(selectData, record, index)=>void,
   
    multiSelect?:any
}
interface IComponentState {
    dataNumIndex:number,
    page:PageModel<any>,
}

class DataGrid extends Component<IComponentProps,IComponentState> {
   
    pageIndex:number=1
    pageSize:number=10

    grid:any
    
    static defaultProps: Partial<IComponentProps> = {
        pageChange: (index,size,orderBy)=>{console.log('pageChange>> index'+index+',size:'+size+',orderBy'+JSON.stringify(orderBy))},
        isLoading:false,
        multiSelect:{type:"checkbox"}
    }
    state:IComponentState={
        dataNumIndex:0,
        page: new PageModel<any>(),
    }

    constructor(props) {
        super(props);

        this.setState({page:props.page});
    }

    componentWillReceiveProps(nextProps) {
       
        let {page} = this.props;
        let {page: nextpage, isShow: nextIsShow} = nextProps;
        // 判断是否 btnFlag新弹框状态  currentIndex当前选中行
        if (nextpage !== page) {

            //this.props.beeGridStore.initData(nextpage);
            this.setState({page:nextpage});
        }

    }

    /**
     *获取保存的column和table上的属性
     *
     */
    getColumnsAndTablePros = () => {
        return this.grid.getColumnsAndTablePros();
    };
    /**
     *
     * 重置grid的columns
     */
    resetColumns = newColumns => {
        this.grid.resetColumns(newColumns);
    };

    exportExcel = () => {
        this.grid.exportExcel();
    };

    /**
     * 请求页面数据
     */
    freshata=(index)=>{
  
        this.pageIndex=index;
        
        if(this.props.pageChange!=null){

            this.props.pageChange(index,this.pageSize);
        }
    }
   
    onDataNumSelect=(index)=>{

      this.setState({dataNumIndex:index});
      this.pageSize=[10,20,50,100][index];

      this.freshata(1);
    }
    getSelectedDataFunc = (selectData, record, index) => {
        
        //console.log("data", JSON.stringify(data));
 
       let  tableData  = this.state.page.data;
       let _tableData = loadsh.cloneDeep(tableData);
       if (index != undefined) {
           _tableData[index]['_checked'] = !_tableData[index]['_checked'];
       } else {//点击了全选
           if (selectData.length > 0) {//全选
               _tableData.map(item => {
                   if (!item['_disabled']) {
                       item['_checked'] = true
                   }
               });
           } else {//反选
               _tableData.map(item => {
                   if (!item['_disabled']) {
                       item['_checked'] = false
                   }
               });
           }
       }
      
      if(this.props.getSelectedDataFunc!=null){
        this.props.getSelectedDataFunc(selectData,record,index);
      }
    
      const oo=this.state.page;
      oo.data=_tableData;
      this.setState({page:oo});
    };
    
    sortFun = (sortParam)=>{

        this.props.pageChange(this.pageIndex,this.pageSize,sortParam);
    }
    render() {

        const dataNumList=[ 10, 20, 50, 100];

        let paginationObj = {
            activePage:this.pageIndex,
            items:this.state.page.dataCount ? Math.ceil(this.state.page.dataCount / dataNumList[this.state.dataNumIndex]) : 1,//一页显示多少条
            dataNumSelect: [ "10", "20", "50", "100"],
            dataNum:this.state.dataNumIndex,
            total:this.state.page.dataCount,//总共多少条、
            freshData:this.freshata,//点击下一页刷新的数据
            onDataNumSelect:this.onDataNumSelect, //每页大小改变触发的事件
            showJump:true,
            noBorder:true
          }

        const {columns,   ...otherProps } = this.props;
        
        let _exportData =  this.props.page.data;
 
        let sortObj = {
            mode:'single',
            backSource:true,//后台排序
            sortFun:this.sortFun
        };

        const pageData= this.state.page.data;
        pageData.forEach(element => {
          element['key']=element.id||element.processId||element.manId;
        });

        return (
            <div className='bs-datatable-wrapper'>
                
                <BeeGrid.GridToolBar toolBtns={this.props.toolBtns} btnSize='sm' />
                <BeeGrid
                    className="ucf-bs-datatable"
                    multiSelect={this.props.multiSelect}
                    data={pageData}
                    loading={this.props.isLoading}
                    columns={columns}
                    {...otherProps}
                    exportData={_exportData}
                    paginationObj={paginationObj}
                    ref={el => this.grid = el}
                    sort={sortObj}
                    sortFun={this.sortFun}
                    getSelectedDataFunc={this.getSelectedDataFunc}
                />

            </div>
        );
    }
}

export default DataGrid;
