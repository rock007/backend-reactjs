import * as React from 'react';
import {TreeSelect ,Icon } from 'tinper-bee';

import SysService from '../../../../services/SysService';

interface IPanelProps {
    onSelected?:(rec:any,e:any)=>void,
    isCheckbox:boolean,
    allowType:number[],
    showRoot:boolean,
    defaultValue?:string
}
interface IPanelState {
    value?:string,
    data:any[],
}

 class MenuTreeSelect extends React.Component<IPanelProps,IPanelState> {
   
    static defaultProps: IPanelProps = {
      isCheckbox:false,
      allowType:[1],
      showRoot:false,
    }

    state:IPanelState={
        value:'',
        data:[],
    }
    async componentDidMount() {
        let data = await SysService.getAllMenu();

        this.setState({data:this.props.showRoot?[data]: data.childs,value:this.props.defaultValue});
    }

    renderTreeNodes = (data) => {
    
      if(data==null||data.length==0) return;

        const loop = data => data.map((item) => {

          if (item.childs!=null&&item.childs.length>0) {
            return (
              <TreeSelect.TreeNode value={item.id} key={item.id} title={item.name} isLeaf={item.isLeaf} ext={item}>
                {loop(item.childs)}
              </TreeSelect.TreeNode>
            );
          }

          return <TreeSelect.TreeNode  value={item.id} key={item.id} title={item.name} isLeaf={true} ext={item}   />;
        
      });
      return loop(data);
  }

  onSelect=(m, label, extra) =>{
    console.log('onSelect', extra);
    this.setState({value: m})
    if(this.props.onSelected!=null){
      this.props.onSelected.call(this,m,label)
    }
  }
  
  render() {
        return ( 
                <TreeSelect className="menuTree" 
                    showLine 
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    placeholder="请选择"
                   // treeDefaultExpandAll
                    value={this.state.value}
                    onChange={this.onSelect}
                >
                  { this.renderTreeNodes(this.state.data)}
              </TreeSelect>
              )
    }
}

export default MenuTreeSelect;