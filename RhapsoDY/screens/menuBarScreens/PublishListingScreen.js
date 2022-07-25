import * as React from 'react';
import { View, Text, TextInput, StyleSheet, Button, Image, Platform , TouchableOpacity, ScrollView, Alert} from 'react-native';
import { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { uploadImageAsync } from '../AddListingStorage';
import { updateListingDatabase } from '../UpdateListingDatabase';
import { getDownloadURL, ref, child } from 'firebase/storage';
import { storage } from '../../firebase';

export default function PublishListingScreen({ navigation }) {
  const [titleText, setText] = useState('');
  const [descriptionText, setDText] = useState('');
  const [materialText, setMText] = useState('');
  const [sourceText, setSText] = useState('');
  const [priceText, setPText] = useState('');
  const [selected, setSelected] = useState(null);
  const handleSelected = (value) => {
    setSelected(value);
  };
  const [image, setImage] = useState(null);
  const downloadArr = [];


  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);
    console.log(result.uri)

    if (!result.cancelled) {
      setImage(result.uri);
      const pathName = await uploadImageAsync(result.uri)
      const downloadURL = getDownloadURL(child(ref(storage, 'listings/', (result.uri.split('/').pop(-1).jpg))))
      downloadArr.push(downloadURL)
    }
    
};

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <View style={{ width: '70%', justifyContent: 'center', alignItems: 'center', margin: 70 }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} style={{ borderWidth: 1, borderColor: 'black'}} />
        {image && <Image source={{ uri: image }} style={{ width: 130, height: 130, marginBottom: 10 }} />}

        <TextInput 
        style={styles.titleInput}
        placeholder='Enter title for listing*'
        placeholderTextColor="grey"
        height="10%"
        onChangeText={newText => setText(newText)} 
        defaultValue={titleText}
        multiline={true}>
        </TextInput>
        <Text style={{fontSize:10}}>
          *Field marked with asterisk needs to be filled.
        </Text>

        <TextInput 
          style={styles.descriptionInput}
          placeholder='Enter description for listing'
          placeholderTextColor="grey"
          onChangeText={newDText => setDText(newDText)} 
          defaultValue={descriptionText}
          multiline={true}>
        </TextInput>

        <TextInput 
          style={styles.materialInput}
          placeholder='Enter material for listing'
          placeholderTextColor="grey"
          onChangeText={newMText => setMText(newMText)} 
          defaultValue={materialText}
          multiline={true}>
        </TextInput>

        <TextInput 
          style={styles.sourceInput}
          placeholder='Enter source for listing'
          placeholderTextColor="grey"
          onChangeText={newSText => setSText(newSText)} 
          defaultValue={sourceText}
          multiline={true}>
        </TextInput>

        <TextInput 
          style={styles.priceInput}
          placeholder='Enter price for listing'
          placeholderTextColor="grey"
          onChangeText={newPText => setPText(newPText)} 
          defaultValue={priceText}
          multiline={true}>
        </TextInput>

        <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 10}}>
          <ListingStateButton
            title={'Brand new item'}
            onPress={handleSelected}
            value={selected}
          />
          <ListingStateButton
            title={'Second-hand'}
            onPress={handleSelected}
            value={selected}
          />
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 10}}>
          <TouchableOpacity
                style={styles.saveButton}
                onPress={()=>{updateListingDatabase(titleText, descriptionText, materialText, sourceText, selected, priceText),navigation.navigate('Home')}}>
                <Text style={styles.buttonText}>
                  Save
                </Text>
          </TouchableOpacity>

          <TouchableOpacity
                style={styles.cancelButton}
                onPress={()=>navigation.navigate('Home')}>
                <Text style={styles.buttonText}>
                  Cancel
                </Text>
          </TouchableOpacity>

        </View>

      </View>  
    </ScrollView>
  );
}

function ListingStateButton({ title, onPress, value }) {
  return (
    <TouchableOpacity
      style={[styles.frame, { borderColor: value === title?"green":"grey" }]}
      onPress={()=>onPress(title)}>
      <Text style={styles.title}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1
  },

  titleInput: {
    width: '100%',
    backgroundColor: 'honeydew',
    fontSize: 20,
    padding: 5,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
  },

  descriptionInput: {
    width: '100%',
    marginTop: 10,
    backgroundColor: 'white',
    fontSize: 20,
    padding: 5,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
  },

  materialInput: {
    width: '100%',
    marginTop: 10,
    backgroundColor: 'white',
    fontSize: 20,
    padding: 5,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
  },
    
  sourceInput: {
    width: '100%',
    marginTop: 10,
    backgroundColor: 'white',
    fontSize: 20,
    padding: 5,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
  },

  priceInput: {
    width: '100%',
    marginTop: 10,
    backgroundColor: 'white',
    fontSize: 20,
    padding: 5,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
  },

  frame: {
    borderWidth: 1,
    width: 125,
    height: 40,
    backgroundColor: '#fff',
    marginTop: 10,
    borderRadius: 8,
    padding: 11,
  },

  title: {
    justifyContent: 'center',
    alignItems: 'center'
  },

  saveButton: {
    borderRadius: 40,
    borderWidth: 1,
    width: '35%',
    height: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgreen'
  },

  buttonText: {
    fontSize:20
  },

  cancelButton: {
    borderRadius: 40,
    borderWidth: 1,
    width: '35%',
    height: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightcoral'
  },
});