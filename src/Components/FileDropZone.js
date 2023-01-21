import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

function FileDropZone() {
    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
        let a = '';
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            {
                isDragActive ?
                    <p>Drop the files here ...</p> :
                    <p>Drag 'n' drop some files here, or click to select files</p>
            }
        </div>
    )
}

export { FileDropZone }