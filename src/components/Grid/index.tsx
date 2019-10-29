import React, {Component} from "react";
import BeeGrid from "bee-complex-grid";
import 'bee-complex-grid/build/Grid.css';

import './index.scss'

const defualtPaginationParam = {
    dataNumSelect: ["5", "10", "15", "20", "25", "50", "All"],
    horizontalPosition: 'center',
    verticalPosition: "bottom",
    dataNum: 4,
    btnType: {
        shape: 'border'
    },
    noBorder: true,
    confirmBtn: () => null
};
const defaultProps = {
    //   hideBodyScroll: true,
    headerScroll: false,
    bordered: false,
    data: []
};

class Grid extends Component<any> {
   
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

        const { paginationObj, data, exportData,  ...otherProps } = this.props;
        const _paginationObj = {...defualtPaginationParam, ...paginationObj};
        _paginationObj.disabled = paginationObj.disabled !== undefined
            ? paginationObj.disabled
            : data.length === 0;
        let _exportData = exportData || data;
        return (
            <div className='bs-grid-wrapper'>
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
