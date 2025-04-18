import { Button } from '@/components/ui/button';
import { PenTool, Rocket, ShieldCheck, StickyNote } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex items-center justify-center lg:px-32 px-4 pb-12">
      <div className="flex flex-col gap-4 w-full max-w-[1280px]">
        <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-black flex flex-col items-center justify-center px-6">
          {/* Hero Section */}
          <section className="text-center space-y-6 max-w-2xl">
            <div className="flex justify-center">
              <StickyNote className="w-20 h-20 text-purple-600 dark:text-purple-400 animate-bounce" />
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 dark:text-gray-100">
              Capture Your Thoughts
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              The simplest way to save your notes, ideas, and inspirations. Anytime, anywhere.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/protected/notes">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white">
                  Get Started
                </Button>
              </Link>
              <Link href="/protected/notes">
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </section>

          {/* Features Section */}
          <section className="mt-20 w-full md:max-w-6xl">
            <div className="grid md:grid-cols-3 gap-8 text-center w-full">
              <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition w-full">
                <PenTool className="w-12 h-12 mx-auto text-purple-500 dark:text-purple-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">Easy Note Taking</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Quickly capture notes with a beautiful, distraction-free editor.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition w-full">
                <ShieldCheck className="w-12 h-12 mx-auto text-green-500 dark:text-green-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">Secure Storage</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Your notes are private, encrypted, and securely stored.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition w-full">
                <Rocket className="w-12 h-12 mx-auto text-blue-500 dark:text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">Fast & Responsive</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Optimized for speed, whether you`re on desktop or mobile.
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
