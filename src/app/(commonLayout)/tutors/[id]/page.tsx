


import TutorClient from "@/components/tutor/TutorClient";

async function getTutor(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/tutors/${id}`,
    {
      cache: "no-store",
    }
  );

  return res.json();
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const data = await getTutor(id);

  return (
    <TutorClient
      tutor={data.data}
      id={id}
    />
  );
}