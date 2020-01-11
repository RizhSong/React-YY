import React, { Component } from 'react';
import {
    View,
    StyleSheet,
} from 'react-native'

import { Item, Input, Icon, } from 'native-base';


const Search = () => {
    return (
        <View>
            <Item style={styles.search}>
                <Icon name="search" style={styles.searchIcon} />
                <Input placeholder="抱团购" style={styles.searchInput} />
            </Item>
        </View>
    )
}
const styles = StyleSheet.create({
    search: {
        flexDirection: 'row',
        backgroundColor: "#EEEEEE",
        marginTop: 10,
        marginBottom: 10,
        width: '95%',
        marginLeft: "auto",
        marginRight: "auto",
        borderRadius: 100,
    },
    searchIcon: {
        flex: 2,
        textAlign: "right",
        fontSize: 18,
        marginRight: 10,
        color: '#F06292',
    },
    searchInput: {
        height: 35,
        flex: 5,
        fontSize: 10,
        position: "relative",
        top: 0
    },

})
export default Search

