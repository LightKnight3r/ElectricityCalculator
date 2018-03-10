/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import SideMenu from 'react-native-side-menu';
import Menu from './Menu';
export default class ElectricityCalculator  extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prev: '',
      now: '',
      isRender: false,
      isOpen: false,
      selectedItem: 'About',
    };
  }
  toggle() {
   this.setState({
     isOpen: !this.state.isOpen,
   });
  }
  updateMenuState(isOpen) {
   this.setState({ isOpen });
  }
  onMenuItemSelected = item =>
    this.setState({
      isOpen: false,
      selectedItem: item,
    });
  handle(){
    var prev = this.state.prev;
    var now = this.state.now;
    var ENumber = now-prev;
    if(ENumber > 0 && ENumber <= 50)
			return ENumber*1.484;
		else if(ENumber > 50 && ENumber <= 100)
			return 50*1.484 + (ENumber -50)*1.533;
		else if(ENumber > 100 && ENumber <= 200)
			return 50*1.484 + 50*1.533 + (ENumber-100)*1.786;
		else if(ENumber > 200 && ENumber <= 300)
			return 50*1.484 + 50*1.533 + 100*1.786 + (ENumber-200)*2.242;
		else if(ENumber > 300 && ENumber <= 400)
			return 50*1.484 + 50*1.533 + 100*1.786 + 100*2.242 + (ENumber-300)*2.503;
		else if(ENumber > 400)
			return 50*1.484 + 50*1.533 + 100*1.786 + 100*2.242 + 100*2.503 + (ENumber-400)*2.587;
		else
			return 0;
  }
  renderElectricityFee(){
    if(this.state.isRender===true){
      return(
        <View style={{paddingTop:20, alignItems:'center'}}>
          <Text style={{fontSize:40, color:'red'}}>{this.handle()}</Text>
        </View>
      );
    }

  }
  render() {
    const menu = <Menu onItemSelected={this.onMenuItemSelected} />;
    return (
      <SideMenu
        menu={menu}
        isOpen={this.state.isOpen}
        onChange={isOpen => this.updateMenuState(isOpen)}
      >
        <ScrollView style={{paddingTop:50, backgroundColor:'#262d4c'}}>
          <Text style={{paddingLeft:20, fontSize:18, color:'#1cbfff'}}>Enter your last Number:</Text>
          <View style={{alignItems:'center'}}>
            <TextInput
              underlineColorAndroid='transparent'
              keyboardType={'numeric'}
              style={{borderColor:'#00f258',borderRadius:4,height: 40, borderWidth: 1, marginTop: 20, marginBottom: 40, width:200}}
              onChangeText={(prev) => this.setState({prev})}
            />
          </View>
          <Text style={{paddingLeft:20, fontSize:18, color:'#1cbfff'}}>Enter your current Number:</Text>
          <View style={{alignItems:'center'}}>
            <TextInput
              underlineColorAndroid='transparent'
              keyboardType={'numeric'}
              style={{borderColor:'#00f258',borderRadius:4,height: 40, borderWidth: 1, marginTop: 20, marginBottom: 40, width:200}}
              onChangeText={(now) => this.setState({now})}
            />
          </View>
          <View style={{alignItems:'center'}}>
            <TouchableOpacity
              style={{marginTop:20, marginBottom:20, width: 100, height:100, backgroundColor:'#262d4c',alignItems:'center', borderColor:'#fff38e', borderRadius:50, borderWidth:1, justifyContent:'center'}}
                onPress={
                  () => {
                    this.setState({
                      isRender: true,
                    });
                  }
                }
              >
              <Text style={{color:'#fff38e', fontSize:18}}>Solve</Text>
            </TouchableOpacity>
          </View>
          <Text style={{paddingTop: 20,paddingLeft:20, fontSize:20, color:'#1cbfff'}}>Result:</Text>
          {
            this.renderElectricityFee()
          }
        </ScrollView>
      </SideMenu>
    );
  }
}

const styles = StyleSheet.create({

});

AppRegistry.registerComponent('ElectricityCalculator', () => ElectricityCalculator);
