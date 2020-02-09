/* eslint-disable prettier/prettier */
import React, { useEffect, useMemo, useState, useContext, useCallback } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet } from 'react-native';


import { GutkaContext } from '../../Contexts/Contexts';
import CustomDrawerItem from './CustomDrawerItem.js';
import { fetchGukas } from '../../Config/GutkaStorage';
import LoadingItems from './LoadingItems.js';
import { ThemeConsumer } from 'react-native-elements';
import { Icon } from 'react-native-elements';

const CustomDrawerComponent = ({ navigation }) => {
  const GutkaCtx = useContext(GutkaContext);
  if (GutkaCtx.gutkas.length != 0) {
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
  } else {
    return (
      <SafeAreaView>
        <View>
        </View>
        <ScrollView>
          <View>
            <LoadingItems />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

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
