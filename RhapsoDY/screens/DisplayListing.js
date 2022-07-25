import * as React from 'react';
import { Button, View, Text, Image, ScrollView,  RefreshControl, StyleSheet} from 'react-native';
import { auth, db, storage } from '../firebase';
import { ref, onValue } from 'firebase/database';
import { ref as ref_storage, listAll, getDownloadURL } from "firebase/storage";
import { useState, useEffect } from 'react';

export default function FetchImages() {
    const currentUserUid = auth.currentUser.uid;

    const storageListingRef = ref_storage(storage, 'Listings/');
    const userStorageRef = ref_storage(storageListingRef, `${currentUserUid}`)

    const [imageTab, setImageTab] = useState([]);
    useEffect(() => {
        const getImages = async() => {
            let result = await listAll(userStorageRef)
            let urlPromises = result.items.map((imageRef) => 
                getDownloadURL(imageRef));
                return Promise.all(urlPromises);
            }

        const loadImages = async() => {
            const urls = await getImages();
            setImageTab(urls);
        };

        loadImages();

    });

    console.log(imageTab)
    console.log(typeof(imageTab))

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
      }, []);

      

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'honeydew', marginBottom: 5 }}>            
            <ScrollView>
                {imageTab.map(i => <Image style={{height: 200, width: 200, marginTop: 10}} source={{uri: i}} />)}
            </ScrollView>
            
        </View>
    )
}

const styles = StyleSheet.create({
    scrollView: {
      height: '15%',
      alignItems: 'center',
      justifyContent: 'center',
    },
});