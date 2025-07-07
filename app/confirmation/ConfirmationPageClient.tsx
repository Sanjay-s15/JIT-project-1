'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import React from 'react';
import axios from 'axios';

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const name = searchParams.get('name');
  const rollNo = searchParams.get('rollNumber');
  const gender = searchParams.get('gender');
  const email = searchParams.get('mailId');
  const department = searchParams.get('department');
  const boardingpoint = searchParams.get('boardingPoint');
  const category = searchParams.get('category');
  const feesdetails = searchParams.get('feesdetails');
  const feesamount = searchParams.get('feesamount');

  const handleNotCorrect = () => {
    router.push('/register');
  };

  async function handleAdmit() {
    alert('Admit process initiated.');
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/registeradmit`, {
        name,
        rollNo,
        gender,
        email,
        department,
        boardingpoint,
        category,
        feesdetails,
        feesamount,
      });

      if(response.status === 200){
        alert('Admit process successful.');
      }else if(response.status === 402){
        alert('User already registered.');
      }else{
        alert('Admit process failed.');
      }
    }catch(error){
      console.error('Error in admit process:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 py-10">
      <h2 className="text-2xl font-bold mb-6 text-blue-800">Please Confirm Your Details</h2>
      <div className="bg-gray-100 p-6 rounded shadow-md w-full max-w-xl space-y-3">
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Roll Number:</strong> {rollNo}</p>
        <p><strong>Gender:</strong> {gender}</p>
        <p><strong>Mail ID:</strong> {email}</p>
        <p><strong>Department:</strong> {department}</p>
        <p><strong>Boarding Point:</strong> {boardingpoint}</p>
        <p><strong>Category:</strong> {category}</p>
        <p><strong>Fees Details:</strong> {feesdetails}</p>
        <p><strong>Fees Amount:</strong> ₹{feesamount}</p>
      </div>

      <div className="flex gap-4 mt-8">
        <button
          onClick={handleNotCorrect}
          className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Not Correct
        </button>

        {feesdetails?.toLowerCase() === 'fully paid' && (
          <button
            onClick={handleAdmit}
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Admit
          </button>
        )}
      </div>
    </div>
  );
}
