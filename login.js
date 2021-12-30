import React,{Component}from 'react';
import {
    View,
    Text,
    TextInput,
    Modal,
    KeyboardAvoidingView,
    StyleSheet,
    TouchableOpacity,
    Alert,
    Image,
    ScrollView} from 'react-native';
import {Input, Icon} from 'react-native-elements'
import db from '../config';
import firebase from 'firebase';



export default class WelcomeScreen extends Component{
  constructor(){
    super();
    this.state={
      emailId:'',
      password:'',
      firstName:'',
      lastName:'',
      buildingName:'',
      apartment:'',
      contact:'',
      confirmPassword:'',
      isModalVisible:'false'
    }
  }

  userSignUp = (emailId, password,confirmPassword) =>{
   if(password !== confirmPassword){
       return Alert.alert("password doesn't match\nCheck your password.")
   }else{
     firebase.auth().createUserWithEmailAndPassword(emailId, password)
     .then(()=>{
       db.collection('users').add({
         first_name:this.state.firstName,
         last_name:this.state.lastName,
         contact:this.state.contact,
         email_id:this.state.emailId,
         address:this.state.address,
         isBookRequestActive:false
       })
       return  Alert.alert(
            'User Added Successfully',
            '',
            [
              {text: 'OK', onPress: () => this.setState({"isModalVisible" : false})},
            ]
        );
     })
     .catch((error)=> {
       // Handle Errors here.
       var errorCode = error.code;
       var errorMessage = error.message;
       return Alert.alert(errorMessage)
     });
   }
 }

userLogin = (emailId, password)=>{
   firebase.auth().signInWithEmailAndPassword(emailId, password)
   .then(()=>{
     this.props.navigation.navigate('BottomNavigator')
   })
   .catch((error)=> {
     var errorCode = error.code;
     var errorMessage = error.message;
     return Alert.alert(errorMessage)
   })
 }

showModal = ()=>{
  return(
  <Modal
    animationType="fade"
    transparent={true}
    visible={this.state.isModalVisible}
    >
    <View style={styles.modalContainer}>
      <ScrollView style={{width:'100%'}}>
        <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
        <Text
          style={styles.modalTitle}
          >Registration</Text>


        <Input
          style={styles.formTextInput}
          placeholder ={"First Name"}
          maxLength ={8}
          onChangeText={(text)=>{
            this.setState({
              firstName: text
            })
          }}
        />
        <Input
          style={styles.formTextInput}
          placeholder ={"Last Name"}
          maxLength ={8}
          onChangeText={(text)=>{
            this.setState({
              lastName: text
            })
          }}
        />
        <Input
        leftIcon={
          <Icon
            type='feather' name='phone' color='#84B59F'
          />
        }
          style={styles.formTextInput}
          placeholder ={"Contact"}
          maxLength ={10}
          keyboardType={'numeric'}
          onChangeText={(text)=>{
            this.setState({
              contact: text
            })
          }}
        />
        <Input
        leftIcon={
          <Icon
            type='feather' name='map-pin' color='#6E75A8'
          />
        }
          style={styles.formTextInput}
          placeholder ={"Building Name"}
          onChangeText={(text)=>{
            this.setState({
              buildingName: text
            })
          }}
        />

        <Input
        leftIcon={
          <Icon
            type='feather' name='hash' color='#84B59F'
          />
        }
          style={styles.formTextInput}
          placeholder ={"Apartment No."}
          onChangeText={(text)=>{
            this.setState({
              apartment: text
            })
          }}
        />
        
        <Input

          leftIcon={
            <Icon
              type='feather' name='mail' color='#6E75A8'
            />
          }
          style={styles.formTextInput}
          placeholder ={"Email"}
          keyboardType ={'email-address'}
          onChangeText={(text)=>{
            this.setState({
              emailId: text
            })
          }}
        />
        
        <Input
        leftIcon={
          <Icon
            type='feather' name='lock' color='#84B59F'
          />
        }
          style={styles.formTextInput}
          placeholder ={"Password"}
          secureTextEntry = {true}
          onChangeText={(text)=>{
            this.setState({
              password: text
            })
          }}
        />
        
        <Input
          leftIcon={
            <Icon
              type='feather' name='unlock' color='#6E75A8'
            />
          }
          style={styles.formTextInput}
          placeholder ={"Confirm Password"}
          secureTextEntry = {true}
          onChangeText={(text)=>{
            this.setState({
              confirmPassword: text
            })
          }}
        />


        <View style={styles.modalBackButton}>
          <TouchableOpacity
            style={styles.registerButton}
            onPress={()=>
              this.userSignUp(this.state.emailId, this.state.password, this.state.confirmPassword)
            }
          >
          <Text style={styles.registerButtonText}>Register</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.modalBackButton}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={()=>this.setState({"isModalVisible":false})}
          >
          <Text style={{color:'#034732', fontWeight:'bold'}}>Cancel</Text>
          </TouchableOpacity>
        </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  </Modal>
)
}
  render(){
    return(
      <View style={styles.container}>
        <View style={{justifyContent: 'center',alignItems: 'center'}}>

</View>
        {/*<View style={{justifyContent: 'center',alignItems: 'center', borderColor:'#EF476F'}}>*/}
          {
            this.showModal()
          }
        {/*</View>*/}
          
        <View style={{justifyContent:'center', alignItems:'center'}}>
          
        {/*<Image source={require('.././images/lockscreenlogo.png')}/>*/}

          <Text style={styles.title}>Chore Cats</Text>
        </View>
        <View style={{width:'100%'}}>
          
          
          
          {/*<Text style={styles.subtext}>To Continue Please Login</Text>*/}

          <Input
            leftIcon={
              <Icon
                type='feather' name='mail' color="#E84A3F"
              />
            }
            style={styles.formTextInput}
            label='E-mail'
            placeholder="abc@example.com"
            keyboardType ='email-address'
            onChangeText={(text)=>{
              this.setState({
                emailId: text
              })
            }}
          />
          <Input
          leftIcon={
            <Icon
              type='feather' name='key' color="#E84A3F"
            />
          }
          style={styles.formTextInput}
          label='Password'
          secureTextEntry = {true}
          placeholder="Password"
          onChangeText={(text)=>{
            this.setState({
              password: text
            })
          }}
        />
        <TouchableOpacity
           style={[styles.loginbutton,{marginBottom:20, marginTop:20}]}
           onPress = {()=>{
             this.userLogin(this.state.emailId, this.state.password)
           }}
           >
           <Text style={{fontWeight:'bold', fontSize:20, color:'#FFFFFF'}}>Log In</Text>
         </TouchableOpacity>

         <TouchableOpacity
           style={styles.signupbutton}
           onPress={()=>this.setState({ isModalVisible:true})}
           >
           <Text style={{color:'#062B3B', fontWeight:'bold', fontSize:20}}>Sign Up</Text>
         </TouchableOpacity>
      </View>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
   flex:1,
   backgroundColor:'#FCEFF9',
   alignItems: 'center',
   justifyContent: 'center'
 },
 profileContainer:{
   flex:1,
   justifyContent:'center',
   alignItems:'center',
 },
 title :{
   fontSize:65,
   fontWeight:'300',
   paddingBottom:30,
   color : '#E84A3F',
   fontWeight:'bold'
 },
 loginBox:{
   width: 300,
   height: 40,
   borderBottomWidth: 1.5,
   borderColor : '#034732',
   fontSize: 20,
   margin:10,
   paddingLeft:10
 },
 subtext:{
   color:'#062B3C',
   fontWeight:'bold',
   marginBottom:30,
   textAlign:'center',
   fontSize:19
 },
 KeyboardAvoidingView:{
   flex:1,
   justifyContent:'center',
   alignItems:'center'
 },
 modalTitle :{
   justifyContent:'center',
   alignSelf:'center',
   fontSize:30,
   color:'#1B1F3B',
   margin:50,
   fontWeight:'bold'
 },
 modalContainer:{
   flex:1,
   borderRadius:20,
   justifyContent:'center',
   alignItems:'center',
   backgroundColor:"#FFF",
   marginRight:30,
   marginLeft : 30,
   marginTop:80,
   marginBottom:80,
 },
 formTextInput:{
   width:400,
   height:50,
   //alignSelf:'center',
   borderColor:'#84B59F',
   marginTop:20,
   padding:10
 },
 registerButton:{
   width:200,
   height:40,
   alignItems:'center',
   justifyContent:'center',
   borderWidth:1,
   borderRadius:10,
   marginTop:30,
   borderColor:'#034732'
 },
 registerButtonText:{
   color:'#1B1F3B',
   fontSize:15,
   fontWeight:'bold'
 },
 cancelButton:{
   width:200,
   height:30,
   justifyContent:'center',
   alignItems:'center',
   marginTop:5,
 },

 signupbutton:{
   width:300,
   height:40,
   justifyContent:'center',
   alignItems:'center',
   alignSelf:'center',
   borderRadius:25,
   backgroundColor:"#E84A3F",
   shadowColor: "#000",
   shadowOffset: {
      width: 0,
      height: 8,
   },
   shadowOpacity: 0.30,
   shadowRadius: 10.32,
   elevation: 16,
   padding: 10
 },

 loginbutton:{
  width:300,
  height:40,
  justifyContent:'center',
  alignItems:'center',
  alignSelf:'center',
  borderRadius:25,
  backgroundColor:"#FDA539",
  shadowColor: "#000",
  shadowOffset: {
     width: 0,
     height: 8,
  },
  shadowOpacity: 0.30,
  shadowRadius: 10.32,
  elevation: 16,
  padding: 10
},
 buttonText:{
   color:'#ffff',
   fontWeight:'200',
   fontSize:20
 }
})
