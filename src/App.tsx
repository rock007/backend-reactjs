import  React from 'react';
import './App.scss';

import Router from './components/Router';
import 'tinper-bee/assets/tinper-bee.css';

import moment from 'moment'

export interface IAppProps {
  
}
moment.locale('zh-cn');
class App extends React.Component<IAppProps> {
  async componentWillMount() {
   

  }

  public render() {
    return <Router />;
  }
}

export default App;
