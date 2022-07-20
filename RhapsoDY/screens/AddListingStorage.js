import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth } from "../firebase";
import { addListingDatabase } from "./AddListingDatabase";


export const uploadImageAsync = async (uri) => {
    let filename = uri.split('/').pop(-1);
    const currentUserUid = auth.currentUser.uid;
    const storageRef = ref(storage)
    const listingRef = ref(storageRef, `Listings/${currentUserUid}/${filename}`);

    const img = await fetch(uri);
    const blob = await img.blob();

    console.log("uploading image");

    uploadBytes(listingRef, blob).then((snapshot) => {
        console.log('Uploaded a blob or file!');
        getDownloadURL(snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            addListingDatabase("", "", "", "", "", downloadURL)
        })
    });
};