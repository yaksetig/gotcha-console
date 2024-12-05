import { useState, useRef, useEffect } from "react";

type EditableLabelProps = {
  value: string;
  onSubmit: (newValue: string) => Promise<void>;
};

export default function EditableLabel({ value, onSubmit }: EditableLabelProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [isLoading, setIsLoading] = useState(false);
  const [originalValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSubmit = async () => {
    if (inputValue.trim() === "" || inputValue === value) {
      setInputValue(value);
      setIsEditing(false);
      return;
    }

    setIsLoading(true);
    try {
      await onSubmit(inputValue);
      setIsEditing(false);
    } catch (error) {
      // Revert to original value on error
      setInputValue(originalValue);
      console.error("Failed to update label:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    } else if (e.key === "Escape") {
      setInputValue(value);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleSubmit}
        disabled={isLoading}
        className={`
          font-medium text-gray-700 px-1 py-0.5 border rounded
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          disabled:bg-gray-100 disabled:cursor-not-allowed
          w-full max-w-[200px]
        `}
      />
    );
  }

  return (
    <h3
      onClick={() => setIsEditing(true)}
      className="font-medium text-gray-700 border border-transparent cursor-pointer hover:text-gray-900 px-1 py-0.5"
    >
      {inputValue}
    </h3>
  );
}
