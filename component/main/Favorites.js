import React, { useState } from 'react'
import { View, Text, StatusBar, StyleSheet } from 'react-native'
import PagerView from 'react-native-pager-view';

export default function Favorites() {

    return (
        // <View>
        //     <StatusBar/>
        //     <Text> Favourite </Text>
        // </View>
        <View style={{ flex: 1 }}>
        <PagerView style={styles.viewPager} initialPage={0}>
          <View style={styles.page} key="1">
            <Text>First page</Text>
            <Text>Swipe ➡️</Text>
          </View>
          <View style={styles.page} key="2">
            <Text>Second page</Text>
          </View>
          <View style={styles.page} key="3">
            <Text>Third page</Text>
          </View>
        </PagerView>
      </View>
    )
}

const styles = StyleSheet.create({
    viewPager: {
      marginTop: 50,
      height: 400,
      width: 300,
      alignSelf: 'center'
    },
    page: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 100,
      borderColor: 'black',
      borderWidth: 2,
      
    },
  });