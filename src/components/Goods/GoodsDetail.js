import React from 'react';
import ReactDOM from 'react-dom';
//import './GoodsDetail.scss';
import { connect } from 'react-redux';
import { Button, WhiteSpace, WingBlank } from 'antd-mobile';
import { doFetch, doDispatch } from '../../commonActions/fetch';
import { MyNavBarRedux } from '../../components/common/NavBar';
import { transformCurrency, FormatUtils, transformCeil } from '../../utils/myUtil';
import Loading from '../common/Loading';
import config from '../../config/config';
import { FormattedMessage } from 'react-intl'; //国际化语言

const widthRem = document.documentElement.clientWidth / parseInt(document.documentElement.style.fontSize);




class GoodsDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            total: 0,
            val: 1,
        }
    }
    //渲染数据 componentWillMount(原来的)

    componentDidMount() {
        console.log('66666')
        console.log(this.props)
        const self = this;
        // const { requestidNonceReducer } = this.props;
        this.props.getGoodsDetail('http://openapi.dvr163.com/cloud/goods?method=getGoods', 'post', {
            page: this.props.goodsListObj.pageIndex,
            limit: config.pageSize,
            mdrender: 'false',
            goods_id: this.props.match.params.id.slice(1)
        }, function () {
            self.computeCount(1)
        })





    }


    componentDidUpdate(nextProps, nextState) {
        document.body.style.overflow = 'auto';


    }

    shouldComponentUpdate(nextProps, nextState) {


        return (this.props.isFetching && !nextProps.isFetching) || (this.props.data.discount_price != nextProps.data.discount_price) || (this.props.data.origin_price != nextProps.data.origin_price);

    }
    //提交订单
    producDetailHandle() {

        let dataGoodsCount = this.props.data.goods_count;

        if (dataGoodsCount == '0') return


        let self = this;
        let orderCount = this.state.val;
        //console.log(orderCount)
        //提交订单
        this.props.submitOrder('http://openapi.dvr163.com/cloud/pay?method=payAdd', 'post', {
            goods_id: this.props.match.params.id.slice(1),
            //buy_count: this.props.data.goods_count ? this.props.data.goods_count : 1,
            buy_count: orderCount,
            order_type: 0, //订单类型 0：新购买云存服务 1：续费云存服务 默认为0
            //access_token: '31.30960ae97904f128e2d0f4574f9a763d.2592000.1508114839.1011543187-276810'
            //eseeid	是	string	续费时必选参数 设备id
            //channel	是	int	续费时必选参数 设备通道

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
        this.props.getGoodsTotal('http://openapi.dvr163.com/cloud/pay?method=calculate_price', 'post', {
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
        const { isFetching, data, loginObj, history } = this.props;
        const { val } = this.state;

        // if (isFetching) {

        //     return (<div><MyNavBarRedux page="goodsDetailPage" titleName={data.goods_name} /><Loading /></div>);
        // }

        console.log(data)

        const self = this;

        return (
            <div>


                {
                    isFetching && <Loading />
                }

                <Button>default</Button><WhiteSpace />
                <Button disabled>default disabled</Button><WhiteSpace />




            </div>
        )



    }
}

const GoodsDetailRedux = connect((state) => ({
    data: state.goodsDetail,
    isFetching: state.isFetching.isFetching,
    goodsListObj: state.goodsListObj
}), (dispatch) => ({
    getGoodsDetail: (url, type, json, callback) => {
        dispatch(doFetch(url, type, json, '_GOODS_DETAIL', callback))
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

}))(GoodsDetail);

export default GoodsDetailRedux;


