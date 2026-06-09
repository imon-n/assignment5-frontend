"use client";

import { useEffect, useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL;

type Session = {
  id: string;
  date: string;
  status: string;
  student: {
    name: string;
    email: string;
  };
};

export default function TutorSessionsPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
console.log(sessions)
  useEffect(() => {
    fetch(`${API}/api/sessions`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setSessions(data.data || []));
  }, []);

  return (
    <div className="p-6 mt-24">
      <h1 className="text-2xl font-bold mb-6">
        Teaching Sessions
      </h1>

      <div className="space-y-4">
        {sessions.map((s) => (
          <div
            key={s.id}
            className="bg-white p-4 rounded-xl shadow"
          >
            <p className="font-semibold">
              Student: {s.student?.name}
            </p>

            <p className="text-sm text-gray-500">
              {s.student?.email}
            </p>

            <p className="mt-2">
              Date: {s.date}
            </p>

            <span className="text-xs px-3 py-1 bg-green-100 text-green-700 rounded-full">
              {s.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}