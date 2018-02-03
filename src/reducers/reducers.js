import { combineReducers } from 'redux';
import { localItem, removeLocalItem } from '../utils/myUtil';
const reducers = combineReducers({
    isFetching: fetchingReducer, //全局异步fetching管理
    registerObj: registerReducer, //注册账号
    loginObj: loginReducer, //登录验证
    selectedTab: myTabBarReducer,//切换的Tab
    goodsListObj: goodsListReducer,//主页列表对象(商品列表)
    goodsDetail: goodsDetailReducer, //商品详情内容



    orderDetail: getOrderDetailReducer, //商品支付订单详情（未支付）
    orderPayed: getorderPayedReducer, //商品支付订单详情（已支付）
    ordersListObj: ListAllRedux,//主页列表对象(商品列表) 全部订单部分
    appealsObj: AppealsRedux,//商品申诉列表
    appealsListObj: AppealsListRedux, //商品具体订单申诉列表
    appealsDetail: appealsDetailReducer, //提交申诉详情
    requestidNonce: requestidNonceReducer, //登录验证
    accessTokenObj: accessTokenReducer,//token




});


//全局异步fetchingReduce
function fetchingReducer({ isFetching, fetchingNum } = { isFetching: false, fetchingNum: 0 }, action) {
    switch (action.type) {
        case ((action.type.match(/FETCH_REQUEST_.*/) || [])[0]):
            return {
                isFetching: true,
                fetchingNum: fetchingNum + 1
            };
        case ((action.type.match(/(FETCH_SUCCESS_|FETCH_FAILED_).*/) || [])[0]):
            return (fetchingNum == 1) ?
                {
                    isFetching: false,
                    fetchingNum: fetchingNum - 1
                }
                :
                {
                    isFetching: true,
                    fetchingNum: fetchingNum - 1
                };
        default:
            return { isFetching, fetchingNum };
    }
}


//注册账号
function registerReducer({ isRegister } = {
    isRegister: false
}, action) {
    switch (action.type) {
        case 'FETCH_REQUEST_REGISTER':
            return {
                isRegister: false
            };
        case 'FETCH_SUCCESS_REGISTER':
            return {
                isRegister: action.payload.success
            };
        case 'FETCH_FAILED_REGISTER':
            return {
                isRegister: false
            };
        default:
            return {
                isRegister
            };
    }

}


//处理登录状态的Reducer
function loginReducer({ isLogin } = {
    isLogin: false,
}, action) {
    switch (action.type) {
        case 'FETCH_REQUEST_LOGIN':
            return {
                isLogin: false
            };
        case 'FETCH_SUCCESS_LOGIN':
            return {
                isLogin: action.payload.success
            };
        case 'FETCH_FAILED_LOGIN':
            return {
                isLogin: false
            };
        default:
            return {
                isLogin
            };
    }
}

//处理点击Tab后全局数据变化的Reducer 暂时只是个样子
function myTabBarReducer(selectedTab = 'goodsListPage', action) {
    console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^6')
    console.log(action.type)
    switch (action.type) {
        case 'CHANGE_GOODS':
            return action.payload.selectedTab;
        case 'CHANGE_ORDER':
            return action.payload.selectedTab;
        default:
            return 'goodsListPage';
    }
}




//全局跟GoodsList有关的逻辑Reducer
function goodsListReducer({ goodsList, isFetching, pageIndex, start, pageSize, scrollTop, hasMore } = {
    goodsList: [],
    isFetching: false,
    pageIndex: 1,
    start: 0,
    pageSize: 10,
    scrollTop: 0,
    hasMore: true
}, action) {
    switch (action.type) {
        case 'FETCH_REQUEST_GOODS_LIST':
            return Object.assign({}, {
                goodsList: goodsList,
                isFetching: true,
                pageIndex: pageIndex,
                start,
                pageSize,
                scrollTop: scrollTop
            });
        case 'FETCH_SUCCESS_GOODS_LIST':
            return Object.assign({}, {
                goodsList: goodsList.concat(action.payload.list),
                isFetching: false,
                pageIndex: pageIndex + 1,
                start: (() => {
                    return pageSize * (pageIndex - 1) + pageSize

                })(),
                pageSize: pageSize,
                scrollTop,
                hasMore: (() => {
                    if ((pageIndex * pageSize) >= action.payload.count) {
                        return false;
                    }
                    return true
                })()
            });
        case 'FETCH_FAILED_GOODS_LIST':
            return Object.assign({}, {
                goodsList: goodsList,
                isFetching: false,
                pageIndex: pageIndex - 1,
                start,
                pageSize,
                scrollTop: scrollTop
            }, {
                    error: true,
                    msg: action.payload.error_description
                });
        case 'CLEAR_GOODS_LIST':
            return Object.assign({}, {
                goodsList: [],
                isFetching: false,
                pageIndex: 1,
                start: 0,
                pageSize: 10,
                scrollTop: 0,
                hasMore
            });
        case 'HISTORY_BACK':
            if (pageIndex == 1) {
                return Object.assign({}, {
                    goodsList,
                    isFetching,
                    pageIndex,
                    start,
                    pageSize,
                    scrollTop,
                    hasMore
                })
            }
            return Object.assign({}, {
                goodsList: goodsList,
                isFetching: false,
                pageIndex: pageIndex - 1,
                start: start - pageSize,
                pageSize,
                scrollTop: scrollTop,
                hasMore: hasMore
            });
        default:
            return Object.assign({}, {
                goodsList,
                isFetching,
                pageIndex,
                start,
                pageSize,
                scrollTop,
                hasMore
            });
    }
}


