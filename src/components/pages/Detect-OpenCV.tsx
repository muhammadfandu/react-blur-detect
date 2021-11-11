import { useEffect } from 'react';

function DetectOpenCV() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'scriptOpenCv.js';
    script.async = true;

    document.body.appendChild(script);
  }, []);

  return (
    <div className="container mt-4">
      <h1>
        Detect Blurred Image <small>(OpenCV.js)</small>
      </h1>
      <hr />
      {/* <p id="status">OpenCV.js is loading...</p> */}
      <div className="d-flex align-items-center m-5">
        <div>
          <h1 id="p1"> </h1>
          <div className="inputoutput">
            <div className="caption">
              Image Source:
              <input type="file" className="form-control my-2" id="canvasInput" name="file" />
            </div>
            <img id="imageSrc" alt="Please choose a file" />
          </div>

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
