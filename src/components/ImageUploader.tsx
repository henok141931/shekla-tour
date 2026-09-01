"use client";

import { useState, useRef, ChangeEvent, DragEvent } from "react";

interface ImageUploaderProps {
  name: string;
  defaultImage?: string;
  label?: string;
  helperText?: string;
}

export function ImageUploader({ name, defaultImage, label, helperText }: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(defaultImage || null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateAndSetPreview = (file: File) => {
    setError(null);
    
    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image file (JPG, PNG, WEBP).");
      return false;
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5MB.");
      return false;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
    return true;
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const isValid = validateAndSetPreview(file);
      if (!isValid) {
        // Reset input if invalid
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file && fileInputRef.current) {
      const isValid = validateAndSetPreview(file);
      if (isValid) {
        // Programmatically set the file on the hidden input so it submits with the form
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        fileInputRef.current.files = dataTransfer.files;
      }
    }
  };

  const handleRemove = () => {
    setPreview(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const triggerSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      {label && <label className="block text-sm font-bold text-ink mb-[5px]">{label}</label>}
      {helperText && <p className="text-xs text-muted mb-[10px]">{helperText}</p>}
      
      <div 
        className={`relative border-2 border-dashed rounded-[12px] overflow-hidden transition-all ${
          isDragging ? "border-ink bg-gray-50" : "border-gray-300 hover:border-gray-400"
        } ${preview ? "h-[250px]" : "h-[150px]"}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input 
          type="file" 
          name={name}
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />

        {preview ? (
          <div className="absolute inset-0 group">
            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-[15px]">
              <button 
                type="button" 
                onClick={triggerSelect}
                className="bg-white text-ink px-[15px] py-[8px] rounded-full text-sm font-bold shadow-md hover:bg-gray-100 transition-colors"
              >
                Replace
              </button>
              <button 
                type="button" 
                onClick={handleRemove}
                className="bg-red-500 text-white px-[15px] py-[8px] rounded-full text-sm font-bold shadow-md hover:bg-red-600 transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        ) : (
          <div 
            className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer p-[20px] text-center"
            onClick={triggerSelect}
          >
            <div className="w-[40px] h-[40px] bg-gray-100 rounded-full flex items-center justify-center mb-[10px] text-gray-500">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
              </svg>
            </div>
            <p className="text-sm font-medium text-ink">Click to upload or drag and drop</p>
            <p className="text-xs text-muted mt-[4px]">PNG, JPG, or WEBP (max. 5MB)</p>
          </div>
        )}
      </div>

      {error && (
        <p className="text-red-500 text-xs font-medium mt-[8px]">{error}</p>
      )}
    </div>
  );
}
