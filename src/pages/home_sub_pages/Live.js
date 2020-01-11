import React, { Component } from 'react';
import { StyleSheet, RefreshControl, View, Text, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native'
import { Actions } from 'react-native-router-flux'
import Carousel from 'react-native-banner-carousel';

const BannerWidth = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

// const BannerWidth = '100%';
const BannerHeight = 110;
const images = [
    "https://i0.hdslb.com/bfs/live/7e3cf43b8a72c9f4163d4c28878e7fb993048d61.jpg",
    "https://i0.hdslb.com/bfs/live/3f4d20148866a24b31ed06612f02c1a0183b4da7.jpg",
    "https://i0.hdslb.com/bfs/live/36912f5c0129e190a77e06de4f5977fcb06477c9.jpg"
];

// const alllive = [{ id: 'liveWangzheTitle', title: 'livewangzheBanner' }]

class Live extends Component {
    renderPage(image, index) {
        return (
            <View key={index} style={{ marginLeft: 5, marginRight: 5 }}>
                <Image style={{ width: '100%', height: BannerHeight, borderRadius: 6 }} source={{ uri: image }} />
            </View>
        );
    }

    livePage(value, index) {
        return (
            <View key={index} style={{ width: '48%', marginTop: 5 }}>
                <TouchableOpacity onPress={() => Actions.diantai({ roomd: value.roomid })} activeOpacity={1.0}>
                    <Image source={{ uri: value.cover }} style={{ width: '100%', height: 120, borderRadius: 8 }}></Image>
                </TouchableOpacity>
                <Image source={require('../../assets/images/jianbian.png')} style={{ width: 200, height: 20, marginTop: -20, opacity: 0.4 }} />
                <View style={{ flexDirection: 'row', marginTop: -20 }}>
                    <Text style={{ color: 'white', paddingLeft: 5, fontSize: 12, width: '70%' }}>{value.uname} </Text>
                    <Text style={{ color: 'white', fontSize: 12, paddingRight: 5 }}>{value.online > 10000 ? (value.online / 10000).toFixed(1) + '万' : value.online} </Text>
                </View>
                <Text style={{ marginTop: 8, fontSize: 14 }}> {value.title ? (value.title.length > 12 ? value.title.substr(0, 12) + "..." : value.title) : ""}</Text>
                <Text style={{ marginBottom: 12, marginLeft: 5, marginTop: 4, color: '#8a8a8a', fontSize: 12 }}>{value.area_v2_name}</Text>
            </View>
        );
    }


    componentWillMount() {
        this.setState({
            refreshing: true
        })
        this.getLiveDetail();
    }

    getLiveDetail = () => {
        fetch('https://api.live.bilibili.com/room/v2/AppIndex/getAllList?device=phone&platform=ios&scale=3')
            .then((response) => response.json())//取数据
            .then(data => {//处理数据
                //通过setState()方法重新渲染界面\
                if (data.code === 0) {
                    this.setState({
                        refreshing: false,
                        isloading: true,
                        livetuijTitle: data.data.module_list[7].module_info,
                        livetuijBn: data.data.module_list[7].list.filter((item, idx) => { if (idx < 4) return item }),
                        liveWangzheTitle: data.data.module_list[15].module_info,
                        livewangzheBanner: data.data.module_list[15].list.filter((item, idx) => { if (idx < 4) return item }),
                        liveDiantaiTitle: data.data.module_list[13].module_info,
                        liveDiantaiBn: data.data.module_list[13].list.filter((item, idx) => { if (idx < 4) return item }),
                        liveonefoTitle: data.data.module_list[14].module_info,
                        liveonefoBn: data.data.module_list[14].list.filter((item, idx) => { if (idx < 4) return item }),
                        liveonesiTitle: data.data.module_list[16].module_info,
                        liveonesxBn: data.data.module_list[16].list.filter((item, idx) => { if (idx < 4) return item }),
                        liveoneseTitle: data.data.module_list[17].module_info,
                        liveoneseBn: data.data.module_list[17].list.filter((item, idx) => { if (idx < 4) return item }),
                        liveonentTitle: data.data.module_list[18].module_info,
                        liventBn: data.data.module_list[18].list.filter((item, idx) => { if (idx < 4) return item }),
                        liveoneniTitle: data.data.module_list[18].module_info,
                        liveoneniBn: data.data.module_list[18].list.filter((item, idx) => { if (idx < 4) return item }),

                    })

                }
            })
    }

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            liveoneniBn: [],
            liveoneniTitle: {},
            liventBn: [],
            liveonentTitle: {},
            liveoneseBn: [],
            liveoneseTitle: {},
            liveonesxBn: [],
            liveonesiTitle: {},
            livetuijBn: [],
            livetuijTitle: {},
            liveWangzheTitle: {},
            livewangzheBanner: [],
            liveDiantaiBn: [],
            liveDiantaiTitle: {},
            liveonefoTitle: {},
            liveonefoBn: [],
            isloading: false,
        }
    }
    _onRefresh = () => {
        this.setState((oldState) => {
            return {
                refreshing: true,
                // hotList: [],
            }
        }, this.getLiveDetail)
    }

    readerBox = (obj, obj2) => {
        return (
            <View style={{ marginTop: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ marginLeft: 10, color: '#000', width: '74%' }}>{obj.title}</Text>
                    <Text style={{ color: '#8a8a8a' }}>查看更多</Text>
                    <Image source={require('../../assets/images/liveNext.png')} style={{ width: 16, height: 16, marginTop: 2 }} />
                </View>
                <View style={{ width: '100%', paddingLeft: 5, paddingRight: 5, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 10 }}>
                    {obj2.map((value, index) => this.livePage(value, index))}
                </View>
                <View style={{ marginTop: 10 }}>
                    <Image source={require('../../assets/images/horline.png')} style={{ width: '100%', height: 1, marginTop: -5 }} />
                </View>
            </View>
        )
    }

    renderBody = () => {
        return (
            <View>
                <View style={{ marginTop: 10 }}>
                    <Carousel
                        autoplay
                        autoplayTimeout={5000}
                        loop
                        index={0}
                        pageSize={BannerWidth}
                    >
                        {images.map((image, index) => this.renderPage(image, index))}
                    </Carousel>
                </View>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 }}>
                    <View style={styles.box}>
                        <Image source={{ uri: 'http://i0.hdslb.com/bfs/vc/dcfb14f14ec83e503147a262e7607858b05d7ac0.png' }} style={{ width: 60, height: 60 }}></Image>
                        <Text>英雄联盟</Text>
                    </View>
                    <View style={styles.box}>
                        <Image source={{ uri: 'http://i0.hdslb.com/bfs/vc/c666c6dc2d5346e0d3cfda7162914d84d16964dd.png' }} style={{ width: 60, height: 60 }}></Image>
                        <Text>lol云顶之弈</Text>
                    </View>
                    <View style={styles.box}>
                        <Image source={{ uri: 'http://i0.hdslb.com/bfs/vc/8f7134aa4942b544c4630be3e042f013cc778ea2.png' }} style={{ width: 60, height: 60 }}></Image>
                        <Text>王者荣耀</Text>
                    </View>
                    <View style={styles.box}>
                        <Image source={{ uri: 'http://i0.hdslb.com/bfs/live/8fd5339dac84ec34e72f707f4c3b665d0aa41905.png' }} style={{ width: 60, height: 60 }}></Image>
                        <Text>娱乐</Text>
                    </View>
                    <View style={styles.box}>
                        <Image source={{ uri: 'http://i0.hdslb.com/bfs/live/827033eb0ac50db3d9f849abe8e39a5d3b1ecd53.png' }} style={{ width: 60, height: 60 }}></Image>
                        <Text>单机</Text>
                    </View>
                    <View style={styles.box}>
                        <Image source={{ uri: 'http://i0.hdslb.com/bfs/live/a7adae1f7571a97f51d60f685823acc610d00a7e.png' }} style={{ width: 60, height: 60 }}></Image>
                        <Text>电台</Text>
                    </View>
                    <View style={styles.box}>
                        <Image source={{ uri: 'http://i0.hdslb.com/bfs/vc/9bfde767eae7769bcaf9156d3a7c4df86632bd03.png' }} style={{ width: 60, height: 60 }}></Image>
                        <Text>怪物猎人:世界</Text>
                    </View>
                    <View style={styles.box}>
                        <Image source={{ uri: 'http://i0.hdslb.com/bfs/vc/973d2fe12c771207d49f6dff1440f73d153aa2b2.png' }} style={{ width: 60, height: 60 }}></Image>
                        <Text>无主之地3</Text>
                    </View>
                    <View style={styles.box}>
                        <Image source={{ uri: 'http://i0.hdslb.com/bfs/vc/976be38da68267cab88f92f0ed78e057995798d6.png' }} style={{ width: 60, height: 60 }}></Image>
                        <Text>第五人格</Text>
                    </View>
                    <View style={styles.box}>
                        <Image source={{ uri: 'https://i0.hdslb.com/bfs/vc/ff03528785fc8c91491d79e440398484811d6d87.png' }} style={{ width: 60, height: 60 }}></Image>
                        <Text >全部标签</Text>
                    </View>
                </View>
                <View style={{ marginTop: 10 }}>
                    <Image source={require('../../assets/images/horline.png')} style={{ width: 450, height: 1 }} />
                </View>

                <View style={{ width: '100%' }}>
                    {this.readerBox(this.state.livetuijTitle, this.state.livetuijBn)}
                    {this.readerBox(this.state.liveWangzheTitle, this.state.livewangzheBanner)}
                    {this.readerBox(this.state.liveDiantaiTitle, this.state.liveDiantaiBn)}
                    {this.readerBox(this.state.liveonefoTitle, this.state.liveonefoBn)}
                    {this.readerBox(this.state.liveonesiTitle, this.state.liveonesxBn)}
                    {this.readerBox(this.state.liveoneseTitle, this.state.liveoneseBn)}
                    {this.readerBox(this.state.liveonentTitle, this.state.liventBn)}
                    {/* {this.readerBox(this.state.liveoneniTitle, this.state.liveoneniBn)} */}
                </View>
            </View>
        )
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}
                        colors={['#fb7b9e']}
                    />}>
                    {this.state.isloading ? this.renderBody() : null}
                </ScrollView>
            </View>
        )
    }

}
const styles = StyleSheet.create({
    box: {
        width: '20%',
        alignItems: 'center',
        marginTop: 5
    },
    wrapper: {
        backgroundColor: '#fff',
    },
    containerHorizontal: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 150,
    },
    lunbo: {
        width: '100%',
        height: 100
    }
})





export default Live;