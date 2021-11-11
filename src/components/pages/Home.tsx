import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container mt-4">
      <h1>Detect Blurred Image</h1>
      <hr />

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
      </div>
    </div>
  );
}

export default Home;
