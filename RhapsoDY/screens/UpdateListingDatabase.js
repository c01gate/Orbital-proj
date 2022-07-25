import { db } from "../firebase";
import { ref, update } from "firebase/database";
import { auth } from "../firebase";

export function updateListingDatabase(title, description, material, source, itemState, price) {
    update(ref(db, 'Listings/' + auth.currentUser.uid), {
        title: title,
        description: description,
        material: material,
        source: source,
        itemState: itemState,
        price: price,
    });
}