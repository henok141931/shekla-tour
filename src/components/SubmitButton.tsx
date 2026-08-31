"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button 
      type="submit" 
      disabled={pending}
      className={`mt-[10px] py-[14px] rounded-[8px] font-bold transition-colors ${
        pending ? 'bg-gray-400 text-gray-700 cursor-not-allowed' : 'bg-ink text-white hover:bg-black'
      }`}
    >
      {pending ? "Uploading & Saving..." : "Save Changes"}
    </button>
  );
}
