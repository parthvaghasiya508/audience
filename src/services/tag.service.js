import api from "./api";

export const getTagsAPI = () => {    
    return api.get("/tags");
};
