import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
// import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import UserService from '../service/UserService'
import { Button } from '@material-ui/core';

const columns = [
    { field: 'number', headerName: '序號', width: 100 },
    { field: 'serviceName', headerName: '服務名稱', width: 130 },
    { field: 'agenciesName', headerName: '機關名稱', width: 130 },
    { field: 'userAccount', headerName: '連線帳號ID', width: 150 },
    { field: 'userAddress', headerName: '區塊鏈ID', width: 300 },
    { field: 'status', headerName: '狀態', width: 110 },
    { field: 'functionList', headerName: '功能', width: 200, 
    renderCell: (params) => 
        <div>
            <button><Link to="./AddUserController">編輯</Link></button>
            <button><Link to="./AddUserController">檢視</Link></button>
            <button><Link to="./AddUserController">刪除</Link></button>

        </div>
    }];

class UserListComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            user: []
        }
    }

    componentDidMount() {
        UserService.getUser().then((response) => {
            const data = response.data
            const user = data.map((item, index) => ({ ...item, id: item.userAccount, number: index + 1}))
            this.setState({ user })
            console.log(this.state)
        })
    }

    render() {
        return (
            <div style={{ height: 400, width: '100%' }}>
                <h1 align="left">連線帳號管理</h1>
                <h3 align="left">帳號清單</h3>
                <Button><Link to="./AddUserController?ID=addTest">+新增一筆</Link></Button>
                <DataGrid rows={this.state.user || []} columns={columns} pageSize={20} />
            </div>
        )
    }

}
export default UserListComponent
