import React, { useCallback, useMemo, useRef } from 'react'
import './video-select.css'
import { useDropzone } from 'react-dropzone'
import Button from '@atlaskit/button'
import upload from '../../assets/upload.png'


function VideoSelect() {

    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
    }, [])
    const inputFile = useRef<any>()

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({ onDrop })

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

    const onButtonClick = (e: any) => {
        if (inputFile && inputFile.current) {
            inputFile!.current.click()
        }
        console.log(e)
    }


    return (
        <div className="video-select-container">
            <div className="dashed-box">
                <div {...getRootProps({ ...style })}>
                    <input {...getInputProps()} />
                    <br />
                    <img src={upload} alt="upload" width="35" style={{ marginLeft: '50%', transform: 'translateX(-50%)' }} />
                    <br />
                    <br />
                    <small>Drag and drop video here</small>

                </div>
                <br /><br />
                <small>or &nbsp;&nbsp;
                    <Button
                        onClick={onButtonClick}
                        appearance="primary"
                    >
                        <input type='file' id='file' ref={inputFile} style={{ display: 'none' }} />
                        Import from computer

                    </Button>
                </small>
            </div>

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
