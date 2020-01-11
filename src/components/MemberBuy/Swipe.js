import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Image,
    // Carousel,
    Dimensions
} from 'react-native'
import Carousel from 'react-native-banner-carousel';
import { hidden } from 'colorette';
const BannerWidth = Dimensions.get('window').width;

const Swipe = (props) => {
    return (
        <View style={{marginTop:10,borderRadius:5,overflow:"hidden"}} >
            <Carousel
                autoplay
                loop
                index={1}
                pageSize={BannerWidth}
                pageIndicatorContainerStyle={{ position: "absolute", right: 10, }}
                style={{ flex: 1 }}
            >
                {props.banners.map((banners, index) => props.renderPage(banners, index))}
            </Carousel>
        </View>

    )
  
}
const styles = StyleSheet.create({


})
export default Swipe