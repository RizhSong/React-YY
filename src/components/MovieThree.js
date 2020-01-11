import React, { Component } from 'react';
import { StyleSheet, Image, View, Text, Dimensions, ScrollView } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body, Right, Badge } from 'native-base';

const BannerWidth = (Dimensions.get('window').width * 0.96);
const screenLeft = (Dimensions.get('window').width * 0.02);

//卡片图片资源
const cards = [
    {
        id: 1,
        count: "1.9万追剧",
        name: "大恋爱",
        title: "和喜欢的人一起吃饭",
        imageurl: "http://i0.hdslb.com/bfs/bangumi/29e7ea9cf0a619618841caeca1a61032e4f0a2c6.jpg",
    },
    {
        id: 1,
        badge: "会员抢先",
        count: "1.3万追剧",
        name: "万福",
        title: "你醒啦",
        imageurl: "http://i0.hdslb.com/bfs/bangumi/4c6748f24b0cee23fe71d387a820e7b1e651ccb3.jpg",
    },
    {
        id: 1,
        count: "15.6万系列追剧",
        name: "双姝 第二季",
        title: "即将上线",
        imageurl: "http://i0.hdslb.com/bfs/bangumi/5c104fc023c5a6f9b6f59cd83d276a8c86f4d21d.jpg",
    },
    {
        id: 1,
        badge: "会员抢先",
        count: "9520追剧",
        name: "警察之家",
        title: "是兔子还是螃蟹",
        imageurl: "http://i0.hdslb.com/bfs/bangumi/2bf8fb89f3a386e37e08556d89842590655f3647.png",
    },
    {
        id: 1,
        badge: "限时免费",
        count: "4.9万追剧",
        name: "萤之光 第一季",
        title: "情侣同款睡姿",
        imageurl: "http://i0.hdslb.com/bfs/bangumi/4a28a26cf87a1f9f4c5a5392b3c69a2f39d64a5c.jpg",
    },
    {
        id: 1,
        badge: "会员专享",
        count: "1.6万追剧",
        name: "原以为命中注定的恋爱",
        title: "不会发生在我身上",
        imageurl: "http://i0.hdslb.com/bfs/bangumi/9c6401a78ee23cadb7c8338af517e0b1be489535.jpg",
    },

];

class MovieThree extends Component {
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
                        <Text>电视剧热播</Text>
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
                                    <Image source={{ uri: item.imageurl ,cache:"force-cache"}} style={{ height: 100, borderRadius: 5, flex: 1 }} />
                                    <Text numberOfLines={1} >{item.name}</Text>
                                    <Text note style={{ color: "gray" }}>{item.title}</Text>
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
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignContent: "space-between",

    },
    //一个小卡片
    fanjucard: {
        width: "48%",
        height: 150,
        borderRadius: 5,
        overflow: "hidden",
    },
    //浮在卡片上一层的样式
    surface: {
        width: "100%",
        height: 110,
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




export default MovieThree;