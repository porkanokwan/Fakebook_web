import { Modal } from "bootstrap";
import { useEffect, useRef, useState } from "react";
import RegisterForm from "./RegisterForm";

function LoginForm() {
  // modalEl ทำหน้าที่ reference ไปที่ที่เราผูกไว้ผ่าน ref ดังนั้น ถ้าเราอยาก getElementById ตัวไหน ให้ ref ไปที่ตัวนั้น และเราสามารถประกาศ userRef ได้หลายค่า แต่ค่านึง ref ได้ที่เดียว
  const modalEl = useRef();
  const [modal, setModal] = useState(null);

  useEffect(() => {
    console.log(modalEl.current); // div obj
  });
  const handleCilckModal = () => {
    const modalObj = new Modal(modalEl.current);
    setModal(modalObj);
    modalObj.show();
  };

  const closeModal = () => {
    modal.hide();
  };
  return (
    <>
      <form className="border border-1 shadow p-3 rounded-lg bg-white mx-auto max-w-99">
        <div className="mb-3">
          <input
            type="text"
            className="form-control rounded-md h-13"
            placeholder="Email address or phone number"
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control rounded-md h-13"
            placeholder="Password"
          />
        </div>
        <div className="mb-2 d-grid">
          <button
            type="button"
            className="btn btn-primary rounded-md h-12 fw-bold text-4.5"
            //   onClick={() => navigate("/")}
          >
            Log In
          </button>
        </div>
        <div className="text-center">
          <a href="/" className="text-decoration-none">
            <small>Forgotten password?</small>
          </a>
        </div>
        <hr className="hr-sm" />
        <div className="text-center tw-py-2.5">
          <button
            className="btn btn-green rounded-md h-12 fw-bold"
            type="button"
            onClick={handleCilckModal}
          >
            Create New Account
          </button>
        </div>
      </form>

      {/* MODAL จะโชว์ขึ้นมา เมื่อเกิดการ click ปุ่ม Create New Account */}
      <div
        className="modal fade"
        id="modal-register"
        tabIndex="-1"
        ref={modalEl}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Sign Up</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <RegisterForm closeModal={closeModal} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
