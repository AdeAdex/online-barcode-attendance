import React, { useState } from "react";
import Modal from "react-modal";
import { Lecturer } from "@/types";

type AddLecturerModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  onSave: (newLecturer: Lecturer) => void;
};

const AddLecturerModal: React.FC<AddLecturerModalProps> = ({
  isOpen,
  onRequestClose,
  onSave,
}) => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [courses, setCourses] = useState<{ course: string; level: string }[]>([
    { course: "", level: "" },
  ]);

  const handleCourseChange = (index: number, key: string, value: string) => {
    const newCourses = [...courses];
    newCourses[index] = { ...newCourses[index], [key]: value };
    setCourses(newCourses);
  };

  const addCourseField = () => {
    setCourses([...courses, { course: "", level: "" }]);
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newLecturer: Lecturer = {
      id: Date.now(),
      fullname,
      email,
      password,
      courses,
    };
    onSave(newLecturer);
    onRequestClose(); // Close modal after saving
  };

  return (
    <Modal
      className="pt-[80px] bg-white min-h-screen"
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ariaHideApp={false}
    >
      <div className="p-6 w-full md:w-[50%] md:mx-auto rounded-lg border shadow">
        <h2 className="text-xl font-bold mb-4">Add Lecturer</h2>
        <form onSubmit={handleSave}>
          <input
            type="text"
            placeholder="Full Name"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            className="border p-2 w-full mb-4"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 w-full mb-4"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 w-full mb-4"
            required
          />
          {courses.map((course, index) => (
            <div key={index} className="mb-4">
              <input
                type="text"
                placeholder="Course"
                value={course.course}
                onChange={(e) =>
                  handleCourseChange(index, "course", e.target.value)
                }
                className="border p-2 w-full mb-2"
                required
              />
              <input
                type="text"
                placeholder="Level"
                value={course.level}
                onChange={(e) =>
                  handleCourseChange(index, "level", e.target.value)
                }
                className="border p-2 w-full"
                required
              />
            </div>
          ))}
          <button
            onClick={addCourseField}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200 mb-4"
          >
            Add Course
          </button>
          <div className="flex justify-end space-x-4">
            <button
              onClick={onRequestClose}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-200"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddLecturerModal;
