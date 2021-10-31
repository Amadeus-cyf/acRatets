import axios, { AxiosResponse } from "axios";

class AuthApi {
    static login(email : string, password : string) : Promise<AxiosResponse<any>> {
        return axios.post('/api/auth/login', {
            email : email,
            password: password,
        });
    }
}

export default AuthApi;