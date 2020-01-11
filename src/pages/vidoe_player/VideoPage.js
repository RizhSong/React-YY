import React, { Component } from 'react';
import { View, Text, ScrollView, StatusBar, Image, StyleSheet, TouchableHighlight } from 'react-native'
import { Container, Tab, Tabs, ScrollableTab } from 'native-base';
import moment from 'moment';
import VideoPlayer from './VideoPlayer';
import { getVideoDetilUrl, numFormat, getVideoPlayerUrl } from '../../utils/utils';

class VideoPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullScreenFlag: true, //当全屏时 控制下方的内容显示和隐藏
            DetilUrl: getVideoDetilUrl(this.props.aid),//getVideoDetilUrl(this.props.aid),获取破解后的视频详情的url
            videoPlayerUrl: '',//视频播放链接
            VideoDetilData: {},//根据破解后的视频详情的url发送请求后获取的数据
            reply: "",
            tabChangeFlag: 0,
            status: 0, //数据是否返回状态
        }
    }
    _hidefullScreenFlag = () => {
        this.setState({
            fullScreenFlag: !this.state.fullScreenFlag
        })
    }

    componentDidMount() {
        this._getVideoDetilData()
    }
    _getVideoDetilData = () => {
        let url = this.state.DetilUrl;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                if (data.code === 0) {
                    this.setState({
                        VideoDetilData: data.data,
                        reply: "评论" + data.data.stat.reply,
                        status: 1
                    })
                    let videoUrl = getVideoPlayerUrl(data.data.cid)
                    this._getVideoPlayerData(videoUrl)
                }
            })
    }

    _getVideoPlayerData = (url) => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.warn(data.durl[0].url);

                this.setState({
                    videoPlayerUrl: data.durl[0].url,
                })
            })
    }

    _renderVideoPlatyer = () => {
        return (
            <VideoPlayer hidefullScreen={this._hidefullScreenFlag} url={this.state.videoPlayerUrl}></VideoPlayer>
        )
    }

    _renderVideoDetil = () => {
        return (
            this.state.fullScreenFlag ?
                <View style={{ flex: 2.2, backgroundColor: "#c4c4c4" }}>
                    <Container>
                        <Tabs
                            renderTabBar={() => <ScrollableTab
                                style={{ height: 35, width: '100%', backgroundColor: '#fff' }}
                                tabsContainerStyle={{ height: 35, width: 200 }}
                                underlineStyle={styles.tabBarUnderlineStyle}
                            />}>
                            <Tab heading="简介"
                                textStyle={styles.textStyle}
                                tabStyle={styles.tabStyle}
                                activeTextStyle={styles.activeTextStyle}
                                activeTabStyle={styles.activeTabStyle}
                            >
                                {this._renderVideoInfo(this.state.VideoDetilData)}
                            </Tab>
                            <Tab heading={this.state.reply ? this.state.reply : '评论'}
                                textStyle={styles.textStyle}
                                tabStyle={styles.tabStyle}
                                activeTextStyle={styles.activeTextStyle}
                                activeTabStyle={styles.activeTabStyle}
                            >
                                {this._renderVideoComment()}
                            </Tab>
                        </Tabs>
                    </Container>
                </View>
                : null
        )
    }

    _renderVideoInfo = (item) => {
        if (this.state.status === 0) {
            return (
                <View></View>
            )
        }
        return (
            <ScrollView>
                <View style={styles.topBox}>
                    <View style={styles.upInfo}>
                        <View style={styles.upInfoLeft}>
                            <View style={styles.upCover}>
                                <Image source={{ uri: item.owner && item.owner.face }} style={styles.upImg} />
                            </View>
                            <View style={styles.upTitle}>
                                <Text style={styles.upname}>{item.owner && item.owner.name}</Text>
                                <Text style={styles.fans}>{numFormat(item.owner_ext && item.owner_ext.fans)}粉丝</Text>
                            </View>
                        </View>
                        <View style={styles.upInfoRight}>
                            <Text style={styles.upFocus}>＋ 关注</Text>
                        </View>
                    </View>
                    <View style={styles.videoInfo}>
                        <View style={styles.videoInfoTopBox}>
                            <Text style={styles.videoTitle}>{item.title}</Text>
                            {/* <Text style={styles.videoTitle} numberOfLines={1} ellipsizeMode={'tail'}>{item.title}</Text> */}
                            <Text style={styles.arrorDown}>&#xe694;</Text>
                        </View>
                        <View style={styles.AVnumBox}>
                            <View style={styles.AVnumBoxItem}>
                                <Text style={{ fontFamily: 'iconfont', color: '#888' }}>&#xe66d;</Text>
                                <Text style={styles.AVnumBoxItemText}>{numFormat(item.stat && item.stat.view)}</Text>
                            </View>
                            <View style={styles.AVnumBoxItem}>
                                <Text style={{ fontFamily: 'iconfont', color: '#888' }}>&#xe66a;</Text>
                                <Text style={styles.AVnumBoxItemText}>{numFormat(item.stat && item.stat.danmaku)}</Text>
                            </View >
                            <View style={styles.AVnumBoxItem}>
                                <Text style={styles.AVnumBoxItemText}>
                                    {moment(item.ctime * 1000).format('YYYY-MM-DD')}
                                </Text>
                            </View>
                            <View style={styles.AVnumBoxItem}>
                                <Text style={styles.AVnumBoxItemText}>AV {item.aid}</Text>
                            </View>
                        </View>
                        <View style={styles.AVnumBoxHideDesc}>
                            <Text style={styles.ItemDescText}>AV {item.desc}</Text>
                        </View>
                    </View>
                    <View style={styles.statBox}>
                        <TouchableHighlight
                            style={styles.statItem}
                            onPress={() => { }}
                            underlayColor="#f3f3f3">
                            <View>
                                <Text style={styles.iconStyle}>&#xe6c7;</Text>
                                <Text style={styles.statItemText}>{numFormat(item.stat && item.stat.like)}</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            onPress={() => { }}
                            style={styles.statItem}
                            underlayColor="#f3f3f3">
                            <View>
                                <Text style={styles.iconStyle}>&#xe6c6;</Text>
                                <Text style={styles.statItemText}>不喜欢</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            onPress={() => { }}
                            style={styles.statItem}
                            underlayColor="#f3f3f3">
                            <View>
                                <Text style={styles.iconStyle}>&#xe670;</Text>
                                <Text style={styles.statItemText}>{numFormat(item.stat && item.stat.coin)}</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            onPress={() => { }}
                            style={styles.statItem}
                            underlayColor="#f3f3f3">
                            <View>
                                <Text style={styles.iconStyle}>&#xe673;</Text>
                                <Text style={styles.statItemText}>{numFormat(item.stat && item.stat.favorite)}</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            onPress={() => { }}
                            style={styles.statItem}
                            underlayColor="#f3f3f3">
                            <View>
                                <Text style={styles.iconStyle}>&#xe671;</Text>
                                <Text style={styles.statItemText}>{numFormat(item.stat && item.stat.share)}</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>
            </ScrollView>
        )
    }
    _renderVideoComment = (item) => {
        return (
            <ScrollView>
                <Text>+++++++++++++++</Text>
                <Text>+++++++++++++++</Text>
                <Text>+++++++++++++++</Text>
                <Text>+++++++++++++++</Text>
            </ScrollView>
        )
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar
                    backgroundColor='#ff0000'
                    translucent={true}
                    hidden={true}
                    animated={true} />
                {this._renderVideoPlatyer()}
                {this._renderVideoDetil()}
            </View >);
    }
}

