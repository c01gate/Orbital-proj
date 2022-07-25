import { db } from "../firebase";
import { ref, set } from "firebase/database";
import { auth } from "../firebase";

export function addListingDatabase(title, description, material, source, itemState, price, downloadUrl) {
    set(ref(db, 'Listings/' + auth.currentUser.uid+downloadUrl.replace(/[^a-zA-Z ]/g, "")), {
        title: title,
        description: description,
        material: material,
        source: source,
        itemState: itemState,
        price: price,
        downloadUrl: downloadUrl
    });
}