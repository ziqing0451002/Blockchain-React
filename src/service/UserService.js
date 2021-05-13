import axios from 'axios'

const USERINFO_REST_API_URL = 'http://localhost:8000/api/account'

class UserService{
    getUser(){
        return axios.get(USERINFO_REST_API_URL + "/getAccounts");
    }

    AddUser(jsonInput){
        return axios.post(USERINFO_REST_API_URL + "/createAccount", jsonInput);
    }

    userLogin(userAccount,userPassword){
        //http://localhost:8000/api/account/userLogin/AA001?userPassword=1234
        return axios.get(USERINFO_REST_API_URL + "/userLogin/" + userAccount + "?userPassword=" + userPassword)
    }

    // editUser(userAccount,userName,userEmail,serviceName,agenciesName,status){
    //     //http://localhost:8000/api/account/updateAccountInfo/AA008?userName=子慶&userEmail=ziqing.liu@tradevan.com.tw&serviceName=修改測試&agenciesName=關貿網路&status=statusOFF
    //     return axios.post(USERINFO_REST_API_URL + "/updateAccountInfo/" + userAccount + "?userPassword=" + userPassword);
    // }

    deleteUser(userAccount,userPassword){
        //http://localhost:8000/api/account/deleteAccount/BB111?userPassword=1234
        // return axios.post(USERINFO_REST_API_URL + "/deleteAccount" + "/${userAccount}?" + "userPassword=${userPassword}");
        return axios.delete(USERINFO_REST_API_URL + "/deleteAccount/" + userAccount + "?userPassword=" + userPassword);
    }
}

export default new UserService();