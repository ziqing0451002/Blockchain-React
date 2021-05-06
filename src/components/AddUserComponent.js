import React from 'react';
// import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import UserService from '../service/UserService'


class AddUserComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            user: []
        }
    }


    render() {
        return (
            <div style={{ height: 400, width: '100%' }}>
                <h1 align="left">連線帳號新增</h1>
                <h1 align="left">連線帳號新增</h1>
                <label>服務名稱</label>
                <input></input>
                {/* <button>+ 新增一筆</button> */}
            </div>
        )
    }

}
export default AddUserComponent
