import axiosClient from "./axiosClient";

const userApi = {
    register(data) {
        const url = `/user/register`;
        return axiosClient.post(url,data)
    },
    verify(confirmationCode)  {
        const url = `/user/confirm`;
        return axiosClient.post(url,confirmationCode)
    },
    login(data) {
        const url = `/user/login`;
        return axiosClient.post(url,data)
    },
    loginGoogle(data) {
        const url = `/user/google_login`;
        return axiosClient.post(url,data)
    },
    loginFacebook(data) {
        const url = `/user/facebook_login`;
        return axiosClient.post(url,data)
    }
}
export default userApi