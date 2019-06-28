/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import SplashScreen from 'react-native-splash-screen'
import { AppRegistry } from 'react-native';
import { Platform, StyleSheet, Text, View, StatusBar } from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import BackgroundJob from 'react-native-background-job';
import SQLite from 'react-native-sqlite-storage';
import DataBase from './helpers/db';
import Notify from './helpers/notfy';
import moment from "moment";


const backgroundJob = {
  jobKey: "myJob",
  job: () => {
    locat();
  }
};

BackgroundJob.register(backgroundJob);

var backgroundSchedule = {
  jobKey: "myJob",
  period: 10000,
  exact: true,
  allowExecutionInForeground: true,
}

BackgroundJob.schedule(backgroundSchedule);

BackgroundJob.isAppIgnoringBatteryOptimization((error, ignoringOptimization) => {
  console.log(error + ' <<Android>>ignore>> ' + ignoringOptimization)
});

const locat = (data) => {
  var format = 'hh:mm:ss'
  beforeTime = moment('07:30:00', format),
    afterTime = moment('09:30:00', format);
  if (moment(new Date()).isBetween(beforeTime, afterTime)) {
    const db = new DataBase();
    db.queryRows("SELECT * FROM natifications WHERE date_natify='" + moment(new Date()).format("YYYY-MM-DD") + "';", (natifications) => {
      if (natifications.length === 0) {
        db.queryRows("SELECT * FROM employees WHERE strftime('%m-%d', brithday) = '" + moment(new Date()).format("MM-DD") + "' ;", (employees) => {
          if (natifications.length !== 0) {
            let birth = "";
            employees.map(item => {
              birth += item.full_name + "\n";
            })
            const nnn = new Notify(2, "TerDU tug‘ilgan kun", birth, employees.length + "ta tug'ulgan kun");
            nnn.notifyLocal();
          }
          db.insertRow("INSERT INTO natifications (date_natify, status) VALUES(?, ?)", [moment(new Date()).format("YYYY-MM-DD"), 1]);
        });
      }
    });
    
  }
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { jobs: [] };
  }

  getAll() {
    BackgroundJob.getAll({
      callback: jobs => {
        console.log("Jobs:", jobs);
      }
    });
  }

  componentDidMount() {
    SplashScreen.hide();

  }


  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#2A7800"
        />
        <AppNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
})
