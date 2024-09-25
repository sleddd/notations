'use client';
import { LoginForm } from '../components/LoginForm';
import { useAuth } from '../components/AuthProvider';
import Link from 'next/link';

export default function Home() {
  const { user  } = useAuth();
  //console.log( user );
  return (
    <main>
      <h1>Welcome to My App</h1>
      <LoginForm />
      <Link href="/test">Test</Link>
    </main>
  );
}
