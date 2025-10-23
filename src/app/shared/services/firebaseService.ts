import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, Firestore, collection, getDocs, addDoc, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {

    private db: Firestore | null = null;

    private firebaseConfig = {};

    constructor() { }

    setConfig(config : any) : boolean {
        try {
            this.firebaseConfig = config;
            const app = initializeApp(this.firebaseConfig);
            this.db = getFirestore(app);
            return true;
        } catch(ex) {
            return false;
        }
    }

    // "Create" a collection by adding a dummy document
    // async createCollection(collectionName: string, firstDoc: any = null): Promise<string> {
    //     const colRef = collection(this.db, collectionName);
    //     const docRef = await addDoc(colRef, firstDoc || { _createdAt: new Date() });
    //     return docRef.id;
    // }

    // // Delete all documents in a collection (effectively deleting the collection)
    // async deleteCollection(collectionName: string): Promise<void> {
    //     const colRef = collection(this.db, collectionName);
    //     const snapshot = await getDocs(colRef);
    //     const batchPromises = snapshot.docs.map(docSnap => deleteDoc(docSnap.ref));
    //     await Promise.all(batchPromises);
    // }

    // Get all documents from a collection
    async getAllDocs(collectionName: string): Promise<any[]> {
        const colRef = collection(this.db!, collectionName);
        const snapshot = await getDocs(colRef);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }

    // Add a new document
    async addDoc(collectionName: string, data: any): Promise<string> {
        const colRef = collection(this.db!, collectionName);
        const docRef = await addDoc(colRef, data);
        return docRef.id;
    }

    // Get a single document by ID
    async getDocById(collectionName: string, id: string): Promise<any> {
        const docRef = doc(this.db!, collectionName, id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        } else {
            throw new Error('Document not found');
        }
    }

    // Update a document
    async updateDocById(collectionName: string, id: string, data: any): Promise<void> {
        const docRef = doc(this.db!, collectionName, id);
        await updateDoc(docRef, data);
    }

    // Delete a document
    async deleteDocById(collectionName: string, id: string): Promise<void> {
        const docRef = doc(this.db!, collectionName, id);
        await deleteDoc(docRef);
    }
}
