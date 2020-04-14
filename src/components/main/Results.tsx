import React, { ReactChild } from 'react';
import {
  StyleSheet, TouchableOpacity, View, Text,
} from 'react-native';
import {
  Avatar, Card, Paragraph, Title,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';


const SourceColors = {
  'sRI gurU gRMQ swihb jI': '#417d9a',
  'dsm bwxI': '#7c00ff',
  'BweI gurdws jI vwrW': '#017174',
  'BweI gurdws isMG jI vwrW': '#746f01',
  'BweI nMd lwl jI vwrW': '#74001d',
  'rihqnwmy Aqy pMQk il^qW': '#000',
};
const ShabadCard = ( {
  subheading, itemsRight, title, roundness, backgroundCondition, icon, surfaceColor,
} ) => {
  const containerStyle = StyleSheet.flatten( [ {
    backgroundColor: backgroundCondition || surfaceColor,
    borderRadius: roundness,
  }, style.CardContent ] );
  return (
    <Card style={style.Card}>
      <Card.Content style={containerStyle}>
        <View>
          <Avatar.Icon icon={icon} size={40} />
        </View>
        <View style={style.CardTitleContainer}>
          <Title style={style.CardTitle}>{title}</Title>
          {subheading}
        </View>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
        >
          {itemsRight}
        </View>
      </Card.Content>
    </Card>
  );
};

export default ShabadCard;
interface TouchableShabadCard {
  onPress: () => void,
  ResultCard: React.ReactNode
}

const TouchableShabadCard: React.FC<TouchableShabadCard> = ( { ResultCard, onPress } ) => (
  <TouchableOpacity onPress={onPress}>
    {ResultCard}
  </TouchableOpacity>
);

interface BaseProps {
  theme: any,
  onPress: () => void,
  isAdded: boolean,
  title: string,
  addedCount?: number,
  subheading?: ReactChild,
}
const ResultBase: React.FC<BaseProps> = ( {
  theme, onPress, isAdded, title, addedCount, subheading,
} ) => {
  const card = (
    <ShabadCard
      surfaceColor={theme.colors.surface}
      roundness={theme.roundness}
      title={title}
      backgroundCondition={isAdded ? theme.colors.backdrop : null}
      itemsRight={(
        <>
          {addedCount && <Paragraph style={{ color: 'black' }}>{addedCount}</Paragraph>}
          {isAdded && <Icon name="check" style={{ paddingLeft: 5 }} />}
          {!isAdded && <Icon name="plus" style={{ paddingLeft: 5 }} />}
        </>
    )}
      subheading={subheading}
      icon="book"
    />
  );

  return (
    <TouchableShabadCard ResultCard={card} onPress={onPress} />
  );
};

const SearchResult = ( {
  theme, onPress, info, addedCount, isAdded, result,
} ) => {
  const { raag, writer, source } = info;
  const { verse } = result;
  const subtitle = [
    {
      value: raag,
      color: theme.colors.backdrop,
    },
    {
      value: writer,
      color: theme.colors.primary,
    },
    {
      value: source,
      color: SourceColors[source],
    },
  ];
  return (
    <ResultBase
      subheading={
      (
        ( source || raag || writer )
          ? (
            <View style={{
              flexDirection: 'row',
              alignSelf: 'center',
            }}
            >
              { // edge case of bhai gurdaas ji vaaran
          subtitle.map( ( { value, color } ) => ( !( !value || value === ' -' ) ? (
            <View style={{ paddingHorizontal: 5 }}>
              <Text style={{
                color,
                fontFamily: 'AnmolLipiTrue',
                borderRadius: 6,
                backgroundColor: 'white',
                overflow: 'hidden',
                paddingVertical: 2,
              }}
              >
                { ` ${value} `}
              </Text>
            </View>
          ) : null ) )
        }
            </View>
          ) : null
      )
    }
      isAdded={isAdded}
      addedCount={addedCount}
      theme={theme}
      onPress={onPress}
      title={verse.gurmukhi}
    />
  );
};
const BaniResult = ( {
  theme, result, onPress, isAdded,
} ) => {
  const { gurmukhi } = result;
  return (
    <ResultBase
      isAdded={isAdded}
      title={gurmukhi}
      theme={theme}
      onPress={onPress}
    />
  );
};

export { BaniResult, SearchResult, SourceColors };

const style = StyleSheet.create( {
  Card: {
    margin: 5,
  },
  CardContent: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  CardTitle: {
    fontFamily: 'AnmolLipiTrue',
    padding: 5,
    textAlign: 'center',
  },
  CardTitleContainer: {
    flex: 1,
  },

} );
