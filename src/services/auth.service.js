import api from "./api";
import axios from "axios";
import TokenService from "./token.service";

export const generateAccessTokenAPI = async () => {
    try {
        const postdata = {
            "refreshToken": process.env.REACT_APP_REFRESH_TOKEN,
            "teamId": process.env.REACT_APP_TEAM_ID
        }
        const res = await axios.post(`${process.env.REACT_APP_API_TOKEN_ENDPOINT_URL}/token`, postdata)
        if(res.data.access_token) {
            TokenService.setUser({
                refreshToken:process.env.REACT_APP_REFRESH_TOKEN,
                accessToken:res.data.access_token
            });
        }
        return res.data;
    } catch (err) {
        throw('Something is wrong!');
    }
};

export const logout = () => {
    TokenService.removeUser();
}
