import * as React from 'react';
import {Tree,FormControl } from 'tinper-bee';

import SysService from '../../../../services/SysService';
import { convertOrgTreeNode } from '../../../../utils/tools';

interface IPanelProps {
    onClick?:(rec:any)=>void
}
interface IPanelState {
    value?:string,
    data:any[]
}

 class OrgPanel extends React.Component<IPanelProps,IPanelState> {

    defaultExpandedKeys=[]

    state:IPanelState={
        value:'',
        data:[]
    }
    async componentDidMount() {

        let data = await SysService.getDetpTree();

        //let treeData=convertOrgTreeNode(data);
        if(data.id=='0'){
          this.setState({data:data.childs});
        }else{
          this.setState({data:[data]});
        }
    }

    onChange = (value) => {

        this.setState({value: value});
    }

  //使用 treeData 渲染树节点时，可使用该函数自定义节点显示内容（非必须）
  //注意：isLeaf 属性是必传的，否则节点层级和展示会有问题
  renderTreeNodes = (data) => {
    
    if(data==null||data.length==0) return;

    let search=this.state.value||"";

    const loop = data => data.map((item) => {

      /** 
      const index = item.deptName.search(this.state.value);
      const beforeStr = item.deptName.substr(0, index);
      const afterStr = item.deptName.substr(index + this.state.value.length);
      const title = index > -1 ? (
        <span>
          {beforeStr}
          <span className="u-tree-searchable-filter">{this.state.value}</span>
          {afterStr}
        </span>
      ) : <span>{item.key}</span>;
        ***/

      if (item.childs!=null&&item.childs.length>0) {

        //const m2=this.state.defaultExpandedKeys;
        this.defaultExpandedKeys.push(item.id);
        //this.setState({defaultExpandedKeys:m2});

        return (
          <Tree.TreeNode key={item.id} title={item.deptName} isLeaf={false} ext={item}>
            {loop(item.childs)}
          </Tree.TreeNode>
        );
      }
      return <Tree.TreeNode key={item.id} title={item.deptName} isLeaf={true} ext={item}/>;
    });
    return loop(data);
  }

  onSelect=(selectedKeys, info) =>{

    if(this.props.onClick!=null){
      this.props.onClick.call(this,selectedKeys)
    }
  }

  render() {
   /** 
    <FormControl
    value={this.state.value}
    onChange={this.onChange}
    type="search"
/>
**/
        return ( <div className="org-tree-left" style={{padding:"10px"}}>
              <div className='tree-head'>组织机构</div>
              
                <div style={{ overflow:'auto'}}>
                <Tree className="orgTree" 
                    showLine ={true}
                    checkStrictly={true}
                    defaultExpandedKeys={this.defaultExpandedKeys}
                    onSelect={this.onSelect}
                >
                 { this.renderTreeNodes(this.state.data)}
              </Tree>
              </div>
        </div >)
    }
}

export default OrgPanel;