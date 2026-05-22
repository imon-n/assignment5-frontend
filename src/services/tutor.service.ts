// src/services/tutor.service.ts

const API_URL =
  process.env.NEXT_PUBLIC_API_URL;
console.log(API_URL)
export const getTutors = async () => {
  const res = await fetch(
    `${API_URL}/api/tutors`
  );


  return res.json();
};

export const getTutor = async (
  id: string
) => {
  const res = await fetch(
    `${API_URL}/tutors/${id}`
  );

  return res.json();
};