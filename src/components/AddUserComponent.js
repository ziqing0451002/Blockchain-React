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
            //個人資訊
            serviceName: '',
            connectAccount: '',
            orgName: '',
            managerEmail: '',
            walletAddress: '',
            connectPassword: '',
            managerName: '',
            status: true, //預設為ON
            remark: '',
            //修改密碼
            userOriginPassword: '',
            userNewPassword: '',
            userConfirmNewPassword: '',
            //其他控制項
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
            }).catch((err) => {
                console.log(err);
                window.alert("新增失敗:" + err)            
            })
        } else if (this.state.mode === "editAccount") {
            if (this.state.userOriginPassword != '' && this.state.userNewPassword != '' && this.state.userConfirmNewPassword != '' ) {
                if (this.state.userNewPassword != this.state.userConfirmNewPassword){
                    window.alert("密碼與確認密碼不一致")
                }else{
                    UserService.editUserPassword(
                        this.state.connectAccount,
                        this.state.userOriginPassword,
                        this.state.userNewPassword
                    ).then((response) => {
                        console.log("editUserPassword")
                        UserService.editUserInfo(
                            this.state.connectAccount,
                            this.state.managerName,
                            this.state.managerEmail,
                            this.state.serviceName,
                            this.state.orgName,
                            this.state.status,
                            this.state.remark
                        ).then((response) => {
                            console.log("editUserInfo_SUCCESS")
                            this.setState({ modalOpen: true });
                        }).catch((err) => {
                            console.log(err);
                            window.alert("修改失敗:" + err)            
                        })
                    }).catch((err) => {
                        console.log(err);
                        window.alert("密碼錯誤或不符合規範:" + err)            
                    })
                }
            }else{
                UserService.editUserInfo(
                    this.state.connectAccount,
                    this.state.managerName,
                    this.state.managerEmail,
                    this.state.serviceName,
                    this.state.orgName,
                    this.state.status,
                    this.state.remark
                ).then((response) => {
                    console.log("SUCCESS")
                    this.setState({ modalOpen: true });
                })
            }
        }



        event.preventDefault()
    }

    // test(connectAccount,connectPassword){
    //     //http://localhost:8000/api/account/deleteAccount/BB111?connectPassword=1234
    //     console.log("http://localhost:8000/api/account" + "/deleteAccount" + "/{connectAccount}?" + "connectPassword={connectPassword}");
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
        this.setState({ connectAccount: linkUserId })
        // this.test("AA001","1234")
        if (linkMode === "editAccount" || linkMode === "viewAccount") {
            this.getUserInfo(linkUserId)
        }

    }

    getUserInfo = (userID) => {
        UserService.getUserInfo(userID).then((response) => {
            const data = response.data
            this.setState({ serviceName: data.serviceName })
            this.setState({ connectAccount: data.connectAccount })
            this.setState({ orgName: data.orgName })
            this.setState({ managerEmail: data.managerEmail })
            this.setState({ walletAddress: data.walletAddress })
            this.setState({ connectPassword: data.connectPassword })
            this.setState({ managerName: data.managerName })
            this.setState({ status: data.status })
            this.setState({ remark: data.remark })

        })
    }


    render() {
        if (this.state.status === "true") {
            this.setState({ status:true})
        }else if (this.state.status === "false") {
            this.setState({ status:false})
        }
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
                        id="connectAccount"
                        name="connectAccount"
                        value={this.state.connectAccount}
                        onChange={this.changeState}
                        required
                        placeholder="BB001"
                        disabled={this.state.mode === 'editAccount' || this.state.mode === 'viewAccount' ? true : false}
                    />
                    <br />
                    <label>機關名稱： </label>
                    <input
                        id="orgName"
                        name="orgName"
                        value={this.state.orgName}
                        onChange={this.changeState}
                        required
                        placeholder="資訊中心"
                        disabled={this.state.mode === 'viewAccount' ? true : false}
                    />
                    <br />
                    <label>電子信箱</label>
                    <input
                        id="managerEmail"
                        name="managerEmail"
                        value={this.state.managerEmail}
                        onChange={this.changeState}
                        required
                        placeholder="abcde@bbb.ccc.tw"
                        disabled={this.state.mode === 'viewAccount' ? true : false}
                    />
                    <br />
                    <label>區塊鏈ID: </label>
                    <input
                        id="walletAddress"
                        name="walletAddress"
                        value={this.state.walletAddress}
                        onChange={this.changeState}
                        required
                        disabled
                        placeholder="此為系統提供"
                    />
                    <br />
                    <div hidden={this.state.mode === 'editAccount' ? true : false}>
                        <label >密碼: </label>
                        <input
                            id="connectPassword"
                            name="connectPassword"
                            value={this.state.connectPassword}
                            onChange={this.changeState}
                            required
                            type="password"
                            placeholder="********"
                            disabled={this.state.mode === 'viewAccount' ? true : false}
                        // hidden={this.state.mode === 'editAccount' ? true : false}
                        />
                        <br />
                    </div>
                    <label>管理者</label>
                    <input
                        id="managerName"
                        name="managerName"
                        value={this.state.managerName}
                        onChange={this.changeState}
                        required
                        placeholder="Harry"
                        disabled={this.state.mode === 'viewAccount' ? true : false}
                    />
                    <br />
                    <label>狀態: </label>
                    <input
                        checked={this.state.status === true ? true : false}
                        type="radio"
                        id="status"
                        name="status"
                        value= {true}
                        onChange={this.changeState}
                        disabled={this.state.mode === 'viewAccount' ? true : false}
                    // checked={this.status.statusON}
                    />
                    <label for={this.state.status}>啟用</label>

                    <input
                        checked={this.state.status === false ? true : false}
                        type="radio"
                        id="status"
                        name="status"
                        value= {false}
                        onChange={this.changeState}
                        disabled={this.state.mode === 'viewAccount' ? true : false}
                    // checked={this.status.statusOFF}
                    />
                    <label for={this.state.status}>停用</label>
                    <br />
                    <label>備註說明：</label>
                    <textarea id="remark" name="remark"
                        value={this.state.remark}
                        onChange={this.changeState}
                        placeholder="例如:使用者姓名，方便查閱"
                        disabled={this.state.mode === 'viewAccount' ? true : false}
                    />
                    <br />
                    <div hidden={this.state.mode === 'editAccount' ? false : true}>
                        <h1 align="left" >密碼修改</h1>
                        <h5 >(如不修改登入密碼，則不需填寫以下欄位)</h5>
                        <label >舊密碼: </label>
                        <input
                            id="userOriginPassword"
                            name="userOriginPassword"
                            onChange={this.changeState}
                            required={this.state.userOriginPassword != '' ||
                                this.state.userNewPassword != '' ||
                                this.state.userConfirmNewPassword != '' ? true : false}
                            type="password"
                            placeholder="請輸入原登入密碼"
                        // hidden={this.state.mode === 'editAccount' ? true : false}
                        />
                        <br />
                        <label >新密碼: </label>
                        <input
                            id="userNewPassword"
                            name="userNewPassword"
                            onChange={this.changeState}
                            required={this.state.userOriginPassword != '' ||
                                this.state.userNewPassword != '' ||
                                this.state.userConfirmNewPassword != '' ? true : false}
                            type="password"
                            placeholder="請輸入新密碼"
                        // hidden={this.state.mode === 'editAccount' ? true : false}
                        />
                        <br />
                        <label >確認密碼: </label>
                        <input
                            id="userConfirmNewPassword"
                            name="userConfirmNewPassword"
                            onChange={this.changeState}
                            required={this.state.userOriginPassword != '' ||
                                this.state.userNewPassword != '' ||
                                this.state.userConfirmNewPassword != '' ? true : false}
                            type="password"
                            placeholder="請輸入確認密碼"
                        // hidden={this.state.mode === 'editAccount' ? true : false}
                        />
                        <br />
                    </div>


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
