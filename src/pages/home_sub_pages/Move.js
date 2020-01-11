import React, { Component } from 'react';
import Carousel from 'react-native-banner-carousel';
import { StyleSheet, Image, View, Text, Dimensions, ScrollView } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body, Right, Badge } from 'native-base';
import MovieOne from '../../components/MovieOne'
import MovieTwo from '../../components/MovieTwo';
import MovieThree from '../../components/MovieThree'




//轮播图片数据
const images = [
    "http://i0.hdslb.com/bfs/bangumi/6a11174b96970c2239f9f5064c57e59af70171a6.jpg",
    "http://i0.hdslb.com/bfs/bangumi/4c58a6e3d6c9901251250ee4ef9ff5696e3c1db0.jpg",
    "http://i0.hdslb.com/bfs/bangumi/98182d952ce44c6d378be97264e7bda0b0fd4c88.jpg",
    "http://i0.hdslb.com/bfs/bangumi/923bfb36c57cd643afb6a6c48594695372ff4a72.jpg",
    "http://i0.hdslb.com/bfs/bangumi/5afd0231d665fd2ee29c376c292a8b3f0203384b.jpg",

];

const texts = [
    "吴青峰：怼粉这种事，都是靠灵感",
    "中国千年的礼乐智慧",
    "一群有能力、有怪癖又可爱的退休警察们",
    "破解冻土难题，改写国际预言",
    "实拍战机空中机油~",
];

const BannerWidth = (Dimensions.get('window').width * 0.96);
const BannerHeight = 180;

//导航栏图标资源
const icons = [
    "http://i0.hdslb.com/bfs/bangumi/85e80d8bb430e76eb3e55bbf93d8a62a51e2a774.png",
    "http://i0.hdslb.com/bfs/bangumi/a1901aedc680a77c808787cb2cf8e22c7b9c359b.png",
    "http://i0.hdslb.com/bfs/bangumi/21bd3247c745e3f1eb489bf637215f8cc8aa86ca.png",
    "http://i0.hdslb.com/bfs/bangumi/76c03a7ca20815765c7f5bc17d320e0676e15a20.png",
    "http://i0.hdslb.com/bfs/bangumi/e713a764f9146b73673ba9b126d963aa50f4fc3b.png",

];
const iconTexts = [
    "纪录片",
    "电影",
    "电视剧",
    "索引",
    "热门榜单"
];


class Movie extends Component {
    constructor(props) {
        super(props);
        this.state = {}
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

    render() {
        return (
            <View style={{ position: "relative", backgroundColor: "#F5F5F5" }}>
                <ScrollView>
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

                    {/* 纪录片组件 */}
                    <View>
                        <MovieOne></MovieOne>
                    </View>

                    {/* 电影组件 */}
                    <View>
                        <MovieTwo></MovieTwo>
                    </View>

                    {/* 电视剧组件*/}
                    <View>
                        <MovieThree></MovieThree>
                    </View>










                </ScrollView>
            </View>
        )
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
});

export default Movie;