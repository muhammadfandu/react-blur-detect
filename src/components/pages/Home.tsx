import { ReactElement, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

export interface Image {
  name: string;
  preview: string;
}

export interface Score {
  avg_edge_width: number;
  avg_edge_width_perc: number;
  height: number;
  num_edges: number;
  width: number;
}

function Home() {
  const [files, setFiles] = useState<File[]>([]);
  const [images, setImages] = useState<Image[]>([]);
  const [score, setScore] = useState<Score[]>([]);
  const [thumbs, setThumbs] = useState<ReactElement[]>([]);

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

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    maxFiles: 4,
    onDrop: (files) => {
      setImages(
        files.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );

      const thumb = images.map((file, index) => (
        <div key={file.name} className="card my-2 p-2">
          <div className="row">
            <div className="col-md-4">
              <div className="thumb">
                <div>
                  <img src={file.preview} className="img" />
                </div>
              </div>
            </div>
            <div className="col-md-8 py-4">
              <h4>{file.name}</h4>
              <span>Blur</span>
              <br />
              {/* <span>Score: {window.scores[index].avg_edge_width_perc.toFixed(2)}</span> */}
              <span>Score: {score[index].avg_edge_width_perc.toFixed(2)}</span>
            </div>
          </div>
        </div>
      ));

      setThumbs(thumb);

      window.scores = [];
      files.forEach((file) => {
        window.handleImageInput(file);
      });
    },
  });

  const process = () => {};

  useEffect(
    () => () => {
      console.log('files', files);
      console.log('scores updated');
      setScore(window.scores);

      console.log('score', score);
      console.log('images', images);
      console.log('thumbs', thumbs);
    },
    [window.scores]
  );

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks

      images.forEach((file) => {
        // URL.revokeObjectURL(file.preview);
      });
    },
    [images]
  );

  return (
    <div className="container mt-4">
      <h1>ASIC - Application for SEM Image Checking</h1>
      <hr />

      <div className="row">
        <div className="col-md-12">Please choose the image (max 4 images)</div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div {...getRootProps({ className: 'baseStyle my-4' })}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
          </div>

          <aside className="thumbs-container">{thumbs}</aside>
        </div>
      </div>

      <div className="row hidden">
        <img id="imageSrc" alt="Please choose a file" />
        <canvas id="canvas"></canvas>
      </div>
    </div>
  );
}

export default Home;
