import { useState } from "react"

interface formType {
    label: string,
    type: string,
    value: string,
    placeholder: string,
    onChange : (inputValue: string) => void,
    required: boolean
}

export const FormGroup = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
} : formType) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

 const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;
  setHasValue(value !== "");
  onChange(value); 
};



  return (
    <div className="relative mb-6">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        required={required}
        style={{
          width: "100%",
          padding: "16px 20px",
          marginTop: "5px",
          backgroundColor: "rgba(15, 15, 35, 0.85)",
          border: isFocused ? "1px solid #f87171" : "1px solid rgba(255,255,255,0.2)",
          borderRadius: "12px",
          color: "#ffffff",
          fontSize: "16px",
          outline: "none",
          boxSizing: "border-box",
          backdropFilter: "blur(8px)",
          transition: "border-color 0.3s ease, box-shadow 0.3s ease",
          boxShadow: isFocused ? "0 0 0 3px rgba(248, 113, 113, 0.15)" : "none",
        }}
      />
      <label
        style={{
          position: "absolute",
          top: "-10px",
          left: "16px",
          padding: "0 8px",
           marginTop: "5px",
          fontSize: "13px",
          fontWeight: "500",
          color: isFocused || hasValue ? "#4ecdc4" : "#f87171",
          background: "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%)",
          pointerEvents: "none",
          transition: "color 0.3s ease",
        }}
      >
        {label}
      </label>
    </div>
  );
};