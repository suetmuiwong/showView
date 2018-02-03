import React from 'react';
import ReactDOM from 'react-dom';
import './GoodsDetail.scss';
import { connect } from 'react-redux';
import { Card, Flex, Button, Modal, Icon, InputItem, Stepper } from 'antd-mobile';
import { doFetch, doDispatch } from '../../commonActions/fetch';
import { MyNavBarRedux } from '../../components/common/NavBar';
import { transformCurrency, FormatUtils, transformCeil } from '../../utils/myUtil';
import Loading from '../common/Loading';
import config from '../../config/config';
import { injectIntl, FormattedMessage } from 'react-intl'; //国际化语言

const widthRem = document.documentElement.clientWidth / parseInt(document.documentElement.style.fontSize);

const alert = Modal.alert;



class GoodsDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            total: 0,
            val: 1,
        }
    }

    //渲染数据 
    componentDidMount() {

        // this.props.indexListNextPage('http://localhost:3001/api/goods/goodsDetail.json', 'post', {
        //   goodsId: 8

        // })

        const self = this;
        this.props.getGoodsDetail('http://localhost:3001/api/goods/goodsDetail.json', 'post', {
            page: this.props.goodsListObj.pageIndex,
            limit: config.pageSize,
            mdrender: 'false',
            goodsId: this.props.match.params.id.slice(1)
        })

    }

    componentDidUpdate(nextProps, nextState) {
        document.body.style.overflow = 'auto';
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('test测试')
        console.log(this.props)
        console.log(nextProps)

        return (this.props.isFetching && !nextProps.isFetching) || (this.props.data != nextProps.data);

    }
    //提交订单
    producDetailHandle() {

        let dataGoodsCount = this.props.data.goods_count;
        if (dataGoodsCount == '0') return
        let self = this;
        let orderCount = this.state.val;
        //提交订单
        this.props.submitOrder('http://192.168.21.22/cloud/pay?method=payAdd', 'post', {
            goods_id: this.props.match.params.id.slice(1),
            buy_count: orderCount,
            order_type: 0
        }, function () {
            let order_id = self.props.data['order_id'];
            self.props.history.push("/orderDetail/:" + order_id);
        })

    }

    //改变购买数量（计数器）
    onChangeNum(val) {
        this.setState({
            val
        });
        this.computeCount(val)
    }


    //计算订单价格
    computeCount(count) {
        this.props.getGoodsTotal('http://192.168.21.22/cloud/pay?method=calculate_price', 'post', {
            goods_id: this.props.match.params.id.slice(1),
            buy_count: count
        })
    }

    //商品详情返回
    goodsDetailBack() {
        this.props.changePageIndex();
        this.props.clearGoodsDetail();
        this.props.history.push("/");

    }



    render() {
        const { isFetching, data, loginObj, history, intl } = this.props;
        const { val } = this.state;
        const self = this;

        if (data.error) { //出错 
            alert(intl.formatMessage({ id: 'alertTitle' }), data.msg)
        }

        return (
            <div>
                <MyNavBarRedux page="goodsDetailPage"
                    callback={() => this.goodsDetailBack()}
                    titleName={data.goodsName}
                />

                <div>
                    <div style={{ marginBottom: '1.00rem' }}>
                        <div className='gd-img'>
                            <img src={data.goodsImage} alt="icon" />
                        </div>
                        <div className="gd-top">
                            <div style={{ flex: '1' }}>
                                <p className='gd-top-name'>{data.goodsName}</p>
                                <p className='gd-top-time'>{FormatUtils(data.goodsUptime) + '一' + FormatUtils(data.goodsDowntime)}</p>
                            </div>
                            <div className='gd-top-price'>{transformCurrency(data.currency_type)}{data.price}</div>
                        </div>
                        <div className='gd-middle-info'>
                            <div style={{ flex: '1' }}>
                                <p style={{ color: '#333333', fontSize: '0.28rem' }}>
                                    <FormattedMessage
                                        id="goodsDetailBuyCount"
                                        defaultMessage="goodsDetailBuyCount"
                                    />
                                </p>
                                <p style={{ paddingTop: '0.20rem', color: "#f52d2d", fontSize: '0.22rem' }} >
                                    <FormattedMessage
                                        id="goodsDetailTotalCount"
                                        defaultMessage="goodsDetailTotalCount"
                                    />{data.goodsStore}
                                </p>
                            </div>
                            <div style={{ height: '1.00rem', lineHeight: '1.00rem' }}>
                                <Stepper
                                    style={{ width: '100%', minWidth: '2.00rem', height: '0.60rem', lineHeight: '0.60rem' }}
                                    showNumber
                                    max={data.goods_count}
                                    min={1}
                                    defaultValue={1}
                                    onChange={(val) => this.onChangeNum(val)}
                                />
                            </div>
                        </div>

                        <div className='gd-middle-msg' >
                            <p>
                                <FormattedMessage
                                    id="goodsDetailMsg"
                                    defaultMessage="goodsDetailMsg"
                                />
                            </p>
                        </div>
                        <div className='gd-middle-detail' >
                            <div className='gd-middle-typename'>
                                <div style={{ flex: '1' }}>
                                    <span style={{ color: '#333333', fontSize: '0.28rem' }}>
                                        <FormattedMessage
                                            id="goodsDetailTypeName"
                                            defaultMessage="goodsDetailTypeName"
                                        />
                                    </span>
                                </div>
                                <div className='gd-info'>
                                    <span>{data.goodsName}</span>
                                </div>
                            </div>
                            <div className='gd-middle-servicetime'>
                                <div style={{ flex: '1' }}>
                                    <span style={{ color: '#333333', fontSize: '0.26rem' }}>
                                        <FormattedMessage
                                            id="goodsDetailServiceTime"
                                            defaultMessage="goodsDetailServiceTime"
                                        />
                                    </span>
                                </div>
                                <div className='gd-info' >
                                    <span>{data.goodsBuycount} <FormattedMessage
                                        id="Day"
                                        defaultMessage="Day"
                                    /></span>
                                </div>
                            </div>
                            <div className='gd-middle-typename'>
                                <div style={{ flex: '1' }}>
                                    <span style={{ color: '#333333', fontSize: '0.26rem' }}>
                                        <FormattedMessage
                                            id="goodsDetailServiceLength"
                                            defaultMessage="goodsDetailServiceLength"
                                        />
                                    </span>
                                </div>
                                <div className='gd-info'>
                                    <span>{data.goodsElement}</span>
                                </div>
                            </div>
                        </div>
                        <div className='gd-bottom-des'>
                            <p className='gd-bottom-title'>
                                <FormattedMessage
                                    id="goodsDetailgoodsDescribe"
                                    defaultMessage="goodsDetailgoodsDescribe"
                                />
                            </p>
                            <p className='goodsDetaildescride'>{data.goodsBrief}</p>
                        </div>
                    </div>
                    <div className='gd-bottom-price'>
                        <div style={{ flex: '1' }}>
                            <span style={{ color: '#fe2727', fontSize: '0.30rem', paddingLeft: '0.30rem' }}>
                                <FormattedMessage
                                    id="goodsDetaildiscountPrice"
                                    defaultMessage="goodsDetaildiscountPrice"
                                />
                                {transformCurrency(data.currency_type) + data.discountPrice}
                            </span>
                            <span className='gd-bottom-op' style={{}}>
                                <FormattedMessage
                                    id="goodsDetailOriginPrice"
                                    defaultMessage="goodsDetailOriginPrice"
                                />
                                {transformCurrency(data.currency_type) + data.originalPrice}
                            </span>
                        </div>

                        <div style={{ width: '2.70rem', backgroundColor: data.goods_count == '0' ? '#888888' : '#009cff', textAlign: 'center' }} onClick={() => this.producDetailHandle()}>
                            <span className='gd-bottom-bybtn' >
                                <FormattedMessage
                                    id="goodsDetailBuyBtn"
                                    defaultMessage="goodsDetailBuyBtn"
                                />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        )



    }
}

const GoodsDetailRedux = connect((state, mapStateToProps, mapActionCreators) => ({
    data: state.goodsDetail,
    isFetching: state.isFetching.isFetching,
    goodsListObj: state.goodsListObj
}), (dispatch) => ({
    getGoodsDetail: (url, type, json) => {
        dispatch(doFetch(url, type, json, '_GOODS_DETAIL'))
    },
    getGoodsTotal: (url, type, json) => {
        dispatch(doFetch(url, type, json, '_GOODS_TOTAL'))

    },
    submitOrder: (url, type, json, callback) => {
        dispatch(doFetch(url, type, json, '_SUBMIT_ORDER', callback));
    },
    changeCount: (count) => {
        dispatch(doDispatch({ count: count }, {}, 'CHANGE_GOODS_COUNT'))
    },
    changePageIndex: () => {
        dispatch(doDispatch({}, {}, 'HISTORY_BACK'))
    },
    clearGoodsDetail: () => {
        dispatch(doDispatch({}, {}, 'CLEAR_GOODS_DETAIL'))
    }

}))(injectIntl(GoodsDetail));

export default GoodsDetailRedux;

