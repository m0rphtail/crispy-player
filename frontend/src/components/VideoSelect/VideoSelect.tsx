import React, { ChangeEvent, Dispatch, SetStateAction, useCallback, useMemo, useRef, useState } from 'react'

import './video-select.css'

import { useDropzone } from 'react-dropzone'
import Button from '@atlaskit/button'

import upload from '../../assets/upload.png'
import uploadRed from '../../assets/upload-red.png'
import uploadGrey from '../../assets/upload-grey.png'

import { formatBytes, useDidUpdateEffect } from '../../helpers'
import uploadVideo from '../../helpers/uploadVideo'

interface VideoSelectProps {
    setVideoPath: Dispatch<SetStateAction<string | null>>
}

function VideoSelect({ setVideoPath }: VideoSelectProps): JSX.Element {

    /**
     * Define required variables
     */
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [isError, setIsError] = useState<boolean>(false)

    /**
     * checks the files entered into the dropzone and takes the first file
     */
    const onDrop = useCallback(acceptedFiles => {
        acceptedFiles && setSelectedFile(acceptedFiles[0])
    }, [])

    const inputFile = useRef<any>()

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({ onDrop, accept: 'video/mp4' })

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isDragActive,
        isDragReject,
        isDragAccept
    ])

    /**
     * select the first file from the FileList of the input element
     * @param e ChangeEvent<HTMLInputElement> : the event passed by <input> onchange event 
     */
    const getFileFromSelector = (e: ChangeEvent<HTMLInputElement>): void => {
        e.target.files?.length && setSelectedFile(e.target.files[0])
    }

    /**
     * check if the ref exists and click the input filed to trigger default file selector
     */
    const onButtonClick = (): void => {
        if (inputFile && inputFile.current) {
            inputFile!.current.click()
        }
    }

    /**
     * runs every time there is a change in selectedFile, check if video format is uploaded
     */
    useDidUpdateEffect(() => {
        if (selectedFile) {
            console.log(selectedFile)
            uploadVideo(selectedFile)
            setVideoPath(selectedFile.webkitRelativePath)
            setIsError(false)
        } else {
            setIsError(true)
        }
    }, [selectedFile])

    /**
     * Remove currently selectedFile
     */
    const changeFile = (): void => {
        onButtonClick()
        setSelectedFile(null)
        setIsError(false)
    }

    console.log(isError)

    return (
        <div className="video-select-container">
            {selectedFile ?
                <div className="dashed-box video-info flex-sb">
                    <span className="flex">
                        <img src={uploadGrey} alt="upload" width="30" />
                        &nbsp;&nbsp;&nbsp;
                        <div>
                            <p className="darkgrey">{selectedFile.name}</p>
                            <span className="flex">
                                <small className="grey">{formatBytes(selectedFile.size)}</small>
                                <div className="video-info-dot"></div>
                                <small className="grey">{selectedFile.type}</small>
                            </span>

                        </div>
                    </span>
                    <Button onClick={changeFile}>Change Video</Button>
                </div>
                :
                <div className={isError ? "dashed-box dashed-box-error" : "dashed-box"}>
                    <div {...getRootProps({ ...style })}>
                        <input {...getInputProps()} />
                        <br />
                        <img src={isError ? uploadRed : upload} alt="upload" width="35" style={{ marginLeft: '50%', transform: 'translateX(-50%)' }} />
                        <br />
                        <br />
                        <small>{isError ? "Please select a video file only" : "Drag and drop video here"}</small>
                    </div>
                    <br /><br />
                    <small>or &nbsp;&nbsp;
                        <Button
                            onClick={onButtonClick}
                            appearance="primary"
                        >
                            <input type='file' id='file' ref={inputFile} style={{ display: 'none' }} accept='video/*' onChange={getFileFromSelector} />
                            Import from computer

                        </Button>
                    </small>
                </div>
            }
        </div>
    )
}

export default VideoSelect

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out',
    width: '100%'
};

const activeStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};
