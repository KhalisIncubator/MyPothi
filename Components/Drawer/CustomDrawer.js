/* eslint-disable prettier/prettier */
import React, { useEffect, useMemo, useState, useContext } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet } from 'react-native';


import { GutkaContext } from '../../Contexts/GutkaCtx.js';
import CustomDrawerItem from './CustomDrawerItem.js';
import { fetchGukas } from '../../Config/GutkaStorage';
import LoadingItems from './LoadingItems.js';
import { ThemeConsumer } from 'react-native-elements';
class CustomDrawerComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      storedGutkas: [],
      isTimeForUpdate: false,
    }
  }

  componentDidMount() {
  }
  componentDidUpdate() {
  }
  render() {
    let Ctx = this.context
    if (Ctx.gutkas.length != 0) {
      return (
        <SafeAreaView style={styles.View}>
          <View>
          </View>
          <ScrollView>
            <View>
              {Ctx.gutkas.map(x => (
                <CustomDrawerItem key={x.name} value={x.name} navigation={this.props.navigation} />
              ))}
            </View>
            <View><Text>{this.state.isTimeForUpdate}</Text></View>
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
}
CustomDrawerComponent.contextType = GutkaContext;


const styles = StyleSheet.create({
  View: {
    backgroundColor: '#f5f5f5',
    flex: 1,
  }
})
export default CustomDrawerComponent;
