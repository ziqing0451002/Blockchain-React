import axios from 'axios'

const USERINFO_REST_API_URL = 'http://localhost:8000/api/v1/UserInfo'

class UserService{
    getUser(){
        return axios.get(USERINFO_REST_API_URL);
    }
}

export default new UserService();