import React, { Component } from 'react';
import Video from 'react-native-video';
import { View, Text, StyleSheet, Slider, ActivityIndicator, TouchableWithoutFeedback } from 'react-native'
import Orientation from 'react-native-orientation';
import moment from 'moment';

class VideoPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullScreenFlag: false, //是否全屏标志
            loading: false,//loading显示,
            boxShow: false, //控制上下按钮盒子的显示和隐藏
            rate: 1, //播放速度
            // volume: 1, //声音比例
            // muted: false,//是否静音
            resizeMode: 'contain', //cover ,stretch,contain
            duration: 0.0,
            currentTime: 0.0,
            paused: false,
            sliderValue: 0, //滑块进度
            sliderFlag: true, //协调滑块和手势滑动冲突的节流阀
        };
    }
    render() {
        return (
            <TouchableWithoutFeedback onPress={this._showControl}>
                <View style={styles.container}>
                    {
                        this.state.boxShow ?
                            <View style={styles.topBox}>
                                <Text style={{ fontFamily: 'iconfont', color: '#fff', fontSize: 18 }}>&#xe692;</Text>
                                <View style={styles.topBoxRight}>
                                    <Text style={{ fontFamily: 'iconfont', color: '#fff', fontSize: 24, marginRight: 12 }}>&#xe69d;</Text>
                                    <Text style={{ fontFamily: 'iconfont', color: '#fff', fontSize: 22 }}>&#xe68a;</Text>
                                </View>
                            </View>
                            : null
                    }
        {/* // source={{ uri: "http://61.147.236.16/upgcxcode/97/31/133673197/133673197-1-31090.m4s?expires=1576571100&platform=android&ssig=17gOck8Yd0FL5HV96zlaYg&oi=3737122042&trid=1560a321ef0741f197b925f5f4ccb6eau&nfc=1&nfb=maPYqpoel5MI3qOUX6YpRA==&mid=0" }} */}
                    <Video
                        style={styles.videoStyle}
                        source={{ uri: this.props.url }}
                        ref={(ref) => {
                            this.video = ref
                        }}
                        resizeMode={this.state.resizeMode}//缩放模式
                        rate={this.state.rate}//播放速率
                        playInBackground={true}// 当app转到后台运行的时候，播放是否暂停
                        onLoadStart={this._onLoadStart}
                        onLoad={this._onLoad} //加载媒体并准备播放时调用的回调函数。
                        onProgress={this._onProgress}
                        paused={this.state.paused}//暂停
                        onEnd={this._onEnd}
                    // onBuffer={this._onBuffer} //视频缓冲
                    // onProgress={this.onProgress}//视频播放过程中每个间隔进度单位调用的回调函数
                    // onEnd={this.onEnd}//视频播放结束时的回调函数
                    // repeat={true}//确定在到达结尾时是否重复播放视频。
                    />
                    {this.state.paused ?
                        <Text onPress={this._setPausedOnPress} style={styles.videoPausedIcon}>&#xe6b0;</Text> : null
                    }
                    <ActivityIndicator
                        animating={this.state.loading}
                        style={styles.loading}
                        size="large"
                        color="#fb7b9e"
                    />
                    {
                        this.state.boxShow ?
                            <View style={styles.bottonBox}>
                                <View style={styles.leftBox}>
                                    {
                                        this.state.paused ?
                                            <Text onPress={this._setPausedOnPress} style={{ fontFamily: 'iconfont', fontSize: 34, color: '#fff' }}>&#xe6aa;</Text> :
                                            <Text onPress={this._setPausedOnPress} style={{ fontFamily: 'iconfont', fontSize: 34, color: '#fff' }}>&#xe6ab;</Text>
                                    }
                                </View>
                                <Slider style={styles.slider}
                                    minimumValue={0}
                                    maximumValue={100}
                                    minimumTrackTintColor={'#fb7b9e'}
                                    thumbTintColor={'#fb7b9e'}
                                    maximumTrackTintColor={'rgba(255,255,255,0.6)'}
                                    onValueChange={this._onValueChange}
                                    onSlidingComplete={this._onSlidingComplete} //户结束滑动的时候调用此回调
                                    value={this.state.sliderValue} //滑块的初始值。这个值应该在最小值和最大值之间。默认值是0。
                                ></Slider>
                                <View style={styles.rightBox}>
                                    <Text style={styles.duration}>
                                        {moment(this.state.currentTime * 1000).format('mm:ss')}/
                                        {moment(this.state.duration * 1000).format('mm:ss')}
                                    </Text>
                                    {
                                        this.state.fullScreenFlag ? <Text onPress={this._setfullScreen} style={{ fontFamily: 'iconfont', color: '#fb7b9e', fontSize: 24 }}>&#xe6c3;</Text>
                                            : <Text onPress={this._setfullScreen} style={{ fontFamily: 'iconfont', color: '#fff', fontSize: 22 }}>&#xe6c3;</Text>
                                    }
                                </View>
                            </View>
                            : null
                    }
                </View>
            </TouchableWithoutFeedback>
        );
    }
    //显示上下控制栏
    _showControl = () => {
        if (!this.state.loading) {
            this.setState({
                boxShow: !this.state.boxShow
            })
        }
    }
    //视频播放完毕后
    _onEnd = () => {
        this.setState({
            paused: true,
            // sliderValue: 0
        })
        this.video.seek(0)
    }
    //视频加载成功后调用
    _onLoad = (data) => {
        this.setState({
            duration: Math.ceil(data.duration),
            loading: false,
            boxShow: true
        })
    }
    //视频开始加载时
    _onLoadStart = (data) => {
        this.setState({
            loading: true
        })
    }

    //设置播放暂停
    _setPausedOnPress = () => {
        this.setState({
            paused: !this.state.paused
        })
    }
    //设置全屏
    _setfullScreen = () => {
        if (this.state.fullScreenFlag) {
            Orientation.lockToPortrait();
        } else {
            Orientation.lockToLandscape();
        }
        this.props.hidefullScreen()
        this.setState({
            fullScreenFlag: !this.state.fullScreenFlag
        })
    }

    //视频播放中调用
    _onProgress = (data) => {
        if (this.state.sliderFlag) {
            let value = ((Math.ceil(data.currentTime) / this.state.duration) * 100)
            // console.warn(data.currentTime);
            this.setState({
                sliderValue: value,
                currentTime: Math.ceil(data.currentTime)
            })
        }
    }
    //滑动滑块时触发
    _onValueChange = (length) => {
        let current = this.state.duration * (length / 100)
        // console.warn('current' + current);

        this.setState({
            sliderFlag: false,
            currentTime: Math.ceil(current)
        })
    }
    //手指从滑块离开时触发
    _onSlidingComplete = (length) => {
        let timer = null;
        // console.warn('_onSlidingComplete' + this.state.currentTime);

        this.video.seek(this.state.currentTime)
        // 解决一个进度条来回跳动的bug 为什么这样写 我也不太清楚！！！
        timer = setTimeout(() => {
            this.setState({
                sliderFlag: true,
            })
        }, 250)
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        position: 'relative'
    },
    videoStyle: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },
    topBox: {
        position: 'absolute',
        left: 0,
        top: 0,
        height: "15%",
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.4)',
        paddingLeft: 8,
        paddingRight: 8,
        zIndex: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    topBoxRight: {
        flexDirection: 'row',
        marginRight: 8
    },
    videoPausedIcon: {
        fontFamily: 'iconfont',
        color: 'rgba(255,255,255,0.7)',
        fontSize: 40,
        position: 'absolute',
        right: '10%',
        bottom: '20%'
    },
    loading: {
        position: 'absolute',
        right: 0,
        left: 0,
        top: 0,
        bottom: 0,
    },
    bottonBox: {
        position: 'absolute',
        height: "15%",
        left: 0,
        bottom: 0,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(0,0,0,0.4)'
    },
    leftBox: {
        paddingLeft: 5
    },
    slider: {
        // width: '60%',
        flex: 1
    },
    rightBox: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 15
    },
    duration: {
        fontSize: 12,
        color: '#fff',
        marginRight: 8,
    }
})


export default VideoPlayer;