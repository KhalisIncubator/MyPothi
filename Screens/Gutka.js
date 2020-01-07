import React, { useContext } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet
} from 'react-native';

import { Header } from 'react-native-elements';
import { GutkaContext } from '../Contexts/GutkaCtx';
import HeaderIcon from '../Components/navigation/HeaderIcon';
import { fetchGukas } from '../Config/GutkaStorage';
import ShabadButton from '../Components/Main/ShabadButton';
import MainHeader from '../Components/navigation/MainHeader';
import LoadingItems from '../Components/Drawer/LoadingItems';
class Gutka extends React.Component {
  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    let ctx = this.context;
    const result = await fetchGukas();
    for (const gutka of result) {
      ctx.addToGutkas(prevArr => [...prevArr, gutka]);

    }
    if (ctx.currGutka === 'Loading...' && ctx.gutkas.length != 0) {
      ctx.setCurrGutka('Loading');
    }
    this.setState({ currGutka: ctx.currGutka });
    ctx.updateFetchingStatus(true);
  }
  componentDidUpdate() {
    let ctx = this.context;
    if (ctx.currGutka === 'Loading...' && ctx.gutkas.length != 0) {
      ctx.setCurrGutka(ctx.gutkas[0].name);
    }
  }
  render() {
    let ctx = this.context;
    if (ctx.gutkas.length != 0) {
      return (
        <View style={styles.View}>
          <MainHeader navigation={this.props.navigation} />
          {
            <Text>{ctx.gutkas[`${ctx.currGutka}`].name}</Text>
          }
        </View>
      );
    } else {
      return (
        <View style={styles.View}>
          <MainHeader navigation={this.props.navigation} />
          <LoadingItems />
        </View>
      );
    }
  }
}
Gutka.contextType = GutkaContext;
const styles = StyleSheet.create({
  View: {
    backgroundColor: '#f5f5f5',
    flex: 1,
  }
})
export default Gutka;