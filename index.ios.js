'use strict';
var React = require('react');
var ReactNative = require('react-native');
var {
    PanResponder,
    StyleSheet,
    ToastAndroid,
    AppRegistry,
    View,
    Alert
    } = ReactNative;
var CIRCLE_SIZE = 80;
var custcomponent = React.createClass({


   getInitialState:function()
   {
    Alert.alert('hi');
    return{
          _curTime: 0,
          _buttonPress: false,
          _isVideoPlaying: false
    }
  },
  statics: {
            title: 'PanResponder Sample',
            description: 'Shows the use of PanResponder to provide basic gesture handling.',
  },
  _panResponder: {},
  _previousLeft: 0,
  _previousTop: 0,
  _circleStyles: {},
  circle: (null : ?{ setNativeProps(props: Object): void }),
  componentWillMount: function() {
                                this._panResponder = PanResponder.create({
                                  onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
                                  onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
                                  onPanResponderGrant: this._handlePanResponderGrant,
                                  onPanResponderMove: this._handlePanResponderMove,
                                  onPanResponderRelease: this._handlePanResponderEnd,
                                  onPanResponderTerminate: this._handlePanResponderEnd,
                                });
                                this._previousLeft = 142;
                                this._previousTop = 450;
                                this._circleStyles = {
                                  style: {
                                    left: this._previousLeft,
                                    top: this._previousTop,
                                    backgroundColor: 'green',
                                  }
                                };
                              },
  componentDidMount: function() {
                              this._updateNativeStyles();
                            },
  getCurTime: function (){
                          var temp =  new Date();
                          return(temp.getTime());
  },
  render: function() {
                      return (
                            <View style={styles.container}>
                              <View ref={(circle) => {
                                                    this.circle = circle;
                                                  }}
                                    style={styles.circle}
                                    {...this._panResponder.panHandlers}/>
                            </View>
                            );
                    },
  _highlight: function() {
                        //console.log('hello');
                        this._circleStyles.style.backgroundColor = 'blue';
                        this._updateNativeStyles();
                      },
  _unHighlight: function() {
                          //console.log('hello2');
                          this._circleStyles.style.backgroundColor = 'green';
                          this._updateNativeStyles();
                        },
  _updateNativeStyles: function() {
                                  //console.log('hello3');
                                  var t1 = this.getCurTime();
                                  console.log(t1);
                                  var dif = t1-(this.state._curTime);
                                  console.log(dif);
                                  if(this.state._buttonPress){
                                                              if(!this.state._isVideoPlaying){
                                                                                              if(dif < 1000){
                                                                                                            console.log("IF Block");
                                                                                                            }
                                                                                              else{
                                                                                                    console.log("Else Block");
                                                                                                    this.setState({_isVideoPlaying: true});
                                                                                                  }
                                                                                            }
                                                            }
                                  this.circle && this.circle.setNativeProps(this._circleStyles);
                                },
  _handleStartShouldSetPanResponder: function(e: Object, gestureState: Object): boolean {
                                                                                        // Should we become active when the user presses down on the circle?
                                                                                        return true;
                                                                                      },
  _handleMoveShouldSetPanResponder: function(e: Object, gestureState: Object): boolean {
                                                                                        // Should we become active when the user moves a touch over the circle?
                                                                                        return true;
                                                                                      },
  _handlePanResponderGrant: function(e: Object, gestureState: Object) {
                                                                      this.setState({_buttonPress: true});
                                                                      let t = this.getCurTime();
                                                                      console.log(t);
                                                                      this.setState({_curTime: t});
                                                                      console.log(this.state._curTime);
                                                                      this._highlight();
                                                                    },
  _handlePanResponderMove: function(e: Object, gestureState: Object) {
                                                                      this._circleStyles.style.left = this._previousLeft + gestureState.dx;
                                                                      this._circleStyles.style.top = this._previousTop + gestureState.dy;
                                                                      //this.setState({_isVideoPlaying: true});
                                                                      this._updateNativeStyles();
                                                                    },
  _handlePanResponderEnd: function(e: Object, gestureState: Object) {
                                                                      //console.log('hello8');
                                                                      this._unHighlight();
                                                                      if(this.state._isVideoPlaying){
                                                                                                      ToastAndroid.show('Video Recorded', ToastAndroid.SHORT);
                                                                                                    }
                                                                      else{
                                                                            ToastAndroid.show('Capture', ToastAndroid.SHORT);
                                                                          }
                                                                      //this._previousLeft += gestureState.dx;
                                                                      //this._previousTop += gestureState.dy;
                                                                      this.setState({_buttonPress: false});
                                                                      this.setState({_isVideoPlaying: false});
                                                                      this._circleStyles.style.left = this._previousLeft;
                                                                      console.log(this._circleStyles.style.left);
                                                                      this._circleStyles.style.top = this._previousTop;
                                                                    },
                                        });
