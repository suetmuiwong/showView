import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import config from './config/config';
import { doFetch, doDispatch } from './commonActions/fetch';
import { localItem } from './utils/myUtil';
//组合之后的reducer
import reducer from './reducers/reducers';


const middleware = [thunk];
if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger())
}

//全局唯一的store,挂在window上方便控制台查看
window.store = createStore(
    reducer,
    // applyMiddleware(thunk)
    compose(applyMiddleware(...middleware))
);


//初次加载验证登录
//window.store.dispatch(doFetch('accesstoken', 'post', {accesstoken: localItem('accesstoken')}, '_LOGIN'));

// window.store.dispatch(doFetch('http://localhost:8880/message/nonce?method=get', 'get', {

// }, '_LOGIN'));


export default window.store;