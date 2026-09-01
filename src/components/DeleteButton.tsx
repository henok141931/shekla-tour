"use client";

import { useFormStatus } from "react-dom";

export function DeleteButton({ action, id, entityName }: { action: any, id: string, entityName: string }) {
  return (
    <form action={action} onSubmit={(e) => {
      if (!confirm(`Are you sure you want to delete this ${entityName}?`)) {
        e.preventDefault();
      }
    }}>
      <input type="hidden" name="id" value={id} />
      <DeleteSubmitButton />
    </form>
  );
}

function DeleteSubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button 
      type="submit" 
      disabled={pending}
      className={`w-full text-sm text-center px-[15px] py-[8px] rounded-lg transition-colors ${
        pending ? 'bg-red-200 text-red-500 cursor-not-allowed' : 'text-red-600 border border-red-200 hover:bg-red-50'
      }`}
    >
      {pending ? "Deleting..." : "Delete"}
    </button>
  );
}
