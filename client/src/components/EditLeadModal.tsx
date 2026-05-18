import { useState, useEffect } from "react";
import API from "../api/axios";

export default function EditLeadModal({
  lead,
  onClose,
  onSuccess
}: any) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    status: "",
    source: ""
  });

  useEffect(() => {
    if (lead) {
      setForm({
        name: lead.name,
        email: lead.email,
        status: lead.status,
        source: lead.source
      });
    }
  }, [lead]);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await API.put(`/leads/${lead._id}`, form);

    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

      <div className="bg-white p-6 rounded w-[400px]">

        <h2 className="text-xl font-bold mb-4">Edit Lead</h2>

        <form onSubmit={handleSubmit} className="space-y-3">

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-2"
          />

          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-2"
          />

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border p-2"
          >
            <option>New</option>
            <option>Contacted</option>
            <option>Qualified</option>
            <option>Lost</option>
          </select>

          <select
            name="source"
            value={form.source}
            onChange={handleChange}
            className="w-full border p-2"
          >
            <option>Website</option>
            <option>Instagram</option>
            <option>Referral</option>
          </select>

          <button className="bg-blue-600 text-white w-full p-2">
            Update
          </button>

        </form>

      </div>
    </div>
  );
}