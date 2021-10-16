import React, { useRef, useState } from "react";
import { storageService, dbService } from "fbase";
import { v4 } from "uuid";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import {
    addDoc,
    collection,
} from "firebase/firestore";

const NweetFactory=({userObj})=>{
    const [nweet, setNweet] = useState("");
    const [attachment, setAttachment] = useState("");
    const fileInput = useRef();
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            let attachmentUrl = "";
            if (attachment !== "") {
                const fileRef = ref(storageService, `${userObj.uid}/${v4()}`);
                const response = await uploadString(fileRef, attachment, "data_url");
                attachmentUrl = await getDownloadURL(response.ref);
            }
            const nweetObj = {
                text: nweet,
                createdAt: Date.now(),
                creatorId: userObj.uid,
                attachmentUrl,
            };
            const docRef = await addDoc(collection(dbService, "nweets"), nweetObj);
            console.log("Document written with ID:", docRef.id);
        } catch (error) {
            console.error("Error adding document: ", error);
        }
        setNweet("");
    };
    const onChange = (event) => {
        const { target: { value } } = event;
        setNweet(value);
    };
    const onFileChange = (event) => {
        const { target: { files }, } = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const { currentTarget: { result }, } = finishedEvent;
            setAttachment(result);
        };
        reader.readAsDataURL(theFile);

    }
    const onClearAttachment = () => {
        setAttachment("");
        fileInput.current.value = null;
    };
    return (
        <form onSubmit={onSubmit}>
            <input type="text" value={nweet} onChange={onChange} placeholder="What's on your mind?" maxLength={120} />
            <input type="file" accept="image/*" ref={fileInput} onChange={onFileChange} />
            <input type="submit" value="Nweet" />
            {attachment && (
                <div>
                    <img src={attachment} width="50px" height="50px" />
                    <button onClick={onClearAttachment} >Clear</button>
                </div>
            )}
        </form>
    );
};
export default NweetFactory;