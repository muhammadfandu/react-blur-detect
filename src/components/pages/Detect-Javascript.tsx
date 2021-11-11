import { useEffect, useState } from 'react';

function DetectJavascript() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'scriptJavascript.js';
    script.async = true;

    document.body.appendChild(script);
  }, []);

  const onSelectFile = (e: any) => {
    setLoading(true);

    window.handleImageInput(e);

    setTimeout(function () {
      setLoading(false);

      if (parseFloat(window.finalScore.avg_edge_width_perc.toFixed(2)) > 0.5) {
        setResult('Conclusion: Image is blur');
      } else {
        setResult('Conclusion: Image is not blur');
      }
    }, 1000);
  };

  return (
    <div className="container mt-4">
      <h1>Detect Blurred Image</h1>
      <hr />
      <div className="d-flex align-items-center m-5">
        <div>
          {loading ? (
            <div className="d-flex align-items-center m-5">
              <strong>Loading...</strong>
              <div className="spinner-border ms-auto" role="status" aria-hidden="true"></div>
            </div>
          ) : (
            <div></div>
          )}
          <div>
            <h4>{result}</h4>
            <span id="blur_score"></span>
            <span id="calculation_time"></span>
          </div>
          <input type="file" className="form-control my-2" onChange={onSelectFile} />

          <br />

          <canvas id="canvas"></canvas>
        </div>
      </div>
    </div>
  );
}

export default DetectJavascript;
