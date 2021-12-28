import { GET_TAGS } from './tag.types';
import { getTagsAPI } from '../../services/tag.service';

export const getTags = (param) => async(dispatch) => {
    try {
        let res = await getTagsAPI(param);
        dispatch({ type: GET_TAGS, payload: res.data.tags });
    } catch (error) {
        console.log("error",error.message);
    }   
}