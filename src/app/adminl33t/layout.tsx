import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard - factiii.io',
  description: 'Pitch deck analytics and user management',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
