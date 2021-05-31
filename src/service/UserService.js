import axios from 'axios'

const USERINFO_REST_API_URL = 'http://localhost:8000/api/account'
const JWT_TOKEN = localStorage.getItem('jwt_token')
const headers = {
    'Authorization': 'Bearer ' + JWT_TOKEN,
    // "Access-Control-Allow-Origin": '*'
};

class UserService{
    getUserList(){
        console.log(localStorage.getItem('jwt_token'))
        console.log(JWT_TOKEN)
        console.log(headers)
        return axios.get(USERINFO_REST_API_URL + "/getAccounts", {headers});
    }

    getUserInfo(userAccount){
        return axios.get(USERINFO_REST_API_URL + "/getUserInfoByConnectAccount/" + userAccount , {headers});
    }

    AddUser(jsonInput){
        return axios.post(USERINFO_REST_API_URL + "/createAccount", jsonInput , {headers});
    }

    // userLogin(userAccount,userPassword){
    //     //http://localhost:8000/api/account/userLogin/AA001?userPassword=1234
    //     return axios.get(USERINFO_REST_API_URL + "/userLogin/" + userAccount + "?connectPassword=" + userPassword)
    // }
    
    //userLogin JWT
    userLogin(userLoginJson){
        console.log(userLoginJson)
        //http://localhost:8000/api/account/authenticate
        return axios.post(USERINFO_REST_API_URL + "/authenticate" ,userLoginJson) //起始登入API，不需JWT驗證
    }

    editUserPassword(userAccount,userOriginPassword,userNewPassword){
        //http://localhost:8000/api/account/updatePassword/AA008?originalUserPassword=1234&newUserPassword=1111
        return axios.put(USERINFO_REST_API_URL + "/updatePassword/" + userAccount + "?originalConnectPassword=" + userOriginPassword + "&newConnectPassword="+ userNewPassword , {headers});
    }

    editUserInfo(userAccount,userName,userEmail,serviceName,agenciesName,status,remark){
        //http://localhost:8000/api/account/updateAccountInfo/AA008?userName=子慶&userEmail=ziqing.liu@tradevan.com.tw&serviceName=修改測試&agenciesName=關貿網路&status=statusOFF
        return axios.put(USERINFO_REST_API_URL + "/updateAccountInfo/" + userAccount + "?managerName=" + userName + "&managerEmail="+ userEmail + "&serviceName="+ serviceName + "&orgName="+ agenciesName + "&status=" + status+ "&remark=" + remark , {headers});
    }    

    deleteUser(userAccount,userPassword){
        //http://localhost:8000/api/account/deleteAccount/BB111?userPassword=1234
        // return axios.post(USERINFO_REST_API_URL + "/deleteAccount" + "/${userAccount}?" + "userPassword=${userPassword}");
        return axios.delete(USERINFO_REST_API_URL + "/deleteAccount/" + userAccount + "?connectPassword=" + userPassword, {headers});
    }
}

export default new UserService();