const styles = StyleSheet.create({
    tabBarUnderlineStyle: {
        backgroundColor: '#fb7b9e',
        height: 2.5,
        paddingLeft: 5,
        paddingRight: 5
    },
    tabStyle: {
        backgroundColor: '#fff',
        paddingLeft: 5,
        paddingRight: 5
    },
    activeTabStyle: {
        backgroundColor: '#fff',
        paddingLeft: 5,
        paddingRight: 5
    },
    textStyle: {
        color: '#444'
    },
    activeTextStyle: {
        color: '#fb7b9e',
        fontWeight: 'bold'
    },
    tabsContainerStyle: {
        // width: 400,
        backgroundColor: '#fff'
    },

    //infoBox简介部分样式
    topBox: {
        padding: 8,
        borderBottomWidth: 0.2,
        borderColor: '#ccc',
    },
    upInfo: {
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    upInfoLeft: {
        flexDirection: 'row',
    },
    upCover: {
        marginRight: 15,
        width: 38,
        height: 38
    },
    upImg: {
        height: '100%',
        width: '100%',
        borderRadius: 50
    },
    upTitle: {
        justifyContent: 'space-between'
    },
    upname: {
        color: '#fb7b9e',
        fontWeight: 'bold',
        fontSize: 12.5
    },
    fans: {
        fontSize: 12,
        color: '#888'
    },
    upFocus: {
        padding: 5,
        paddingLeft: 15,
        paddingRight: 15,
        color: '#fff',
        backgroundColor: '#fb7b9e',
        textAlign: "center",
        borderRadius: 2
    },
    videoInfo: {
        marginTop: 12,
    },
    videoInfoTopBox: {
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    videoTitle: {
        width: '90%',
        fontSize: 15,
    },
    arrorDown: {
        fontFamily: 'iconfont',
        color: '#888',
        textAlign: 'center',
        width: 25,
        height: 15,
    },
    AVnumBox: {
        flexDirection: 'row',
        marginTop: 5,
        marginBottom: 5
    },
    AVnumBoxItem: {
        marginRight: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    AVnumBoxItemText: {
        marginLeft: 2,
        fontSize: 12,
        color: '#888'
    },
    ItemDescText: {
        fontSize: 12,
        color: '#888',
        lineHeight: 18
    },
    statBox: {
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    statItem: {
        width: '20%',
        paddingTop: 8,
        paddingBottom: 8,
        alignItems: 'center'
    },
    iconStyle: {
        fontFamily: 'iconfont',
        color: '#888',
        fontSize: 20,
        textAlign: 'center'
    },
    statItemText: {
        textAlign: 'center',
        marginTop: 2,
        fontSize: 12,
        color: '#888'
    }
})

export default VideoPage;

