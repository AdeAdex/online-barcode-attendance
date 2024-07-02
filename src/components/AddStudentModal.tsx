// components/AddStudentModal.tsx

"use client";

import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { Student, Lecturer } from "@/types";
import jsBarcode from "jsbarcode";
import { v4 as uuidv4 } from "uuid";

type AddStudentModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  onSave: (newStudent: Student) => void;
  lecturers: Lecturer[];
};

const AddStudentModal: React.FC<AddStudentModalProps> = ({
  isOpen,
  onRequestClose,
  onSave,
  lecturers,
}) => {
  const [fullname, setFullname] = useState("");
  const [level, setLevel] = useState("");
  const [course, setCourse] = useState("");
  const [picture, setPicture] = useState("");
  const [barcode, setBarcode] = useState("");

  useEffect(() => {
    if (isOpen) {
      const barcodeValue = uuidv4().substring(0, 8);
      const barcodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${barcodeValue}`;
      setBarcode(barcodeUrl);
    }
  }, [isOpen]);

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevents default form submission behavior
    const newStudent: Student = {
      id: Date.now(),
      fullname,
      level,
      course,
      picture,
      barcode,
    };
    onSave(newStudent);
    onRequestClose(); // Close modal after saving
  };

  return (
    // <Modal isOpen={isOpen} onRequestClose={onRequestClose} ariaHideApp={false}>
    //   <div className="p-6">
    <Modal
      className="pt-[80px] bg-white min-h-screen"
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ariaHideApp={false}
    >
      <div className="p-6 w-full md:w-[50%] md:mx-auto rounded-lg border shadow">
        <h2 className="text-xl font-bold mb-4">Add Student</h2>
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
            type="text"
            placeholder="Level"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="border p-2 w-full mb-4"
            required
          />
          <input
            type="text"
            placeholder="Course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className="border p-2 w-full mb-4"
            required
          />
          <input
            type="text"
            placeholder="Picture URL"
            value={picture}
            onChange={(e) => setPicture(e.target.value)}
            className="border p-2 w-full mb-4"
            required
          />
          <div className="border p-2 w-full mb-4">
            <label>Barcode:</label>
            <img src={barcode} alt="Barcode" />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
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

export default AddStudentModal;
