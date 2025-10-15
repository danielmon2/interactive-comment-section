import { useEffect, useRef } from "react";

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
      <h1>Delete comment</h1>
      <p>
        Are you sure you want to delete this comment? This will remove a comment
        and can't be undone.
      </p>
      <section>
        <button autoFocus onClick={onClose} className="btn-base cancel-btn">
          NO, CANCEL
        </button>
        <button
          onClick={() => onDelete(isOpen[1])}
          className="btn-base delete-btn-modal"
        >
          YES, DELETE
        </button>
      </section>
    </dialog>
  );
};

export default DeleteModal;
