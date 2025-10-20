import { useEffect, useRef } from "react";
import "./DeleteModal.css";

const DeleteModal = ({ isOpen, onClose, onDelete }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const modalElement = modalRef.current;
    if (!modalElement) return;

    if (isOpen[0]) {
      modalElement.showModal();
    } else {
      modalElement.close();
    }
  }, [isOpen]);

  return (
    <dialog ref={modalRef} className="delete-modal">
      <h1 className="delete-modal__h1">Delete comment</h1>
      <p className="delete-modal__p">
        Are you sure you want to delete this comment? This will remove a comment
        and can't be undone.
      </p>
      <div className="delete-modal__btns">
        <button
          autoFocus
          onClick={onClose}
          className="btn comment__btn delete-modal__btns__cancel-btn"
        >
          NO, CANCEL
        </button>
        <button
          onClick={() => onDelete(isOpen[1])}
          className="btn comment__btn delete-modal__btns__delete-btn"
        >
          YES, DELETE
        </button>
      </div>
    </dialog>
  );
};

export default DeleteModal;
