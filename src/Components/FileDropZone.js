import { Paper } from '@mui/material';
import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

function FileDropZone({ onDropFiles }) {
  const [paths, setPaths] = useState([]);
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    acceptedFiles = acceptedFiles.map(f => {
      let url = URL.createObjectURL(f)
      return { _id: null, name: f.path, url, data: f }
    }
    );
    setPaths(acceptedFiles);
    onDropFiles(acceptedFiles);
  }, [setPaths])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
  console.log(paths);
  return (
    <>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div style={{backgroundColor: 'lightgrey', minHeight: '100px', margin:'auto', display: 'inline-block'}} >
          {
            <p>Drop the files here ...</p>
            /*isDragActive ?
              <p>Drop the files here ...</p> :
              <p>Drag 'n' drop some files here, or click to select files</p>*/
        }
        </div>
      </div>
    </>
  )
}

const DropZone = ({ isDragActive }) => {
  <Paper>
    {
      isDragActive ?
        <p>Drop the files here ...</p> :
        <p>Drag 'n' drop some files here, or click to select files</p>
    }
  </Paper>

}
/*
              {
                paths.map(
                    f => 
                    <img key={f.name} src={f.url} />
               )
            }
*/

/*export function MyDropzone() {
  const [paths, setPaths] = useState([]);

  const onDrop = useCallback(acceptedFiles => {
    setPaths(acceptedFiles.map(file => URL.createObjectURL(file)));
  }, [setPaths]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drop the files here ...</p>
      </div>
      {paths.map(path => 
        <img key={path} src={path} />
       )}
    </div>
  );
}*/

export { FileDropZone }