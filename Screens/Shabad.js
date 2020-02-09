import React from 'react';
import { View } from 'react-native';
import { Header, Icon } from 'react-native-elements';

import LineBlock from '../Components/Main/LineBlock';

import { GutkaContext } from '../Contexts/Contexts';
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
            onPress={() => this.props.navigation.navigate('Settings')} />}
        />
        <LineBlock />
      </View>
    );
  }
}
Shabad.contextType = GutkaContext;
export default Shabad;