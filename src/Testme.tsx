import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Testme = () => {
  return (
    <View style={styles.raza}>
      <Text style ={styles.raza}>Testme</Text>
    </View>
  )
}

export default Testme

const styles = StyleSheet.create({
  hammad:{
    userSelect: 'none',
    
  },
  raza:{
    backgroundColor: 'blue',
    overflow: 'hidden',
    textDecorationLine: 'none',
    textDecorationStyle: 'dotted',
    
  }
})