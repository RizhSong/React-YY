import React, { Component } from 'react';
import Carousel from 'react-native-banner-carousel';
import { StyleSheet, Image, View, Text, Dimensions, ScrollView } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body, Right, Badge } from 'native-base';
import BanItem from '../../components/BanItem'
import GuoItem from '../../components/GuoItem'


const BannerWidth = (Dimensions.get('window').width * 0.96);
const BannerHeight = 180;
//轮播图片数据
const images = [
    "http://i0.hdslb.com/bfs/bangumi/a085f60bda7f18226accf3993b328e17f419c00d.jpg",
    "http://i0.hdslb.com/bfs/bangumi/8c39135d5191acbe0f0108ede3dbc76b6342cd36.jpg",
    "http://i0.hdslb.com/bfs/bangumi/105c45fa8538c897e85e44f3811eda2de2d79b85.jpg",
    "http://i0.hdslb.com/bfs/bangumi/20429c37693f67e5310f3b4d02f96c2b7403a6ec.jpg"
];
const texts = [
    "FGO动画专题页",
    "少女前线 人形小剧场：第9话",
    "风起绿林",
    "【一周资讯】第37期"
];

//导航栏图标资源
const icons = [
    "http://i0.hdslb.com/bfs/bangumi/125ba229db0dcc3b5a9fe110ba3f4984ddc2c775.png",
    "http://i0.hdslb.com/bfs/bangumi/2c782d7a8127d0de8667321d4071eebff01ea977.png",
    "http://i0.hdslb.com/bfs/bangumi/7a7d9db1911b7cbfdad44ae953dd5acc49ef5187.png",
    "http://i0.hdslb.com/bfs/bangumi/76c03a7ca20815765c7f5bc17d320e0676e15a20.png",
    "http://i0.hdslb.com/bfs/bangumi/e713a764f9146b73673ba9b126d963aa50f4fc3b.png",
];
const iconTexts = [
    "国创",
    "番剧",
    "时间表",
    "索引",
    "热门榜单"
];

class Bangumi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            y:0
        }
    }

    //渲染轮播图片
    renderPage(image, index) {
        let count = index;
        return (
            <View key={index}>
                <Text style={{ position: "absolute", left: 10, bottom: 3, zIndex: 100, color: '#FFF', fontWeight: "bold" }}>{texts[count]}</Text>
                <Image style={{ width: BannerWidth, height: BannerHeight }} source={{ uri: image }} />
            </View>
        );

    }

    // 滑动触发
    _onScroll=(e)=>{
        // 获取滑动的距离
        let { y } = e.nativeEvent.contentOffset;
        // console.log("y的值"+y)
        this.setState({
            y
        })
        
    }
    

    render() {
        return (
            <View style={{ position: "relative", backgroundColor: "#F5F5F5" }} >
                <ScrollView
                    onScroll={this._onScroll}
                >
                    {/* 轮播图片 */}
                    <View style={styles.container}>
                        <Carousel
                            autoplay
                            autoplayTimeout={5000}
                            loop
                            index={0}
                            pageSize={BannerWidth}
                            pageIndicatorContainerStyle={{ position: "absolute", right: 10, bottom: 10 }}
                            pageIndicatorStyle={{ backgroundColor: '#FFF' }}
                            activePageIndicatorStyle={{ backgroundColor: '#FF6699' }}
                        >
                            {images.map((image, index) => this.renderPage(image, index))}
                        </Carousel>
                    </View>

                    {/* 导航栏 */}
                    <View style={styles.box}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', }}>
                            {icons.map((item, index) => {
                                let font = index;
                                return (
                                    <View style={{ width: "20%", paddingBottom: 5, borderBottomWidth: 0.5, borderBottomColor: "#DCDCDC" }}>
                                        <Image source={{ uri: item }} style={{ width: 30, height: 30, marginLeft: 20, }}></Image>
                                        <Text style={{ fontSize: 12, textAlign: "center" }}>{iconTexts[font]}</Text>
                                    </View>
                                );
                            })}
                        </View>
                    </View>
                    {/* 登录图片 */}
                    <View style={styles.login}>
                        <Image source={require("../../assets/images/bangumi_home_login_guide.png")} style={{ width: "100%", height: 100 }}></Image>
                    </View>
                    {/* 番剧推荐 */}
                    <View>
                        <BanItem></BanItem>
                    </View>

                    {/* 国创卡片 */}
                    <View >
                        <GuoItem></GuoItem>
                    </View>
                </ScrollView>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    //轮播图样式
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // 横向 居中
        flexDirection: 'row',
        justifyContent: 'center',
        position: "absolute",
        top: 5,
        right: 0,
        left: 0,
        //圆角边框
        borderRadius: 20,
        overflow: "hidden",
    },
    //导航栏样式
    box: {
        width: "100%",
        alignItems: "center",
        marginTop: 190,

    },
    //登陆图片样式
    login: {
        width: "100%",
        overflow: "hidden",
        marginTop: 5,
    },


});


export default Bangumi;