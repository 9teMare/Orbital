import React from 'react'
import {Text, View} from 'react-native'

export default function Esports() {
    return (
        <View style={{alignItems: 'center'}}>
            <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: 'grey', marginTop: 230}}>
                Keep track to Esport news.
            </Text>
            <Text style={{fontSize: 20, fontWeight: '300', textAlign: 'center', color: 'grey', marginTop: 10, lineHeight: 35}}>
                Due to shutting down of lolesport offical API, this feature might only be available in the future releases 😔
            </Text>
      </View>
    )
}