//处理商品详情的Reducer;
function goodsDetailReducer(goodsDetail = {}, action) {

    switch (action.type) {
        case 'FETCH_REQUEST_GOODS_DETAIL':
            return {};
        case 'FETCH_SUCCESS_GOODS_DETAIL':
            return Object.assign({}, action['payload'].list);
        case 'FETCH_FAILED_GOODS_DETAIL':
            return Object.assign({}, goodsDetail, { error: true, msg: action.payload.error_description });
        case 'FETCH_REQUEST_GOODS_TOTAL':
            return Object.assign({}, goodsDetail);
        case 'FETCH_SUCCESS_GOODS_TOTAL':
            return Object.assign({}, goodsDetail, { origin_price: action.payload.origin_price, discount_price: action.payload.discount_price });
        case 'FETCH_FAILED_GOODS_TOTAL':
            return Object.assign({}, goodsDetail, { error: true, msg: action.payload.error_description });
        case 'FETCH_REQUEST_SUBMIT_ORDER':
            return Object.assign({}, goodsDetail);
        case 'FETCH_SUCCESS_SUBMIT_ORDER':
            return Object.assign({}, goodsDetail, { order_id: action.payload.order_id });
        case 'FETCH_FAILED_SUBMIT_ORDER':
            return Object.assign({}, goodsDetail, { error: true, msg: action.payload.error_description });
        case 'CHANGE_GOODS_COUNT':
            return Object.assign({}, goodsDetail, { goods_count: action.payload.count });
        case 'CLEAR_GOODS_DETAIL':
            return {};
        default:
            return Object.assign({}, goodsDetail);
    }
}



//处理支付订单详情(未支付)的Reducer; 
function getOrderDetailReducer(orderDetail = {}, action) {
    // let newArticleContent = Object.assign({}, articleContent, { thingToChange });
    switch (action.type) {

        //获取订单详情
        case 'FETCH_REQUEST_ORDER_DETAIL':
            return {};
        case 'FETCH_SUCCESS_ORDER_DETAIL':
            return Object.assign({}, action['payload'], { pay_type: 1 });
        case 'FETCH_FAILED_ORDER_DETAIL':
            return Object.assign({}, orderDetail, { error: true, msg: action.payload.error_description });
        //订单支付
        case 'FETCH_REQUEST_ORDER_PAY':
            return Object.assign({}, orderDetail);
        case 'FETCH_SUCCESS_ORDER_PAY':
            return Object.assign({}, orderDetail, { order_sign: action.payload.order_sign });
        case 'FETCH_FAILED_ORDER_PAY':
            return Object.assign({}, orderDetail);
        //取消订单
        case 'FETCH_REQUEST_ORDER_CANCEL':
            return Object.assign({}, orderDetail);
        case 'FETCH_SUCCESS_ORDER_CANCEL':
            return Object.assign({}, orderDetail, { del_status: action.payload.del_status });
        case 'FETCH_FAILED_ORDER_CANCEL':
            return Object.assign({}, orderDetail);
        //改变支付类型
        case 'CHANGE_PAY_TYPE':
            return Object.assign({}, orderDetail, { pay_type: action.payload.type });
        // 请求错误，弹出错误原因
        // case 'FETCH_ERROR_ORDER_DETAIL':
        //     //alert('温馨提示', action.payload.error_description);
        //     return Object.assign({}, orderDetail,{error:true});
        default:
            return Object.assign({}, orderDetail);
    }
}

