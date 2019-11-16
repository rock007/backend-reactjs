import * as React from 'react';
import {Panel} from 'tinper-bee';

import Editor from '../../components/Editor';

interface ISceneProps {
    
}
interface ISceneState {
    expanded:boolean,
    current:any,
    selectedkey:any
}

export default class ArticleScene extends React.Component<ISceneProps,ISceneState> {
    
    state:ISceneState={
        expanded:false,
        current:null,
        selectedkey:null
    }

    componentDidMount() {

    }

    render() {
        
        return ( <Panel>
                <Editor></Editor>
        </Panel >)
    }
}
