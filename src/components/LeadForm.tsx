"use client";

import { useActionState } from "react";
import { submitLeadAction } from "@/app/actions/leads";
import { useFormStatus } from "react-dom";

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button 
      type="submit" 
      disabled={pending}
      className={`font-bold py-[15px] rounded-full transition-colors ${
        pending ? 'bg-gray-400 text-gray-700 cursor-not-allowed' : 'bg-green text-white hover:bg-green-light'
      }`}
    >
      {pending ? "Submitting..." : label}
    </button>
  );
}

export function LeadForm({ tripId, source, buttonLabel }: { tripId?: string, source: string, buttonLabel: string }) {
  const [state, formAction] = useActionState(submitLeadAction, { error: "", success: false });

  if (state.success) {
    return (
      <div className="bg-green-50 text-green-800 p-6 rounded-xl border border-green-200 text-center">
        <h4 className="font-bold text-lg mb-2">Request Submitted!</h4>
        <p>Thank you for your interest. We will contact you shortly.</p>
      </div>
    );
  }

  return (
    <form className="flex flex-col gap-[15px]" action={formAction}>
      {state.error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-200 text-sm font-bold">
          {state.error}
        </div>
      )}
      
      {tripId && <input type="hidden" name="tripId" value={tripId} />}
      <input type="hidden" name="source" value={source} />
      
      <input type="text" name="name" placeholder="Your name" className="p-[14px] rounded-[12px] border border-line w-full" required />
      <input type="email" name="email" placeholder="Email address" className="p-[14px] rounded-[12px] border border-line w-full" required />
      <input type="tel" name="phone" placeholder="Phone number" className="p-[14px] rounded-[12px] border border-line w-full" required />
      
      <SubmitButton label={buttonLabel} />
    </form>
  );
}
