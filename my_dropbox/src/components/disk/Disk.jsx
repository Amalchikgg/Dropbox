import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getFiles} from "../../actions/file";
import FileList from "./fileList/FileList";
import './disk.scss'
import Popup from './Popup';
import { setCurrentDir, setPopupDisplay } from '../../reducers/fileReducer';
import { uploadFile } from '../../actions/file';

const Disk = () => {
    const [dragEnter, setDragEnter] = useState(false);
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.files.currentDir);
    const dirStack = useSelector(state => state.files.dirStack)

    useEffect(() => {
        dispatch(getFiles(currentDir))
    }, [currentDir]);

    function showPopupHandler() {
        dispatch(setPopupDisplay('flex'))
    }

    function backClickHandler() {
        const backDirId = dirStack.pop();
        dispatch(setCurrentDir(backDirId));
    }

    function fileUploadHandler(event) {
        const files = [...event.target.files];
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
    }

    function dragEnterHandler(event) {
        event.preventDefault();
        event.stopPropagation();
        setDragEnter(true);
    }   

    function dragLeaveHandler(event) {
        event.preventDefault();
        event.stopPropagation();
        setDragEnter(false);
    }    

    function dropHandler(event) {
        event.preventDefault();
        event.stopPropagation();
        let files = [...event.dataTransfer.files];
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
        setDragEnter(false);
    }
 
    return ( !dragEnter ? 
        <div className="disk" onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
            <div className="disk__btns">
                <button className="disk__back" onClick={() => backClickHandler()}>Back</button>
                <button className="disk__create" onClick={() => showPopupHandler()}>Create folder</button>
                <div className="disk__upload">
                    <label htmlFor="disk__upload-input" className="disk__upload-label">Upload file</label>
                    <input multiple={true} onChange={(event) => fileUploadHandler(event)} type="file" id="disk__upload-input" className="disk__upload-input" />
                </div>
            </div>
            <FileList/>
            <Popup/>
        </div>
        :
        <div className="drop-area" onDrop={dropHandler} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
            Move file
        </div>
    );
};

export default Disk;
