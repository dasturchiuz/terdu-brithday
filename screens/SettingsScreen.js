import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking
} from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import logoobrithday from '../assets/images/brithday.png';
import logo_terdu from '../assets/images/ic_launcher.png';
import _terdu from '../assets/images/loga.jpg';
import axios from 'axios';
import moment from "moment";


class SettingsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'TerDU tug‘ilgan kun',
      headerStyle: {
        backgroundColor: '#2A7800',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }
  };
  constructor(props) {
    super(props);
    const db = SQLite.openDatabase(
      {
        name: 'brithday.db',
        location: 'default',
        createFromLocation: '~www/brithday.db',
      },
      () => { },
      error => {
        console.log(error);
      }
    );
    this.state = {
      db: db,
      refreshing: false,
      spinner: false,
      last_up:''
    };
    this.getData = this.getData.bind(this);
  }

  isLoading = b_ool => {
    this.setState({
      spinner: b_ool
    });
  }


  componentDidMount() {
    const { db } = this.state;
        db.transaction(tx => {
          tx.executeSql("SELECT * FROM last_update LIMIT 1;", [], (tx, results) => {            
            if(results.rows.length>0){
              this.setState({
                last_up:results.rows.raw()[0]['last_up']
              });  
            }
        }); 
      });
  }

  getData(e) {
    const { db } = this.state;
    this.isLoading(true);
    axios.get("https://e.tersu.uz/wp-json/brithday/today", {
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=utf-8'
      }
  }).then(res => {
      this.isLoading(false);
      
      db.transaction(tx => {
        tx.executeSql(
          'DELETE FROM last_update',
          [],
          (tx, results) => {
            console.log('query success delete last_up');
          });
        tx.executeSql(
          'INSERT INTO last_update (last_up) VALUES (?)',
          [moment(new Date()).format("YYYY-MM-DD")],
          (tx, results) => {
            console.log('query success last_up');
            this.setState({
              last_up:moment(new Date()).format("YYYY-MM-DD")
            });
          })
          tx.executeSql(
            'DELETE FROM employees',
            [],
            (tx, results) => {
              console.log('query success delete employees');
            });
        res.data.map(item => {
          tx.executeSql(
            'INSERT INTO employees (full_name, brithday, bolim, lavozim, img, tell) VALUES (?,?,?,?,?,?)',
            [item.post_title, item.brith_date, item.bolim, item.lavozimi, item.img_url, item.telefon_raqami],
            (tx, results) => {
              console.log('query success employee');
            })
        });
      });
    }).catch(
      err => {
        console.log(err);
        alert('Internetingiz bilan muommo yuzaga keldi! Bog\'lanishni tekshirib takror harakat qilib ko\'ring!');
        this.isLoading(false);
      });
  }

  componentWillUnmount() {
    const { db } = this.state;
    db.close();
  }

  render() {
    const _self = this;
    return (<View style={styles.container}>
      <Spinner
        visible={this.state.spinner}
        textContent={'Kuting...'}
        textStyle={styles.spinnerTextStyle}
      />
      <View style={styles.header}>
        <Image style={{ width: '100%', height: '100%' }} source={_terdu} />
      </View>
      <Image style={styles.avatar} source={logo_terdu} />
      <View style={styles.body}>
        <View style={styles.bodyContent}>
          <Text style={styles.name}>TERMIZ DAVLAT UNIVERSITETI</Text>
          <Text style={styles.description}>axborot texnologiyalari markazi</Text>
          <TouchableOpacity
            style={styles.linkUrl}
            onPress={() => { Linking.openURL(`http://tersu.uz/`) }}
          >
            <Text style={styles.info}>www.tersu.uz</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={this.getData}
          >
            <Text style={{ color: '#ffffff' }}>Oxirgi yangilanish: {this.state.last_up}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>);
  }

}
const styles = StyleSheet.create({
  header: {
    backgroundColor: "#00BFFF",
    height: 200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 1,
    borderColor: "#2A7800",
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 130
  },
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: '600',
    textAlign: 'center'
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  name: {
    width: '100%',
    fontSize: 28,
    color: "#2A7800",
    fontWeight: "600",
    textAlign: 'center'
  },
  info: {
    fontSize: 16,
    color: "#696969",
    marginTop: 10
  },
  description: {
    fontSize: 16,
    color: "#696969",
    marginTop: 10,
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  linkUrl: {
    marginTop: 10,
    marginBottom: 30,
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#2A7800",
  },
});



export default SettingsScreen;