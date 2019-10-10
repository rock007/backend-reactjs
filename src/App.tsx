import  React from 'react';
import './App.less';

import Router from './components/Router';
import 'tinper-bee/assets/tinper-bee.css';

export interface IAppProps {
  
}

class App extends React.Component<IAppProps> {
  async componentWillMount() {
    
  }

  public render() {
    return <Router />;
  }
}

export default App;
