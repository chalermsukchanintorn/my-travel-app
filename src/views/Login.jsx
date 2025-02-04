import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Avatar, TextField, Button } from "@mui/material";
import { useState } from "react";

function Login() {
  const [travellerEmail, setTravellerEmail] = useState("");
  const [travellerPassword, setTravellerPassword] = useState("");

  const handleLoginClick = async () => {
    if (travellerEmail === "" || travellerPassword === "") {
      alert("ตรวจสอบการป้อน อีเมล์ และรหัสผ่าน");
      return;
    }
    try {
      const response = await fetch("http://localhost:4000/traveller/" + travellerEmail + "/" + travellerPassword, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const data = await response.json();

        localStorage.setItem("traveller", JSON.stringify(data["data"]));
        window.location.href = "/mytravel";
      } else {
        alert("อีเมล์ และรหัสผ่านไม่ถูกต้อง");
      }
    } catch (error) {
      alert("พบปัญหาในการทำงาน ลองใหม่อีกครั้ง2");
    }
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          // height: "100vh",
          // display: "flex",
          // justifyContent: "center",
          // alignItems: "center",
        }}
      >
        <Box sx={{ width: "60%", boxShadow: 2, my: 10, mx: "auto", py: 8, px: 8 }}>
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
            เข้าใช้งานแอปพลิเคชัน
          </Typography>
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
          <Button variant="contained" color="primary" fullWidth sx={{ py: 1.5 }} onClick={handleLoginClick}>
            LOGIN
          </Button>
          <Box sx={{ my: 2 }} />
          <Typography sx={{ textAlign: "center" }}>
            ยังไม่มีบัญชีผู้ใช้งาน <Link to="/register">ลงทะเบียน</Link>
          </Typography>
        </Box>
      </Box>
    </>
  );
}

export default Login;
//------------------------------------
// import React from "react";
// import { Link } from "react-router-dom";
// import { Box, Typography, Avatar, TextField, Button } from "@mui/material";
// import { useState } from "react";

// function Login() {
//   const [travellerEmail, setTravellerEmail] = useState("");
//   const [travellerPassword, setTravellerPassword] = useState("");

//   const handleLoginClick = async () => {
//     if (travellerEmail === "" || travellerPassword === "") {
//       alert("ตรวจสอบการป้อน อีเมล์ และรหัสผ่าน");
//       return;
//     }
//     try {
//       const response = await fetch("http://localhost:4000/traveller/" + travellerEmail + "/" + travellerPassword, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       if (response.ok) {
//         const data = await response.json();
//         console.log(data[0]);
//         if (data.length > 0) {
//           localStorage.setItem("traveller", JSON.stringify(data[0]));
//           window.location.href = "/mytravel";
//         } else {
//           alert("อีเมล์ และรหัสผ่านไม่ถูกต้อง");
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
//             เข้าใช้งานแอปพลิเคชัน
//           </Typography>
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
//           <Button variant="contained" color="primary" fullWidth sx={{ py: 1.5 }} onClick={handleLoginClick}>
//             LOGIN
//           </Button>
//           <Box sx={{ my: 2 }} />
//           <Typography sx={{ textAlign: "center" }}>
//             ยังไม่มีบัญชีผู้ใช้งาน <Link to="/register">ลงทะเบียน</Link>
//           </Typography>
//         </Box>
//       </Box>
//     </>
//   );
// }

// export default Login;
