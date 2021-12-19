import { ReactNode, useEffect, useState } from 'react';
import { useDropzone, FileWithPath } from 'react-dropzone';
import { Link } from 'react-router-dom';

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
    const script = document.createElement('script');
    script.src = 'scriptJavascript.js';
    script.async = true;

    document.body.appendChild(script);
  }, []);
  const [previews, setPreviews] = useState<Preview[]>([]);
  const [result, setResult] = useState('');
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
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
    },
  });

  const files = (acceptedFiles: FileWithPath[]): ReactNode =>
    acceptedFiles.map((file) => (
      <li key={file.path}>
        {file.path} - {file.size} bytes
      </li>
    ));

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

        console.log('handleImageInput', file);

        window.handleImageInput(file);
        setTimeout(function () {
          if (parseFloat(window.finalScore.avg_edge_width_perc.toFixed(2)) > 0.5) {
            setResult('Conclusion: Image is blur');
          } else {
            setResult('Conclusion: Image is not blur');
          }
        }, 1000);
      });
    },
    [files]
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
          {/* <aside>
            <h4>Files</h4>
            <ul>{files(acceptedFiles)}</ul>
          </aside> */}
          <aside style={thumbsContainer}>{thumbs}</aside>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <h4>Please choose from these blur detection methods:</h4>

          <Link to="/detect-javascript" className="btn btn-lg btn-primary me-2">
            Javascript
          </Link>
          <Link to="/detect-opencv" className="btn btn-lg btn-secondary">
            OpenCV
          </Link>
        </div>

        <div className="row">
          <div>
            <h4>{result}</h4>
            <span id="blur_score"></span>
            <span id="calculation_time"></span>
          </div>
          <canvas id="canvas"></canvas>
        </div>
      </div>
    </div>
  );
}

export default Home;
