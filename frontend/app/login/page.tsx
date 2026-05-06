import { AuthForm } from "../components/AuthForm";

export default function LoginPage() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <AuthForm mode="login" />
    </section>
  );
}
