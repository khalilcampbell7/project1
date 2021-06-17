
import React, {useContext} from 'react';
import ReactFileReader from 'react-file-reader';
import { useHistory } from 'react-router-dom';

import ContextInformation from './ContextInformation';

function DeckLoader() {
    const context = useContext(ContextInformation);
    const history = useHistory();

    const submitFile = (files) => {
        const fr = new FileReader();
        
        const onFileUpload = (e) => {
            context.setDeck(JSON.parse(e.target.result));
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