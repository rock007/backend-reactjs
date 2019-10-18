
import React from 'react';
import RefMultipleTableWithInput, { RefMultipleTable } from 'pap-refer/lib/pap-common-table/src/index';

import RefTreeWithInput, { RefTree } from 'pap-refer/lib/pap-common-tree/src/index';

import AppConsts from '../../lib/appconst';

import './index.less'

export function RefIuapDept(props){
    return (
        <RefTreeWithInput
            style={{
            }}
            title={'部门'}
            searchable= {true}
            strictMode={true}
            param= {
                {"refCode":"newdept"}
            }
            multiple={false}
            checkStrictly={true}
            disabled={false}
            displayField='{refname}'
            valueField='refpk'
            refModelUrl= {{
                treeUrl: AppConsts.remoteServiceBaseUrl+'/newref/rest/iref_ctr/blobRefTree', //树请求
            }}
            matchUrl= '/newref/rest/iref_ctr/matchPKRefJSON'
            filterUrl='/newref/rest/iref_ctr/filterRefJSON'
            {...props}
            modalProps={{'animation':false}}
        >
            {/* <RefTree /> */}
        </RefTreeWithInput>
    )
}

export function RefWalsinLevel(props){
    return (
        <RefMultipleTableWithInput
            title= '职级'
            strictMode={true}
            backdrop = {false}
            param = {{//url请求参数
                refCode:'post_level',//test_common||test_grid||test_tree||test_treeTable
            }}
            refModelUrl = {{
                tableBodyUrl:AppConsts.remoteServiceBaseUrl+`/common-ref/blobRefTreeGrid`,//表体请求
                refInfo:AppConsts.remoteServiceBaseUrl+`/common-ref/refInfo`,//表头请求
            }}
            matchUrl={AppConsts.remoteServiceBaseUrl+`/common-ref/matchPKRefJSON`}
            filterUrl={AppConsts.remoteServiceBaseUrl+`/common-ref/filterRefJSON`}
            valueField="refpk"
            displayField="{refcode}"
            {...props}
        >
            {/* <RefMultipleTable /> */}
        </RefMultipleTableWithInput>
    )
}


