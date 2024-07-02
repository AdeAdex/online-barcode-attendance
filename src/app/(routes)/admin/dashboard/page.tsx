'use client'

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Student, Lecturer } from "@/types";
import Swal from "sweetalert2";
import AddStudentModal from "@/components/AddStudentModal";
import AddLecturerModal from "@/components/AddLecturerModal";
import EditModal from "@/components/EditModal";

const AdminDashboardPage: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [lecturers, setLecturers] = useState<Lecturer[]>([]);
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [isLecturerModalOpen, setIsLecturerModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Student[]>([]);
  const [searchLecturerQuery, setSearchLecturerQuery] = useState<string>("");
  const [lecturerSearchResults, setLecturerSearchResults] = useState<Lecturer[]>([]);
  const router = useRouter();

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) {
      router.push("/admin/signin");
    }

    const storedStudents = JSON.parse(localStorage.getItem("students") || "[]");
    setStudents(storedStudents);

    const storedLecturers = JSON.parse(localStorage.getItem("lecturers") || "[]");
    setLecturers(storedLecturers);
  }, [router]);

  const openEditModal = (student: Student) => {
    setCurrentStudent(student);
    setIsEditModalOpen(true);
  };

  const saveEditedStudent = (editedStudent: Student) => {
    const updatedStudents = students.map((student) =>
      student.id === editedStudent.id ? editedStudent : student
    );
    setStudents(updatedStudents);
    localStorage.setItem("students", JSON.stringify(updatedStudents));
    setIsEditModalOpen(false);
  };

  const addNewStudent = (newStudent: Student) => {
    const updatedStudents = [...students, newStudent];
    setStudents(updatedStudents);
    localStorage.setItem("students", JSON.stringify(updatedStudents));
    setIsStudentModalOpen(false);
  };

  const addNewLecturer = (newLecturer: Lecturer) => {
    const updatedLecturers = [...lecturers, newLecturer];
    setLecturers(updatedLecturers);
    localStorage.setItem("lecturers", JSON.stringify(updatedLecturers));
    setIsLecturerModalOpen(false);
  };

  const deleteStudent = (studentId: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedStudents = students.filter(
          (student) => student.id !== studentId
        );
        setStudents(updatedStudents);
        localStorage.setItem("students", JSON.stringify(updatedStudents));
        Swal.fire("Deleted!", "The student has been deleted.", "success");
      }
    });
  };

  const handleLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLevel(e.target.value);
    setSearchResults(students.filter(student => student.level === e.target.value));
  };

  const handleSearch = () => {
    const results = students.filter((student) =>
      student.fullname.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
  };

  const handleLecturerSearch = () => {
    const results = lecturers.filter((lecturer) =>
      lecturer.fullname.toLowerCase().includes(searchLecturerQuery.toLowerCase())
    );
    setLecturerSearchResults(results);
  };

  const filteredStudents = students.filter(
    (student) => student.level === selectedLevel
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4 mt-[80px]">
      <div className="max-w-7xl mx-auto bg-white p-4 sm:p-8 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row justify-between mb-4 sm:mb-6 bg-red-500 ">
          <h1 className="text-xl sm:text-2xl font-bold my-auto">Admin Dashboard</h1>
          <div className="flex flex-col md:flex-row justify-between mt-3 md:mt-0 w-full md:w-[55%] my-auto md:space-y-4 h-auto">
            <select
              value={selectedLevel}
              onChange={handleLevelChange}
              className="border p-2 rounded my-auto"
            >
              <option value="">Select Level</option>
              {Array.from(new Set(students.map((student) => student.level)))
                .sort((a, b) => a.localeCompare(b))
                .map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
            </select>
            <div className="flex w-full md:w-[unset] justify-between md:space-x-7 mt-3 md:mt-[unset] ">
            <button
              onClick={() => setIsStudentModalOpen(true)}
              className="bg-blue-500 text-white px-2 sm:px-4 py-1 rounded hover:bg-blue-700 transition duration-200 my-auto"
            >
              Add Student
            </button>
            <button
              onClick={() => setIsLecturerModalOpen(true)}
              className="bg-green-500 text-white px-2 sm:px-4 py-1 rounded hover:bg-green-700 transition duration-200 my-auto"
            >
              Add Lecturer
            </button>
              </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="mb-4 md:mx-auto">
            <h2 className="text-lg font-bold">Search Students</h2>
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
              <input
                type="text"
                placeholder="Search by name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border p-2 w-full sm:w-auto flex-grow sm:flex-grow-0 w-full md:w-[600px]"
              />
              <button
                onClick={handleSearch}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
              >
                Search
              </button>
            </div>
            <div className="mt-4">
              {searchResults.length > 0 ? (
                searchResults.map((student) => (
                  <div key={student.id} className="border p-2 mb-2">
                    <p>
                      <strong>{student.fullname}</strong> - {student.level} - {student.course}
                      <button
                        className="ml-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700 transition duration-200"
                        onClick={() => deleteStudent(student.id)}
                      >
                        Delete
                      </button>
                      <button
                        className="ml-2 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700 transition duration-200"
                        onClick={() => openEditModal(student)}
                      >
                        Edit
                      </button>
                    </p>
                  </div>
                ))
              ) : (
                <p>No results found.</p>
              )}
            </div>
          </div>
          <div className="mb-4 md:mx-auto mt-8">
            <h2 className="text-lg font-bold">Search Lecturers</h2>
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
              <input
                type="text"
                placeholder="Search by name"
                value={searchLecturerQuery}
                onChange={(e) => setSearchLecturerQuery(e.target.value)}
                className="border p-2 w-full sm:w-auto flex-grow sm:flex-grow-0 w-full md:w-[600px]"
              />
              <button
                onClick={handleLecturerSearch}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-200"
              >
                Search
              </button>
            </div>
            <div className="mt-4">
              {lecturerSearchResults.length > 0 ? (
                lecturerSearchResults.map((lecturer) => (
                  <div key={lecturer.id} className="border p-2 mb-2">
                    <p>
                      <strong>{lecturer.fullname}</strong>
                      <br />
                      {lecturer.courses.map((course, index) => (
                        <span key={index}>
                          {course.course} - {course.level}
                          <br />
                        </span>
                      ))}
                    </p>
                  </div>
                ))
              ) : (
                <p>No results found.</p>
              )}
            </div>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-lg font-bold">Students at {selectedLevel}</h2>
          <div className="mt-4">
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <div key={student.id} className="border p-2 mb-2">
                  <p>
                    <strong>{student.fullname}</strong> - {student.level} - {student.course}
                    <button
                      className="ml-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700 transition duration-200"
                      onClick={() => deleteStudent(student.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="ml-2 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700 transition duration-200"
                      onClick={() => openEditModal(student)}
                    >
                      Edit
                    </button>
                  </p>
                </div>
              ))
            ) : (
              <p>No students found at this level.</p>
            )}
          </div>
        </div>
      </div>
      <AddStudentModal
        isOpen={isStudentModalOpen}
        onRequestClose={() => setIsStudentModalOpen(false)}
        onSave={addNewStudent}
        lecturers={lecturers}
      />
      <AddLecturerModal
        isOpen={isLecturerModalOpen}
        onRequestClose={() => setIsLecturerModalOpen(false)}
        onSave={addNewLecturer}
      />
      {isEditModalOpen && currentStudent && (
        <EditModal
          isOpen={isEditModalOpen}
          student={currentStudent}
          onRequestClose={() => setIsEditModalOpen(false)}
          onSave={saveEditedStudent}
        />
      )}
    </div>
  );
};

export default AdminDashboardPage;
