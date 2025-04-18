import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '../styles/globals.css';
import AuthProvider from '@/provider/AuthProvider';
import { ThemeProvider } from '@/provider/theme-provider';
import Layout from '@/components/layout';
import { Toaster } from 'sonner';
import ClientProvider from '@/provider/client-provider';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/utils';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'CloudScribe',
  description: 'Notebook On Cloud',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ClientProvider session={session}>
            <AuthProvider>
              <Layout>
                {children}
                <Toaster />
              </Layout>
            </AuthProvider>
          </ClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
