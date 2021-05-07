import React from 'react';
// import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import UserService from '../service/UserService'



class AddUserComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            serviceName: '書證上鏈',
            userAccount: 'BB001',
            agenciesName: '關貿網路',
            // userEmail: 'ziqing.liu@tradevan.com.tw',
            userAddress: '',
            userPassword: '1234',
            // userName:'子慶',
            status: 'statusON',
            remark: ''
        }
        //設定該function的this為class本身
        this.changeState = this.changeState.bind(this)
        this.submitForm = this.submitForm.bind(this)
    }

    //傳入event要取觸發事件的元件
    changeState(event) {
        //使用setState將值寫到nameVal中
        let changeName = event.target.name
        this.setState({ [changeName]: event.target.value })
    }
    //新增一個submit的function
    submitForm(event) {
        console.log(this.state)
        UserService.AddUser(this.state).then((response) => {
            alert("SUCCESS")
        })
        event.preventDefault()
    }

    render() {
        return (
            <div style={{ height: 400, width: '100%' }}>
                <h1 align="left">連線帳號新增</h1>

                <form onSubmit={this.submitForm}>
                    <label>服務名稱</label>
                    <input
                        id="serviceName"
                        name="serviceName"
                        value={this.state.serviceName}
                        onChange={this.changeState}
                        required
                        placeholder="書證上鏈"
                    />
                    <br />
                    <label>連線帳號ID</label>
                    <input
                        id="userAccount"
                        name="userAccount"
                        value={this.state.userAccount}
                        onChange={this.changeState}
                        required
                        placeholder="BB001"
                    />
                    <br />
                    <label>機關名稱</label>
                    <input
                        id="agenciesName"
                        name="agenciesName"
                        value={this.state.agenciesName}
                        onChange={this.changeState}
                        required
                        placeholder="資訊中心"
                    />
                    <br />
                    {/* <label>電子信箱</label>
                    <input
                        id = "userEmail"
                        name = "userEmail"
                        value={this.state.userEmail}
                        onChange={this.changeState}
                        required
                        placeholder="abcde@bbb.ccc.tw"
                    />
                    <br /> */}
                    <label>區塊鏈ID</label>
                    <input
                        id = "userAddress"
                        name = "userAddress"
                        value={this.state.userAddress}
                        onChange={this.changeState}
                        required
                        disabled
                        placeholder="此為系統提供"
                    />
                    <br />
                    <label>密碼</label>
                    <input
                        id = "userPassword"
                        name = "userPassword"
                        value={this.state.userPassword}
                        onChange={this.changeState}
                        required
                        type="password"
                        placeholder="********"
                    />
                    <br />
                    {/* <label>管理者</label>
                    <input
                        id = "userName"
                        name = "userName"
                        value={this.state.userName}
                        onChange={this.changeState}
                        required
                        placeholder="Harry"
                    />
                    <br /> */}
                    <label>狀態:</label>
                    <input
                        defaultChecked
                        type="radio"
                        id="status"
                        name="status"
                        value="statusON"
                        onChange={this.changeState}
                        // checked={this.status.statusON}
                    />
                    <label for="statusON">啟用</label>
                    <input 
                        type="radio"
                        id="status"
                        name="status"
                        value="statusOFF"
                        onChange={this.changeState}
                        // checked={this.status.statusOFF}
                    />
                    <label for="statusOFF">停用</label>
                    <br />
                    <label>備註說明：</label>
                    <textarea id="remark" name="remark"
                        value={this.state.remark}
                        onChange={this.changeState}
                        placeholder="例如:使用者姓名，方便查閱"
                    />
                    <br />

                    <input type="reset" value="清除" />
                    <input type="submit" value="新增" />
                </form>


            </div>
        )
    }

}
export default AddUserComponent
