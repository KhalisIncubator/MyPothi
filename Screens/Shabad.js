import React from 'react';
import {
  View,
  Text,
  SafeAreaView
} from 'react-native';
import { GutkaContext } from '../Contexts/GutkaCtx';
import { Header } from 'react-native-elements';

import { Icon } from 'react-native-elements';
class Shabad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  componentDidMount() { }
  componentDidUpdate() { }

  render() {
    let ctx = this.context;
    return (
      <View>
        <Header
          backgroundColor={"#f99d1c"}
          leftComponent={<Icon
            name="arrow-left"
            type='font-awesome'
            color='white'
            onPress={() => this.props.navigation.navigate('Gutka')} />
          }
          rightComponent={<Icon
            name="cog"
            type='font-awesome'
            color='white'
            onPress={() => alert('menu')} />}
        />
      </View>
    );
  }
}
Shabad.contextType = GutkaContext;
export default Shabad;