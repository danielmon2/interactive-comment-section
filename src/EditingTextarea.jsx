import { useEffect, useState, useRef } from "react";

const ResponsiveTextarea = ({
  defaultValue,
  placeholder,
  autoFocus,
  name,
  className,
  minTextareaHeight,
}) => {
  const [value, setValue] = useState("");
  const editTextareaRef = useRef(null);
  autoFocus = autoFocus || false;
  defaultValue = defaultValue || "";
  minTextareaHeight = minTextareaHeight || 32;

  useEffect(() => {
    if (editTextareaRef.current) {
      // Reset height - important to shrink on delete
      editTextareaRef.current.style.height = "inherit";
      // Set height
      editTextareaRef.current.style.height = `${Math.max(
        editTextareaRef.current.scrollHeight,
        minTextareaHeight,
      )}px`;
    }
  }, [value]);

  return (
    <textarea
      ref={editTextareaRef}
      autoFocus={autoFocus}
      className={`base-textarea ${className}`}
      name={name}
      defaultValue={defaultValue}
      placeholder={placeholder}
      onChange={(e) => setValue(e.target.value)}
    ></textarea>
  );
};

export default ResponsiveTextarea;
