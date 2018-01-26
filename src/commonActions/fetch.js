import es6Promise from 'es6-promise';
import 'isomorphic-fetch';
es6Promise.polyfill();
import config from '../config/config';
import md5 from '../static/md5.js';

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

const doDispatch = (json, data, type) => ({
    type: type,
    param: data,
    payload: json
})


const doFetch = (url, type, data, getWhat) => (dispatch, getState) => {
    dispatch(startFetch(url, data, getWhat));
    let query = '';
    for (let i in data) {
        query += `${i}=${data[i]}&`;
    }
    if (type == 'get') return fetch(`${config.target + url}?${query.slice(0, -1)}`).then(response=>response.json()).then(json=> {
        if (json.success)
            dispatch(endFetch(json, data, getWhat))
    }).catch(e=>{})
    if (type == 'post') return fetch(`${config.target + url}`, {
        method: "POST",
        cors:"no-cors",
        credentials: 'include',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: query.slice(0, -1)
    }).then(response=>response.json()).then(json=> {
        console.log('^^^^^^^')
        console.log(json)
        if (json.success) {
            console.log('&&&&&&')
            console.log(json)
            dispatch(endFetch(json, data, getWhat))
        }
        else {
            dispatch({
                type:`FETCH_FAILED${getWhat}`
            })
        }

    }).catch(e=>{});
};




export { doFetch, doDispatch };