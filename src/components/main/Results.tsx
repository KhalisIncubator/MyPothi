import React from 'react';
import {
  StyleSheet, TouchableOpacity, View, Text, 
} from 'react-native';
import {
  Avatar, Card, Paragraph,Title
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';

const BaniResult = ( props ) => {
  const styling = props.theme;
  const { gurmukhi, addCount } = props.result;
  const { isAdded, onPress } = props;
  return (<TouchableOpacity
    onPress={onPress}
  >
    <Card style={style.Card}>
      <Card.Content style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: isAdded ? props.theme.colors.backdrop : null, borderRadius: props.theme.roundness}}>
        <View>
        <Avatar.Icon icon="book" size={40}/>
        </View>
        <View style={{ padding: 5, flex: 1, }}>
          <Title style={{fontFamily: 'AnmolLipiTrue', textAlign: 'center',}}>{gurmukhi}</Title>        
        </View>
       <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {isAdded && <Icon name="check" style={{ paddingLeft: 5 }} />}
        </View>
      </Card.Content>

    </Card>
   
  </TouchableOpacity>
  );
};

/**
 * <TouchableOpacity
      onPress={onPress}
    >
      <Card.Title
        style={[ style.Card,
          { borderRadius: styling.roundness, backgroundColor: isAdded ? styling.colors.backdrop : styling.colors.surface } ]}
        titleStyle={style.CardTitle}
        title={`${gurmukhi}`}
        left={( properties ) => <Avatar.Icon {...properties} icon="book" />}
        right={() => ( isAdded ? (
          <View style={{ padding: 5, display: 'flex', flexDirection: 'row' }}>
            {addCount && <Paragraph style={{ color: 'black' }}>{addCount}</Paragraph>}
            <Icon name="check" style={{ padding: 5 }} />
          </View>
        ) : null )}
      />
    </TouchableOpacity>
 */
export { BaniResult };

const SearchResult = ( props ) => {
  const styling = props.theme;
  const { isAdded, onPress, addCount, info } = props;
  const { verse, shabadId } = props.result;

  const { source, raag, writer} = info;
  const subtitle = [
    {
      value: raag, 
      color: props.theme.colors.backdrop
    },
    {
      value: writer, 
      color: props.theme.colors.primary
    },
    {
      value: source,
      color: 'black'
    }
  ]
  return (
    <TouchableOpacity
      onPress={onPress}
    >
      <Card style={style.Card}>
        <Card.Content style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: isAdded ? props.theme.colors.backdrop : null, borderRadius: props.theme.roundness}}>
          <View>
          <Avatar.Icon icon="book" size={40}/>
          </View>
          <View style={{ padding: 5, flex: 1, }}>
            <Title style={{fontFamily: 'AnmolLipiTrue', textAlign: 'center',}}>{verse.gurmukhi}</Title>        
          {
            (source || raag || writer) 
            ? 
            (
              <View style={{flexDirection: 'row' , justifyContent: 'space-evenly',}} >
            {
              subtitle.map(({value, color}) => value ? (

                <Text style={{ color: color, fontFamily: 'AnmolLipiTrue' , borderRadius: 6, backgroundColor: 'white', paddingTop: 3, overflow: 'hidden'}}>
                { ` ${value} `}
                </Text>
              ): null)
            }
            </View>): null
          }
          </View>
         <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {addCount && <Paragraph style={{ color: 'black' }}>{addCount}</Paragraph>}
            {isAdded && <Icon name="check" style={{ paddingLeft: 5 }} />}
          </View>
        </Card.Content>

      </Card>
     
    </TouchableOpacity>
  );
};




export { SearchResult };

const style = StyleSheet.create( {
  Card: {
    margin: 5,
  },
  CardTitle: {
    fontFamily: 'AnmolLipiTrue',
    paddingVertical: 5,
    textAlign: 'center'
  }

} );
