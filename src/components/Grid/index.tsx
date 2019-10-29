import React, {Component} from "react";
import BeeGrid from "bee-complex-grid";
import 'bee-complex-grid/build/Grid.css';

import './index.scss'

const defualtPaginationParam = {
    dataNumSelect: [ "10", "20",  "50", "100"],
    horizontalPosition: 'left',
    verticalPosition: "bottom",
    dataNum: 0,
    items:5,
    btnType: {
        shape: 'border'
    },
    noBorder: true,
    showJump:true,
    confirmBtn: () => null
};
const defaultProps = {
    //   hideBodyScroll: true,
    headerScroll: false,
    bordered: false,
    data: []
};

interface ICompentProps {
    paginationObj :any,
    columns:any[],
    data:any[],
    exportData?:any[],
    toolBtns?:any[],
    getSelectedDataFunc:(selectData, record, index )=>void
}
interface IComentState {
    
}

class Grid extends Component<ICompentProps,IComentState> {
   
    grid:any
    
    constructor(props) {
        super(props);
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

    render() {

        const toolBtns = [{
            value:'生成计划',
            bordered:false,
            colors:'primary'
        },{
            value:'导出',
            iconType:'uf-search',
        }];

        const { paginationObj, data, exportData,  ...otherProps } = this.props;
        const _paginationObj = {...defualtPaginationParam, ...paginationObj};
        _paginationObj.disabled = paginationObj.disabled !== undefined
            ? paginationObj.disabled
            : data.length === 0;
        let _exportData = exportData || data;
        return (
            <div className='bs-grid-wrapper'>
                
                <BeeGrid.GridToolBar toolBtns={this.props.toolBtns} btnSize='sm' />

                <BeeGrid
                    className="ucf-bs-grid"
                    data={data}
                    {...otherProps}
                    exportData={_exportData}
                    paginationObj={_paginationObj}
                    ref={el => this.grid = el}
                />
            </div>
        );
    }
}

//Grid.defaultProps = defaultProps;
export default Grid;
