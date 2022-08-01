import { useEffect, useRef, useState } from "react";
import { Modal as BsModal } from "bootstrap";

function Modal({ title, children, open, onClose }) {
  const modalEl = useRef();
  const [modal, setModal] = useState(null);

  useEffect(() => {
    const modal = new BsModal(modalEl.current);
    setModal(modal);
  }, []);

  useEffect(() => {
    if (open) {
      // modal จังหวะแรกจะเป็น null ต้องเขียนดักไว้
      modal?.show();
    } else {
      modal?.hide();
    }
  }, [open]);

  return (
    <div className="modal fade" tabIndex="-1" ref={modalEl} onClick={onClose}>
      <div
        className="modal-dialog modal-dialog-centered"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
