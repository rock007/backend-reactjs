import React, { useEffect, useState } from 'react';

import CmsService from '../../services/CmsService';
import AppConsts from '../../lib/appconst';

interface IOtherProps {
    procId:string
} 

interface IOtherState {
    
    isLoading:boolean,
    record:any,
    
}

class FlowPanel extends React.Component<IOtherProps,IOtherState> {
    
    id:string=''
    
    state:IOtherState={
        isLoading:false,
        record:{},
    
    }
  
    componentDidMount() {
    
       
    }

    loadData=async (id)=>{

        this.setState({isLoading:true});
        let result = await CmsService.findArticleById(id);

        this.setState({record:result,isLoading:false});
    }
  
    handler_submit=()=>{

    }

    render() {

        return (<div>
         <SvgInline url={AppConsts.remoteServiceBaseUrl+"/wf/getProcessExecImage?uid=sam&instanceId=95001"} />
    </div>)
    }
}

export default FlowPanel;

const SvgInline = props => {
    const [svg, setSvg] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isErrored, setIsErrored] = useState(false);

    useEffect(() => {
        fetch(props.url)
            .then(res => res.text())
            .then(setSvg)
            .catch(setIsErrored)
            .then(() => setIsLoaded(true))
    }, [props.url]);

    return (
        <div   
            className={`svgInline svgInline--${isLoaded ? 'loaded' : 'loading'} ${isErrored ? 'svgInline--errored' : ''}`}
            dangerouslySetInnerHTML={{ __html: svg }}
        />
    );
}