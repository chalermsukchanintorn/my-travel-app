import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Box, Typography, Avatar, Button } from "@mui/material";
import { Paper, Table, TableBody, TableCell } from "@mui/material";
import { TableContainer, TableHead, TableRow, AppBar, Toolbar, IconButton, TextField } from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import profile from "./../assets/profile.jpg";

function EditProfile() {
  const [travellerFullnameShow, setTravellerFullnameShow] = useState("");
  const [travellerImageShow, setTrvellerImageShow] = useState("");
  const [travellerId, setTravellerId] = useState("");
  const [travellerFullname, setTravellerFullname] = useState("");
  const [travellerEmail, setTravellerEmail] = useState("");
  const [travellerPassword, setTravellerPassword] = useState("");
  const [travellerImage, setTravellerImage] = useState("");
  const [oldTravellerImage, setOldTravellerImage] = useState("");
  const [newTravellerImage, setNewTravellerImage] = useState(null);

  useEffect(() => {
    const traveller = JSON.parse(localStorage.getItem("traveller"));
    if (traveller) {
      setTravellerFullnameShow(traveller.travellerFullname);
      setTrvellerImageShow(traveller.travellerImage);
      setTravellerId(traveller.travellerId);
      setTravellerFullname(traveller.travellerFullname);
      setTravellerImage(traveller.travellerImage);
      setTravellerEmail(traveller.travellerEmail);
      setTravellerPassword(traveller.travellerPassword);
      setOldTravellerImage(traveller.travellerImage);
    }
  }, []);

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewTravellerImage(file);
    }
  };

  const handleEditProfileClick = async (e) => {
    e.preventDefault();

    if (travellerFullname === "" || travellerEmail === "" || travellerPassword === "") {
      alert("ตรวจสอบการป้อน ชื่อ-สกุล อีเมล์ และรหัสผ่าน");
      return;
    }

    const formData = new FormData();

    formData.append("travellerFullname", travellerFullname);
    formData.append("travellerEmail", travellerEmail);
    formData.append("travellerPassword", travellerPassword);

    if (newTravellerImage) {
      formData.append("travellerImage", newTravellerImage);
    }

    try {
      const response = await fetch(`http://localhost:4000/traveller/${travellerId}`, {
        method: "PUT",
        body: formData,
      });

      if (response.status === 200) {
        const data = await response.json();
        if (data["message"] === "Traveller updated successfully") {
          alert("บันทึกการแก้ไขข้อมูลส่วนตัวเรียบร้อย");
          localStorage.setItem("traveller", JSON.stringify(data["data"]));
          window.location.href = "/editprofile";
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
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                <FlightTakeoffIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                My Travel App
              </Typography>
              <Avatar
                variant="rounded"
                src={travellerImageShow != "" ? `http://localhost:4000/images/traveller/${travellerImageShow}` : profile}
                sx={{ width: 45, height: 45, boxShadow: 3, mr: 3 }}
              />

              <Link to="/editprofile" style={{ textDecoration: "none", color: "white" }}>
                <Typography variant="h6" sx={{ textAlign: "center", mr: 3 }}>
                  {travellerFullnameShow}
                </Typography>
              </Link>
              <Link to="/" style={{ textDecoration: "none", color: "red" }}>
                <Typography variant="h6" sx={{ textAlign: "center" }}>
                  LOGOUT
                </Typography>
              </Link>
            </Toolbar>
          </AppBar>
        </Box>

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
            แก้ไขข้อมูลส่วนตัว
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
            // src={travellerImage != "" ? `http://localhost:4000/images/traveller/${travellerImage}` : profile}
            src={
              newTravellerImage
                ? URL.createObjectURL(newTravellerImage)
                : oldTravellerImage != ""
                ? `http://localhost:4000/images/traveller/${oldTravellerImage}`
                : profile
            }
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

          <Button variant="contained" color="primary" fullWidth sx={{ py: 1.5 }} onClick={handleEditProfileClick}>
            บันทึกการแก้ไข
          </Button>
          <Box sx={{ my: 2 }} />
          <Typography sx={{ textAlign: "center" }}>
            <Link to="/mytravel">กลับไปหน้าการเดินทางของฉัน</Link>
          </Typography>
        </Box>
      </Box>
    </>
  );
}

export default EditProfile;
