import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Avatar, TextField, Button, AppBar, Toolbar, IconButton } from "@mui/material";
import { useState, useEffect } from "react";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import SAUDialog from "../components/SAUDialog";

function AddMyTravel() {
  const [travellerFullnameShow, setTravellerFullnameShow] = useState("");
  const [travellerImageShow, setTrvellerImageShow] = useState("");
  const [travellerId, setTravellerId] = useState("");
  const [travelPlace, setTravelPlace] = useState("");
  const [travelStartDate, setTravelStartDate] = useState("");
  const [travelEndDate, setTravelEndDate] = useState("");
  const [travelCostTotal, setTravelCostTotal] = useState("");
  const [travelImage, setTravelImage] = useState(null); // State to store the image file

  useEffect(() => {
    const traveller = JSON.parse(localStorage.getItem("traveller"));
    if (traveller) {
      setTravellerFullnameShow(traveller.travellerFullname);
      setTrvellerImageShow(traveller.travellerImage);
      setTravellerId(traveller.travellerId);
    }
  }, []);

  //กรณีไม่มีการอัปโหลไฟล์
  // const handleAddClick = async (e) => {
  //   e.preventDefault();

  //   if (travelPlace === "" || travelStartDate === "" || travelEndDate === "" || travelCostTotal === "") {
  //     alert("ตรวจสอบการป้อน สถานที่ที่ไป วันที่ไป วันที่กลับ และค่าใช้จ่าย");
  //     return;
  //   }
  //   try {
  //     const response = await fetch("http://localhost:5050/travel", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         travelPlace: travelPlace,
  //         travelStartDate: travelStartDate,
  //         travelEndDate: travelEndDate,
  //         travelCostTotal: travelCostTotal,
  //         travellerId: travellerId,
  //       }),
  //     });
  //     if (response.ok) {
  //       const data = await response.json();
  //       if (data["status"] === "ok") {
  //         alert("บันทึกการเดินทางเรียบร้อย");
  //         window.location.href = "/mytravel";
  //       } else {
  //         alert("บันทึกการเดินทางไม่สำเร็จ");
  //       }
  //     } else {
  //       alert("พบปัญหาในการทำงาน ลองใหม่อีกครั้ง");
  //     }
  //   } catch (error) {
  //     alert("พบปัญหาในการทำงาน ลองใหม่อีกครั้ง");
  //   }
  // };

  const [open, setOpen] = useState(false);
  const [titleSAUDialog, setTitleSAUDialog] = useState("");
  const [messageSAUDialog, setMessageSAUDialog] = useState("");

  const openSAUDialog = (titleSAUDialog, messageSAUDialog) => {
    setTitleSAUDialog(titleSAUDialog);
    setMessageSAUDialog(messageSAUDialog);
    setOpen(true);
  };

  const closeSAUDialog = () => {
    setOpen(false);
  };

  const handleAddTravelClick = async (e) => {
    e.preventDefault();

    if (travelPlace === "" || travelStartDate === "" || travelEndDate === "" || travelCostTotal === "") {
      // alert("ตรวจสอบการป้อน สถานที่ที่ไป วันที่ไป วันที่กลับ และค่าใช้จ่าย");
      openSAUDialog("คำเตือน", "ตรวจสอบการป้อน สถานที่ที่ไป วันที่ไป วันที่กลับ และค่าใช้จ่าย");
      return;
    }

    const formData = new FormData();

    formData.append("travelPlace", travelPlace);
    formData.append("travelStartDate", travelStartDate);
    formData.append("travelEndDate", travelEndDate);
    formData.append("travelCostTotal", travelCostTotal);
    formData.append("travellerId", travellerId);

    if (travelImage) {
      formData.append("travelImage", travelImage);
    }

    try {
      const response = await fetch("http://localhost:4000/travel/", {
        method: "POST",
        body: formData,
      });

      if (response.status === 201) {
        const data = await response.json();
        if (data["message"] === "Travel created successfully") {
          // alert("บันทึกการเดินทางเรียบร้อย");
          openSAUDialog("ผลการทำงาน", "บันทึกการเดินทางเรียบร้อย");
          window.location.href = "/mytravel";
        } else {
          // alert("บันทึกการเดินทางไม่สำเร็จ");
          openSAUDialog("ผลการทำงาน", "บันทึกการเดินทางไม่สำเร็จ");
        }
      } else {
        // alert("พบปัญหาในการทำงาน ลองใหม่อีกครั้ง");
        openSAUDialog("คำเตือน", "พบปัญหาในการทำงาน ลองใหม่อีกครั้ง");
      }
    } catch (error) {
      // alert("พบปัญหาในการทำงาน " + error);
      openSAUDialog("คำเตือน", "พบปัญหาในการทำงาน " + error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTravelImage(file);
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
          // height: "100vh",
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
                src={
                  travellerImageShow != ""
                    ? `http://localhost:4000/images/traveller/${travellerImageShow}`
                    : "place.png"
                }
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

        <Box sx={{ width: "50%", boxShadow: 2, my: 10, mx: "auto", py: 8, px: 8 }}>
          <Typography variant="h4" color="primary" sx={{ textAlign: "center" }}>
            My Travel App
          </Typography>
          <Avatar
            variant="circle"
            alt="SAU"
            src="https://cdn.pixabay.com/photo/2019/08/11/15/48/road-trip-4399206_1280.png"
            sx={{ width: 120, height: 120, boxShadow: 3, mx: "auto", my: 3 }}
          />

          <Typography variant="h5" sx={{ textAlign: "center" }}>
            เพิ่มการเดินทาง
          </Typography>
          <Box sx={{ my: 2 }} />
          <Typography sx={{ textAlign: "left" }}>สถานที่เดินทางไป</Typography>
          <TextField
            variant="outlined"
            placeholder="จะไปไหนดี จะไปไหนดี"
            fullWidth
            value={travelPlace}
            onChange={(e) => setTravelPlace(e.target.value)}
          />
          <Box sx={{ my: 2 }} />
          <Typography sx={{ textAlign: "left" }}>วันที่ไป</Typography>

          <TextField
            variant="outlined"
            placeholder="1 มกราคม 2500"
            fullWidth
            value={travelStartDate}
            onChange={(e) => setTravelStartDate(e.target.value)}
          />

          <Box sx={{ my: 2 }} />
          <Typography sx={{ textAlign: "left" }}>วันที่กลับ</Typography>
          <TextField
            variant="outlined"
            placeholder="31 ธันวาคม 2500"
            fullWidth
            value={travelEndDate}
            onChange={(e) => setTravelEndDate(e.target.value)}
          />

          <Box sx={{ my: 2 }} />
          <Typography sx={{ textAlign: "left" }}>ค่าใช้จ่ายตลอดการเดินทาง</Typography>
          <TextField
            type="number"
            variant="outlined"
            placeholder="0.00"
            fullWidth
            value={travelCostTotal}
            onChange={(e) => setTravelCostTotal(e.target.value)}
          />
          <Box sx={{ my: 2 }} />

          <Typography sx={{ textAlign: "left" }}>รูปภาพ</Typography>
          <Avatar
            variant="square"
            alt="SAU"
            src={travelImage ? URL.createObjectURL(travelImage) : "place.png"}
            sx={{ width: 120, height: 120, boxShadow: 3, my: 3, borderRadius: 2, mx: "auto" }}
          />

          <Box sx={{ my: 2 }} />

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button component="label" variant="contained" color="success" startIcon={<CloudUploadIcon />}>
              Select Image
              <VisuallyHiddenInput type="file" onChange={handleImageChange} multiple accept="image/*" />
            </Button>
          </Box>

          <Box sx={{ my: 2 }} />

          <Button variant="contained" color="primary" fullWidth sx={{ py: 1.5 }} onClick={handleAddTravelClick}>
            บันทึกการเดินทาง
          </Button>
          <Box sx={{ my: 2 }} />
          <Typography sx={{ textAlign: "center" }}>
            <Link to="/mytravel">กลับไปหน้าการเดินทางของฉัน</Link>
          </Typography>
        </Box>
      </Box>
      {/* ++++++++++++++ */}
      <SAUDialog title={titleSAUDialog} message={messageSAUDialog} open={open} onClose={closeSAUDialog} />
    </>
  );
}

export default AddMyTravel;
