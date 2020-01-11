import React, { Component } from 'react';
import { StyleSheet, Image, View, Text, Dimensions, ScrollView} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body, Right, Badge } from 'native-base';
import { Actions } from 'react-native-router-flux'

const BannerWidth = (Dimensions.get('window').width * 0.96);
const screenLeft = (Dimensions.get('window').width * 0.02);

//卡片图片资源
const cards = [
        {   
            id:1,
            active:false,
            name: "猎兽神兵",
            number: "全12话",
            count: "69.1万追番",
            imageurl: "http://i0.hdslb.com/bfs/archive/81385f895a48a1c27a0e701218781908fb9d5dd2.jpg",
        },
        {   
            id:1,
            active:false,
            name: "鬼灭之刃",
            number: "更新至第24话",
            count: "476.9万追番",
            imageurl: "http://i0.hdslb.com/bfs/archive/efc989798673c8c374cad6e2b4fc555a8f0f3c2c.jpg",
        },
        {
            id:1,
            active:false,
            name: "女高中生的虚度日常",
            number: "更新至第11话",
            count: "171.1万追番",
            imageurl: "http://i0.hdslb.com/bfs/archive/1c277223735cfe18a32f8130855a20c1a699f706.jpg",
        },
        {   
            id:1,
            active:false,
            name: "某科学的一方通行",
            number: "更新至第10话",
            count: "217.2万追番",
            imageurl: "http://i0.hdslb.com/bfs/archive/def29a30113e96248830b2a984c8feb6749252f4.jpg",
        },
        {   
            id:2,
            active:false,
            name: "爱书的下克上：为了成为图书管理员不择手段！",
            number: "更新至第10话",
            count: "36万追番",
            imageurl: "https://i2.hdslb.com/bfs/archive/b6e413bef190422a10f6c5da448b29bafc272509.jpg",
        },
        {   
            id:2,
            active:false,
            name: "喜欢本大爷的竟然就你一个？",
            number: "更新至第9.5话",
            count: "159.9万追番",
            imageurl: "https://i0.hdslb.com/bfs/archive/6a40cf23518888c0aa5346ba9ca659771463d2df.jpg",
        },
        {   
            id:2,
            active:false,
            name: "碧蓝航线",
            number: "更新至第9话",
            count: "116.8万追番",
            imageurl: "https://i1.hdslb.com/bfs/archive/ba2cb324e57b917e2bd46794540203ff76a7ba52.jpg",
        },
        {   
            id:2,
            active:false,
            name: "刺客守则",
            number: "全12话",
            count: "114.6万追番",
            imageurl: "https://i0.hdslb.com/bfs/archive/e7a0b9d006fe345dabd0fffe45e636a27bba7be9.jpg",
        }

];

class BanItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            flag:true,
            // active:false
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
                            <Text>番剧推荐</Text>
                        </Left>
                        <Right>
                            <Button transparent onPress={()=>Actions.banmore()}>
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
                                                <Button  transparent
                                                    style={{width: 30,height: 25,position: "absolute", left: 0, top: 0 }}
                                                    onPress={()=>{item.active=!item.active}}>
                                                    {item.active?<Icon type="FontAwesome" name="heart" style={styles.surfaceicon2} ></Icon>:<Icon type="FontAwesome" name="heart-o" style={styles.surfaceicon} ></Icon>}
                                                </Button>
                                                <Badge style={{ backgroundColor: '#E4709F', height: 15, position: "absolute", right: 2, top: 2 }}>
                                                    <Text style={{ color: '#FFF', fontSize: 10 }}>会员抢先</Text>
                                                </Badge>
                                                <Text style={{ color: "#FFF", position: "absolute", left: 2, bottom: 2, fontSize: 12 }}>{item.count}</Text>
                                            </View>
                                            <Image source={{ uri: item.imageurl,cache:"force-cache"}} style={{ height: 100, borderRadius: 5, flex: 1 }} />
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
        marginLeft:0
    },
    surfaceicon2: {
        width: 30,
        height: 25,
        fontSize: 22,
        borderBottomRightRadius: 5,
        textAlign: "center",
        lineHeight: 24,
        // 设置背景颜色时同时设置透明度 防止背景颜色影响字体颜色
        color: "#fb7b9e",
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        marginLeft:0
    },

})




export default BanItem;