import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking
} from 'react-native';
 
import logoobrithday from '../assets/images/brithday.png';
 
class DetailsScreen extends Component {
    static navigationOptions =  ({ navigation }) => {
        return {
            title: 'Tu‘ilgan kuningiz bilan',
            headerStyle: {
                backgroundColor: '#2A7800',  
            },
            headerTintColor: '#fff', 
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }
    }; 
    constructor(props){
      super(props);

      this.state = {
        ID:null,
        bolim: null,
        brithdate: null,
        img: null,
        lavozim: null,
        full_name: null,
         telefon_raqami: null,
      }
    }
    componentDidMount(){
      // console.log(this.props)
      const { info } = this.props.navigation.state.params;
      this.setState({
        ID:info.ID,
        bolim: info.bolim,
        brithdate: info.brithdate,
        img: info.img,
        lavozim: info.lavozim,
        full_name: info.full_name,
        telefon_raqami: info.tell,
      });
    }
 
    render() {
      
      return ( <View style={styles.container}>
        <View style={styles.header}>
          <Image style={{width:'100%', height:'100%'}}  source={logoobrithday}/>  
        </View>
        <Image style={styles.avatar} source={{uri: this.state.img}}/>
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.name}>{this.state.full_name}</Text>
            <Text style={styles.description}>{this.state.bolim}</Text>    
            <Text style={styles.info}>{this.state.lavozim}</Text>

            <TouchableOpacity 
              style={styles.buttonContainer}
              onPress={()=>{Linking.openURL(`tel:${this.state.telefon_raqami}`)}}
            >
              <Text style={{color:'#ffffff'}}>{this.state.telefon_raqami}</Text>  
            </TouchableOpacity>               
           
          </View>
      </View>
    </View>);
    }
    
  }
  const styles = StyleSheet.create({
    header:{
      backgroundColor: "#00BFFF",
      height:200,
    },
    avatar: {
      width: 130,
      height: 130,
      borderRadius: 63,
      borderWidth: 1,
      borderColor: "#2A7800",
      marginBottom:10,
      alignSelf:'center',
      position: 'absolute',
      marginTop:130
    },
    name:{
      fontSize:22,
      color:"#FFFFFF",
      fontWeight:'600',
      textAlign:'center'
    },
    body:{
      marginTop:40,
    },
    bodyContent: {
      flex: 1,
      alignItems: 'center',
      padding:30,
    },
    name:{
      width: '100%',
      fontSize:28,
      color: "#2A7800",
      fontWeight: "600",
      textAlign:'center'
    },
    info:{
      fontSize:16,
      color: "#696969",
      marginTop:10
    },
    description:{
      fontSize:16,
      color: "#696969",
      marginTop:10,
      textAlign: 'center'
    },
    buttonContainer: {
      marginTop:10,
      height:45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom:20,
      width:250,
      borderRadius:30,
      backgroundColor: "#2A7800" ,
    },
  });
   
  

  export default DetailsScreen;