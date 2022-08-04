import { useRef } from "react";

function UploadImage({ onChange, value, onDelete }) {
  const inputEl = useRef();

  return (
    <>
      <div
        role="button"
        className="position-relative "
        onClick={() => inputEl.current.click()}
      >
        {value ? (
          <>
            <button
              className="btn-close position-absolute"
              style={{ top: "10px", right: "15px" }}
              onClick={(e) => {
                e.stopPropagation();
                inputEl.current.value = "";
                onDelete();
              }}
            />
            <img
              src={
                typeof value === "string" ? value : URL.createObjectURL(value)
              }
              alt="postPic"
              className="img-fluid"
            />
          </>
        ) : (
          <div
            className="d-flex flex-column align-items-center mt-3 py-3 bg-gray-100 hover-bg-gray-200 rounded-2"
            role="button"
          >
            <div className="text-center rounded-circle bg-gray-300 p-2 position-relative h-10 w-10 ">
              <i className="fa-regular fa-image position-absolute top-50 left-50 translate-middle"></i>
            </div>
            <div className="mt-1">Add Photos</div>
          </div>
        )}
        {value !== "" && typeof value === "string" ? (
          <input type="file" className="d-none" ref={inputEl} disabled />
        ) : (
          <input
            type="file"
            className="d-none"
            ref={inputEl}
            onChange={onChange}
          />
        )}
      </div>
    </>
  );
}

export default UploadImage;
