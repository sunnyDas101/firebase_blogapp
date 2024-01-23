import { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase/firebaseConfig";

const useStorage = (file, storagePath = "blogImages") => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    const uploadFile = () => {
      const storageRef = ref(storage, `${storagePath}/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snap) => {
          const percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
          setProgress(percentage);
        },
        (err) => {
          setError(err);
        },
        async () => {
          const url = await getDownloadURL(storageRef);
          setUrl(url);
        }
      );
    };

    file && uploadFile();
  }, [file, storagePath]);

  return { progress, url, error };
};

export default useStorage;
