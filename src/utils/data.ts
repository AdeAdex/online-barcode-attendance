type Student = {
    id: number;
    fullname: string;
    level: string;
    course: string;
    // lecturer: string;
    picture: string;
  };

 export const students: Student[] = [
  //  {
  //   id: 1,
  //   fullname: "John Doe",
  //   level: "300",
  //   course: "Mathematics",
  //   // lecturer: "Mr Felix",
  //   picture: "https://randomuser.me/api/portraits/men/1.jpg",
  // },
  // {
  //   id: 2,
  //   fullname: "Jane Smith",
  //   level: "300",
  //   course: "Mathematics",
  //   // lecturer: "Mr Felix",
  //   picture: "https://randomuser.me/api/portraits/women/2.jpg",
  // },
  // {
  //   id: 3,
  //   fullname: "Alice Johnson",
  //   level: "200",
  //   course: "English",
  //   // lecturer: "Professor Titan",
  //   picture: "https://randomuser.me/api/portraits/women/3.jpg",
  // },
  // {
  //   id: 4,
  //   fullname: "Bob Brown",
  //   level: "400",
  //   course: "Computer Science",
  //   // lecturer: "Mr Lecturer",
  //   picture: "https://randomuser.me/api/portraits/men/4.jpg",
  // },
  // {
  //   id: 5,
  //   fullname: "Charlie Davis",
  //   level: "500",
  //   course: "Yoruba",
  //   // lecturer: "Miss Eni",
  //   picture: "https://randomuser.me/api/portraits/men/5.jpg",
  // },
  // {
  //   id: 6,
  //   fullname: "Dana White",
  //   level: "200",
  //   course: "English",
  //   // lecturer: "Professor Titan",
  //   picture: "https://randomuser.me/api/portraits/women/6.jpg",
  // },
  // {
  //   id: 7,
  //   fullname: "Eve Black",
  //   level: "400",
  //   course: "Computer Science",
  //   // lecturer: "Mr Lecturer",
  //   picture: "https://randomuser.me/api/portraits/women/7.jpg",
  // },
  // {
  //   id: 8,
  //   fullname: "Frank Green",
  //   level: "400",
  //   course: "Computer Science",
  //   // lecturer: "Mr Lecturer",
  //   picture: "https://randomuser.me/api/portraits/men/8.jpg",
  // },
  // {
  //   id: 9,
  //   fullname: "Grace Hall",
  //   level: "200",
  //   course: "English",
  //   // lecturer: "Professor Titan",
  //   picture: "https://randomuser.me/api/portraits/women/9.jpg",
  // },
  // {
  //   id: 10,
  //   fullname: "Hank Scott",
  //   level: "100",
  //   course: "Agric",
  //   // lecturer: "Dr Faith",
  //   picture: "https://randomuser.me/api/portraits/men/10.jpg",
  // },
  ];




  type Lecturer = {
    id: number;
    fullname: string;
    courses: { course: string; level: string }[];
  };
  
  export const lecturers: Lecturer[] = [
    // {
    //   id: 1,
    //   fullname: "Mr Felix",
    //   courses: [
    //     { course: "Mathematics", level: "300" },
    //   ],
    // },
    // {
    //   id: 2,
    //   fullname: "Professor Titan",
    //   courses: [
    //     { course: "English", level: "200" },
    //   ],
    // },
    // {
    //   id: 3,
    //   fullname: "Mr Lecturer",
    //   courses: [
    //     { course: "Computer Science", level: "400" },
    //   ],
    // },
    // {
    //   id: 4,
    //   fullname: "Miss Eni",
    //   courses: [
    //     { course: "Yoruba", level: "500" },
    //   ],
    // },
    // {
    //   id: 5,
    //   fullname: "Dr Faith",
    //   courses: [
    //     { course: "Agric", level: "100" },
    //   ],
    // },
  ];
  