
interface InputProps {
  type?: string,
  id?: string,
  name?: string,
  placeholder?: string,
  required?: boolean,
}

export default function Input(
  {
    id,
    name,
    placeholder,
    type = "text",
    required = false
  }:InputProps
) {
  return(
    <input 
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      required={required} 
      className="
        border border-neutral-200
        rounded
        py-1
      "
    />
  );
}
