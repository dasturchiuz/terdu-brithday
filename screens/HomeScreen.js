import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,  RefreshControl, Alert
} from 'react-native';
import { ListItem , Button} from 'react-native-elements';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import SQLite from 'react-native-sqlite-storage';
import { MonoText } from '../components/StyledText';
import moment from "moment";
import DataBase from '../helpers/db';
import Notify from '../helpers/notfy';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'TerDU tug‘ilgan kun - bugun',
    headerStyle: {
      backgroundColor: '#2A7800',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  constructor(props) {
    super(props);
    const db =new DataBase();
    this.state = {
      db: db,
      employees: [],
      refreshing: false,
      spinner: false,
    }
  }

  isLoading = b_ool => {
    this.setState({
      spinner: b_ool,
      refreshing: b_ool
    });
  }

  _onRefreshDB = () => {
      this.isLoading(true);
      const { db } = this.state;        
      db.queryRows("SELECT * FROM employees", (count)=>{
          if(count.length>0){
            db.queryRows("SELECT * FROM employees WHERE strftime('%m-%d', brithday) = '" + moment(new Date()).format("MM-DD") + "' ;",(employees)=>{
              db.queryRows("SELECT * FROM natifications WHERE date_natify='"+moment(new Date()).format("YYYY-MM-DD")+"';", (natifications)=>{
                if(natifications.length===0 && employees.length !== 0){
                  let birth="";
                  employees.map(item=>{
                    birth+=item.full_name+"\n";
                  })
                  const nnn=new Notify(2, "TerDU tug‘ilgan kun", birth, employees.length+"ta tug'ulgan kun");
                  nnn.notifyLocal();
                  db.insertRow("INSERT INTO natifications (date_natify, status) VALUES(?, ?)", [moment(new Date()).format("YYYY-MM-DD"), 1]);
                }
              });
              
              this.setState({
                  employees: employees
              });
            });
          }else{
            Alert.alert(
              'Sinxronizatsiya',
              "Siz server bilan sinxronizatsiya qilishingiz zarur! Buning uchun \"Biz haqimizda\" bo'limiga o'tib \"Oxirgi yangilanish\" tugmasini bosing!",
              [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ],
              {cancelable: false},
            );
          //  alert("Siz server bilan sinxronizatsiya qilishingiz zarur! Buning uchun \"Biz haqimizda\" bo'limiga o'tib \"Oxirgi yangilanish\" tugmasini bosing!")
          }
      });
      
      this.isLoading(false);
  }

  componentDidMount() {    
    this._onRefreshDB();
  }

  componentWillUnmount() {
    const { db } = this.state;
    db.closeDb();

  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Spinner
          visible={this.state.spinner}
          textContent={'Kuting...'}
          textStyle={styles.spinnerTextStyle}
        />
        <ScrollView refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefreshDB}
          />
        } style={styles.container} contentContainerStyle={styles.contentContainer}>
          {this.state.employees.length > 0 ?
            this.state.employees.map((l, i) => (
              <ListItem
                key={i}
                button={true}
                onPress={() => {
                  navigate('Details', { info: l })
                }}
                leftAvatar={{ source: { uri: l.img }, size: 'medium' }}
                title={l.full_name}
                titleStyle={{ color: '#2A7800', fontWeight: '700' }}
                subtitle={l.bolim + '\n' + l.lavozim}
                bottomDivider={true}
              />
            )) : <View style={{ marginLeft: 20, marginRight: 20, marginTop: 20 }}>
              <Text style={{ color: '#2A7800', textAlign: 'center', fontWeight: '700', fontSize: 20, marginTop: 20, marginBottom:20 }}>Topilmadi!</Text>
              <Button
                containerStyle={{ marginLeft: 20, marginRight: 20, marginTop: 20 }}
                buttonStyle={{backgroundColor:'#2A7800'}}
                title="Yangilash"
                loading={this.state.spinner}
                onPress={this._onRefreshDB}
              />
            </View>
          }
        </ScrollView>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  title: {
    fontSize: 38,
    backgroundColor: 'transparent'
  },
  button: {
    marginRight: 10
  }
});
