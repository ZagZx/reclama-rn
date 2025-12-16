import { ReactNode } from "react";

interface TextAreaProps {
  id?: string,
  name?: string,
  placeholder?: string,
  styles?: string,
  rows?: number,
  cols?: number,
  required?: boolean,
  children?: ReactNode,
}


export default function TextArea({ id, name, placeholder, required, styles, rows, cols, children}: TextAreaProps) {
  return(
    <textarea 
      className={
        `border border-neutral-200 rounded ${styles}`
      }
      name={name} 
      id={id} 
      placeholder={placeholder} 
      required={required}
      rows={rows}
      cols={cols}
    >
      {children}
    </textarea>
  );
}