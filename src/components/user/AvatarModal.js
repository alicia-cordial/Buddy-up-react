import React, { useEffect, useState, createRef} from 'react';
import { StyleSheet, TextInput, View, Text, ScrollView, Image, Keyboard, TouchableOpacity, KeyboardAvoidingView, Pressable, Modal, Alert} from 'react-native';
import SelectDropdown from "react-native-select-dropdown";
import * as ImagePicker from "expo-image-picker";
import { API_URL } from "@env" ;
import { authState } from "../../store/auth/selectors";
import { useDispatch, useSelector } from "react-redux";
import { genericFetchWithToken } from '../../api/fetchApiWithToken';
import {PatchWithTokenBody} from '../../api/fetchApiWithTokenBody';
import AvatarChoice from './AvatarChoice';

function AvatarModal ({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);

  const [user, setUser] = useState(0);
  const [avatar, setAvatar] = useState(null);
  const { token, idUser } = useSelector(authState);



  const fetchUser = () => {
    genericFetchWithToken(`${API_URL}/users/${idUser}`, 'GET', token)
      .then(json => json.json())
      .then(data => setUser(data))
      .catch(error => console.error(error))

  }

  useEffect(() => {

    fetchUser();
  }, [])

  const handleSubmitButton = () => {
    
    const body = JSON.stringify({
      "avatar": avatar
    })
    PatchWithTokenBody(`${API_URL}/users/${idUser}`, 'PATCH', token, body) 
    .then(json => { console.log(json); } ) 
    .catch((error) => {console.error("error" , error)})
    fetchUser();
    console.log('ok')

console.log('hh')
    

};



  return (
    <View>

{/* sur la page profil affichage */}
      <Pressable
          style={styles.buttonOpen}
          onPress={() => setModalVisible(true)}
        >
        <Image style={{ width: 20, height: 20 }} source={require('../../../assets/edit.png')}  />
      </Pressable>

  

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
              <View style={styles.closeButton}>
            <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                     <Image
                      style={styles.close}
                      source={require(`../../../assets/icons/close.png`)}
                    />
            </Pressable>
            </View>

            <Text style={styles.modalText}>Modifier le titre</Text>

                  

    <View style={styles.mainBody}>
   
    {
        
        user && ( 
            <Text key={user.id}>
             

                <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
            justifyContent: 'center',
            alignContent: 'center',
            }}>
    <KeyboardAvoidingView enabled>
    <View style={styles.camera}>
    {/* <SelectDropdown
              data={[
                { hours: "< 1", data: 1 },
                { hours: "1-2 heures", data: 1.5 },
                { hours: "demie journée", data: 12 },
                { hours: "journée", data: 24 },
              ]}
              onSelect={(selectedItem) => {
                setAvatar(selectedItem.data);
              }}
              defaultButtonText='Selectionne ton avatar !'
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem.data;
              }}
              rowTextForSelection={(item, index) => item.hours}
              buttonStyle={styles.dropdown}
            /> */}
            <AvatarChoice/>

      </View>
     
   
    </KeyboardAvoidingView>
    </ScrollView>
     </Text> )
    
    
      }
</View>
          
          </View>
        </View>
      </Modal>
  
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 22,
    width: "70vw",
    borderRadius: 20,
  },
  
  modalView: {
    margin: 20,
    width: "70vw",
    borderRadius: 10,
    justifyContent: "center",
    alignContent: "center",
    elevation: 5,
  
    alignSelf: "center",
    textAlign: "center",
    backgroundColor: "white",
  },

  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },

 close: {
    alignSelf: "flex-end",
    height: 24,
    width: 24,
    margin: 5,
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }, 

  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: "#A3DEF8",
    alignContent: 'center',
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
},

SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
},

buttonStyle: {
    backgroundColor: 'black',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: 'white',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
},

buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
},

inputStyle: {
    flex: 1,
    color: 'black',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: 'black',
},


successTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
},
});

export default AvatarModal;