import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList,
    Image
} from 'react-native'

const FiveList = (props) => {
    return (
        <View>
          <FlatList
                    data={props.list}
                    numColumns={5}
                    renderItem={({ item, i }) => {
                        return (
                            <View key={i} style={{
                                flex: 1,
                                alignItems: 'center',
                            }}>
                                <Image style={{ width: 60, height: 60 }} source={{ uri: `http:${item.imageUrl}` }} ></Image>
                                <Text>{item.name}</Text>
                            </View>
                        )
                    }}
                />
        </View>
    )
}

export default FiveList