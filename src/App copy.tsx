import React from 'react';
import logo from './logo.svg';
import './App.css';
import {FormControl, Tree, Icon, Loading} from 'tinper-bee';
import Grid from "bee-complex-grid";

const App: React.FC = () => {

  const columns = [
    { title: '用户名', dataIndex: 'a', key: 'a', width: 100 },
    { id: '123', title: '性别', dataIndex: 'b', key: 'b', width: 100 },
    { title: '年龄', dataIndex: 'c', key: 'c', width: 200 },
    {
      title: '操作', dataIndex: '', key: 'd', render() {
        return <a href="#">一些操作</a>;
      },
    },
  ];
  
  const data = [
    { a: '令狐冲', b: '男', c: 41, key: '1' },
    { a: '杨过', b: '男', c: 67, key: '2' },
    { a: '郭靖', b: '男', c: 25, key: '3' },
  ];

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      6666
      <Grid
            columns={columns}
            data={data}
          />
    </div>
  );
}

export default App;
