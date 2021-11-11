import { useEffect, useState } from 'react';

function DetectOpenCV() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'scriptOpenCv.js';
    script.async = true;

    document.body.appendChild(script);
  }, []);

  return (
    <div className="container mt-4">
      <h1>Detect Blurred Image using OpenCV</h1>
      <hr />
      {/* <p id="status">OpenCV.js is loading...</p> */}
      <div className="d-flex align-items-center m-5">
        <div>
          <h1 id="p1"></h1>

          <div className="inputoutput">
            <div className="caption">
              imageSrc
              <input type="file" id="canvasInput" name="file" />
            </div>
            <img id="imageSrc" alt="No Image" />
          </div>

          {loading ? (
            <div className="d-flex align-items-center m-5">
              <strong>Loading...</strong>
              <div className="spinner-border ms-auto" role="status" aria-hidden="true"></div>
            </div>
          ) : (
            <div></div>
          )}
          <div>
            <br />
            <div className="inputoutput">
              <div className="caption">canvasOutput</div>
              <canvas id="canvasOutput"></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetectOpenCV;
