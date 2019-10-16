import * as React from 'react';
import {Panel, Tree,Navbar,Icon,Select, FormControl,Row, Col,Label,Form,Radio, Breadcrumb } from 'tinper-bee';


interface IPanelProps {
    
}
interface IPanelState {
    value?:string
}

 class OrgPanel extends React.Component<IPanelProps,IPanelState> {

    state:IPanelState={
        value:''
    }
    componentDidMount() {

    }
    onChange = (value) => {
        this.setState({value: value});
    }

    onSearch = (value) => {
        console.log("搜索" + value);
    }
    render() {
       
        const loop = data => data.map((item) => {
            const index = item.key.search(this.state.value);
            const beforeStr = item.key.substr(0, index);
            const afterStr = item.key.substr(index + this.state.value.length);
            const title = index > -1 ? (
              <span>
                {beforeStr}
                <span className="u-tree-searchable-filter">{this.state.value}</span>
                {afterStr}
              </span>
            ) : <span>{item.key}</span>;
            if (item.children) {
              return (
                <Tree.TreeNode key={item.key} title={title}>
                  {loop(item.children)}
                </Tree.TreeNode>
              );
            }
            return <Tree.TreeNode key={item.key} title={title} />;
          });

        return ( <div className="org-tree-left" style={{padding:"10px"}}>
            <div className='tree-head'>组织机构</div>
            
    <FormControl
                    value={this.state.value}
                    onSearch={this.onSearch}
                    onChange={this.onChange}
                    type="search"
                />
<Tree className="orgTree" showLine 
defaultExpandAll
checkStrictly
showIcon
cancelUnSelect={true}
>
<Tree.TreeNode title="parent 1" key="0-0"  icon={<Icon type="uf-treefolder"  />}>
<Tree.TreeNode title="parent 1-0" key="0-0-0" disabled  icon={<Icon type="uf-treefolder" />}>
<Tree.TreeNode title="leaf" key="0-0-0-0" disableCheckbox icon={<Icon type="uf-list-s-o" />}/>
<Tree.TreeNode title="leaf" key="0-0-0-1" icon={<Icon type="uf-list-s-o" />}/>
</Tree.TreeNode>
<Tree.TreeNode title="parent 1-1" key="0-0-1" icon={<Icon type="uf-treefolder" />}>
<Tree.TreeNode title={<span>sss</span>} key="0-0-1-0" icon={<Icon type="uf-list-s-o" />}/>
</Tree.TreeNode>
</Tree.TreeNode>
</Tree>

        </div >)
    }
}

export default OrgPanel;