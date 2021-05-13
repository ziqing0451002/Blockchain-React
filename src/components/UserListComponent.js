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
import Modal from '@material-ui/core/Modal';




class UserListComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            user: [],
            modalOpen: false,
            selectedUser: '',
            userPasswordCommit: ''
        }
    }

    columns = [
        { field: 'number', headerName: '序號', width: 100 },
        { field: 'serviceName', headerName: '服務名稱', width: 130 },
        { field: 'agenciesName', headerName: '機關名稱', width: 130 },
        { field: 'userAccount', headerName: '連線帳號ID', width: 150 },
        { field: 'userAddress', headerName: '區塊鏈ID', width: 300 },
        { field: 'status', headerName: '狀態', width: 110 },
        {
            field: 'functionList', headerName: '功能', width: 200,
            renderCell: (params) =>
                <div>
                    <button><Link to="./AddUserController?ID=editAccount">編輯</Link></button>
                    <button><Link to="./AddUserController?ID=viewAccount">檢視</Link></button>
                    <button onClick={this.deleteClick}>刪除</button>
                </div>
        }];

    componentDidMount() {
        UserService.getUser().then((response) => {
            const data = response.data
            const user = data.map((item, index) => ({ ...item, id: item.userAccount, number: index + 1 }))
            this.setState({ user })
            console.log(this.state)
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    setSelection = (rowData) => {
        this.setState({ selectedUser: rowData.id })
        console.log(rowData)
        console.log(this.state.selectedUser)

    }

    deleteClick = () => {
        console.log("按到我了啦")
        this.setState({ modalOpen: true });
        // this.setState({ selectedUser: this.state.user[this.state.index]})
        // UserService.deleteUser(this.state).then((response) => {
        //     console.log("SUCCESS")
        // })
    }
    deleteUser = () => {
        console.log(this.state.selectedUser)
        console.log(this.state.userPasswordCommit)
        UserService.deleteUser(this.state.selectedUser, this.state.userPasswordCommit).then((response) => {
            console.log(response);
            if (response.data === 1) {
                // () => window.alert("SUCCESS")
                console.log("SUCCESS");
                
            } else {
                console.log(response.data);
            }
            this.setState({ modalOpen: false });
        }
        ).catch((err) => {
            console.log(err);
            this.setState({ modalOpen: false });
            // this.setState({ redirect: false })
        })
    }
    deleteCancel = () => {
        this.setState({ modalOpen: false });
    }

    render() {
        const style = {
            backgroundColor: 'white',
            font: 'inherit',
            border: '1px solid blue',
            padding: '8px',
            cursor: 'pointer'
        };
        return (
            <div style={{ height: 400, width: '100%' }}>
                <h1 align="left">連線帳號管理</h1>
                <h3 align="left">帳號清單</h3>
                <Button><Link to="./AddUserController?ID=addAccount">+新增一筆</Link></Button>
                <DataGrid rows={this.state.user || []} columns={this.columns} pageSize={20} onRowClick={(rowData) => this.setSelection(rowData)} />

                <Modal
                    open={this.state.modalOpen}
                    // onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <div style={style}>
                        <h2 id="simple-modal-title">確定刪除資料</h2>
                        <h5 >刪除資料後無法復原</h5>
                        <label>密碼確認：</label>
                        <input
                            type="password"
                            id="userPasswordCommit"
                            onChange={(e) => this.handleChange(e)}
                            value={this.state.userPasswordCommit}
                        />
                        <br />
                        <button onClick={this.deleteUser}>確認</button>
                        <button onClick={this.deleteCancel}> 取消</button>
                    </div>
                </Modal>
            </div>

        )
    }

}
export default UserListComponent
