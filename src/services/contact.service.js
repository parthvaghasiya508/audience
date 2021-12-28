import api from "./api";

export const getContactsAPI = (payload) => {
    let filterQuery = payload.filterQuery;
    let page = payload.page ? payload.page : '';
    let param = {
        page
    };

    if(filterQuery && filterQuery.enable) {
        if (filterQuery?.searchQuery) param["q"] = filterQuery?.searchQuery;
        if (filterQuery?.includeTags && filterQuery.includeTags.length > 0){
            // let tags = `['${q}']`;
            let tags = filterQuery.includeTags;
            // param["tags"] = tags;
        }
        if (filterQuery?.excludeTags && filterQuery.excludeTags.length > 0){
            let notTags = filterQuery.excludeTags;
            // param["notTags"] = notTags;
        }
        if (filterQuery?.messageSent && filterQuery.messageSent.length > 0){
            let minMessagesSent = filterQuery.messageSent[0];
            let maxMessagesSent = filterQuery.messageSent[1];
            if (minMessagesSent) param["minMessagesSent"] = minMessagesSent;
            if (maxMessagesSent) param["maxMessagesSent"] = maxMessagesSent;
        }
        if (filterQuery?.messageRecieved && filterQuery.messageRecieved.length > 0){
            let minMessagesRecieved = filterQuery.messageRecieved[0];
            let maxMessagesRecieved = filterQuery.messageRecieved[1];
            if (minMessagesRecieved) param["minMessagesRecv"] = minMessagesRecieved;
            if (maxMessagesRecieved) param["maxMessagesRecv"] = maxMessagesRecieved;
        }
    }    

    console.log("param:",param);
    
    return api.get("/contacts", {
        params: param
    });
};

export const searchContactsAPI = (payload) => {
    let q = payload.searchquery ? payload.searchquery : '';
    let page = payload.page ? payload.page : '';

    let notTags = `['${q}']`
    let tags = `['${q}']`;

    let param = { page, q };
    console.log("param:", param);
    return api.get("/contacts", {
        params: param
    });
};