import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Avatar, TextField, Button } from "@mui/material";
import { useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import profile from "./../assets/profile.jpg";

function Register() {
  const [travellerFullname, setTravellerFullname] = useState("");
  const [travellerEmail, setTravellerEmail] = useState("");
  const [travellerPassword, setTravellerPassword] = useState("");
  const [travellerImage, setTravellerImage] = useState(null); // State to store the image file

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTravellerImage(file);
    }
  };

  const handleRegisterClick = async (e) => {
    e.preventDefault();

    if (travellerFullname === "" || travellerEmail === "" || travellerPassword === "") {
      alert("ตรวจสอบการป้อน ชื่อ-สกุล อีเมล์ และรหัสผ่าน");
      return;
    }

    const formData = new FormData();

    formData.append("travellerFullname", travellerFullname);
    formData.append("travellerEmail", travellerEmail);
    formData.append("travellerPassword", travellerPassword);

    if (travellerImage) {
      formData.append("travellerImage", travellerImage);
    }

    try {
      const response = await fetch("http://localhost:4000/traveller", {
        method: "POST",
        body: formData,
      });

      if (response.status === 201) {
        const data = await response.json();
        if (data["message"] === "Traveller created successfully") {
          alert("ลงทะเบียนเรียบร้อย");
          window.location.href = "/";
        } else {
          alert("ลงทะเบียนไม่สำเร็จ");
        }
      } else {
        alert("พบปัญหาในการทำงาน ลองใหม่อีกครั้ง");
      }
    } catch (error) {
      alert("พบปัญหาในการทำงาน ลองใหม่อีกครั้ง" + error);
    }
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  return (
    <>
      <Box
        sx={{
          width: "100%",
          //height: "100vh",
          // display: "flex",
          // justifyContent: "center",
          // alignItems: "center",
        }}
      >
        <Box sx={{ width: "40%", boxShadow: 2, my: 10, mx: "auto", py: 8, px: 8 }}>
          <Typography variant="h4" color="primary" sx={{ textAlign: "center" }}>
            My Travel App
          </Typography>
          <Avatar
            variant="circle"
            alt="SAU"
            src="https://cdn.pixabay.com/photo/2019/08/11/15/48/road-trip-4399206_1280.png"
            sx={{ width: 180, height: 180, boxShadow: 3, mx: "auto", my: 3 }}
          />
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            ลงทะเบียน
          </Typography>
          <Box sx={{ my: 2 }} />
          <Typography sx={{ textAlign: "left" }}>ชื่อ-สกุล</Typography>
          <TextField
            variant="outlined"
            placeholder="Firstname  Lastname"
            fullWidth
            value={travellerFullname}
            onChange={(e) => setTravellerFullname(e.target.value)}
          />
          <Box sx={{ my: 2 }} />
          <Typography sx={{ textAlign: "left" }}>อีเมล์</Typography>
          <TextField
            variant="outlined"
            placeholder="traveller@mail.com"
            fullWidth
            value={travellerEmail}
            onChange={(e) => setTravellerEmail(e.target.value)}
          />
          <Box sx={{ my: 2 }} />
          <Typography sx={{ textAlign: "left" }}>รหัสผ่าน</Typography>
          <TextField
            type="password"
            variant="outlined"
            placeholder="********"
            fullWidth
            value={travellerPassword}
            onChange={(e) => setTravellerPassword(e.target.value)}
          />
          <Box sx={{ my: 2 }} />
          <Typography sx={{ textAlign: "left" }}>รูปภาพ</Typography>
          <Avatar
            variant="square"
            alt="SAU"
            src={travellerImage ? URL.createObjectURL(travellerImage) : profile}
            sx={{ width: 120, height: 120, boxShadow: 3, my: 3, borderRadius: 2, mx: "auto" }}
          />
          <Box sx={{ my: 2 }} />

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button component="label" variant="contained" color="success" startIcon={<CloudUploadIcon />}>
              Select file to upload
              <VisuallyHiddenInput type="file" onChange={handleImageChange} multiple accept="image/*" />
            </Button>
          </Box>

          <Box sx={{ my: 2 }} />

          <Button variant="contained" color="primary" fullWidth sx={{ py: 1.5 }} onClick={handleRegisterClick}>
            บันทึกการลงทะเบียน
          </Button>
          <Box sx={{ my: 2 }} />
          <Typography sx={{ textAlign: "center" }}>
            <Link to="/">กลับไปหน้าเข้าใช้งานแอปพลิเคชัน</Link>
          </Typography>
        </Box>
      </Box>
    </>
  );
}

