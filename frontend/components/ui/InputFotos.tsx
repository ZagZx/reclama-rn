import { useState } from "react";


export function InputFotos() {
  const [files, setFiles] = useState<File[]>([]);
  
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);
    setFiles(files);
  }

  return(
    <>
      <input
        type="file"
        name="fotos"
        id="fotos"
        multiple
        onChange={handleFileChange}
        accept="image/*"
      />
      <ul>
        {files.map((file, index) => (
          <li key={index}>{file.name}</li>
        ))}
      </ul>
    </>
  );
}