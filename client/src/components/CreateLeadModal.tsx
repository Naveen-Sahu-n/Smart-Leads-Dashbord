import { useState } from "react";
import API from "../api/axios";

export default function CreateLeadModal({
  onClose,
  onSuccess
}: {
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    status: "New",
    source: "Website"
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      await API.post("/leads", form);

      onSuccess(); // refresh table
      onClose();   // close modal
    } catch (err) {
      alert("Failed to create lead");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

      <div className="bg-white p-6 rounded-lg w-[400px]">

        <h2 className="text-xl font-bold mb-4">Create Lead</h2>

        <form onSubmit={handleSubmit} className="space-y-3">

          <input
            name="name"
            placeholder="Name"
            className="w-full border p-2 rounded"
            onChange={handleChange}
            required
          />

          <input
            name="email"
            placeholder="Email"
            className="w-full border p-2 rounded"
            onChange={handleChange}
            required
          />

          <select
            name="status"
            className="w-full border p-2 rounded"
            onChange={handleChange}
          >
            <option>New</option>
            <option>Contacted</option>
            <option>Qualified</option>
            <option>Lost</option>
          </select>

          <select
            name="source"
            className="w-full border p-2 rounded"
            onChange={handleChange}
          >
            <option>Website</option>
            <option>Instagram</option>
            <option>Referral</option>
          </select>

          <div className="flex gap-2">

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded w-full"
            >
              {loading ? "Creating..." : "Create"}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded w-full"
            >
              Cancel
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}