import React, { Component } from 'react';
import { StyleSheet, Image, View, Text, Dimensions, ScrollView } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body, Right, Badge } from 'native-base';

const BannerWidth = (Dimensions.get('window').width * 0.96);
const screenLeft = (Dimensions.get('window').width * 0.02);

const cards = [
    {   
        id:1,
        badge: "会员专享",
        count: "71万系列追剧",
        name: "哈利·波特与死亡圣器(下)",
        title: "终极之战打响",
        imageurl:"http://i0.hdslb.com/bfs/bangumi/abcafcf95a0853f709d735f10561b993d0fc05bd.jpg"  ,
    },
    {   
        id:1,
        badge: "会员专享",
        count:  "71万系列追剧",
        name:  "哈利·波特与死亡圣器(上)"   ,
        title:  "三人组寻找魂器" ,
        imageurl: "http://i0.hdslb.com/bfs/bangumi/d435abc79671d66ce826eea03911b3d3074d27b7.jpg",
    },
    {   
        id:1,
        badge: "会员半价",
        count: "14.6万追剧",
        name: "蜘蛛侠：英雄远征",
        title: "小蜘蛛登陆B站！",
        imageurl: "http://i0.hdslb.com/bfs/bangumi/37ecc29ada354bc61b9e237203fff3f4f358f731.jpg",
    },
    {   
        id:1,
        count:"2.6万追剧",
        name: "罗生门",
        title: "黑泽明经典悬疑神作",
        imageurl:"http://i0.hdslb.com/bfs/bangumi/9050447827d4c7fd88f6a8c536b84e3a0e1b6912.jpg",
    },
    {   
        id:1,
        count: "73.6万追剧",
        name: "我想吃掉你的胰脏",
        title: "免费首播！",
        imageurl: "http://i0.hdslb.com/bfs/bangumi/fd5891a000ecdf6e76fdfea1fc204776f728c9ba.jpg",
    },
    {   
        id:1,
        count: "9992追剧",
        name: "东京物语",
        title: "东京真的太远了",
        imageurl:"http://i0.hdslb.com/bfs/bangumi/42af0d04487472725d24ff3bfa01a347f87e7248.jpg",
    },
    // {   
    //     id:1,
    //     count: "2.8万追剧",
    //     name: "毒战",
    //     title: "【古天乐/孙红雷】",
    //     imageurl: "https://i0.hdslb.com/bfs/archive/9ca6b32956a8abbcae1cb9db17ddaa71509446f8.jpg",
    // },
    // {   
    //     id:1,
    //     count: "13.2万追剧",
    //     name: "怦然心动",
    //     title: "重温心动初恋",
    //     imageurl:"https://i1.hdslb.com/bfs/archive/94b509c59ceb8ad29f47fa39630367b860e96d48.jpg",
    // },
];

class MovieTwo extends Component {
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
                        <Text>电影热播</Text>
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




export default MovieTwo;