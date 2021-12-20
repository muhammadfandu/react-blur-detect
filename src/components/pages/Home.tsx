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

      window.scores = [];
      files.forEach((file) => {
        window.handleImageInput(file);
      });
    },
  });

  useEffect(
    () => () => {
      setTimeout(() => {
        if (window.scores.length > 0) {
          setScore(window.scores);

          setThumbs(
            images.map((file, index) => (
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
                    <h4> </h4>
                    <table className="padding-4">
                      <tr>
                        <td width={'120px'}>
                          <h4>
                            <small>Result </small>{' '}
                          </h4>
                        </td>
                        <td width={'20px'}></td>
                        <td>
                          <h4 className="text-bold">
                            {window.scores[index].avg_edge_width_perc.toFixed(2) > 0.5 ? 'Blur' : 'Not Blur'}
                          </h4>
                        </td>
                      </tr>
                      <tr>
                        <td width={'120px'}>File Name</td>
                        <td width={'20px'}>:</td>
                        <td>{file.name}</td>
                      </tr>
                      <tr>
                        <td>Score</td>
                        <td>:</td>
                        <td>{window.scores[index].avg_edge_width_perc.toFixed(2)}</td>
                      </tr>
                      <tr>
                        <td>Reason</td>
                        <td>:</td>
                        <td></td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            ))
          );
        }
      }, 1000);
    },
    [window.scores, images]
  );

  useEffect(
    () => () => {
      images.forEach((file) => {
        URL.revokeObjectURL(file.preview);
      });
    },
    [images]
  );

  return (
    <div className="p-4">
      <h1>ASIC - Application for SEM Image Checking</h1>
      <hr />

      <div className="row">
        <div className="col-md-12 text-bold">Please choose the image (max 4 images)</div>
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
