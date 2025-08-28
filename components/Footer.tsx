import { format } from "date-fns";

export default function Footer() {
  const name = process.env.NEXT_PUBLIC_STUDENT_NAME ?? "Student";
  const no = process.env.NEXT_PUBLIC_STUDENT_NO ?? "XXXXXXXX";
  const today = format(new Date(), "yyyy-MM-dd");

  return (
    <footer aria-label="Site footer" style={{padding:"2rem 0"}}>
      <div className="card" role="contentinfo">
        <small>
          © {new Date().getFullYear()} {name} • {no} • {today}
        </small>
      </div>
      <p className="container">
        <small className="muted">
          Accessibility: semantic HTML, visible focus, skip link,
          high-contrast palette. See <code>/public/accessibility-statement.txt</code>.
        </small>
      </p>
    </footer>
  );
}
