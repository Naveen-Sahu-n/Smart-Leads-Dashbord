import { useEffect, useState } from "react";
import API from "../api/axios";
import CreateLeadModal from "../components/CreateLeadModal";
import EditLeadModal from "../components/EditLeadModal";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [leads, setLeads] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [source, setSource] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [open, setOpen] = useState(false);
  const [editLead, setEditLead] = useState<any>(null);

  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const fetchLeads = async () => {
    const res = await API.get("/leads", {
      params: { page, search, status, source }
    });
    setLeads(res.data.data);
    setPages(res.data.pagination.pages);
  };

  useEffect(() => { fetchLeads(); }, [page, search, status, source]);
  useEffect(() => { setPage(1); }, [search, status, source]);

  const deleteLead = async (id: string) => {
    await API.delete(`/leads/${id}`);
    fetchLeads();
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  const exportCSV = async () => {
    const res = await API.get("/leads/export", { responseType: "blob" });
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "leads.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="p-6" style={{ background: "var(--bg)", minHeight: "100vh" }}>

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold" style={{ color: "var(--text)" }}>Leads Dashboard</h1>
        <div className="flex gap-2">
          <button className="btn btn-success" onClick={() => setOpen(true)}>+ Add Lead</button>
          <button className="btn btn-warning" onClick={exportCSV}>Export CSV</button>
          <button className="btn btn-danger" onClick={logout}>Logout</button>
        </div>
      </div>

      {/* FILTERS */}
      <div className="card flex gap-3 mb-4">
        <input className="input" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <select className="input" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">Status</option>
          <option>New</option>
          <option>Contacted</option>
          <option>Qualified</option>
          <option>Lost</option>
        </select>
        <select className="input" value={source} onChange={(e) => setSource(e.target.value)}>
          <option value="">Source</option>
          <option>Website</option>
          <option>Instagram</option>
          <option>Referral</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Source</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead._id}>
                <td>{lead.name}</td>
                <td>{lead.email}</td>
                <td>{lead.status}</td>
                <td>{lead.source}</td>
                <td className="flex gap-2">
                  <button className="btn btn-warning" onClick={() => setEditLead(lead)}>Edit</button>
                  {role === "Admin" && (
                    <button className="btn btn-danger" onClick={() => deleteLead(lead._id)}>Delete</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center mt-4 gap-2">
        <button disabled={page === 1} className="btn" onClick={() => setPage(page-1)}>Prev</button>
        {Array.from({ length: pages }, (_, i) => (
          <button
            key={i}
            className={`btn ${page === i+1 ? "btn-primary" : ""}`}
            onClick={() => setPage(i+1)}
          >{i+1}</button>
        ))}
        <button disabled={page === pages} className="btn" onClick={() => setPage(page+1)}>Next</button>
      </div>

      {/* MODALS */}
      {open && <CreateLeadModal onClose={() => setOpen(false)} onSuccess={fetchLeads} />}
      {editLead && <EditLeadModal lead={editLead} onClose={() => setEditLead(null)} onSuccess={fetchLeads} />}

    </div>
  );
}