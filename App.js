/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  View
} from 'react-native';

const ITEM_LENGTH = 100;
const HEADER_LENGTH = 150;
const SEPARATOR_HEIGHT = 1;

export default class App extends Component<{}> {
  state = { viewable: [], showHeader: false }
  _getItemLayout = (data, index) => {
    return {
      length: ITEM_LENGTH,
      offset: (ITEM_LENGTH + SEPARATOR_HEIGHT) * index,
      index,
    };
  };
  render() {
    return (
      <View style={styles.container}>
        <FlatList
            keyExtractor={(item) => item.id}
            getItemLayout={this._getItemLayout}
            data={[
                {id: '1', key: '1', bg: 'coral'},
                {id: '2', key: '2', bg: 'lightgreen'},
                {id: '3', key: '3', bg: 'lightblue'},
                {id: '4', key: '4', bg: 'orange'},
              ]}
            onViewableItemsChanged={(info) => this.setState({viewable: info.viewableItems.map(x => x.key)})}
            ItemSeparatorComponent={() => <View style={{height: SEPARATOR_HEIGHT}} />}
            ListHeaderComponent={() => this.state.showHeader && (
              <View style={styles.header}>
                <Text>ListHeaderComponent, Length=100</Text>
              </View>
            )}
            ListFooterComponent={() => (
              <View style={styles.item}>
                <Text>Viewable Keys: {JSON.stringify(this.state.viewable)}</Text>
                <Button
                  title={`${this.state.showHeader ? 'Remove Header Component' : 'Add Header Component'}`}
                  onPress={() => this.setState({showHeader: !this.state.showHeader})}
                />
              </View>
            )}
            renderItem={({ item }) => {
              return (
                <View style={[styles.item, {backgroundColor: item.bg}]}>
                  <Text>
                    {item.key} -
                    {(this.state.viewable.indexOf(item.key) > -1)
                      ? 'Visible'
                      : 'NOT Visible'
                    }
                  </Text>
                </View>
              )
            }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  item: {
    height: ITEM_LENGTH,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    height: HEADER_LENGTH,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
