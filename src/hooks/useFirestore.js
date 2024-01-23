import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const useFirestore = (collectionName) => {
  const collectionRef = collection(db, collectionName);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tags, setTags] = useState([]);
  const [trendBlogs, setTrendBlogs] = useState([]);

  const addBlogDocument = async (data) => {
    try {
      const docRef = await addDoc(collectionRef, {
        ...data,
        timestamp: serverTimestamp(),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateBlogDocument = async (id, data) => {
    try {
      const docRef = await updateDoc(doc(db, collectionName, id), {
        ...data,
        timestamp: serverTimestamp(),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBlogDocument = async (id) => {
    try {
      await deleteDoc(doc(db, collectionName, id));
    } catch (error) {
      console.log(error);
    }
  };

  const getTrendingBlogs = async () => {
    const trendQuery = query(collectionRef, where("trending", "==", "yes"));
    const querySnapshot = await getDocs(trendQuery);
    let trendBlogs = [];
    querySnapshot.forEach((doc) => {
      trendBlogs.push({ id: doc.id, ...doc.data() });
    });
    setTrendBlogs(trendBlogs);
  };

  useEffect(() => {
    getTrendingBlogs();

    const unsub = onSnapshot(
      collectionRef,
      (snapshot) => {
        let docs = [];
        let tags = [];
        snapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
          tags.push(...doc.get("tags"));
        });
        const uniqueTags = [...new Set(tags)];
        setTags(uniqueTags);
        setBlogs(docs);
        setLoading(false);
      },
      (error) => {
        console.log(error);
      }
    );
    
    return () => {
      unsub();
      getTrendingBlogs();
    };
  }, [collectionName]);

  return {
    addBlogDocument,
    updateBlogDocument,
    deleteBlogDocument,
    blogs,
    loading,
    setLoading,
    tags,
    trendBlogs,
  };
};

export default useFirestore;
