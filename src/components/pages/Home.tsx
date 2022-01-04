import { ReactChild, ReactElement, ReactFragment, ReactPortal, useEffect, useState } from 'react';
import { Button, Modal, Spinner } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { ApplicationState } from '../../redux/interfaces';
import ConfigModal from './ConfigModal';

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
  const { t, i18n } = useTranslation();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<Image[]>([]);
  const [thumbs, setThumbs] = useState<ReactElement[]>([]);
  const blurThreshold1 = useSelector<ApplicationState, ApplicationState['threshold1']>((state) => state.threshold1);
  const appLanguage = useSelector<ApplicationState, ApplicationState['app_language']>((state) => state.app_language);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const showLoading = () => setLoading(true);
  const hideLoading = () => setLoading(false);

  useEffect(() => {
    const script1 = document.createElement('script');
    script1.src = 'scriptJavascript.js';
    script1.async = true;
    document.body.appendChild(script1);

    const script2 = document.createElement('script');
    script2.src = 'scriptOpenCv.js';
    script2.async = true;
    document.body.appendChild(script2);

    i18n.changeLanguage(appLanguage);
  }, [appLanguage, i18n]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    maxFiles: 4,
    onDrop: (files) => {
      showLoading();
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
          let reason: (boolean | ReactChild | ReactFragment | ReactPortal | null | undefined)[] = [];

          images.forEach((file, index) => {
            if (appLanguage === 'en') {
              reason.push(
                <div>
                  The algorithm measures the width of edges from the image. With a high enough contrast modification in
                  image processing algorithm, it can be observed that edges get smoothened out and appear wider than in
                  the original. From the submitted image, it is calculated that the average width of the edges is{' '}
                  <b>{window.scores[index].avg_edge_width_perc.toFixed(2)}</b> and with the blur threshold set to{' '}
                  <b>{blurThreshold1}</b>, then it is concluded that the image is{' '}
                  <b>{window.scores[index].avg_edge_width_perc.toFixed(2) > blurThreshold1 ? 'Blur' : 'Not Blur'}</b>.
                  More details can be found{' '}
                  <a
                    rel="noreferrer"
                    target="_blank"
                    href="https://medium.com/dawandadev/canvas-based-blur-detection-with-javascript-8d9dc25cb7d5"
                  >
                    here
                  </a>
                  .
                </div>
              );
            }
            if (appLanguage === 'id') {
              reason.push(
                <div>
                  Algoritma mengukur lebar rusuk (edges) dari gambar. Dengan melakukan modifikasi kontras dalam
                  algoritma pemrosesan gambar, dapat diobservasi rusuk (edges) dari gambar terlihat lebih halus dan
                  lebar dari yang sebenarnya. Dari gambar yang dipilih, terhitung bahwa rata-rata lebar rusuk adalah{' '}
                  <b>{window.scores[index].avg_edge_width_perc.toFixed(2)}</b> dan dengan batas skor blur diatur ke{' '}
                  <b>{blurThreshold1}</b>, maka disimpulkan bahwa gambar{' '}
                  <b>
                    {window.scores[index].avg_edge_width_perc.toFixed(2) > blurThreshold1 ? 'Buram' : 'Tidak Buram'}
                  </b>
                  . Lebih banyak informasi dapat dilihat{' '}
                  <a
                    rel="noreferrer"
                    target="_blank"
                    href="https://medium.com/dawandadev/canvas-based-blur-detection-with-javascript-8d9dc25cb7d5"
                  >
                    disini
                  </a>
                  .
                </div>
              );
            }
          });

          hideLoading();
          setThumbs(
            images.map((file, index) => (
              <div key={file.name} className="card my-2 p-2">
                <div className="row">
                  <div className="col-md-4">
                    <div className="thumb">
                      <div>
                        <img src={file.preview} className="img" alt="preview" />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-8 py-4">
                    <h4> </h4>
                    <table className="padding-4">
                      <tbody>
                        <tr>
                          <td width={'120px'}>
                            <h4>
                              <small>{t('result')} </small>{' '}
                            </h4>
                          </td>
                          <td width={'20px'}></td>
                          <td>
                            <h4 className="text-bold">
                              {window.scores[index].avg_edge_width_perc.toFixed(2) > blurThreshold1
                                ? appLanguage === 'en'
                                  ? 'Blur'
                                  : 'Buram'
                                : appLanguage === 'en'
                                ? 'Not Blur'
                                : 'Tidak Buram'}
                            </h4>
                          </td>
                        </tr>
                        <tr>
                          <td width={'120px'}>{t('file-name')}</td>
                          <td width={'20px'}>:</td>
                          <td>{file.name}</td>
                        </tr>
                        <tr>
                          <td>{t('score')}</td>
                          <td>:</td>
                          <td>{window.scores[index].avg_edge_width_perc.toFixed(2)}</td>
                        </tr>
                        <tr>
                          <td className="valign-top">{t('reason')}</td>
                          <td className="valign-top">:</td>
                          <td>{reason[index]}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ))
          );
        }
      }, 1000);
    },
    [window.scores, images, blurThreshold1, appLanguage]
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
        <div className="col-md-11 col-xs-12 ">{t('please-choose')}</div>
        <div className="col-md-1 col-xs-12 ">
          <Button variant="primary2" onClick={handleShow}>
            {t('settings')}
          </Button>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div {...getRootProps({ className: 'baseStyle my-4' })}>
            <input {...getInputProps()} />
            <p>{t('dragndrop')}</p>
          </div>

          {loading && (
            <div className="center-content">
              <Spinner animation="border" variant="primary" />
            </div>
          )}

          {!loading && <aside className="thumbs-container">{thumbs}</aside>}
        </div>
      </div>

      <div className="row hidden">
        <img id="imageSrc" alt="Please choose a file" />
        <canvas id="canvas"></canvas>
      </div>

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <ConfigModal handleClose={handleClose}></ConfigModal>
      </Modal>
    </div>
  );
}

export default Home;
