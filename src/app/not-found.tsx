'use client'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function NotFound() {
  const [message, setMessage] = useState('Oops! Page not found.');
  const [index, setIndex] = useState(0);
  const messages = [
    "Wait for it...",
    "Something amazing is coming!",
    "This tech is still under development...",
    "You seem lost, let’s get you back!"
  ];
  const pathname = usePathname();

  // Cycle through messages every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % messages.length);
      setMessage(messages[index]);
    }, 3000);

    return () => clearInterval(interval);
  }, [index]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white text-center p-6">
      <motion.h1 
        className="text-8xl font-extrabold mb-8 text-red-500"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        404
      </motion.h1>
      <AnimatePresence mode="wait">
        <motion.p
          key={message}
          className="text-2xl mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {message}
        </motion.p>
      </AnimatePresence>
      <p className="text-gray-400 mb-8">
        Could not find the requested resource: <span className="font-bold">{pathname}</span>
      </p>
      <div className="mt-4">
        <Link href="/" passHref>
          <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md transition">
            Return Home
          </button>
        </Link>
      </div>
    </div>
  );
}
