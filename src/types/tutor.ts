// src/types/tutor.ts

// export type Tutor = {
//   id: string;
//   name: string;
//   subject: string;
//   image: string;
//   rating: number;
//   price: number;
// };


export type Tutor = {
  id: string;
  userId: string;
  bio: string;
  image: string;
  hourlyRate: number;
  rating: number;
  isApproved: boolean;
  createdAt: string;
  categoryId: string;

  user: {
    id: string;
    name: string;
    email: string;
  };

  category: {
    id: string;
    name: string;
  };
};