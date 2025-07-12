'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import NewDashboard from '@/app/components/molecules/NewDashboard';
import { useAuth } from '@/app/context/authContext';

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user]);

  if (!user) return null;

  return <NewDashboard />;
}
