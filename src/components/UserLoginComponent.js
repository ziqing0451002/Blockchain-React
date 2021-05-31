import React from 'react';
import UserService from '../service/UserService'
import UserListComponent from '../components/UserListComponent'
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
            username: "",
            password: "",
            redirect: false
        }
        // this.login = this.login.bind(this);
    }

    handleChange = (e) => {

        this.setState({
            [e.target.id]: e.target.value
        })

        // console.log(e.target.id)
        // if (e.target.id === "username"){
        //     this.setState({
        //         username: e.target.value
        //     })
        // }else if(e.target.id === "password"){
        //     this.setState({
        //         password: e.target.value
        //     })
        // }


    }

    userLogin = () => {
        UserService.userLogin(this.state).then((response) => {
            console.log(response);
            console.log(response.data);
            localStorage.setItem('jwt_token',response.data.jwt)
            console.log(localStorage.getItem('jwt_token'));
            console.log("SUCCESS");
            this.setState({ redirect: true })
        }
        ).catch((err) => {
            console.log(err);
            window.alert("帳號或密碼錯誤")

            

            // this.setState({ redirect: false })
        })
    }
    createAccount = () => {
        window.alert("跳轉建立帳號畫面")
    }
    forgetPassword = () => {

    }


    render() {
        // console.log(this.state.redirect)
        if (this.state.redirect) {
            var path = {
                pathname: '/UserListController',
                state: this.state.username
            }
            return <Redirect push to={'/UserListController'} />;
            //   return <Redirect push to={'/UserListController/'}/>;
            // return <Link to='/UserListController' component={UserListComponent} />;
        }
        return (
            <div>
                <h1>連線帳號登入</h1>

                <label>帳號：</label>
                <input
                    id="username"
                    onChange={(e) => this.handleChange(e)}
                    value={this.state.username}
                />
                <br />
                <label>密碼：</label>
                <input type="password"
                    id="password"
                    onChange={(e) => this.handleChange(e)}
                    value={this.state.password}
                />
                <br />
                <button onClick={this.userLogin}>確認</button>
                {/* <button onClick={this.createAccount}>建立帳號</button> */}
                {/* <button onClick={this.forgetPassword}>忘記密碼</button> */}

            </div>


        )
    }

}


export default UserLoginComponent