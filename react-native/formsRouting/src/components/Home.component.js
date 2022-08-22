import React from 'react';
import {Button, View, Text} from 'react-native';

export default function HomeScreen({route, navigation}) {
  const {title} = route.params;
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen {`${title}`}</Text>
      <Button
        title="Go to Details"
        onPress={() =>
          navigation.navigate('Details', {
            description: 'More details will be revealed later.',
          })
        }
      />
      <Button
        title="Go to the Form"
        onPress={() =>
          navigation.navigate('Form', {
            description: 'Form component',
          })
        }
      />
    </View>
  );
}
