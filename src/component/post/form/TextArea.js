function TextArea({ firstName, title, onChange }) {
  return (
    <textarea
      className="form-control border-0 shadow-none resize-none"
      placeholder={`What's on your mind, ${firstName}?`}
      rows="5"
      value={title}
      onChange={onChange}
    ></textarea>
  );
}

export default TextArea;
