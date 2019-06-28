import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View, RefreshControl
} from 'react-native';
import { ListItem, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import SQLite from 'react-native-sqlite-storage';
import { MonoText } from '../components/StyledText';
import moment from "moment";
import DataBase from '../helpers/db';

export default class TomorrowScreen extends React.Component {
  static navigationOptions = {

    title: 'TerDU tug‘ilgan kun - ertaga',
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
      spinner: b_ool
    });
  }

  _onRefreshDB = () => {
      this.isLoading(true);
      const { db } = this.state;  
      let date_to = moment((new Date()).setDate((new Date()).getDate() + 1)).format("MM-DD");
      db.queryRows("SELECT * FROM employees WHERE strftime('%m-%d', brithday) = '" + date_to + "' ;",(employees)=>{
        this.setState({
            employees: employees
        });
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
            )) : 
            <View style={{ marginLeft: 20, marginRight: 20, marginTop: 20 }}>
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
