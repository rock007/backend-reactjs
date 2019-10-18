import * as React from 'react';
import {TreeSelect} from 'tinper-bee';

import './index.scss';

interface IPanelProps {
  
}
interface IPanelState {

}
export default class ManCateSelect extends React.Component<IPanelProps,IPanelState> {

  state:IPanelState={
     
  }
  componentDidMount() {

  }
  onChange = () => {
    //this.setState({expanded: !this.state.expanded})
  }

  render() {

      return (  <TreeSelect
        showSearch
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        placeholder="请选择"
        allowClear
        treeDefaultExpandAll
        onChange={this.onChange}
        >
          <TreeSelect.TreeNode value="parent 1" title="parent 1" key="0-1">
            <TreeSelect.TreeNode value="parent 1-0" title="parent 1-0" key="0-1-1">
              <TreeSelect.TreeNode value="leaf1" title="my leaf" key="random" />
              <TreeSelect.TreeNode value="leaf2" title="your leaf" key="random1" />
            </TreeSelect.TreeNode>
            <TreeSelect.TreeNode value="parent 1-1" title="parent 1-1" key="random2">
              <TreeSelect.TreeNode value="sss" title="sss" key="random3" />
            </TreeSelect.TreeNode>
          </TreeSelect.TreeNode>
        </TreeSelect>)
  }
}