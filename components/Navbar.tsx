import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gray-900 border-b border-gray-700">
      <h1 className="text-xl font-bold text-white">Dashboard</h1>

      <div className="flex space-x-6">
        <Link href="/" className="text-gray-300 hover:text-white">Home</Link>
        <Link href="/tasks" className="text-gray-300 hover:text-white">Tasks</Link>
        <Link href="/habits" className="text-gray-300 hover:text-white">Habits</Link>
        <Link href="/notes" className="text-gray-300 hover:text-white">Notes</Link>
      </div>
    </nav>
  );
}