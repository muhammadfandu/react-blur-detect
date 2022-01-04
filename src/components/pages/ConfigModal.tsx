import { Button, Form, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { updateLanguage, updateThreshold } from '../../redux/actions';
import { ApplicationState } from '../../redux/interfaces';

function ConfigModal(props: any) {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const blurThreshold1 = useSelector<ApplicationState, ApplicationState['threshold1']>((state) => state.threshold1);
  const appLanguage = useSelector<ApplicationState, ApplicationState['app_language']>((state) => state.app_language);

  const handleClose = () => {
    props.handleClose();
  };

  const setThreshold = (value: any) => {
    dispatch(updateThreshold(value / 100));
  };

  const setLanguage = () => {
    let lang = 'id';
    if (appLanguage === 'en') lang = 'id';
    if (appLanguage === 'id') lang = 'en';

    i18n.changeLanguage(lang);
    dispatch(updateLanguage(lang));
  };

  return (
    <div>
      <Modal.Header closeButton>
        <Modal.Title>{t('settings')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-md-12">
            <Form.Label>{t('app-lang')}</Form.Label>{' '}
            <Button variant="primary" onClick={(e) => setLanguage()} className="float-right btn-sm">
              {appLanguage === 'en' ? 'English' : 'Indonesia'}
            </Button>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-md-12">
            <Form.Label>
              {t('blur-score-threshold')}: <b>{blurThreshold1.toFixed(2)}</b>
            </Form.Label>
            <Form.Range value={blurThreshold1 * 100} max={100} min={1} onChange={(e) => setThreshold(e.target.value)} />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {t('close')}
        </Button>
      </Modal.Footer>
    </div>
  );
}

export default ConfigModal;
