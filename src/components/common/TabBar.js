import React, { Component, PropTypes } from 'react'
import { TabBar, Icon } from 'antd-mobile';
import { connect } from 'react-redux';
import './TabBar.scss';


class MyTabBar extends React.Component {
    // renderContent(pageText) {
    //     return (
    //         <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
    //             <div style={{ paddingTop: 60 }}>你已点击“{pageText}” tab， 当前展示“{pageText}”信息</div>
    //             <a style={{ display: 'block', marginTop: 40, marginBottom: 600, color: '#108ee9' }} onClick={(e) => {
    //                 e.preventDefault();
    //                 this.setState({
    //                     hidden: !this.state.hidden,
    //                 });
    //             }}
    //             >
    //                 点击切换 tab-bar 显示/隐藏
    //             </a>
    //         </div>
    //     );
    // }


    render() {
        const { selectedTab, changeTab, page, history } = this.props;
        return (

            <TabBar
                unselectedTintColor="#949494"
                tintColor="#33A3F4"
                barTintColor="white"
                height="0.85rem"
            >
                <TabBar.Item
                    title="商品"
                    key="商品"
                    icon={
                        <div style={{
                            width: '0.45rem',
                            height: '0.45rem',
                            background: 'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  100% 100% no-repeat'
                        }}
                        />
                    }
                    selectedIcon={
                        <div style={{
                            width: '0.45rem',
                            height: '0.45rem',
                            background: 'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  100% 100% no-repeat'
                        }}
                        />
                    }
                    selected={page === 'goodsListPage'}
                    onPress={() => {

                        changeTab('goodsListPage');
                        history.push('/');
                    }}
                    data-seed="logId"
                >
                    {/*{this.renderContent('')}*/}
                </TabBar.Item>
                <TabBar.Item
                    icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg' }}
                    selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg' }}
                    title="订单"
                    key="订单"
                    selected={page === 'ordersListPage'}
                    onPress={() => {
                        console.log(this.props)
                        console.log(history)
                        changeTab('ordersListPage');
                        history.push('/ordersList');
                    }}
                // data-seed="logId1"
                >
                    {/*{this.renderContent('')}*/}
                </TabBar.Item>
                <TabBar.Item
                    icon={<div style={{
                        width: '0.45rem',
                        height: '0.45rem',
                        background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  100% 100% no-repeat'
                    }}
                    />
                    }
                    selectedIcon={<div style={{
                        width: '0.45rem',
                        height: '0.45rem',
                        background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  100% 100% no-repeat'
                    }}
                    />
                    }
                    title="申诉"
                    key="申诉"
                    selected={page === 'favTab'}
                    onPress={() => {
                        changeTab('favTab');
                        history.push('/Fav');
                    }}
                // data-seed="logId1"
                >
                    {/*{this.renderContent('')}*/}
                </TabBar.Item>
                <TabBar.Item
                    icon={
                        <div style={{
                            width: '0.45rem',
                            height: '0.45rem',
                            background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  100% 100% no-repeat'
                        }}
                        />
                    }
                    selectedIcon={
                        <div style={{
                            width: '0.45rem',
                            height: '0.45rem',
                            background: 'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  100% 100% no-repeat'
                        }}
                        />
                    }

                    title="我的"
                    key="我的"
                    selected={page === 'myTab'}
                    onPress={() => {
                        changeTab('myTab');
                        history.push('/My');
                    }}
                >
                    {/*{this.renderContent('')}*/}
                </TabBar.Item>
            </TabBar>
        );
    }
}

//约束类型
MyTabBar.propTypes = {
    selectedTab: PropTypes.string.isRequired,
    changeTab: PropTypes.func.isRequired
};


//事件创造器
function actionCreate(witchTab) {
    console.log('77777777777')
    console.log(witchTab)
    console.log(MyTabBar.propTypes)
    console.log(MyTabBar.propTypes.selectedTab)
    console.log(MyTabBar.propTypes.changeTab)
    switch (witchTab) {
        case 'goodsListPage':
            return {
                type: 'CHANGE_GOODS',
                payload: { selectedTab: witchTab }
            }
            break;
        case 'ordersListPage':
            return {
                type: 'CHANGE_ORDER',
                payload: { selectedTab: witchTab }
            }
            break;
        default:
            return {
                type: 'CHANGE_TAB',
                payload: { selectedTab: witchTab }
            }
            break;
    }



}


//关联redux
const
    MyTabBarRedux = connect((state) => ({
        selectedTab: state.selectedTab
    }), (dispatch) => ({
        changeTab: (witchTab) => dispatch(actionCreate(witchTab))
    }))(MyTabBar);

export { MyTabBarRedux }


//以上是简洁的写法，便于看我源码的人理解，下面贴出拆分的写法

// 映射redux state到属性
// function mapStateToProps(state) {
//     return {
//         selectedTab: state.selectedTab
//     }
// }
//
// 映射redux action到属性
// function mapDispatchToProps(dispatch) {
//     return {
//         changeTab: (witchTab) => dispatch(actionCreate(witchTab))
//     }
// }
//
// const MyTabBarRedux = connect(mapStateToProps,mapDispatchToProps)(MyTabBar);



