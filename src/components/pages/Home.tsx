import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

export interface Preview {
  name: string;
  preview: string;
}

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16,
} as React.CSSProperties;

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box',
} as React.CSSProperties;

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden',
} as React.CSSProperties;

const img = {
  display: 'block',
  width: 'auto',
  height: '100%',
} as React.CSSProperties;

function Home() {
  useEffect(() => {
    const script1 = document.createElement('script');
    script1.src = 'scriptJavascript.js';
    script1.async = true;
    document.body.appendChild(script1);

    const script2 = document.createElement('script');
    script2.src = 'scriptOpenCv.js';
    script2.async = true;
    document.body.appendChild(script2);
  }, []);

  const [previews, setPreviews] = useState<Preview[]>([]);
  const [result, setResult] = useState('');
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    maxFiles: 4,
    onDrop: (files) => {
      setPreviews(
        files.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );

      window.scores = [];
      files.forEach((file) => {
        console.log('handleImageInput', file);
        window.handleImageInput(file);
      });
    },
  });

  const thumbs = previews.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} />
      </div>
    </div>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      previews.forEach((file) => {
        URL.revokeObjectURL(file.preview);
      });
    },
    [previews]
  );

  return (
    <div className="container mt-4">
      <h1>ASIC - Application for SEM Image Checking</h1>
      <hr />

      <div className="row">
        <div className="col-md-12">Please upload image (max 4 images)</div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div {...getRootProps({ className: 'baseStyle my-4' })}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
          </div>

          <aside style={thumbsContainer}>{thumbs}</aside>
        </div>
      </div>

      <div className="row">
        <img id="imageSrc" alt="Please choose a file" />
        <canvas id="canvas"></canvas>
      </div>
    </div>
  );
}

export default Home;
