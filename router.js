import React, { Component } from 'react'
import { Router, Stack, Scene, Tabs } from 'react-native-router-flux'
import App from './App.js'

import HomePage from './src/pages/HomePage';
import Classify from './src/pages/Classify';
import MemberBuy from './src/pages/MemberBuy';
import Dynamic from './src/pages/Search';

//视频播放页面
import VideoPage from './src/pages/vidoe_player/VideoPage';
import Diantai from './src/pages/home_sub_pages/home_live/diantai'
import BanMore from './src/components/BanMore.js';

class AppRouter extends Component {
    render() {
        return (
            <Router sceneStyle={{ backgroundColor: 'white' }}>
                <Stack key="root" hideNavBar>
                    {/* hideNavBar */}
                    <Scene key="app" component={App} />
                    <Scene key="diantai" component={Diantai} />
                    <Scene key="VideoPage" component={VideoPage} />
                    <Scene key="banmore" component={BanMore} />

                    {/* <Scene hideNavBar tabBarPosition="bottom">
                        <Tabs
                            key="tabbar"
                            swipeEnabled
                            wrap={false}
                            // 是否显示标签栏文字
                            showLabel={true}
                            tabBarStyle={{ backgroundColor: "yellow" }}
                            //tab选中的颜色
                            activeBackgroundColor="hotpink"
                            //tab没选中的颜色
                            inactiveBackgroundColor="#fff"
                            animationEnabled
                            swipeEnabled
                            tabStyle={{ alignContent: "center", paddingBottom: 15 }}
                        >
                            <Scene
                                key="HomePage"
                                component={HomePage}
                                title="HomePage"
                            />

                            <Scene
                                key="Classify"
                                component={Classify}
                                title="Classify"
                            />

                            <Scene
                                key="Dynamic"
                                component={Dynamic}
                                title="Dynamic"
                            />
                            <Scene
                                key="MemberBuy"
                                component={MemberBuy}
                                title="MemberBuy"
                            />
                        </Tabs>
                    </Scene> */}
                </Stack>
            </Router>);
    }
}

export default AppRouter;

