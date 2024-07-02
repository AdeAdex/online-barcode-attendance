"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Student, Lecturer } from "@/types";
import { CSVLink } from "react-csv";
import Swal from "sweetalert2";
import Image from "next/image";

type Attendance = {
  studentId: number;
  date: string;
  status: "Present" | "Absent";
};

const LecturerDashboardPage: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [lecturer, setLecturer] = useState<Lecturer | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [enteredBarcode, setEnteredBarcode] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const isLecturer = localStorage.getItem("isLecturer");
    if (!isLecturer) {
      router.push("/lecturer/signin");
    } else {
      const storedLecturer = JSON.parse(
        localStorage.getItem("lecturer") || "null"
      );
      setLecturer(storedLecturer);
    }

    const storedStudents = JSON.parse(localStorage.getItem("students") || "[]");
    setStudents(storedStudents);

    const storedAttendance = JSON.parse(
      localStorage.getItem("attendance") || "[]"
    );
    setAttendance(storedAttendance);
  }, [router]);

  const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCourse(e.target.value);
  };

  useEffect(() => {
    if (selectedCourse) {
      const results = students.filter((student) =>
        student.course.toLowerCase().includes(selectedCourse.toLowerCase())
      );
      setFilteredStudents(results);
    }
  }, [selectedCourse, students]);

  const markAttendance = (student: any, status: "Present" | "Absent") => {
    const today = new Date().toLocaleDateString();
    const studentId = student.id;
    const existingRecord = attendance.find(
      (record) =>
        record.studentId === studentId &&
        new Date(record.date).toLocaleDateString() === today
    );

    if (existingRecord) {
      Swal.fire("Error", "Attendance for today already marked", "error");
      return;
    }

    // Inside the component
    const barcodeData = student.barcode.split("&data=")[1]; // Extracting the data part from the URL

    // Then in the markAttendance function, you can compare it with enteredBarcode
    if (barcodeData !== enteredBarcode) {
      Swal.fire("Error", "Invalid barcode", "error");
      return;
    }

    const newAttendance = {
      studentId,
      date: new Date().toISOString(),
      status,
    };

    const updatedAttendance = [...attendance, newAttendance];
    setAttendance(updatedAttendance);
    localStorage.setItem("attendance", JSON.stringify(updatedAttendance));
    Swal.fire({
      title: "Success!",
      text: `Marked as ${status}.`,
      imageUrl: student.barcode,
      imageWidth: 200,
      imageHeight: 200,
      imageAlt: "Custom image",
    });
    // Swal.fire("Success", `Marked as ${status}`, "success");
  };

  const getStudentAttendance = (studentId: number) => {
    return attendance
      .filter((record) => record.studentId === studentId)
      .map(
        (record) =>
          `${new Date(record.date).toLocaleString()}: ${record.status}`
      )
      .join("\n");
  };

  const csvData = filteredStudents.map((student) => ({
    fullname: student.fullname,
    level: student.level,
    course: student.course,
    attendance: getStudentAttendance(student.id),
  }));

  return (
    <div className="min-h-screen bg-gray-100 p-4 mt-[80px]">
      <div className="max-w-7xl mx-auto bg-white p-6 sm:p-8 rounded-lg shadow-md">
        {lecturer && (
          <h1 className="text-2xl font-bold mb-6 text-center text-blue-500">
            Welcome {lecturer.fullname}
          </h1>
        )}
        {lecturer && (
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-2 text-center">
              Select Course
            </h2>
            <select
              value={selectedCourse}
              onChange={handleCourseChange}
              className="border p-2 rounded w-full md:w-3/4 mx-auto block"
            >
              <option value="">Select Course</option>
              {lecturer.courses.map((course, index) => (
                <option key={index} value={course.course}>
                  {course.course}
                </option>
              ))}
            </select>
          </div>
        )}
        {selectedCourse && (
          <div>
            <h2 className="text-lg font-bold mb-4 text-center">
              Students Enrolled in {selectedCourse}
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200 text-sm sm:text-base">
                <thead>
                  <tr>
                    <th className="border border-gray-200 p-2">S/N</th>
                    <th className="border border-gray-200 p-2">Full Name</th>
                    <th className="border border-gray-200 p-2">Level</th>
                    <th className="border border-gray-200 p-2">Course</th>
                    <th className="border border-gray-200 p-2">Attendance</th>
                    <th className="border border-gray-200 p-2">BAR-CODE</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student, i) => (
                    <tr key={student.id}>
                      <td className="border border-gray-200 p-2">{i + 1}</td>
                      <td className="border border-gray-200 p-2">
                        {student.fullname}
                      </td>
                      <td className="border border-gray-200 p-2">
                        {student.level}
                      </td>
                      <td className="border border-gray-200 p-2">
                        {student.course}
                      </td>
                      <td className="border border-gray-200 p-2">
                        <input
                          type="text"
                          placeholder={`Enter ${student.fullname} Barcode`}
                          onChange={(e) => setEnteredBarcode(e.target.value)}
                          className="border p-2 rounded w-[200px] md:w-full mb-2"
                        />
                        <div className="flex flex-wrap gap-2 justify-center items-center">
                          <button
                            onClick={() => markAttendance(student, "Present")}
                            className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-700 transition duration-200"
                          >
                            Present
                          </button>
                          <button
                            onClick={() => markAttendance(student, "Absent")}
                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700 transition duration-200"
                          >
                            Absent
                          </button>
                        </div>
                        <div className="mt-2 text-sm text-gray-600 whitespace-pre-line">
                          {getStudentAttendance(student.id)
                            .split("\n")
                            .map((line, index) => (
                              <div key={index}>{line}</div>
                            ))}
                        </div>
                      </td>
                      <td className="border border-gray-200 p-2 flex justify-center item-center relative">
                        <Image
                          className="w-20 mt-[50%] md:mt-[unset]"
                          src={student.barcode}
                          alt="Barcode"
                          width={100} // Set the width and height explicitly
                          height={100}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6 text-center">
              <CSVLink
                data={csvData}
                headers={[
                  { label: "Full Name", key: "fullname" },
                  { label: "Level", key: "level" },
                  { label: "Course", key: "course" },
                  { label: "Attendance", key: "attendance" },
                ]}
                filename={`students_in_${selectedCourse}.csv`}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
              >
                Export to Excel
              </CSVLink>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LecturerDashboardPage;
