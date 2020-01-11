import React, { Component } from 'react';
// import StickyHeader from "./MemberBuy/StickyHeader";
import Top from "../components/MemberBuy/Top"
import Search from "../components/MemberBuy/Search"
import FiveList from "../components/MemberBuy/FiveList"
import ThreeList from "../components/MemberBuy/ThreeList"
import Swipe from "../components/MemberBuy/Swipe"
import TabsList from "../components/MemberBuy/TabsList"
import _Tabs from "../components/MemberBuy/Tabs"

import {
    Animated,
    StyleSheet,
    View,
    Text,
    ScrollView,
    RefreshControl,
    Image,
    Dimensions,
    ActivityIndicator
} from 'react-native'
const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 100;

export default class MovieListScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            scrollY: new Animated.Value(0),
            headHeight: -1,
            tabs: [],
            banners: [],
            goodList: [],
            playList: [],
            blocks: [],
            page: {},
            tabChange: true,
            isloading: true,
            scrollTop: {}

        };
    }

    render() {
        if (this.state.isloading) {
            return <ScrollView
                style={{ padding: 10, paddingTop: 0 }}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        colors={["#fb7b9e"]}
                    />}></ScrollView>
        }
        return (
            <ScrollView
                style={{ padding: 10, paddingTop: 0 }}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}
                        colors={["#fb7b9e"]}
                    />}
                ref={component => this._scrollView = component}
                onScrollEndDrag={this.handleScrollEnd}
                onScroll={this.isTab}
                // scrollEventThrottle={1}
                stickyHeaderIndices={[1]}
            >

                <View onLayout={(e) => {
                    let { height } = e.nativeEvent.layout;
                    this.setState({ headHeight: height }); // 给头部高度赋值
                }}>
                    <Search></Search>
                    <FiveList list={this.state.tabs}></FiveList>
                    <ThreeList></ThreeList>
                    <Swipe banners={this.state.banners} renderPage={this.renderPage} ></Swipe>
                </View>
                <_Tabs tabs={{ changePage0: this.changePage0, changePage1: this.changePage1, tabChange: this.state.tabChange }}></_Tabs>
                <TabsList style={{ width: "100%" }} list={{ goodList: this.state.goodList, playList: this.state.playList, tabChange: this.tabChange, page: this.state.page }}></TabsList>
            </ScrollView>
        )
    }

    scrollTop = (event) => {
        this.setState(
            {
                scrollTop: event.nativeEvent.contentOffset.y
            }
        )
    }
    _onRefresh = () => {
        this.setState({
            refreshing: true,
        });
        this.lodowMore()
        this.updata()
        setTimeout(() => {
            this.lodowMore()
        }, 50);
        this.setState({ refreshing: false });
    }
    updata = () => {
        this.setState({
            goodList: [],
            playList: [],
        })
    }
    changePage0 = () => {

        this.setState({
            page: 0
        })
    }
    changePage1 = () => {
        this.setState({
            page: 1
        })
    }
    tabChange = () => {
        this.setState({
            page: {}
        })
        if (this.state.tabChange == true) {
            this.setState({
                tabChange: false
            })
        } else {
            this.setState({
                tabChange: true
            })
        }
        setTimeout(() => {
            this.resScrollTop()
        }, 20);

    }
    resScrollTop() {
        if (this.state.scrollTop > 310) {
            this._scrollView.scrollWithoutAnimationTo(310, 0);
        }
    }
    componentDidMount() {
        this.lodowMore()
        this.setState({
            refreshing: true
        })
        setTimeout(() => {
            this.lodowMore()
        }, 50);
    }

    lodowMore = () => {
        fetch("https://mall.bilibili.com/mall-c/home/index/v2?mVersion=17").then(res => res.json())
            .then(data => {
                this.setState((state) => {
                    return {
                        tabs: data.data.vo.tabs,
                        banners: data.data.vo.banners,
                        blocks: data.data.vo.blocks,
                        goodList: state.goodList.concat(data.data.vo.feeds.list.slice(0, 4)),
                        playList: state.playList.concat(data.data.vo.feeds.list),
                        isloading: false,
                        refreshing: false
                    }
                })
            })
    }
    renderPage(image, index) {
        return (
            <View key={index}>
                <Image style={{ width: BannerWidth, height: BannerHeight }} source={{ uri: `http:${image.pic}` }} />
            </View>
        );
    }
    handleScrollEnd = (event) => {
        const contentHeight = event.nativeEvent.contentSize.height;
        const scrollViewHeight = event.nativeEvent.layoutMeasurement.height;
        const scrollOffset = event.nativeEvent.contentOffset.y;
        const isEndReached = scrollOffset + scrollViewHeight >= contentHeight - 10; // 是否滑动到底部
        const isContentFillPage = contentHeight >= scrollViewHeight; // 内容高度是否大于列表高度 
        if (isContentFillPage && isEndReached) {
            this.lodowMore()
            this.lodowMore()

        }
    };
}
const styles = StyleSheet.create({
});