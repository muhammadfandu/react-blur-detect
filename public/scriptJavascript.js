var workerCheckbox = document.querySelector('#workerCheckbox');
var blurScore = document.querySelector('#blur_score');
var spinner = document.querySelector('.spinner');
var canvas = document.querySelector('#canvas');
var calculationTime;
var finalScore = {
  avg_edge_width: 7.0,
  avg_edge_width_perc: 0.0,
  height: 0,
  num_edges: 0,
  width: 0,
};

measureBlur.setup({
  workerURL: 'dist/measure_blur_worker.js',
});

function readImageFile(rawFile) {
  return new Promise(function (resolve, reject) {
    if (!rawFile) return reject();

    var reader = new FileReader();
    reader.onload = function (readerEvent) {
      var img = new Image();
      img.onload = function () {
        resolve({
          // NOTE: This is not ImageData object!
          rawFile: rawFile,
          data: img,
          width: img.width,
          height: img.height,
        });
      };
      img.onerror = reject;
      img.src = readerEvent.target.result;
    };
    reader.readAsDataURL(rawFile);
  });
}

function showScore(score) {
  finalScore = score;
  blurScore.innerHTML = 'Score: ' + score.avg_edge_width_perc.toFixed(2) + ' | ';
  // console.log('Detail blur score:', score);
  document.querySelector('#calculation_time').innerHTML =
    'Calculation time: ' + ((Date.now() - calculationTime) / 1000).toFixed(3) + ' sec';
}

function handleImageInput(e) {
  console.log('handleImageInput', e);
  var done = function (img) {
    var context = canvas.getContext('2d');

    canvas.width = img.width;
    canvas.height = img.height;
    context.drawImage(img.data, 0, 0);

    var canvasData = context.getImageData(0, 0, canvas.width, canvas.height);

    showScore(measureBlur(canvasData));
  };
  // spinner.style.display = 'block';
  calculationTime = Date.now();
  readImageFile(e).then(done, console.error);
}
