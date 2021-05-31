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
import { ContactsOutlined } from '@material-ui/icons';




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
        { field: 'orgName', headerName: '機關名稱', width: 130 },
        { field: 'connectAccount', headerName: '連線帳號ID', width: 150 },
        { field: 'walletAddress', headerName: '區塊鏈ID', width: 300 },
        { field: 'status', headerName: '狀態', width: 120 },
        {
            field: 'functionList', headerName: '功能', width: 200,
            renderCell: (params) =>
                // console.log(params)
                // console.log(params.row.connectAccount)
                <div>
                    <button><Link to={`./AddUserController?mode=editAccount&userID=${params.row.connectAccount}`}>編輯</Link></button>
                    <button><Link to={`./AddUserController?mode=viewAccount&userID=${params.row.connectAccount}`}>檢視</Link></button>
                    {/* <button><Link to={{
                        pathname:'./AddUserController?ID=viewAccount',
                        test: this.state.selectedUser
                    }}>檢視</Link></button> */}
                    <button onClick={this.deleteClick}>刪除</button>

                </div>
        }];

    componentDidMount() {
        UserService.getUserList().then((response) => {
            const data = response.data
            const user = data.map((item, index) => ({ ...item, id: item.connectAccount, number: index + 1 }))
            this.setState({ user })
            // console.log(this.state)
        }
        ).catch((err) => {  //若JWT過期要將用戶登出
            // if (err.status(403)) {
            //     window.alert("JWT過期")

            // }
            console.log(err);
            this.setState({ modalOpen: false });
            // this.setState({ redirect: false })
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    setSelection = (rowData) => {
        try {
            this.setState({ selectedUser: rowData.id })
            console.log(rowData)
        } catch (e) {
            console.log(e)
        }

        // console.log(this.state.selectedUser)

    }

    deleteClick = () => {
        this.setState({ modalOpen: true });
        // this.setState({ selectedUser: this.state.user[this.state.index]})
        // UserService.deleteUser(this.state).then((response) => {
        //     console.log("SUCCESS")
        // })
    }
    deleteUser = () => {
        // console.log(this.state.selectedUser)
        // console.log(this.state.userPasswordCommit)
        UserService.deleteUser(this.state.selectedUser, this.state.userPasswordCommit).then((response) => {
            // console.log(response);
            if (response.data === 1) {
                // () => window.alert("SUCCESS")
                console.log("SUCCESS");

            } else {
                // () => window.alert("密碼錯誤")
                console.log(response.data);
            }
            this.setState({ modalOpen: false });
            window.location.reload();
        }
        ).catch((err) => {
            window.alert("密碼錯誤")
            console.log(err);
            this.setState({ modalOpen: false });
            // this.setState({ redirect: false })
        })
    }
    deleteCancel = () => {
        this.setState({ modalOpen: false });
    }

    render() {

        console.log(this.state.selectedUser)
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
                <Button><Link to="./AddUserController?mode=addAccount">+新增一筆</Link></Button>
                <DataGrid rows={this.state.user || []}
                    columns={this.columns}
                    pageSize={20}
                    onRowClick={(rowData) => this.setSelection(rowData)}
                    // sortModel={[
                    //     {
                    //         field: 'createdTime',
                    //         sort: 'asc',
                    //     },
                    // ]}
                />

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