//处理支付订单详情(已支付)的Reducer;

function getorderPayedReducer(orderPayed = {}, action) {
    switch (action.type) {

        case 'FETCH_REQUEST_ORDER_PAYED':
            return {};
        case 'FETCH_SUCCESS_ORDER_PAYED':
            return Object.assign({}, action.payload);
            return action.payload;
        case 'FETCH_FAILED_ORDER_PAYED':
            return Object.assign({}, orderPayed, { error: true, msg: action.payload.error_description });
        default:
            return Object.assign({}, orderPayed);
    }
}


//处理订单列表 ListAllRedux  的Reducer 全部订单部分;
function ListAllRedux({ ordersList, isFetching, pageIndex, start, pageSize, scrollTop, hasMore, status } = {
    ordersList: [],
    isFetching: false,
    pageIndex: 1,
    start: 0,
    pageSize: 10,
    scrollTop: 0,
    hasMore: true,
    status: null,
}, action) {
    switch (action.type) {
        case 'FETCH_REQUEST_ORDERS_LIST':
            return Object.assign({}, {
                ordersList: ordersList,
                isFetching: true,
                pageIndex: pageIndex,
                start,
                pageSize,
                scrollTop: scrollTop,
                status
            });
        case 'FETCH_SUCCESS_ORDERS_LIST':
            return Object.assign({}, {
                ordersList: ordersList.concat(action.payload.list),
                isFetching: false,
                pageIndex: pageIndex + 1,
                start: (() => {
                    return pageSize * (pageIndex - 1) + action.payload.list.length

                })(),
                pageSize: pageSize,
                scrollTop,
                status,
                hasMore: (() => {
                    if ((pageIndex * pageSize) >= action.payload.count) {
                        return false;
                    }
                    return true
                })()
            });



        case 'FETCH_FAILED_ORDERS_LIST':
            return Object.assign({}, {
                ordersList: ordersList,
                isFetching: false,
                pageIndex: pageIndex - 1,
                start,
                status,
                scrollTop: scrollTop,
            });
        case 'CLEAR_ORDERS_LIST':
            return Object.assign({}, {
                ordersList: [],
                isFetching: false,
                pageIndex: 1,
                start,
                pageSize,
                scrollTop: 0,
                hasMore,
                status
            });
        case 'ORDERS_BACK':
            if (pageIndex == 1) {
                return Object.assign({}, {
                    goodsList,
                    isFetching,
                    pageIndex,
                    start,
                    pageSize,
                    scrollTop,
                    hasMore,
                    status
                })
            }
            return Object.assign({}, {
                goodsList: goodsList,
                isFetching: false,
                pageIndex: pageIndex - 1,
                start: start - pageSize,
                pageSize,
                scrollTop: scrollTop,
                hasMore: hasMore,
                status
            });
        case "CHANGE_STATUS":
            return Object.assign({}, {
                ordersList,
                isFetching,
                pageIndex,
                start,
                pageSize,
                scrollTop,
                hasMore,
                status: action.payload
            });
        default:
            return Object.assign({}, {
                ordersList,
                isFetching,
                pageIndex,
                start,
                pageSize,
                scrollTop,
                hasMore,
                status
            });
    }
}


//处理商品申诉列表Appeals有关的逻辑Reducer
function AppealsRedux({ appeals, isFetching, pageIndex, start, pageSize, scrollTop, hasMore } = {
    appeals: [],
    isFetching: false,
    pageIndex: 1,
    start: 0,
    pageSize: 10,
    scrollTop: 0,
    hasMore: true
}, action) {

    switch (action.type) {
        case 'FETCH_REQUEST_APPEALS':
            return {
                appeals: appeals,
                isFetching: true,
                pageIndex: pageIndex,
                start,
                pageSize,
                scrollTop: scrollTop
            };
        case 'FETCH_SUCCESS_APPEALS':

            return {
                appeals: appeals.concat(action.payload.list),
                isFetching: false,
                pageIndex: pageIndex + 1,
                start: (() => {
                    return pageSize * (pageIndex - 1) + action.payload.list.length

                })(),
                pageSize: pageSize,
                scrollTop,
                hasMore: (() => {
                    console.log(pageIndex + "==" + pageSize)
                    console.log(pageIndex * pageSize + "-=-" + action.payload.count)
                    if ((pageIndex * pageSize) >= action.payload.count) {
                        return false;
                    }
                    return true
                })()
            };
        case 'FETCH_FAILED_APPEALS':
            return {
                appeals: appeals,
                isFetching: false,
                pageIndex: pageIndex - 1,
                start,
                scrollTop: scrollTop
            };
        case 'CLEAR_APPEALS':
            return {
                appeals: [],
                isFetching: false,
                pageIndex: 1,
                start,
                pageSize,
                scrollTop: 0,
                hasMore
            };
        case 'CHANGE_CURRENT_DETAIL':
            return {
                appeals,
                isFetching,
                pageIndex,
                start,
                pageSize,
                scrollTop,
                hasMore,

            };
        default:
            return {
                appeals,
                isFetching,
                pageIndex,
                start,
                pageSize,
                scrollTop,
                hasMore
            };
    }
}



