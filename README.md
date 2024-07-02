# Online Barcode Attendance

## Overview

The Online Barcode Attendance application simplifies student management and attendance tracking using QR codes. It provides separate portals for administrators and lecturers, each with specific functionalities tailored to their roles. Administrators can manage student data, while lecturers can track attendance by scanning student QR codes.

## Features

- **Admin Dashboard:**

  - Add, edit, and remove lecturers.
  - Manage courses and academic details.
  - View attendance reports.

- **Lecturer Dashboard:**

  - Access student lists and details.
  - Track attendance using QR code scanning.
  - Generate attendance reports for classes.

- **Student Management:**

  - Add new students with personal and academic details.
  - Assign students to courses.

- **QR Code Integration:**
  - Automatically generate unique QR codes for each student.
  - QR codes link directly to student profiles for quick attendance tracking.

## Technology Stack

- **Frontend:** React with Next.js for server-side rendering, styled with Tailwind CSS for responsive design.
- **State Management:** Local storage for client-side data persistence.
- **QR Code Generation:** Utilizes `uuidv4` for unique identifiers and `https://api.qrserver.com` for QR code generation.
- **Modals and UI Components:** React Modal for interactive modals and custom UI components for enhanced user experience.

## Installation and Usage

1. **Clone Repository:** `git clone https://github.com/AdeAdex/online-barcode-attendance.git`
2. **Install Dependencies:** `npm install`
3. **Run Development Server:** `npm run dev`
4. **Access Application:** Open `localhost:3000` in your web browser.

## Contributing

Contributions are welcome! Fork the repository, make your changes, and submit a pull request with a clear description of your additions.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Thanks to Open Source libraries and contributors for making development faster and more efficient.
