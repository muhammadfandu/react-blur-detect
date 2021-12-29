import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updateThreshold } from '../../redux/actions';
import { ApplicationState } from '../../redux/interfaces';

function ConfigModal(props: any) {
  const dispatch = useDispatch();
  const blurThreshold1 = useSelector<ApplicationState, ApplicationState['threshold1']>((state) => state.threshold1);

  const handleClose = () => {
    props.handleClose();
  };

  const setThreshold = (value: any) => {
    dispatch(updateThreshold(value / 100));
  };

  return (
    <div>
      <Modal.Header closeButton>
        <Modal.Title>Settings</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-md-12">
            <Form.Label>
              Blur Score Threshold: <b>{blurThreshold1.toFixed(2)}</b>
            </Form.Label>
            <Form.Range value={blurThreshold1 * 100} max={100} min={1} onChange={(e) => setThreshold(e.target.value)} />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </div>
  );
}

export default ConfigModal;
