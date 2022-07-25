import { db } from "../firebase";
import { ref, set } from "firebase/database";

export function addUserData(userID, email, displayName, bio) {
    set(ref(db, 'users/' + userID), {
        email: email,
        bio: bio,
        uuid: userID,
        displayName: displayName
    });
}