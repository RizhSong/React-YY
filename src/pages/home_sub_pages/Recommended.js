/*
   需要下载的额外包、库、组件
   react-native-banner-carousel
*/

import React, { Component } from 'react';
import {
   StyleSheet,
   View,
   Text,
   Image,
   ImageBackground,
   FlatList,
   RefreshControl,
   TouchableOpacity
} from 'react-native'
import Carousel from 'react-native-banner-carousel'
import { Actions } from 'react-native-router-flux';

/* css */
const styles = StyleSheet.create({
   recommended: {
      flex: 1,
      backgroundColor: '#f1f1f1'
   },
   carousel: {
      width: '100%',
      height: 210,
      paddingTop: 10,
      paddingLeft: 5,
      paddingRight: 5
   },
   carouselList: {
      width: '100%',
      height: '100%'
   },
   carouselItem: {
      position: 'relative',
      width: '100%',
      height: '100%',
   },
   carouselImg: {
      width: '100%',
      height: '100%',
      backgroundColor: '#fff'
   },
   carouselName: {
      position: 'absolute',
      left: 5,
      bottom: 5,
      fontSize: 15,
      fontWeight: '700',
      color: '#fff'
   },
   recommend: {
      flex: 1,
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 5,
      paddingRight: 5,
      paddingTop: 0
   },
   recommendList: {
      width: '100%',
   },
   recommendItem: {
      width: '50%',
      height: 220,
      paddingTop: 10,
      paddingLeft: 5,
      paddingRight: 5,
      paddingBottom: 10
   },
   recommendItemInner: {
      width: '100%',
      height: '100%',
      backgroundColor: '#fff',
      borderRadius: 5,
      overflow: 'hidden'
   },
   recommendImg: {
      flex: 6
   },
   recommendDesc: {
      flex: 4
   },
   recommendTitle: {
      flex: 16,
      padding: 10
   },
   recommendOtherMsg: {
      flex: 9,
      flexDirection: 'row',
      padding: 10,
      paddingTop: 0
   },
   recommendTname: {
      fontSize: 12,
      color: '#999',
      maxWidth: '50%'
   },
   recommendTag: {
      fontSize: 12,
      color: '#999',
      maxWidth: '50%'
   }
})

class Recommended extends Component {
   constructor(props) {
      super(props);
      this.state = {
         carouselList: [],
         recommendList: [],
         isRefreshed: false, //页面是否刷新过
         reFreshing: false, //是否在刷新过程中
      }
   }

   /* 主渲染 */
   render() {
      return (
         <View
            style={styles.recommended}
         >
            {(this.renderRecommend())()}
         </View>
      );
   }
   //去播放页面
   _toVideoPageOnPress(item) {
      console.warn(item.param);
      Actions.VideoPage({ 'aid': item.param })
   }

   /* 子组件 */
   // 轮播列表
   renderCarousel() {
      if (!this.state.isRefreshed) {//第一次加载时出现
         return () =>
            <View
               style={styles.carousel}
            >
               <Carousel
                  autoplay
                  autoplayTimeout={5000}
                  loop
                  index={0}
                  style={styles.carouselList}

               >
                  {this.state.carouselList.map((v, k) => this.renderCarouselItem(v, k))}
               </Carousel>
               <View
                  style={styles.carouselPointList}
               >
                  {
                     this.state.carouselList.map((item, index) =>
                        <View
                           key={index}
                           style={styles.carouselPoint}
                        ></View>
                     )
                  }
               </View>
            </View>
      }
      return () => { }
   }
   // 轮播元素
   renderCarouselItem(item, index) {
      return (
         <TouchableOpacity
            style={styles.carouselItem}
            key={index}
         >
            <Image
               style={styles.carouselImg}
               source={{ uri: item.pic }}
            />
            <Text
               style={styles.carouselName}
            >
               {item.name}
            </Text>
         </TouchableOpacity>
      )
   }
   // 推荐列表
   renderRecommend() {
      return () =>
         <View
            style={styles.recommend}
         >
            <FlatList
               style={styles.recommendList}
               ListHeaderComponent={(this.renderCarousel())()}
               numColumns={2}
               data={this.state.recommendList}
               keyExtractor={(item, index) => (index + '1')}
               onEndReached={this._onEndReached.bind(this)} //上拉加载方法
               onEndReachedThreshold={1.2}  //距离底部有多远的时候进行加载
               renderItem={this.renderRecommendItem}
               refreshControl={
                  <RefreshControl
                     refreshing={this.state.reFreshing}
                     onRefresh={this._onRefresh.bind(this)} //下拉刷新
                     colors={['#fb7b9e']}
                  />}
            />
         </View>
   }
   // 推荐元素
   renderRecommendItem = (item, index) => {
      return (
         <TouchableOpacity
            key={index}
            onPress={() => this._toVideoPageOnPress(item.item)}
            // onPress={(item) => console.warn(item)}
            style={styles.recommendItem}
         >
            <View
               style={styles.recommendItemInner}
            >
               <ImageBackground
                  style={styles.recommendImg}
                  source={{ uri: item.item.cover }}
               >

               </ImageBackground>
               <View
                  style={styles.recommendDesc}
               >
                  <Text
                     numberOfLines={2}
                     style={styles.recommendTitle}
                  >
                     {item.item.title}
                  </Text>
                  <View
                     style={styles.recommendOtherMsg}
                  >
                     <Text
                        numberOfLines={1}
                        style={styles.recommendTags, styles.recommendTname}
                     >
                        {item.item.tname}
                     </Text>
                     {
                        ((item) => {
                           if (item.item.tag) {
                              return (
                                 <Text
                                    numberOfLines={1}
                                    style={styles.recommendTags, styles.recommendTag}
                                 >
                                    •{item.item.tag.tag_name}
                                 </Text>
                              )
                           }
                        })(item)
                     }
                  </View>
               </View>
            </View>
         </TouchableOpacity>
      )
   }

   /* 生命周期函数 */
   componentDidMount() {
      // 初始化页面
      this.init();
   }

   /* 方法 */
   // 得到轮播图
   async getCarousel() {
      let res = await fetch('https://api.bilibili.com/x/web-show/res/loc?pf=7&id=1695')
      let resJson = await res.json()

      return resJson.data;
   }
   // 得到推荐视频
   async getRecommend() {
      let res = await fetch('https://app.bilibili.com/x/feed/index?appkey=1d8b6e7d45233436&build=508000&login_event=0&mobi_app=android')
      let resJson = await res.json()

      return resJson.data;
   }
   // 页面初始化
   async init() {
      let recommend = await this.getRecommend();
      //更新推荐视频数据
      this.setState({ recommendList: recommend });

      let carousel = await this.getCarousel();
      //更新轮播图
      this.setState({ carouselList: carousel });

   }
   //上拉加载
   async _onEndReached() {
      let recommend = await this.getRecommend();
      this.setState({
         recommendList: this.state.recommendList.concat(recommend)
      });
   }
   //下拉刷新
   _onRefresh() {
      this.setState({
         isRefreshed: true
      })
      this.init();
   }
}

export default Recommended;