import { initializeApp } from '@firebase/app';
import { arrayRemove, arrayUnion, doc, getFirestore, runTransaction, setDoc, updateDoc } from '@firebase/firestore';
import { Entry, Week } from './models';
import { useDocument } from 'react-firebase-hooks/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDYicCA4A-oNy7qqkPmBAQYBNZmrTATwps',
  authDomain: 'bambino-815c0.firebaseapp.com',
  databaseURL: 'https://bambino-815c0-default-rtdb.firebaseio.com',
  projectId: 'bambino-815c0',
  storageBucket: 'bambino-815c0.appspot.com',
  messagingSenderId: '907549812531',
  appId: '1:907549812531:web:4783cd8e0a5637b782c046',
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const useWeek = (id: string): [Week | undefined, boolean] => {
  const [data, loading] = useDocument(
    doc(db, 'weeks', id),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    },
  );

  if (loading || !data) {
    return [undefined, loading];
  }
  if (!data?.exists()) {
    addWeek(id);
    return [{ id, entries: [] }, false];
  }
  return [{
    id: data.id,
    entries: data.data()?.entries.map((e: any) => {
      return {
        id: e.id,
        baby: e.baby,
        start: e.start.toDate(),
        end: e.end.toDate(),
      };
    }) ?? [],
  }, false];
};

const addWeek = (id: string) => {
  return setDoc(doc(db, 'weeks', id), { entries: [] });
};

export const addEntry = (id: string, entry: Entry): Promise<void> => {
  return updateDoc(doc(db, 'weeks', id), {
    entries: arrayUnion(entry),
  });
};

export const updateEntry = (id: string, oldEntry: Entry, newEntry: Entry): Promise<void> => {
  return runTransaction(db, (transaction) => {
    const docRef = doc(db, 'weeks', id);
    return transaction.get(docRef)
      .then(doc => {
        if (doc && doc.exists()) {
          transaction.update(
            docRef,
            {
              entries: arrayRemove(oldEntry),
            },
          );
          transaction.update(
            docRef,
            {
              entries: arrayUnion(newEntry),
            },
          );
        }
      });
  });
};

export const deleteEntry = (id: string, entry: Entry): Promise<void> => {
  return updateDoc(doc(db, 'weeks', id), {
    entries: arrayRemove(entry),
  });
};
