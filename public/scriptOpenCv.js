let imgElement = document.getElementById('imageSrc');
let inputElement = document.getElementById('canvasInput');
inputElement.addEventListener(
  'change',
  (e) => {
    imgElement.src = URL.createObjectURL(e.target.files[0]);
  },
  false
);
imgElement.onload = function () {
  // console.log('i am here');
  let src = cv.imread(imgElement);
  let dst = new cv.Mat();
  let men = new cv.Mat();
  let menO = new cv.Mat();
  cv.cvtColor(src, src, cv.COLOR_RGB2GRAY, 0);
  // You can try more different parameters
  var t = cv.Laplacian(src, dst, cv.CV_64F, 1, 1, 0, cv.BORDER_DEFAULT);
  console.log(t, cv.meanStdDev(dst, menO, men), menO.data64F[0], men.data64F[0]);
  if (men.data64F[0] > 10) document.getElementById('p1').innerHTML = 'Not blur';
  else document.getElementById('p1').innerHTML = 'blur';
  cv.imshow('canvasOutput', dst);
  src.delete();
  dst.delete();
};
function onOpenCvReady() {
  console.log('OpenCV.js is ready.');
}
