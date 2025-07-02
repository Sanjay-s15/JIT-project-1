'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import React from 'react';

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const name = searchParams.get('name');
  const roll = searchParams.get('rollNumber');
  const gender = searchParams.get('gender');
  const mail = searchParams.get('mailId');
  const boarding = searchParams.get('boardingPoint');
  const feesDetails = searchParams.get('feesDetails');
  const feesAmount = searchParams.get('feesAmount');

  const handleNotCorrect = () => {
    router.push('/register');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 py-10">
      <h2 className="text-2xl font-bold mb-6 text-blue-800">Please Confirm Your Details</h2>
      <div className="bg-gray-100 p-6 rounded shadow-md w-full max-w-xl space-y-3">
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Roll Number:</strong> {roll}</p>
        <p><strong>Gender:</strong> {gender}</p>
        <p><strong>Mail ID:</strong> {mail}</p>
        <p><strong>Boarding Point:</strong> {boarding}</p>
        <p><strong>Fees Details:</strong> {feesDetails}</p>
        <p><strong>Fees Amount:</strong> ₹{feesAmount}</p>
      </div>

      <div className="flex gap-4 mt-8">
        <button
          onClick={handleNotCorrect}
          className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Not Correct
        </button>

        {feesDetails?.toLowerCase() === 'fully paid' && (
          <button
            onClick={() => alert('Admit process initiated.')}
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Admit
          </button>
        )}
      </div>
    </div>
  );
}
