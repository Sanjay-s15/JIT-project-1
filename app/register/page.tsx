"use client";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import axios from "axios";


export default function Home() {
  const router = useRouter();
  const [form, setForm] = useState({
    rollNo: "",
    name: "",
    gender: "",
    email: "",
    department: "",
    boardingpoint: "",
    category: "",
    feesdetails: "",
    feesamount: "",
  });
  
  

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/register`, form);
      console.log("Form submitted successfully:", response);


      if (response.status == 200) {
        alert("Form submitted successfully!");
      }else if (response.status == 400) {
        alert("User have been already registered")
      }else {
        alert("Failed to submit form. Please try again.");
      }
      setForm({
        rollNo: "",
        name: "",
        gender: "",
        email: "",
        department: "",
        boardingpoint: "",
        category: "",
        feesdetails: "",
        feesamount: "",
      });
    }catch (error) {
      console.error("Error during form submission:", error);
      alert("An error occurred while submitting the form. Please try again.");
      return;
    }
    let newErrors: { [key: string]: string } = {};
    Object.entries(form).forEach(([key, value]) => {
      if (!value) newErrors[key] = "Required";
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      alert("Form submitted!");
     
    }
  }

  function handleNext() {
    // TODO: Implement your next step logic here
    alert("Proceeding to the next step!");
    router.push(
      `/confirmation?name=${form.name}&rollNumber=${form.rollNo}&gender=${form.gender}&mailId=${form.email}&department=${form.department}&boardingPoint=${form.boardingpoint}&category=${form.category}&feesdetails=${form.feesdetails}&feesamount=${form.feesamount}`
    );
  }

  const feeMapping: { [key: string]: number } = {
    "IT|Fully Paid|Government Quota Dayscholar": 160000,
    "CSE|Fully Paid|Government Quota Dayscholar": 160000,
    "AIDS|Fully Paid|Government Quota Dayscholar": 155000,
    "CSBS|Fully Paid|Government Quota Dayscholar": 155000,
    "ECE|Fully Paid|Government Quota Dayscholar": 160000,
    "Mech|Fully Paid|Government Quota Dayscholar": 155000,
    "IT|Fully Paid|Government Quota Hostel": 220000,
    "CSE|Fully Paid|Government Quota Hostel": 220000,
    "AIDS|Fully Paid|Government Quota Hostel": 215000,
    "CSBS|Fully Paid|Government Quota Hostel": 215000,
    "ECE|Fully Paid|Government Quota Hostel": 220000,
    "Mech|Fully Paid|Government Quota Hostel": 215000,
    "IT|Fully Paid|Management Quota Dayscholar": 195000,
    "CSE|Fully Paid|Management Quota Dayscholar": 195000,
    "AIDS|Fully Paid|Management Quota Dayscholar": 190000,
    "CSBS|Fully Paid|Management Quota Dayscholar": 190000,
    "ECE|Fully Paid|Management Quota Dayscholar": 195000,
    "Mech|Fully Paid|Management Quota Dayscholar": 190000,
    "IT|Fully Paid|Management Quota Hostel": 285000,
    "CSE|Fully Paid|Management Quota Hostel": 285000,
    "AIDS|Fully Paid|Management Quota Hostel": 280000,
    "CSBS|Fully Paid|Management Quota Hostel":280000,
    "ECE|Fully Paid|Management Quota Hostel": 285000,
    "Mech|Fully Paid|Management Quota Hostel": 280000,
  };

  useEffect(() => {
    if (
      form.category !== "Others" &&
      form.feesdetails !== "Partially Paid"
    ) {
      const key = `${form.department}|${form.feesdetails}|${form.category}`;
      if (feeMapping[key]) {
        setForm((prev) => ({ ...prev, feesamount: feeMapping[key].toString() }));
      } else {
        setForm((prev) => ({ ...prev, feesamount: "" }));
      }
    }
    // If "Others" or "Partially Paid", do not auto-fill
  }, [form.department, form.feesdetails, form.category]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-lg px-8 py-10 w-full max-w-lg"
      >
        <h1 className="text-2xl font-bold text-center mb-6 text-indigo-700">Student Registration:</h1>
        <div className="grid grid-cols-1 gap-5">
          <div>
            <label className="block text-sm font-medium mb-1">Roll Number*</label>
            <input
              className={`w-full border rounded px-3 py-2 focus:outline-indigo-400 ${errors.roll && "border-red-400"}`}
              name="roll"
              value={form.rollNo}
              onChange={(e) =>
             setForm({ ...form, rollNo: e.target.value })}
              placeholder="Enter Roll Number"
            />
            {errors.rollNo && <span className="text-xs text-red-500">{errors.rollNo}</span>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Name*</label>
            <input
              className={`w-full border rounded px-3 py-2 focus:outline-indigo-400 ${errors.name && "border-red-400"}`}
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter Name"
            />
            {errors.name && <span className="text-xs text-red-500">{errors.name}</span>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Gender*</label>
            <select
              className={`w-full border rounded px-3 py-2 focus:outline-indigo-400 ${errors.gender && "border-red-400"}`}
              name="gender"
              value={form.gender}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && <span className="text-xs text-red-500">{errors.gender}</span>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Mail ID*</label>
            <input
              className={`w-full border rounded px-3 py-2 focus:outline-indigo-400 ${errors.email && "border-red-400"}`}
              name="mail"
              type="email"
              value={form.email}
              onChange={(e) =>
    setForm({ ...form, email: e.target.value })}
              placeholder="Enter Mail ID"
            />
            {errors.email && <span className="text-xs text-red-500">{errors.email}</span>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Department*</label>
            <select
              className={`w-full border rounded px-3 py-2 focus:outline-indigo-400 ${errors.department && "border-red-400"}`}
              name="department"
              value={form.department}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="IT">IT</option>
              <option value="CSE">CSE</option>
              <option value="AIDS">AIDS</option>
              <option value="CSBS">CSBS</option>
              <option value="ECE">ECE</option>
              <option value="Mech">Mech</option>
            </select>
            {errors.department && <span className="text-xs text-red-500">{errors.department}</span>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Boarding Point*</label>
            <input
              className={`w-full border rounded px-3 py-2 focus:outline-indigo-400 ${errors.boardingpoint && "border-red-400"}`}
              name="boarding"
              value={form.boardingpoint}
              onChange={(e) =>
    setForm({ ...form, boardingpoint: e.target.value })}
              placeholder="Enter Boarding Point"
            />
            {errors.boardingpoint && <span className="text-xs text-red-500">{errors.boardingpoint}</span>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Category*</label>
            <select
              className={`w-full border rounded px-3 py-2 focus:outline-indigo-400 ${errors.category && "border-red-400"}`}
              name="category"
              value={form.category}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="Management Quota Dayscholar">Management Quota Dayscholar</option>
              <option value="Management Quota Hostel">Management Quota Hostel</option>
              <option value="Government Quota Dayscholar">Government Quota Dayscholar</option>
              <option value="Government Quota Hostel">Government Quota Hostel</option>
              <option value="Others">Others</option>
              </select>
            {errors.category && <span className="text-xs text-red-500">{errors.category}</span>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Fees Details*</label>
            <select
              className={`w-full border rounded px-3 py-2 focus:outline-indigo-400 ${errors.feesdetails && "border-red-400"}`}
              name="feesdetails"
              value={form.feesdetails}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="Partially Paid">Partially Paid</option>
              <option value="Fully Paid">Fully Paid</option>
            </select>
            {errors.feesdetails && <span className="text-xs text-red-500">{errors.feesdetails}</span>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Fees Amount*</label>
            <input
              className={`w-full border rounded px-3 py-2 focus:outline-indigo-400 ${errors.feesamount && "border-red-400"}`}
              name="feesamount"
              type="number"
              value={form.feesamount}
              onChange={handleChange}
              placeholder="Enter Fees Amount"
              readOnly={form.category !== "Others" && form.feesdetails !== "Partially Paid"}
            />
            {errors.feesamount && <span className="text-xs text-red-500">{errors.feesamount}</span>}
          </div>
        </div>
        {form.feesdetails === "Fully Paid" ? (
  <button
    type="button"
    className="mt-8 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg shadow transition"
    onClick={handleNext} // You need to implement handleNext for the next step
  >
    Next
  </button>
) : (
  <button
    type="submit"
    className="mt-8 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg shadow transition"
    onClick={handleSubmit}
  >
    Submit
  </button>
)}
      </form>
    </div>
  );
  
}