import { useState } from "react";
import { useLocation } from "wouter";
import { supabase } from "../lib/supabase-browser";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [, setLocation] = useLocation();

  async function go(e) {
    e.preventDefault();
    setError("");
    const db = supabase();
    const { data, error: signInError } = await db.auth.signInWithPassword({
      email,
      password,
    });
    if (signInError) return setError("الإيميل أو كلمة المرور غير صحيحة.");
    const { data: admin } = await db
      .from("admin_users")
      .select("user_id")
      .eq("user_id", data.user.id)
      .maybeSingle();
    if (!admin) {
      await db.auth.signOut();
      return setError("هذا الحساب ليس حساب إدارة.");
    }
    setLocation("/admin");
  }

  return (
    <main className="auth-page" dir="rtl">
      <section className="login-card">
        <div className="brand-mark large">S</div>
        <span className="eyebrow">Shoply Admin</span>
        <h1>دخول الإدارة</h1>
        <p>كلمة المرور لا توجد داخل الكود؛ يتم التحقق منها عبر Supabase Auth.</p>
        <form onSubmit={go}>
          <input
            type="email"
            placeholder="الإيميل"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="كلمة المرور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="primary full">دخول آمن</button>
        </form>
        {error && <p className="error">{error}</p>}
        <a className="back-link" href="/">
          ← العودة للمتجر
        </a>
      </section>
    </main>
  );
}