//处理具体订单申诉列表AppealsList有关的逻辑Reducer
function AppealsListRedux({ appealsList, isFetching, pageIndex, start, pageSize, scrollTop, hasMore } = {
    appealsList: [],
    isFetching: false,
    pageIndex: 1,
    start: 0,
    pageSize: 10,
    scrollTop: 0,
    hasMore: true
}, action) {

    switch (action.type) {
        case 'FETCH_REQUEST_APPEALS_LIST':
            return {
                appealsList: appealsList,
                isFetching: true,
                pageIndex: pageIndex,
                start,
                pageSize,
                scrollTop: scrollTop,
            };

        case 'FETCH_SUCCESS_APPEALS_LIST':
            return {
                appealsList: appealsList.concat(action.payload.list),
                isFetching: false,
                pageIndex: pageIndex + 1,
                start: (() => {
                    return pageSize * (pageIndex - 1) + action.payload.list.length

                })(),
                pageSize: pageSize,
                scrollTop,
                hasMore: (() => {
                    if ((pageIndex * pageSize) >= action.payload.count) {
                        return false;
                    }
                    return true
                })()
            };

        case 'FETCH_FAILED_APPEALS_LIST':
            return {
                appealsList: appealsList,
                isFetching: false,
                pageIndex: pageIndex - 1,
                start,
                scrollTop: scrollTop
            };
        case 'CLEAR_APPEALS_LIST':
            return {
                appealsList: [],
                isFetching: false,
                pageIndex: 1,
                start,
                pageSize,
                scrollTop: 0,
                hasMore
            };

        default:
            return {
                appealsList,
                isFetching,
                pageIndex,
                start,
                pageSize,
                scrollTop,
                hasMore
            };

    }
}

//处理提交申诉详情Reducer

function appealsDetailReducer({ appealsDetail, show } = {
    ordersList: {},
    show: false
}, action) {

    // let newArticleContent = Object.assign({}, articleContent, { thingToChange });
    let arr = [];
    switch (action.type) {
        case 'FETCH_REQUEST_APPEALS_DETAIL':
            return {};
        case 'FETCH_SUCCESS_APPEALS_DETAIL':
            return action.payload;
        case 'FETCH_FAILED_APPEALS_DETAIL':
            return {};
        default:
            return Object.assign({}, appealsDetail);
    }
}









//处理登录状态的Reducer
function requestidNonceReducer({ isLogining, successObj } = {
    isLogining: false,
    successObj: null
}, action) {
    switch (action.type) {
        case 'FETCH_REQUEST_VERIFY':
            return {
                isLogining: true,
                successObj
            };
        case 'FETCH_SUCCESS_VERIFY':
            console.log('通过验证');
            return {
                isLogining: false,
                successObj: action.payload
            };
        case 'FETCH_FAILED_VERIFY':
            return {
                isLogining: false,
                successObj: null
            };
        default:
            return {
                isLogining,
                successObj
            };
    }
}

//处理ACCESS_TOKEN 
function accessTokenReducer(accessToken = "31.b3420c2eed67c0fa02bab79806f6d1cd.2592000.1505466073.169501926-276810", action) {

    switch (action.type) {
        case 'FETCH_REQUEST_ACCESS_TOKEN':
            return {}
        case 'FETCH_SUCCESS__ACCESS_TOKEN':
            //return {}
            console.log('成功获取');
            return { accessToken }
        case 'FETCH_FAILED_ACCESS_TOKEN':
            return {}
        case 'GET_ACCESS_TOKEN':
            //return { accessToken }
            return {}
        default:
            return {
                accessToken
            }
    }
}





export default reducers;