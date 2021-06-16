
import React, {useState, useContext} from 'react';
import ReactFileReader from 'react-file-reader';
import { useHistory } from 'react-router-dom';

import ContextInformation from './ContextInformation';

function DeckLoader() {
    const [ selectedFile, setSelectedFile ] = useState(null);
    const context = useContext(ContextInformation);
    const history = useHistory();

    const changeFile = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const submitFile = (files) => {
        //e.preventDefault();
        const fr = new FileReader();
        
        const onFileUpload = (e) => {
            context.setDeck(eval(e.target.result));
            history.push("/deck-builder");
        }

        fr.onload = onFileUpload;
        fr.readAsText(files.fileList[0]);

    }

    return (
        <form> 
            <ReactFileReader fileTypes={[".json"]} multipleFiles={false} base64={true} handleFiles={submitFile}>
                {/* <input type="file" name="file" onChange={changeFile} /> */}
                <button onClick={e=>e.preventDefault()}>Upload</button>
            </ReactFileReader>
        </form>
    )
}

export default DeckLoader;