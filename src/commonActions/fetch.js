import es6Promise from 'es6-promise';
import 'isomorphic-fetch';
es6Promise.polyfill();
import config from '../config/config';

const startFetch = (url, data, getWhat) => ({
    type: `FETCH_REQUEST${getWhat ? getWhat : ''}`,
    param: data,
    payload: url
});

const endFetch = (json, data, getWhat) => ({
    type: `FETCH_SUCCESS${getWhat ? getWhat : ''}`,
    param: data,
    payload: json
});


const errorFetch = (json, data, getWhat) => ({
    type: `FETCH_FAILED${getWhat ? getWhat : ''}`,
    param: data,
    payload: json
})

const doDispatch = (json, data, type) => ({
    type: type,
    param: data,
    payload: json
})


const doFetch = (url, type, data, getWhat, callback) => (dispatch, getState) => {
    dispatch(startFetch(url, data, getWhat));
    let query = '';
    for (let i in data) {
        query += `${i}=${data[i]}&`;
    }
    if (type == 'get') return fetch(`${config.target + url}?${query.slice(0, -1)}`).then(response=>response.json()).then(json=> {
        if (json.success)
            dispatch(endFetch(json, data, getWhat))
            if (callback) {
                callback();
            }
    }).catch(e=>{})
    if (type == 'post') return fetch(`${config.target + url}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: query.slice(0, -1)
    }).then(response=>response.json()).then(json=> {
        if (json.success) {
            dispatch(endFetch(json, data, getWhat))
            if (callback) {
                callback();
            }
        }else {
            dispatch(errorFetch(json, data, getWhat))
        }

    }).catch(e=>{});
};




export { doFetch, doDispatch };