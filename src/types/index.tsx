// src/types.ts

export type Student = {
  id: number;
  picture: string;
  fullname: string;
  level: string;
  course: string;
  barcode: string;
};

export type Lecturer = {
  id: number;
  fullname: string;
  email: string;
  password: string;
  courses: { course: string; level: string }[];
};

export type Attendance = {
  studentId: number;
  date: string;
  status: "Present" | "Absent";
};
