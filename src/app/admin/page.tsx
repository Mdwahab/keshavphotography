import { redirect } from "next/navigation";

export default function AdminRoot() {
  // Middleware handles the authentication check.
  // If the user reaches this page, they are authenticated.
  // We simply redirect them to the dashboard.
  redirect("/admin/dashboard");
}
