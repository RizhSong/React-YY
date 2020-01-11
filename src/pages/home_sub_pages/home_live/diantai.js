import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux'
import Video from 'react-native-video'

class Diantai extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //接口
            liveroombyid: {},
            liveroomifo: {},
            liveroomfan: {},
            liveroomclass: {},
            liveroomlev: {},
            liveroomlevpaihan: {},
            livetouxiangk: {},
            playUrl: '',
            resizeMode: 'contain', //cover ,stretch,contain

        }
    }
    componentWillMount() {
        this.getLiveRoomid();
        this.getLivePlayUrl();
    }

    getLiveRoomid = () => {
        fetch(`https://api.live.bilibili.com/xlive/web-room/v1/index/getInfoByRoom?room_id=${this.props.roomd}`)
            .then((response) => response.json())//取数据
            .then(data => {//处理数据
                //通过setState()方法重新渲染界面\
                if (data.code === 0) {
                    this.setState({
                        isloading: true,
                        liveroombyid: data.data.anchor_info.base_info,
                        liveroomifo: data.data.room_info,
                        liveroomfan: data.data.anchor_info.relation_info,
                        liveroomlev: data.data.anchor_info.live_info,
                        liveroomlevpaihan: data.data.rankdb_info,
                        livetouxiangk: data.data.room_info.pendants.frame,
                    })
                }
            })
    }

    getLivePlayUrl = () => {
        fetch(`https://api.live.bilibili.com/room/v1/Room/playUrl?build=5470400&device=android&cid=${this.props.roomd}`)
            .then((response) => response.json())//取数据
            .then(data => {//处理数据
                console.warn(data.data.durl[0].url);
                if (data.code === 0) {
                    this.setState({
                        playUrl: data.data.durl[0].url
                    })
                }
            })
    }



    render() {
        return (
            <View style={{ flex: 1, position: 'relative' }}>
                <View>
                    <View style={{ width: '100%', height: 240, backgroundColor: '#000' }}>
                        {/* <Image source={require('../../../assets/images/black.jpg')} style={{ width: '100%', height: 240 }} /> */}
                        <Video
                            style={{
                                position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, width: '100%', height: '100%'
                            }}
                            //    source={require('../../../assets/images/back.mp4')}
                            source={{ uri: this.state.playUrl }}
                            ref={(ref) => {
                                this.video = ref
                            }}
                            resizeMode={this.state.resizeMode}
                            autoplay={true}
                        // playInBackground={true}// 当app转到后台运行的时候，播放是否暂停
                        // onLoadStart={this._onLoadStart}
                        // onLoad={this._onLoad} //加载媒体并准备播放时调用的回调函数。
                        // onProgress={this._onProgress}
                        // paused={this.state.paused}//暂停
                        // onEnd={this._onEnd}
                        // onBuffer={this._onBuffer} //视频缓冲
                        // onProgress={this.onProgress}//视频播放过程中每个间隔进度单位调用的回调函数
                        // onEnd={this.onEnd}//视频播放结束时的回调函数
                        // repeat={true}//确定在到达结尾时是否重复播放视频。
                        />
                    </View>

                    <TouchableOpacity onPress={() => Actions.homePage({})} activeOpacity={1.0} style={{ marginTop: -210, marginLeft: 12 }}>
                        <Image source={require('../../../assets/images/back_live.png')} style={{ width: 36, height: 36 }} ></Image>
                    </TouchableOpacity>

                </View>
                {/* 个人资料部分 */}
                <View>
                    <Image source={require('../../../assets/images/billiveperson.png')} resizeMode='cover' style={{ width: '100%', height: 80, marginTop: 174, }} />
                </View>
                <View style={{ marginTop: -60, flexDirection: 'row' }}>
                    <View>
                        <Image source={{ uri: this.state.liveroombyid.face }} style={{ width: 46, height: 46, borderTopLeftRadius: 50, borderTopRightRadius: 50, borderBottomLeftRadius: 50, borderBottomRightRadius: 50, marginLeft: 15 }}></Image>
                        <Image source={{ uri: this.state.livetouxiangk.value }} style={{ width: 60, height: 60, borderTopLeftRadius: 50, borderTopRightRadius: 50, borderBottomLeftRadius: 50, borderBottomRightRadius: 50, marginLeft: 15, marginTop: -52, marginLeft: 8 }}></Image>
                    </View>
                    <View style={{ width: '64%' }}>
                        <View style={{ flexDirection: 'row', marginTop: 4 }}>
                            <Text style={{ fontSize: 16, marginTop: -4, color: 'white' }}>{this.state.liveroombyid.uname}</Text>
                            <View style={{ borderColor: 'rgb(255,133,179)', borderWidth: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 5, marginLeft: 5, marginTop: -2, }}>
                                <Text style={{ color: 'rgb(255,133,179)', fontSize: 14, marginTop: -4, paddingLeft: 2, paddingRight: 2, paddingTop: 2 }}>UP{this.state.liveroomlev.level}</Text>
                            </View>
                            <View style={{ borderColor: 'rgb(255,133,179)', borderWidth: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 5, marginLeft: 5, marginTop: -2, }}>
                                <Text style={{ color: 'rgb(255,133,179)', fontSize: 14, marginTop: -4, paddingLeft: 2, paddingRight: 2, paddingTop: 2 }}>{this.state.liveroomlevpaihan.rank_desc}
                                    {/* <Svg t="1576460164916" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4291" width="12" height="12"  >
                                        <Path d="M288 64c9 0 18.1 3.2 25 9.6L761 488.8c13.8 12.8 13.8 33.6 0 46.4L313 950.4c-13.8 12.8-36.2 12.8-50 0-13.8-12.8-13.8-33.6 0-46.4L686.00000001 512l-423.00000001-392c-13.8-12.8-13.8-33.6 0-46.4 6.9-6.4 16-9.6 25-9.6z" p-id="4292" fill='rgb(255,133,179)'></Path>
                                    </Svg > */}
                                </Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 2 }}>
                            <Text style={{ color: 'rgb(254,225,59)', fontSize: 15 }}>人气:{this.state.liveroomifo.online > 10000 ? (this.state.liveroomifo.online / 10000).toFixed(1) + '万' : this.state.liveroomifo.online}</Text>
                            <Text style={{ color: 'rgb(254,225,59)', fontSize: 15, marginLeft: 10 }}>粉丝:{this.state.liveroomfan.attention > 10000 ? (this.state.liveroomfan.attention / 10000).toFixed(1) + '万' : this.state.liveroomfan.attention}</Text>
                            <Text style={{ color: 'rgb(254,225,59)', fontSize: 15, marginLeft: 10 }}>{this.state.liveroomifo.area_name ? (this.state.liveroomifo.area_name.length > 4 ? this.state.liveroomifo.area_name.substr(0, 4) + "..." : this.state.liveroomifo.area_name) : ""}</Text>
                            <View style={{ marginTop: 5 }}>
                                {/* <Svg t="1576460164916" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4291" width="14" height="14"  >
                                    <Path d="M288 64c9 0 18.1 3.2 25 9.6L761 488.8c13.8 12.8 13.8 33.6 0 46.4L313 950.4c-13.8 12.8-36.2 12.8-50 0-13.8-12.8-13.8-33.6 0-46.4L686.00000001 512l-423.00000001-392c-13.8-12.8-13.8-33.6 0-46.4 6.9-6.4 16-9.6 25-9.6z" p-id="4292" fill='rgb(254,225,59)'></Path>
                                </Svg > */}
                            </View>
                        </View>
                    </View>
                    <View style={{ backgroundColor: 'rgb(255,96,188)', width: 60, height: 36, borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginTop: 6 }}>
                        <Text style={{ color: 'white', fontSize: 16 }}>+关注</Text>
                    </View>
                </View>
            </View >

        )
    }
}

export default Diantai;