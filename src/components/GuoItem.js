import React, { Component } from 'react';
import { StyleSheet, Image, View, Text, Dimensions, ScrollView} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body, Right, Badge } from 'native-base';

const BannerWidth = (Dimensions.get('window').width * 0.96);
const screenLeft = (Dimensions.get('window').width * 0.02);

//卡片图片资源
const cards = [
        {   
            id:1,
            name: "斩兽之刃",
            number: "更新至第9话",
            count: "43.9万系列追番",
            imageurl: "http://i0.hdslb.com/bfs/archive/148be0d6209c7a7538998467f50dae3c6f21f322.jpg",
        },
        {   
            id:1,
            name: "画江湖之不良人 第三季",
            number: "更新至第36话",
            count: "132.8万系列追番",
            imageurl: "http://i0.hdslb.com/bfs/archive/ad8fe0bbc56b951a57e02142b79b4e9e7137b2e3.jpg",
        },
        {   
            id:1,
            name: "阴阳师·平安物语",
            number: "全24话",
            count: "140.8万系列追番",
            imageurl: "http://i0.hdslb.com/bfs/archive/2e2198e297e98fe77b007710a3cefa9683e31898.jpg",
        },
        {
            id:1,
            name: "我家大师兄脑子有坑 特别篇",
            number: "更新至第48话",
            count: "196.8万系列追番",
            imageurl: "http://i0.hdslb.com/bfs/archive/55cd9010e59c310b3ccf6281b4ec57bf44967054.jpg",
        },
        {   
            id:2,
            name: "驸马不要啊 动态漫 第三季",
            number: "更新至第3话",
            count: "2.1万系列追番",
            imageurl: "https://i0.hdslb.com/bfs/archive/e8044696aabbdfaad302980cc27aedc374c5a74e.jpg",
        },
        
        {   
            id:2,
            name: "伍六七之最强发现师",
            number: "更新至第6话",
            count: "526.1万系列追番",
            imageurl: "https://i1.hdslb.com/bfs/archive/5ac5302075abf6bc7ba0efe076f6050499ea3715.jpg",
        },
        {   
            id:2,
            name: "少女前线 人形小剧场",
            number: "更新至第9话",
            count: "48.1万系列追番",
            imageurl: "https://i2.hdslb.com/bfs/archive/6a3fcb2d057598b03883762205b8d5723a73e2d0.jpg",
        },
        {   
            id:2,
            name: "餐桌上的世说新语",
            number: "全12话",
            count: "18.4万系列追番",
            imageurl: "https://i0.hdslb.com/bfs/archive/7c481c3b86e2a2c3729e6d47419d83888473b0bd.jpg",
        },
        
       

];

class GuoItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            flag:true
        }
    }

    handleClick=()=>{
        this.setState({flag:!this.state.flag})
    }


    render() {
        return (
                <View style={styles.fanju}>
                    <View style={styles.fanjutitle}>
                        <Left>
                            <Text>国创推荐</Text>
                        </Left>
                        <Right>
                            <Button transparent>
                                <Text style={{ color: "#F06896" }}>查看更多 ></Text>
                            </Button>
                        </Right>
                    </View>
                    <View style={styles.fanjucards}>
                        {  
                            cards.map((item,index)=>{
                                if(this.state.flag && item.id==1){
                                    return (
                                        <View style={styles.fanjucard} key={index}>
                                            <View style={styles.surface}>
                                                <Icon type="FontAwesome" name="heart-o" style={styles.surfaceicon}></Icon>
                                                <Badge style={{ backgroundColor: '#E4709F', height: 15, position: "absolute", right: 2, top: 2 }}>
                                                    <Text style={{ color: '#FFF', fontSize: 10 }}>会员抢先</Text>
                                                </Badge>
                                                <Text style={{ color: "#FFF", position: "absolute", left: 2, bottom: 2, fontSize: 12 }}>{item.count}</Text>
                                            </View>
                                            <Image source={{ uri: item.imageurl,cache:"force-cache" }} style={{ height: 100, borderRadius: 5, flex: 1 }} />
                                            <Text numberOfLines={1} >{item.name}</Text>
                                            <Text note style={{ color: "gray" }}>{item.number}</Text>
                                        </View>
                                )}
                                else if(!this.state.flag && item.id==2){
                                    return (
                                        <View style={styles.fanjucard} key={index}>
                                            <View style={styles.surface}>
                                                <Icon type="FontAwesome" name="heart-o" style={styles.surfaceicon}></Icon>
                                                <Badge style={{ backgroundColor: '#E4709F', height: 15, position: "absolute", right: 2, top: 2 }}>
                                                    <Text style={{ color: '#FFF', fontSize: 10 }}>会员抢先</Text>
                                                </Badge>
                                                <Text style={{ color: "#FFF", position: "absolute", left: 2, bottom: 2, fontSize: 12 }}>{item.count}</Text>
                                            </View>
                                            <Image source={{ uri: item.imageurl,cache:"force-cache" }} style={{ height: 100, borderRadius: 5, flex: 1 }} />
                                            <Text numberOfLines={1} >{item.name}</Text>
                                            <Text note style={{ color: "gray" }}>{item.number}</Text>
                                        </View>
                                )}
                            })
                        }
                    </View>
                    <View style={{ position: "absolute", bottom:0, left: "50%", marginLeft: -35,}}>
                        <Button transparent small style={{Height:10}} 
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
        height: 375,
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
    //番剧卡片的中间四个小卡片
    fanjucards: {
        width: "100%",
        height: 310,
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




export default GuoItem;