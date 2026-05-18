import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Sales");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await API.post("/auth/register", { name, email, password, role });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);

      navigate("/dashboard");
    } catch (err: any) {
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center" style={{ background: "var(--bg)" }}>
      <div className="card w-[400px]">
        <h1 className="text-2xl font-bold mb-4 text-center" style={{ color: "var(--text)" }}>
          Smart Leads Registration
        </h1>

        <form onSubmit={handleRegister} className="space-y-3">

          <input
            placeholder="Name"
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <select className="input" value={role} onChange={(e) => setRole(e.target.value)}>
            <option>Sales</option>
            <option>Admin</option>
          </select>

          <button type="submit" className="btn btn-success w-full" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>

        </form>

        <p className="text-center muted mt-3">
          Already have an account?{" "}
          <span className="text-primary cursor-pointer" onClick={() => navigate("/")}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}