export default Register;
//--------------------------------

// import React from "react";
// import { Link } from "react-router-dom";
// import { Box, Typography, Avatar, TextField, Button } from "@mui/material";
// import { useState } from "react";

// function Register() {
//   const [travellerFullname, setTravellerFullname] = useState("");
//   const [travellerEmail, setTravellerEmail] = useState("");
//   const [travellerPassword, setTravellerPassword] = useState("");

//   const handleRegisterClick = async (e) => {
//     e.preventDefault();

//     if (travellerFullname === "" || travellerEmail === "" || travellerPassword === "") {
//       alert("ตรวจสอบการป้อน ชื่อ-สกุล อีเมล์ และรหัสผ่าน");
//       return;
//     }
//     try {
//       const response = await fetch("http://localhost:5050/traveller", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           travellerFullname: travellerFullname,
//           travellerEmail: travellerEmail,
//           travellerPassword: travellerPassword,
//         }),
//       });
//       if (response.ok) {
//         const data = await response.json();
//         if (data["status"] === "ok") {
//           alert("ลงทะเบียนเรียบร้อย");
//           window.location.href = "/";
//         } else {
//           alert("ลงทะเบียนไม่สำเร็จ");
//         }
//       } else {
//         alert("พบปัญหาในการทำงาน ลองใหม่อีกครั้ง");
//       }
//     } catch (error) {
//       alert("พบปัญหาในการทำงาน ลองใหม่อีกครั้ง");
//     }
//   };

//   return (
//     <>
//       <Box
//         sx={{
//           width: "100%",
//           height: "100vh",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <Box sx={{ width: "50%", boxShadow: 2, my: 10, mx: "auto", py: 2, px: 4 }}>
//           <Typography variant="h4" color="primary" sx={{ textAlign: "center" }}>
//             My Travel App
//           </Typography>
//           <Avatar
//             variant="circle"
//             alt="SAU"
//             src="https://cdn.pixabay.com/photo/2019/08/11/15/48/road-trip-4399206_1280.png"
//             sx={{ width: 120, height: 120, boxShadow: 3, mx: "auto", my: 3 }}
//           />
//           <Typography variant="h5" sx={{ textAlign: "center" }}>
//             ลงทะเบียน
//           </Typography>
//           <Box sx={{ my: 2 }} />
//           <Typography sx={{ textAlign: "left" }}>ชื่อ-สกุล</Typography>
//           <TextField
//             variant="outlined"
//             placeholder="Firstname  Lastname"
//             fullWidth
//             value={travellerFullname}
//             onChange={(e) => setTravellerFullname(e.target.value)}
//           />
//           <Box sx={{ my: 2 }} />
//           <Typography sx={{ textAlign: "left" }}>อีเมล์</Typography>
//           <TextField
//             variant="outlined"
//             placeholder="traveller@mail.com"
//             fullWidth
//             value={travellerEmail}
//             onChange={(e) => setTravellerEmail(e.target.value)}
//           />
//           <Box sx={{ my: 2 }} />
//           <Typography sx={{ textAlign: "left" }}>รหัสผ่าน</Typography>
//           <TextField
//             type="password"
//             variant="outlined"
//             placeholder="********"
//             fullWidth
//             value={travellerPassword}
//             onChange={(e) => setTravellerPassword(e.target.value)}
//           />
//           <Box sx={{ my: 2 }} />
//           <Typography sx={{ textAlign: "left" }}>อัปโหลดรูปภาพ</Typography>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={}
//           />
//           <Box sx={{ my: 2 }} />

//           <Button variant="contained" color="primary" fullWidth sx={{ py: 1.5 }} onClick={handleRegisterClick}>
//             บันทึกการลงทะเบียน
//           </Button>
//           <Box sx={{ my: 2 }} />
//           <Typography sx={{ textAlign: "center" }}>
//             <Link to="/">กลับไปหน้าเข้าใช้งานแอปพลิเคชัน</Link>
//           </Typography>
//         </Box>
//       </Box>
//     </>
//   );
// }

// export default Register;
//-------------------------------------
