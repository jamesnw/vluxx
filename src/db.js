import firebase from "firebase/app";
import "firebase/firestore";

// Get a Firestore instance
export const db = firebase
  .initializeApp({ projectId: "vluxx-d70d9" })
  .firestore();

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { games, players } = firebase.firestore;
export { games, players };
