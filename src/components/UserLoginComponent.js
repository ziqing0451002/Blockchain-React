import React from 'react';
import UserService from '../service/UserService'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { Redirect } from 'react-router';
import { ContactsOutlined } from '@material-ui/icons';



class UserLoginComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            userAccount: "",
            userPassword: "",
            redirect: false
        }
        // this.login = this.login.bind(this);
    }

    handleChange = (e) => {

        this.setState({
            [e.target.id]: e.target.value
        })

        // console.log(e.target.id)
        // if (e.target.id === "userAccount"){
        //     this.setState({
        //         userAccount: e.target.value
        //     })
        // }else if(e.target.id === "userPassword"){
        //     this.setState({
        //         userPassword: e.target.value
        //     })
        // }


    }

    userLogin = () => {
        UserService.userLogin(this.state.userAccount, this.state.userPassword).then((response) => {
            console.log(response);
            if (response.data === true) {
                // () => window.alert("SUCCESS")
                console.log("SUCCESS");
                this.setState({ redirect: true })
            }else{
                console.log(response.data);
            }
        }
        ).catch((err) => {
            console.log(err);
            // this.setState({ redirect: false })
        })
    }
    createAccount = () => {
        window.alert("跳轉建立帳號畫面")
    }
    forgetPassword = () => {

    }


    render() {
        console.log(this.state.redirect)
        if (this.state.redirect) {
            return <Redirect push to="/UserListController" />;
        }
        return (
            <div>
                <h1>連線帳號登入</h1>

                <label>帳號：</label>
                <input
                    id="userAccount"
                    onChange={(e) => this.handleChange(e)}
                    value={this.state.userAccount}
                />
                <br />
                <label>密碼：</label>
                <input type="password"
                    id="userPassword"
                    onChange={(e) => this.handleChange(e)}
                    value={this.state.userPassword}
                />
                <br />
                <button onClick={this.userLogin}>確認</button>
                <button onClick={this.createAccount}>建立帳號</button>
                {/* <button onClick={this.forgetPassword}>忘記密碼</button> */}

            </div>


        )
    }

}


export default UserLoginComponent