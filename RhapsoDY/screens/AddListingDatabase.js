import { db } from "../firebase";
import { ref, set } from "firebase/database";
import { auth } from "../firebase";

export function addListingDatabase(title, description, material, source, itemState, downloadUrl) {
    set(ref(db, 'Listings/' + auth.currentUser.uid), {
        title: title,
        description: description,
        material: material,
        source: source,
        itemState: itemState,
        downloadUrl: downloadUrl
    });
}