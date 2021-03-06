import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    TouchableOpacity,
    ToastAndroid,
    DrawerLayoutAndroid,
    Linking,
    Platform,
    Dimensions,
    TextInput,
} from 'react-native';

import { saveNumber, saveText} from '../action'
import { connect } from 'react-redux';
import { NativeModules } from 'react-native';
import DrawerLayout from 'react-native-drawer-layout';

class App extends Component {
    render() {
        const { dispatch } = this.props; 
        // console.log('dispatch==='+dispatch);
        return (
            <DrawerLayout
                ref="drawer"
                drawerWidth={Dimensions.get('window').width / 5 * 3}
                drawerPosition={Platform.OS === 'android' ? DrawerLayoutAndroid.positions.Left : 'left'}
                renderNavigationView={this.renderNavigationView.bind(this)}
                >
                <View style={styles.ct}>
                    <View style={styles.topbar}>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={() => this.openSet() }
                            >
                            <Image source={require('../image/icon_set.png') } style={styles.btn_set}></Image>
                        </TouchableOpacity>

                        <Image source={require('../image/icon_logo.png') } style={styles.btn_logo}></Image>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={() => this.openShare() }
                            >
                            <Image source={require('../image/icon_share.png') } style={styles.btn_share}></Image>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.main}>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={() => this.sendMsg() }
                            style={styles.btn_help}
                            >
                            <Text style={{ color: '#fff', fontSize: 35 }}>呼救</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </DrawerLayout>
        );
    }

    renderNavigationView(dispatch) {
        return (
            <View style={[styles.container, { backgroundColor: '#f3f3f3' }]}>
                <View
                    style={{
                        width: Dimensions.get('window').width / 5 * 3, height: 120,
                        justifyContent: 'flex-end', paddingBottom: 10, backgroundColor: '#4E74FF'
                    }}
                    >
                </View>
                <View>
                    <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 10, fontSize: 12 }}
                        // multiline={true}
                        ref="number"
                        keyboardType='numeric'
                        maxLength={11}
                        placeholderTextColor='#d5d5d5'
                        // onEndEditing={(text) => console.log("text===" + text.nativeEvent.text)  }
                        onEndEditing={(event)=>this.saveNumber(event)}
                        placeholder='发送手机号'
                        />
                    <TextInput style={{ height: 80, borderColor: 'gray', borderWidth: 1, marginTop: 15, fontSize: 12 }}
                        multiline={true}
                        onEndEditing={(event)=>this.saveText(event)}
                        placeholderTextColor='#d5d5d5'
                        placeholder='发送内容'
                        />
                </View>
            </View>
        );
    }

    saveNumber(event) {
        const {dispatch} = this.props;
        const number = event.nativeEvent.text;
        dispatch(saveNumber(number));
        // console.log('dispatch==='+dispatch);        
        // console.log(event.nativeEvent.text);

    }
    saveText(event) {
        const {dispatch} = this.props;
        const text = event.nativeEvent.text;
        dispatch(saveText(text));

    }

    sendMsg() {
        const { state } = this.props;
        console.log(state);
        let text = state.text;
        let number = state.number;
        /**
         * (String) phone number
         * (String) message
         * (Callback) success
         * (Callback) error
         */
        NativeModules.SmsModule.send(
            number,
            text,
            () => { ToastAndroid.show('已发送', ToastAndroid.SHORT); },
            () => { alert('fail') });
    }
    openSet() {
        this.refs.drawer.openDrawer();
    }
    openShare() {
        alert('open share');
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    ct: {
        backgroundColor: '#f3f3f3',
        flexDirection: 'column',
        flexWrap: 'wrap',
        flex: 1,
        // width: '100%',
        // height:100,
    },
    topbar: {
        // flex:1,
        backgroundColor: '#4E74FF',
        // width:100,
        height: 54,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 13,
        paddingRight: 13,
    },
    btn_set: {
        width: 23,
        height: 23,
        // flex:1,

    },
    btn_logo: {
        width: 57,
        height: 24,
        // flex:1,
    },
    btn_share: {
        width: 23,
        height: 25,
        // flex:1,
    },
    main: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn_help: {
        width: 225,
        height: 225,
        backgroundColor: '#4E74FF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 225,
        // shadowColor:'#ef4949',
        // // shadowOpacity:46,
        // shadowOffset:{width:0,height:10},
        // shadowRadius:100,
    }
});

function select(state) {
    // const {}
    return {
        state: state,
    }
}
// export default App;
export default connect(select)(App)