var styles = StyleSheet.create({
                              circle: {
                                      width: CIRCLE_SIZE,
                                      height: CIRCLE_SIZE,
                                      borderRadius: CIRCLE_SIZE / 2,
                                      position: 'absolute',
                                      alignSelf: 'center',
                                      left: 0,
                                      top: 0,
                                    },
                              container: {
                                          flex: 1,
                                          paddingTop: 64,
                                        },
                              });

module.exports = custcomponent;
/*import React, { Component } from 'react';
import {
  Image,
  Platform,
  PropTypes,
  ListView,
  AppRegistry,
  View,
  Text,
} from 'react-native';
import CameraRoll from 'rn-camera-roll';

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
    margin: 10,
  },
};

let PHOTOS_COUNT_BY_FETCH = 24;

export default class custcomponent extends Component {

  constructor(props) {
    super(props);
    //console.disableYellowBox = true;
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.lastPhotoFetched = undefined; // Using `null` would crash ReactNative CameraRoll on iOS.
    this.images = [];
    this.state = this.getDataSourceState();
    this.fetchPhotos();
  }

  getDataSourceState() {
    return {
      dataSource: this.ds.cloneWithRows(this.images),
    };
  }

  getPhotosFromCameraRollData(data) {
    return data.edges.map((asset) => {
      return asset.node.image;
    });
  }

  onPhotosFetchedSuccess(data) {
    const newPhotos = this.getPhotosFromCameraRollData(data);
    console.log(data);
    this.images = this.images.concat(newPhotos);
    this.setState(this.getDataSourceState());
    if (newPhotos.length) this.lastPhotoFetched = newPhotos[newPhotos.length - 1].uri;
  }

  onPhotosFetchError(err) {
    // Handle error here
    console.log(err);
  }

  fetchPhotos(count = PHOTOS_COUNT_BY_FETCH, after) {
    CameraRoll.getPhotos({
      first: count,
      after,
    }, this.onPhotosFetchedSuccess.bind(this), this.onPhotosFetchError.bind(this));
  }

  onEndReached() {
    this.fetchPhotos(PHOTOS_COUNT_BY_FETCH, this.lastPhotoFetched);
  }

  render() {
    return (
      <View style={styles.container}>

        <ListView
          enableEmptySections={true}
          contentContainerStyle={styles.imageGrid}
          dataSource={this.state.dataSource}
          onEndReached={this.onEndReached.bind(this)}
          onEndReachedThreshold={100}
          horizontal={true}
          renderRow={(image) => {return (
            <View>
              <Image
                style={styles.image}
                source={{ uri: image.uri }}
              />
            </View>
          )}}
        />
      </View>
    );
  }
}
/*'use strict';
const React = require('react');
const ReactNative = require('react-native');
const {
  CameraRoll,
  Image,
  Slider,
  StyleSheet,
  Switch,
  Text,
  View,
  TouchableOpacity
} = ReactNative;

const invariant = require('fbjs/lib/invariant');

const CameraRollView = require('./CameraRollView');

const AssetScaledImageExampleView = require('./AssetScaledImageExample');

class custcomponent extends React.Component {
  state = {
    groupTypes: 'SavedPhotos',
    sliderValue: 1,
    bigImages: true,
  };
  _cameraRollView: ?CameraRollView;
  render() {
    return (
      <View>
        <Switch
          onValueChange={this._onSwitchChange}
          value={this.state.bigImages}
        />
        <Text>{(this.state.bigImages ? 'Big' : 'Small') + ' Images'}</Text>
        <Slider
          value={this.state.sliderValue}
          onValueChange={this._onSliderChange}
        />
        <Text>{'Group Type: ' + this.state.groupTypes}</Text>
        <CameraRollView
          ref={(ref) => { this._cameraRollView = ref; }}
          batchSize={20}
          groupTypes={this.state.groupTypes}
          renderImage={this._renderImage}
        />
      </View>
    );
  }

  loadAsset = (asset) => {
    if (this.props.navigator) {
      this.props.navigator.push({
        title: 'Camera Roll Image',
        component: AssetScaledImageExampleView,
        backButtonTitle: 'Back',
        passProps: { asset: asset },
      });
    }
  };

  _renderImage = (asset) => {
    const imageSize = this.state.bigImages ? 150 : 75;
    const imageStyle = [styles.image, {width: imageSize, height: imageSize}];
    const {location} = asset.node;
    const locationStr = location ? JSON.stringify(location) : 'Unknown location';
    return (
      <TouchableOpacity key={asset} onPress={ this.loadAsset.bind( this, asset ) }>
        <View style={styles.row}>
          <Image
            source={asset.node.image}
            style={imageStyle}
          />
          <View style={styles.info}>
            <Text style={styles.url}>{asset.node.image.uri}</Text>
            <Text>{locationStr}</Text>
            <Text>{asset.node.group_name}</Text>
            <Text>{new Date(asset.node.timestamp).toString()}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  _onSliderChange = (value) => {
    const options = CameraRoll.GroupTypesOptions;
    const index = Math.floor(value * options.length * 0.99);
    const groupTypes = options[index];
    if (groupTypes !== this.state.groupTypes) {
      this.setState({groupTypes: groupTypes});
    }
  };

  _onSwitchChange = (value) => {
    invariant(this._cameraRollView, 'ref should be set');
    this._cameraRollView.rendererChanged();
    this.setState({ bigImages: value });
  };
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flex: 1,
  },
  url: {
    fontSize: 9,
    marginBottom: 14,
  },
  image: {
    margin: 4,
  },
  info: {
    flex: 1,
  },
});

exports.title = 'Camera Roll';
exports.description = 'Example component that uses CameraRoll to list user\'s photos';
exports.examples = [
  {
    title: 'Photos',
    render(): React.Element<any> { return <custcomponent />; }
  }
];
AppRegistry.registerComponent('custcomponent', () => custcomponent);
*/
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
/*
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import CameraRollPicker from 'react-native-camera-roll-picker';
export default class custcomponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      num: 0,
      selected: [],
    };
  }

  getSelectedImages(images, current) {
    var num = images.length;

    this.setState({
      num: num,
      selected: images,
    });

    console.log(current);
    console.log(this.state.selected);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.text}>
            <Text style={styles.bold}> {this.state.num} </Text> images has been selected
          </Text>
        </View>
        <CameraRollPicker
          scrollRenderAheadDistance={500}
          initialListSize={1}
          pageSize={3}
          removeClippedSubviews={false}
          groupTypes='All'
          batchSize={5}
          maximum={3}
          selected={this.state.selected}
          assetType='All'
          imagesPerRow={3}
          imageMargin={5}
          callback={this.getSelectedImages.bind(this)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6AE2D',
  },
  content: {
    marginTop: 15,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  text: {
    fontSize: 16,
    alignItems: 'center',
    color: '#fff',
  },
  bold: {
    fontWeight: 'bold',
  },
  info: {
    fontSize: 12,
  },
});*/
AppRegistry.registerComponent('custcomponent', () => custcomponent);
