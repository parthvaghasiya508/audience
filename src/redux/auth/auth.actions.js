import { TOKEN } from './auth.types';
import { generateAccessTokenAPI } from '../../services/auth.service';

export const generateAccessToken = (payload) => async (dispatch) => {
    try {
        let res = await generateAccessTokenAPI();
        console.log("auth token",res.data);
    } catch (error) {
        console.log("error",error.message);
    }
};