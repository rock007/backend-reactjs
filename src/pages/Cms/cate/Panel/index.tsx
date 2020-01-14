import * as React from 'react';
import {Tree,FormControl } from 'tinper-bee';

import CmsService from '../../../../services/CmsService';

interface IPanelProps {
    onClick?:(rec:any)=>void
}
interface IPanelState {
    value?:string,
    data:any[]
}

 class ArticleCatePanel extends React.Component<IPanelProps,IPanelState> {

    defaultExpandedKeys=[]

    state:IPanelState={
        value:'',
        data:[]
    }
    async componentDidMount() {

        let data = await CmsService.getArticleCateTree();

        //let treeData=convertOrgTreeNode(data);
        
        this.setState({data:data.childs});
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

      if (item.childs!=null&&item.childs.length>0) {

        //const m2=this.state.defaultExpandedKeys;
        this.defaultExpandedKeys.push(item.id);
        //this.setState({defaultExpandedKeys:m2});

        return (
          <Tree.TreeNode key={item.cateId} title={item.title} isLeaf={false} ext={item}>
            {loop(item.childs)}
          </Tree.TreeNode>
        );
      }
      return <Tree.TreeNode key={item.cateId} title={item.title} isLeaf={true} ext={item}/>;
    });
    return loop(data);
  }

  onSelect=(selectedKeys, info) =>{
    console.log('onSelect', selectedKeys);
    if(this.props.onClick!=null){
      this.props.onClick.call(this,selectedKeys)
    }
  }

  render() {
       
        return ( <div className="cms-tree-left" style={{padding:"10px"}}>
                <div className='tree-head'>类别</div>
                <div style={{ overflow:'hiden'}}>
                <Tree className="cmsTree" 
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

export default ArticleCatePanel;