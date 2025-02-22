import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Box, Typography, Avatar, Button } from "@mui/material";
import { Paper, Table, TableBody, TableCell } from "@mui/material";
import { TableContainer, TableHead, TableRow, AppBar, Toolbar, IconButton } from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import profile from "./../assets/profile.jpg";
import SAUConfirmDialog from "../components/SAUConfirmDialog";

function MyTravel() {
  const [travellerFullnameShow, setTravellerFullnameShow] = useState("");
  const [travellerImageShow, setTrvellerImageShow] = useState("");
  const [travel, setTravel] = useState([]);
  const [travelId, setTravelId] = useState("");

  useEffect(() => {
    const traveller = JSON.parse(localStorage.getItem("traveller"));
    if (traveller) {
      setTravellerFullnameShow(traveller.travellerFullname);
      setTrvellerImageShow(traveller.travellerImage);

      const fetchData = async () => {
        const response = await fetch(`http://localhost:4000/travel/` + traveller.travellerId, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setTravel(data["data"]);
        }
      };

      fetchData();
    }
  }, []);

  //-------------
  const [openConfirm, setOpenConfirm] = useState(false);
  const [titleSAUConfirmDialog, setTitleSAUConfirmDialog] = useState("");
  const [messageSAUConfirmDialog, setMessageSAUConfirmDialog] = useState("");

  const openSAUConfirmDialog = (titleSAUConfirmDialog, messageSAUConfirmDialog) => {
    setTitleSAUConfirmDialog(titleSAUConfirmDialog);
    setMessageSAUConfirmDialog(messageSAUConfirmDialog);
    setOpenConfirm(true);
  };

  const closeSAUConfirmDialog = () => {
    setOpenConfirm(false);
  };

  const confirmSAUConfirmDialog = async () => {
    try {
      const response = await fetch(`http://localhost:4000/travel/` + travelId, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        if (data["message"] === "Travel delete successfully") {
          alert("ลบการเดินทางเรียบร้อย");
          window.location.href = "/mytravel";
        } else {
          alert("ลบการเดินทางไม่สำเร็จ");
        }
      } else {
        alert("พบปัญหาในการทำงาน ลองใหม่อีกครั้ง");
      }
    } catch (error) {
      alert("พบปัญหาในการทำงาน " + error);
    }
    setOpenConfirm(false);
  };
  //-------------

  const handleDeleteTravel = async (travelId) => {
    setTravelId(travelId);
    openSAUConfirmDialog("ยืนยันการลบ", "คุณต้องการลบการเดินทางนี้ใช่หรือไม่?");

    // try {
    //   const response = await fetch(`http://localhost:4000/travel/` + travelId, {
    //     method: "DELETE",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });

    //   if (response.status === 200) {
    //     const data = await response.json();
    //     if (data["message"] === "Travel delete successfully") {
    //       alert("ลบการเดินทางเรียบร้อย");
    //       window.location.href = "/mytravel";
    //     } else {
    //       alert("ลบการเดินทางไม่สำเร็จ");
    //     }
    //   } else {
    //     alert("พบปัญหาในการทำงาน ลองใหม่อีกครั้ง");
    //   }
    // } catch (error) {
    //   alert("พบปัญหาในการทำงาน " + error);
    // }
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
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
                  travellerImageShow != "" ? `http://localhost:4000/images/traveller/${travellerImageShow}` : profile
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
        <Box
          sx={{
            width: "75%",
            boxShadow: 2,
            my: 10,
            mx: "auto",
            pt: 2,
            pb: 8,
            px: 4,
          }}
        >
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
            การเดินทางของฉัน
          </Typography>

          <Box sx={{ my: 2 }} />
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead sx={{ bgcolor: "#bbbbbb" }}>
                <TableRow>
                  <TableCell align="center">No.</TableCell>
                  <TableCell align="center">รูปสถานที่</TableCell>
                  <TableCell align="center">สถานที่เดินทางไป</TableCell>
                  <TableCell align="center">วันที่ไป</TableCell>
                  <TableCell align="center">วันที่กลับ</TableCell>
                  <TableCell align="center">ค่าใช้จ่ายตลอดการเดินทาง</TableCell>
                  <TableCell align="center">#</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {travel.map((row) => (
                  <TableRow key={row.travelId} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell align="center">{travel.indexOf(row) + 1}</TableCell>
                    <TableCell align="center">
                      <Avatar
                        variant="rounded"
                        alt={row.travelPlace}
                        src={
                          row.travelImage != "" ? `http://localhost:4000/images/travel/${row.travelImage}` : "place.png"
                        }
                        sx={{ width: 60, height: 60, boxShadow: 3 }}
                      />
                    </TableCell>
                    <TableCell align="left">{row.travelPlace}</TableCell>
                    <TableCell align="center">{row.travelStartDate}</TableCell>
                    <TableCell align="center">{row.travelEndDate}</TableCell>
                    <TableCell align="center">{row.travelCostTotal}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="success"
                        sx={{ mr: 1 }}
                        component={Link}
                        to={`/editmytravel/${row.travelId}`}
                      >
                        แก้ไข
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        sx={{ ml: 1 }}
                        onClick={() => handleDeleteTravel(row.travelId)}
                      >
                        ลบ
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button
            variant="contained"
            color="primary"
            sx={{ display: "flex", mx: "auto", my: 2, py: 1.5 }}
            component={Link}
            to="/addmytravel"
          >
            เพิ่มการเดินทาง
          </Button>
        </Box>
      </Box>

      {/* ----------------- */}
      <SAUConfirmDialog
        title={titleSAUConfirmDialog}
        message={messageSAUConfirmDialog}
        open={openConfirm}
        onClose={closeSAUConfirmDialog}
        onConfirm={confirmSAUConfirmDialog}
      />
    </>
  );
}

export default MyTravel;
