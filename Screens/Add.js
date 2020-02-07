import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput
} from 'react-native';
import { Header } from 'react-native-elements';

import { Icon } from 'react-native-elements';
import AddShabadButton from '../Components/Main/AddShabadButton';
const AddScreen = ({ navigation }) => {
  const [inputVal, updateInputVal] = useState('Type Here...');
  return (
    <View style={style.Bg}>
      <Header
        backgroundColor={"#f99d1c"}
        leftComponent={<Icon
          name="arrow-left"
          type='font-awesome'
          color='white'
          onPress={() => navigation.navigate('Gutka')} />
        }
        centerComponent={{ text: 'Add', style: { color: '#fff', fontSize: 25 } }}
      />
      <View style={style.Searchbar}>
        <Icon
          name="search"
          type='font-awesome'
          color='black'
          containerStyle={style.IconContainer}
          iconStyle={style.Icon}
          onPress={() => alert('Nice!')} />
        <TextInput style={style.TextInput} onChangeText={text => {
          updateInputVal(text);
        }}
          placeholder={inputVal} autoCorrect={false} autoCompleteType='off' />
      </View>
      <View style={style.Main}>
        <AddShabadButton navigation={navigation} />
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  Searchbar: {
    backgroundColor: '#FEFEFE',
    marginTop: 15,
    marginHorizontal: 15,
    minHeight: 40,
    alignItems: 'center',
    flexDirection: 'row',
  },
  Main: {
    alignItems: 'center',
    marginTop: 15
  },
  Bg: {
    backgroundColor: '#f5f5f5',
    flex: 1,
  },
  IconContainer: {
    marginLeft: 5,
  },
  Icon: {
    color: '#b0b0b0'
  },
  TextIn: {
    height: 40, borderColor: 'gray', borderWidth: 1, flex: 1,
  }
})
export default AddScreen;