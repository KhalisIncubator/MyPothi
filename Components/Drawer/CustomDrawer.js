/* eslint-disable prettier/prettier */
import React, { useContext } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

import CustomDrawerItem from './CustomDrawerItem.js';

import { GutkaContext } from '../../Contexts/Contexts';

const CustomDrawerComponent = ({ navigation }) => {
  const GutkaCtx = useContext(GutkaContext);
  return (
    <SafeAreaView style={styles.MainView}>
      <View style={styles.AddView}>
        <Text>Add Gutka</Text>
        <Icon name="plus"
          type='font-awesome'
          color='black'
          onPress={() => { GutkaCtx.createGutka('Kirtaan') }}
        />
      </View>
      <ScrollView>
        <View>
          {GutkaCtx.gutkas.map(x => (
            <CustomDrawerItem key={x.name} value={x.name} navigation={navigation} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  MainView: {
    backgroundColor: '#f5f5f5',
    flex: 1,
  },
  AddView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})
export default CustomDrawerComponent;
