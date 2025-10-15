import { useEffect, useRef } from "react";

const DeleteModal = ({ isOpen, onClose }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const modalElement = modalRef.current;
    if (!modalElement) return;

    if (isOpen) {
      modalElement.showModal();
    } else {
      modalElement.close();
    }
  }, [isOpen]);

  return (
    <dialog ref={modalRef} className="modal">
      <h1>Delete comment</h1>
      <p>
        Are you sure you want to delete this comment? This will remove a comment
        and can't be undone.
      </p>
      <section>
        <button autoFocus onClick={onClose} className="cancel-btn">
          NO, CANCEL
        </button>
        <button className="delete-btn">YES, DELETE</button>
      </section>
    </dialog>
  );
};

export default DeleteModal;
