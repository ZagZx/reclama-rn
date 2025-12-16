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
        className="bg-neutral-100 border-1 border-neutral-200 rounded max-w-[270px]"
        type="file"
        name="fotos"
        id="fotos"
        multiple
        onChange={handleFileChange}
        accept="image/*"
      />
      <ul>
        {files.map((file, index) => (
          <li 
            className="max-w-[270px] truncate"
            title={file.name}
            key={index}
          >
            {file.name}
          </li>
        ))}
      </ul>
    </>
  );
}