import React, { Component } from 'react';
import { StyleSheet, Image, View, Text, Dimensions, ScrollView } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body, Right, Badge } from 'native-base';

const BannerWidth = (Dimensions.get('window').width * 0.96);
const screenLeft = (Dimensions.get('window').width * 0.02);

const cards = [
    {   
        id:1,
        count: "14.2万追剧",
        name: "守护解放西",
        title: "9月14日，警动全城",
        imageurl:"http://i0.hdslb.com/bfs/bangumi/29e7ea9cf0a619618841caeca1a61032e4f0a2c6.jpg"  ,
    },
    {   
        id:1,
        count:  "",
        name:  "真实的残酷宫斗"   ,
        title:  "亨利八世6位皇后" ,
        imageurl: "http://i0.hdslb.com/bfs/bangumi/5a95404be7ecacc69167c3eb5e4d3b5383bef25b.png",
    },
    {   
        id:1,
        badge: "限时免费",
        count: "236.4万系列追剧",
        name: "人生一串2",
        title: "上串开吃！",
        imageurl:  "http://i0.hdslb.com/bfs/bangumi/7db272b2e887bb3615a8aee29cf4ed839dc54e82.png",
    },
    {   
        id:1,
        count:"22.6万系列追剧",
        name: "糟糕的历史",
        title: "最魔性历史纪录片",
        imageurl: "http://i0.hdslb.com/bfs/bangumi/f3091de24e5ff374ae3920513fecce70a63dc039.jpg",
    },
    {   
        id:1,
        count: "",
        name: "FOX的北极之旅",
        title: "感受北欧极致壮美",
        imageurl: "http://i0.hdslb.com/bfs/bangumi/2a2b86986e3e4fcb183f0a282c439bc5f130e9e6.jpg",
    },
    {   
        id:1,
        count: "26.2万系列追剧",
        name: "我们该玩电子游戏吗",
        title: "游戏有助身心健康？",
        imageurl:"http://i0.hdslb.com/bfs/bangumi/acda1d7fd8565706b5fd0cb9c0f7b40813467fcc.jpg",
    },
    // {   
    //     id:1,
    //     count: "21.1万系列追剧",
    //     name: "【纪录】中国古建筑 (2012)",
    //     title: "中国古建筑之“大势",
    //     imageurl:  "https://i0.hdslb.com/bfs/archive/ad068ea233ef0f4e43158bac020a92c9bd0724dc.jpg",
    // },
    // {   
    //     id:1,
    //     count: "31.8万系列追剧",
    //     name: "未至之境（英配版）",
    //     title: "一起探索无人之境",
    //     imageurl:  "https://i0.hdslb.com/bfs/archive/ffd662bc2eb4959574180187155c80b4a1a087be.png",
    // },
];

class MovieOne extends Component {
    constructor(props) {
        super(props)
        this.state = {
            flag: true
        }
    }

    handleClick = () => {
        this.setState({ flag: !this.state.flag })
    }

    render() {

        return (
            <View style={styles.fanju}>
                <View style={styles.fanjutitle}>
                    <Left>
                        <Text>纪录片热播</Text>
                    </Left>
                    <Right>
                        <Button transparent>
                            <Text style={{ color: "#F06896" }}>查看更多 ></Text>
                        </Button>
                    </Right>
                </View>
                <View style={styles.fanjucards}>
                    {   
                        cards.map((item, index) => {
                            const bubble=item.badge ? (
                                <Badge style={{ backgroundColor: '#E4709F', height: 15, position: "absolute", right: 2, top: 2 }}>
                                    <Text style={{ color: '#FFF', fontSize: 10 }}>{item.badge}</Text>
                                </Badge>):null

                            return (
                                <View style={styles.fanjucard} key={index}>
                                    <View style={styles.surface}>
                                        <Icon type="FontAwesome" name="heart-o" style={styles.surfaceicon}></Icon>
                                        {bubble}
                                        <Text style={{ color: "#FFF", position: "absolute", left: 2, bottom: 2, fontSize: 12 }}>{item.count}</Text>
                                    </View>
                                    <Image source={{ uri: item.imageurl,cache:"force-cache" }} style={{  heigth:150,borderRadius: 5,flex:1  }} />
                                    <Text numberOfLines={1} >{item.name}</Text>
                                    <Text note numberOfLines={1} style={{ color: "gray" }}>{item.title}</Text>
                                </View>
                            )

                        })
                    }
                </View>
                <View style={{ position: "absolute", bottom: 0, left: "50%", marginLeft: -35, }}>
                    <Button transparent small style={{ Height: 10 }}
                        onPress={this.handleClick}
                    >
                        <Text style={{ color: "#F06896" }}><Icon type="FontAwesome" name="undo" style={{ fontSize: 12, color: "#F06896" }}></Icon>  换一换</Text>
                    </Button>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    //番剧卡片 
    fanju: {
        width: BannerWidth,
        height: 525,
        marginLeft: screenLeft,
        overflow: "hidden",
        marginTop: 15,
        flex: 1,
        // 横向 居中
        flexDirection: 'row',
        position: "relative",
        borderBottomWidth: 0.5,
        borderBottomColor: "#DCDCDC",
    },
    //番剧卡片标题
    fanjutitle: {
        width: "100%",
        height: 30,
        flex: 1,
        flexDirection: 'row',
        fontSize: 5,
        fontWeight: "normal"

    },
    //番剧卡片的中间六个小卡片
    fanjucards: {
        width: "100%",
        height: 460,
        position: "absolute",
        top: 30,
        left: 0,
        right: 0,
        borderRadius: 5,
        overflow: "hidden",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent:"space-between",
        alignContent:"space-between"
        

    },
    //一个小卡片
    fanjucard: {
        width: "31%",
        height: 220,
        borderRadius: 5,
        overflow: "hidden",
        
    },
    //浮在卡片上一层的样式
    surface: {
        width: "100%",
        height: 180,
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 100
    },
    //左上角 心
    surfaceicon: {
        width: 30,
        height: 25,
        fontSize: 22,
        borderBottomRightRadius: 5,
        textAlign: "center",
        lineHeight: 24,
        // 设置背景颜色时同时设置透明度 防止背景颜色影响字体颜色
        color: "white",
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },

})




export default MovieOne;