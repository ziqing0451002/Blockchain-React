import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import UserService from '../service/UserService'
// import AddUserModal from './AddUserModal'
import Modal from '@material-ui/core/Modal';
// import { Alert } from 'react-st-modal';
import AddUserModal from './AddUserModal';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";



// function AlertExample() {
//     return (
//       <div>
//         <button
//           onClick={async () => {
//             await Alert('Alert text', 'Alert title');
//           }}
//         >
//             Alert
//         </button>
//       </div>
//     );
//   }

class AddUserComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            serviceName: '',
            userAccount: '',
            agenciesName: '',
            userEmail: '',
            userAddress: '',
            userPassword: '',
            userName: '',
            status: 'statusON', //預設為ON
            remark: '',
            modalOpen: false,
            mode: '',
            uiDisable: false


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
        if (this.state.mode === "addAccount") {
            UserService.AddUser(this.state).then((response) => {
                console.log("SUCCESS")
                this.setState({ modalOpen: true });
            })
        } else if (this.state.mode === "editAccount") {
            UserService.editUser(
                this.state.userAccount,
                this.state.userName,
                this.state.userEmail,
                this.state.serviceName,
                this.state.agenciesName,
                this.state.status,
                this.state.remark
            ).then((response) => {
                console.log("SUCCESS")
                this.setState({ modalOpen: true });
            })
        }



        event.preventDefault()
    }

    // test(userAccount,userPassword){
    //     //http://localhost:8000/api/account/deleteAccount/BB111?userPassword=1234
    //     console.log("http://localhost:8000/api/account" + "/deleteAccount" + "/{userAccount}?" + "userPassword={userPassword}");
    // }



    getParameterByName(name, url = window.location.href) {
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    componentDidMount() {
        var linkMode = this.getParameterByName('mode');
        var linkUserId = this.getParameterByName('userID');
        this.setState({ mode: linkMode })
        this.setState({ userAccount: linkUserId })
        // this.test("AA001","1234")
        if (linkMode === "editAccount" || linkMode === "viewAccount") {
            this.getUserInfo(linkUserId)
        }

    }

    getUserInfo = (userID) => {
        UserService.getUserInfo(userID).then((response) => {
            const data = response.data
            this.setState({ serviceName: data.serviceName })
            this.setState({ userAccount: data.userAccount })
            this.setState({ agenciesName: data.agenciesName })
            this.setState({ userEmail: data.userEmail })
            this.setState({ userAddress: data.userAddress })
            this.setState({ userPassword: data.userPassword })
            this.setState({ userName: data.userName })
            this.setState({ status: data.status })
            this.setState({ remark: data.remark })

        })
    }


    render() {
        console.log(this.state)
        const style = {
            backgroundColor: 'white',
            font: 'inherit',
            border: '1px solid blue',
            padding: '8px',
            cursor: 'pointer'
        };
        return (

            <div style={{ height: 400, width: '100%' }}>
                <h1 align="left" hidden={this.state.mode === 'addAccount' ? false : true}>連線帳號新增</h1>
                <h1 align="left" hidden={this.state.mode === 'editAccount' ? false : true}>連線帳號編輯</h1>
                <h1 align="left" hidden={this.state.mode === 'viewAccount' ? false : true}>連線帳號檢視</h1>

                <form onSubmit={this.submitForm}>
                    <label>服務名稱:
                    {/* <select id="serviceName"
                            name="serviceName"
                            value={this.state.serviceName}
                            onChange={this.changeState}
                        >
                            <option value="書證上鏈">書證上鏈</option>
                            <option value="其他功能" selected>其他功能</option>
                        </select> */}
                    </label>

                    <input
                        id="serviceName"
                        name="serviceName"
                        value={this.state.serviceName}
                        onChange={this.changeState}
                        required
                        placeholder="書證上鏈"
                        disabled={this.state.mode === 'viewAccount' ? true : false}
                    />
                    <br />
                    <label>連線帳號ID: </label>
                    <input
                        id="userAccount"
                        name="userAccount"
                        value={this.state.userAccount}
                        onChange={this.changeState}
                        required
                        placeholder="BB001"
                        disabled={this.state.mode === 'editAccount' || this.state.mode === 'viewAccount' ? true : false}
                    />
                    <br />
                    <label>機關名稱： </label>
                    <input
                        id="agenciesName"
                        name="agenciesName"
                        value={this.state.agenciesName}
                        onChange={this.changeState}
                        required
                        placeholder="資訊中心"
                        disabled={this.state.mode === 'viewAccount' ? true : false}
                    />
                    <br />
                    <label>電子信箱</label>
                    <input
                        id="userEmail"
                        name="userEmail"
                        value={this.state.userEmail}
                        onChange={this.changeState}
                        required
                        placeholder="abcde@bbb.ccc.tw"
                        disabled={this.state.mode === 'viewAccount' ? true : false}
                    />
                    <br />
                    <label>區塊鏈ID: </label>
                    <input
                        id="userAddress"
                        name="userAddress"
                        value={this.state.userAddress}
                        onChange={this.changeState}
                        required
                        disabled
                        placeholder="此為系統提供"
                    />
                    <br />
                    <label>密碼: </label>
                    <input
                        id="userPassword"
                        name="userPassword"
                        value={this.state.userPassword}
                        onChange={this.changeState}
                        required
                        type="password"
                        placeholder="********"
                        disabled={this.state.mode === 'editAccount' || this.state.mode === 'viewAccount' ? true : false}
                    />
                    <br />
                    <label>管理者</label>
                    <input
                        id="userName"
                        name="userName"
                        value={this.state.userName}
                        onChange={this.changeState}
                        required
                        placeholder="Harry"
                        disabled={this.state.mode === 'viewAccount' ? true : false}
                    />
                    <br />
                    <label>狀態: </label>
                    <input
                        checked={this.state.status === 'statusON' ? true : false}
                        type="radio"
                        id="status"
                        name="status"
                        value="statusON"
                        onChange={this.changeState}
                        disabled={this.state.mode === 'viewAccount' ? true : false}
                    // checked={this.status.statusON}
                    />
                    <label for="statusON">啟用</label>

                    <input
                        checked={this.state.status === 'statusOFF' ? true : false}
                        type="radio"
                        id="status"
                        name="status"
                        value="statusOFF"
                        onChange={this.changeState}
                        disabled={this.state.mode === 'viewAccount' ? true : false}
                    // checked={this.status.statusOFF}
                    />
                    <label for="statusOFF">停用</label>
                    <br />
                    <label>備註說明：</label>
                    <textarea id="remark" name="remark"
                        value={this.state.remark}
                        onChange={this.changeState}
                        placeholder="例如:使用者姓名，方便查閱"
                        disabled={this.state.mode === 'viewAccount' ? true : false}
                    />
                    <br />

                    <input type="reset" value="清除" hidden={this.state.mode === 'viewAccount' ? true : false} />
                    <input type="submit" value="新增" hidden={this.state.mode === 'addAccount' ? false : true} />
                    <input type="submit" value="儲存" hidden={this.state.mode === 'editAccount' ? false : true} />

                </form>
                <Modal
                    open={this.state.modalOpen}
                    // onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <div style={style}>
                        <h2 id="simple-modal-title" hidden={this.state.mode === 'editAccount' ? false : true}>資料已更新</h2>
                        <h2 id="simple-modal-title" hidden={this.state.mode === 'addAccount' ? false : true}>資料已新增</h2>
                        <button><Link to="./UserListController">確認</Link></button>
                    </div>
                </Modal>

                {/* <AddUserModal></AddUserModal> */}

            </div>
        )
    }

}

export default AddUserComponent
