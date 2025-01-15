import {AxiosInstance, AxiosResponse} from "axios";
import {UserLoginTypes, UserRegisterTypes,} from "@/app/shared/api/user/user.types";

export class UserService {
    private axiosClassic: AxiosInstance;

    constructor(axiosClassic: AxiosInstance) {
        this.axiosClassic = axiosClassic;
    };

    async login(data: UserLoginTypes): Promise<AxiosResponse<{ user: UserLoginTypes }>>
    {
        return this.axiosClassic.post<{ user: UserLoginTypes }>("auth/login",
            data,
            {
                withCredentials: true
            }
        );
    };

    async register(data: UserRegisterTypes): Promise<AxiosResponse<{ user: UserRegisterTypes }>>
    {
        return this.axiosClassic.post<{ user: UserRegisterTypes }>("auth/register",
            data,
            { withCredentials: true}
        );
    };
}