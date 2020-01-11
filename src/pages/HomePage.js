import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native'

import { Container, Tab, Tabs, ScrollableTab } from 'native-base';

import Live from './home_sub_pages/Live';
import Recommended from './home_sub_pages/Recommended';
import Hot from './home_sub_pages/Hot';
import Bangumi from './home_sub_pages/Bangumi';
import Move from './home_sub_pages/Move';
import SeventyYears from './home_sub_pages/SeventyYears';


class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollTabViewLocked: false
    }
  }

  _lockSlide = () => {
    this.setState({
      scrollTabViewLocked: true
    })
  }
  _openSlide = () => {
    this.setState({
      scrollTabViewLocked: true
    })
  }
  render() {
    return (
      <Container>
        {/* <Header hasTabs /> */}
        <Tabs
          locked={false}
          initialPage={1}
          tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
          renderTabBar={() => <ScrollableTab tabsContainerStyle={styles.tabsContainerStyle} style={{ height: 35, width: '100%' }}
          />}>
          <Tab heading="直播"
            textStyle={styles.textStyle}
            tabStyle={styles.tabStyle}
            activeTextStyle={styles.activeTextStyle}
            activeTabStyle={styles.activeTabStyle}
          >
            <Live></Live>
          </Tab>
          <Tab heading="推荐"
            textStyle={styles.textStyle}
            tabStyle={styles.tabStyle}
            activeTextStyle={styles.activeTextStyle}
            activeTabStyle={styles.activeTabStyle}
          >
            <Recommended></Recommended>
          </Tab>
          <Tab heading="热门"
            textStyle={styles.textStyle}
            tabStyle={styles.tabStyle}
            activeTextStyle={styles.activeTextStyle}
            activeTabStyle={styles.activeTabStyle}
          >
            <Hot _lockSlide={this._lockSlide} _openSlide={this._openSlide} ></Hot>
          </Tab>
          <Tab heading="追番"
            textStyle={styles.textStyle}
            tabStyle={styles.tabStyle}
            activeTextStyle={styles.activeTextStyle}
            activeTabStyle={styles.activeTabStyle}
          >
            <Bangumi></Bangumi>
          </Tab>
          <Tab heading="影视"
            textStyle={styles.textStyle}
            tabStyle={styles.tabStyle}
            activeTextStyle={styles.activeTextStyle}
            activeTabStyle={styles.activeTabStyle}
          >
            <Move></Move>
          </Tab>
          <Tab heading="70年"
            textStyle={styles.textStyle}
            tabStyle={styles.tabStyle}
            activeTextStyle={styles.activeTextStyle}
            activeTabStyle={styles.activeTabStyle}
          >
            <SeventyYears></SeventyYears>
          </Tab>
        </Tabs>
      </Container>
    )
  }
}
const styles = StyleSheet.create({
  tabBarUnderlineStyle: {
    backgroundColor: '#fb7b9e',
    marginLeft: '4%',
    height: 2.5,
    width: 20
  },
  tabStyle: {
    backgroundColor: '#fff',
    // alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10
  },
  activeTabStyle: {
    backgroundColor: '#fff',
    paddingLeft: 10,
    paddingRight: 10
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
  }
})

export default HomePage;