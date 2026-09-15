import type { AxiosResponse } from "axios";
import { apiClient } from "./client";
import type { LoginResponse } from "./types";

class AuthApi {
    static login(
        email: string,
        password: string
    ): Promise<AxiosResponse<LoginResponse>> {
        return apiClient.post("/auth/login", {
            email,
            password,
        });
    }
}

export default AuthApi;
