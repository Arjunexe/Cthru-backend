// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const Token = localStorage.getItem(jwtToken);

//       // Check if there's a token before decoding
//       if (!Token) {
//         console.log("No token found");
//         navigate("/login");
//         return;
//       }

//       const decodedToken = jwt.decode(Token, SECRETKEY);

//       // Check if decoding was successful and userId is available
//       if (!decodedToken || !decodedToken.userId) {
//         console.log("Invalid or missing userId in the decoded token");
//         return;
//       }

//       const userId = decodedToken.userId;
//       console.log("User id is:", userId);

//       // Fetch user details asynchronously
//       const response = await axios.get(
//         `http://localhost:5000/user/getUser/${userId}`
//       );
//       const { userData } = response.data;
//       const fetchedUsername = userData.Username;

//       setUsername(fetchedUsername);
//     } catch (error) {
//       console.log("Error during data fetching:", error);
//     }
//   };

//   fetchData();
// }, [navigate]);











// //Modal

// import React, { useState } from 'react';
// import { Modal, Button } from 'react-bootstrap';

// function SettingsModal({ show, handleClose }) {
//   return (
//     <Modal show={show} onHide={handleClose}>
//       <Modal.Header closeButton>
//         <Modal.Title>Settings</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         {/* Add your settings options here */}
//         <p>Logout</p>
//         <p>Notification Settings</p>
//         {/* ... other settings */}
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={handleClose}>
//           Close
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// }

// // Usage in your component
// function UserProfile() {
//   const [showSettings, setShowSettings] = useState(false);

//   const handleSettingsClick = () => {
//     setShowSettings(true);
//   };

//   const handleCloseSettings = () => {
//     setShowSettings(false);
//   };

//   return (
//     <div>
//       {/* Your user profile content */}
//       <button onClick={handleSettingsClick}>Settings</button>

//       {/* Settings Modal */}
//       <SettingsModal show={showSettings} handleClose={handleCloseSettings} />
//     </div>
//   );
// }
