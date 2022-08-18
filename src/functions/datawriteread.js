import { fireDB } from "../config";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const datawriteread = async (collectionName, data) => {
  console.log("data", data);
  try {
    const colRef = collection(fireDB, collectionName);
    const doc = await addDoc(colRef, data);
    return doc.id;

  } catch (error) {
    console.log("Error", error);
  }
};

const getData = (collectionName) => {
  return new Promise(async (resolve, reject) => {
    try {
      let results = [];
      const colRef = collection(fireDB, collectionName);

      const doc = await getDocs(colRef);
      doc.forEach((item, index) => {
        results.push({ id: item.id, data: item.data() });
      });
      resolve(results);
    } catch (err) {
      reject(err);
    }
  });
};
const getDocument = (collectionName, documentId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const docRef = doc(fireDB, collectionName, documentId);
      const snapshot = await getDoc(docRef)

      resolve(snapshot.data());
    } catch (err) {
      reject(err);
    }
  });
};

const updateField = (collectionName, documentId, field, value) => {
  // Update a field in a document
  return new Promise(async (resolve, reject) => {
    try {
      const docRef = doc(fireDB, collectionName, documentId);
      const snapshot = await updateDoc(docRef, field, value);
      resolve(snapshot);
    } catch (err) {
      reject(err);
    }
  });
}

export { datawriteread, getData, getDocument, updateField };
