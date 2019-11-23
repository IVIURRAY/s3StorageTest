import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import config from './src/aws-exports';
import Amplify, { Storage, Auth } from 'aws-amplify';
Amplify.configure(config);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      homer: ''
    }
  }

  componentDidMount = async () => {
    this.s3test();
  }

  s3test = async () => {
    console.log('starting s3 test');
    await Auth.currentAuthenticatedUser()
      .then(response => console.log(response))
      .catch(err => console.log('ERROR::', err));
    const homer = await Storage.get('homer.png')
      .then(result => {
        console.log('SUCCCESS::', result);
        return result;
      })
      .catch(err => console.log('ERROR::', err));
    console.log('finished s3 test');
    this.setState({ homer })
  }

  render() {
    return (
      < View style={styles.container} >
        <Text>Open up App.js to start working on your app!</Text>
        <Image
          style={{ width: 300, height: 300 }}
          source={{ url: this.state.homer }}
        />
      </View >
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
