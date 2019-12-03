import * as React from 'react';

import 'ac-multi-tabs/dist/index.css';

import { PageLayout,Navbar ,SearchPanel, FormControl,Row, Col,Label,Form,Radio,Menu  } from 'tinper-bee';
import {PageModel, PopPageModel,IPageCommProps,IPageCommState} from '../../services/Model/Models';

interface IOtherProps {
    
} 

interface IOtherState {
    
}

type IPageProps = IOtherProps & IPageCommProps;
type IPageState = IOtherState & IPageCommState;


export  class AccountProfile extends React.Component<IPageProps,IPageState> {

    state:IPageState={
       isLoading:false
    }

    componentDidMount() {

    }

    render() {

        return (  <React.Fragment>
            <h1>2222222 visitor</h1>
            </React.Fragment>)
    }
}

export default AccountProfile;