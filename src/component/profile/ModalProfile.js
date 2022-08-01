import axios from "axios";
import { Modal } from "bootstrap";
import UserIcon from "../common/UserIcon";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { ErrorContext } from "../../contexts/ErrorContext";
import Spinner from "../common/Spinner";
import CoverPhoto from "./CoverPhoto";

function ModalProfile({ open, onClose }) {
  const modalEl = useRef();
  const profilePicInputEL = useRef();
  const coverPhotoInputEL = useRef();
  const [modal, setModal] = useState(null);
  const [images, setImages] = useState(null);
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  // console.log(images[0].name);
  const { user } = useContext(AuthContext);
  const { setError } = useContext(ErrorContext);

  useEffect(() => {
    const modalObj = new Modal(modalEl.current);
    setModal(modalObj);
  }, []);

  useEffect(() => {
    if (open) {
      modal.show();
    }
  }, [open]);

  const handleUpdateProfilePic = async () => {
    try {
      setLoading(true);
      // การส่ง binary ลงใน body ต้องใช้ built-in function คือ FormData และ method append ในการเพิ่ม key-value
      const formdata = new FormData();
      formdata.append("profilePic", images); // {profilePic: images}
      // formdata จะแปลง content/type ให้เป็น form-data
      const res = await axios.patch("/profile", formdata);
      onClose();
      setImages(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCoverPhoto = async () => {
    try {
      setLoading(true);
      const formdata = new FormData();
      formdata.append("coverPhoto", coverPhoto);
      const res = await axios.patch("/profile", formdata);
      onClose();
      setCoverPhoto(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Spinner />}
      <div
        className="modal fade"
        id="modal-edit-profile"
        tabIndex="-1"
        ref={modalEl}
        onClick={onClose}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit profile</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                onClick={onClose}
              ></button>
            </div>
            <div className="modal-body">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Profile Picture</h5>
                <input
                  type="file"
                  className="d-none"
                  ref={profilePicInputEL}
                  onChange={(e) => {
                    if (e.target.files[0]) {
                      setImages(e.target.files[0]);
                    }
                  }}
                />
                <div>
                  {images && (
                    <>
                      <button
                        className="btn btn-link text-decoration-none hover-bg-gray-100"
                        onClick={handleUpdateProfilePic}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-link text-decoration-none hover-bg-gray-100"
                        onClick={() => {
                          setImages(null);
                          profilePicInputEL.current.value = "";
                        }}
                      >
                        Cancle
                      </button>
                    </>
                  )}
                  <button
                    className="btn btn-link text-decoration-none hover-bg-gray-100"
                    onClick={() => {
                      profilePicInputEL.current.click();
                    }}
                  >
                    Edit
                  </button>
                </div>
              </div>
              <div className="text-center mt-3">
                <UserIcon
                  border="4"
                  size="168"
                  // ใช้ method URL.createObjectURL() แปลงไฟล์รูปให้เป็น link ที่ tag img อ่านเข้าใจ
                  src={images ? URL.createObjectURL(images) : user.profilePic}
                />
              </div>
              <div className="d-flex justify-content-between align-items-center pt-3">
                <h5 className="mb-0">Cover Photo</h5>
                <input
                  type="file"
                  className="d-none"
                  ref={coverPhotoInputEL}
                  onChange={(e) => {
                    if (e.target.files[0]) {
                      setCoverPhoto(e.target.files[0]);
                    }
                  }}
                />
                {coverPhoto && (
                  <>
                    <button
                      className="btn btn-link text-decoration-none hover-bg-gray-100"
                      onClick={handleUpdateCoverPhoto}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-link text-decoration-none hover-bg-gray-100"
                      onClick={() => {
                        setCoverPhoto(null);
                        coverPhotoInputEL.current.value = "";
                      }}
                    >
                      Cancle
                    </button>
                  </>
                )}
                <button
                  className="btn btn-link text-decoration-none hover-bg-gray-100"
                  onClick={() => coverPhotoInputEL.current.click()}
                >
                  Edit
                </button>
              </div>
              <div
                className="overflow-hidden position-relative mt-3 rounded-lg max-w-274 max-h-101"
                style={{
                  aspectRatio: "1096/404",
                }}
              >
                <CoverPhoto
                  src={
                    coverPhoto
                      ? URL.createObjectURL(coverPhoto)
                      : user.coverPhoto
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalProfile;
