"use client";
import * as React from "react";
import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import TheatersIcon from "@mui/icons-material/Theaters";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Modal from "@mui/material/Modal";
import ButtonGroup from "@mui/material/ButtonGroup";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  bgcolor: "#abdbe3",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function home() {
  const [animeGenre, setAnimeGenre] = useState("");
  const [response, setResponse] = useState(null);
  const [criticsResponse, setCriticResponse] = useState([]);
  const [btnText, setBtnText] = useState("search");
  const [openModals, setOpenModals] = React.useState([]);
  const [currentTitle, setCurrentTitle] = useState("");
  const [reviewBox, setRevBox] = useState("View Reviews");
  var sample;

  const handleOpen = (index, title) => {
    setCurrentTitle(title)
    const updatedModals = [...openModals];
    updatedModals[index] = true;
    setOpenModals(updatedModals);
  };

  const handleClose = (index) => {
    setCurrentTitle("")
    const updatedModals = [...openModals];
    updatedModals[index] = false;
    setOpenModals(updatedModals);
  };


  const handleReview = async () => {
    setRevBox("Click to Close")
    try {
      const headers = {
        "Content-Type": "application/json",
      };

      const revToSearch = {};
      revToSearch.title = currentTitle.toUpperCase();
      console.log(currentTitle);

      const res = await axios.post(
        "http://localhost:8080/v1/api/getCriticsReviews",
        revToSearch,
        {
          headers: headers,
        }
      );

      console.log(res.data);

      var reviewList = [];

      if (res.data !== undefined && res.data.length !== 0) {
        res.data[0].critics_reviews.map((value, key)=>{
          reviewList.push(value.critic_name + ": " + value.critics_review)
        })

        setCriticResponse(reviewList);
        var finalString;
        criticsResponse.forEach((value, id) => finalString = value)
        sample = finalString;

      } else { 
        setCriticResponse([]);
      }

    } catch (error) {
      console.log(error);
    }
  }

  const fetchAnimeSuggestions = async (e) => {
    e.preventDefault();

    try {
      setBtnText("searching...");

      const headers = {
        "Content-Type": "application/json",
      };

      const objToSearch = {};
      objToSearch.tags = animeGenre.split(",");

      const res = await axios.post(
        "http://localhost:8082/v1/api/searchByGenre",
        objToSearch,
        {
          headers: headers,
        }
      );

      if (res.data !== undefined && res.data.length !== 0) {
        setResponse(res.data);
        setOpenModals(Array(res.data.length).fill(false));
      } else {
        setResponse(false);
      }
    } catch (err) {
      console.log(err);
    }
    setBtnText("search");
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="flex flex-col items-center relative">
        <h2 className="font-raleway font-bold text-6xl text-primary pt-20 pb-6 md:text-3xl">
          Ani<span className="text-secondary">Sug</span>
        </h2>
        <h3 className="text-lightGrey text-2xl font-raleway font-bold uppercase tracking-wide mb-12 md:text-base md:px-4 md:text-center">
          Find the best anime for your favorite genre
        </h3>
        <div
          className="flex flex-col justify-between items-center w-full md:items-center"
          style={{ width: "700px" }}
        >
          <div>
            <form className="flex w-full justify-center md:flex-col md:w-5/6">
              <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
                <input
                  type="text"
                  value={animeGenre}
                  autoFocus={true}
                  style={{ width: "500px", marginLeft: "130px" }}
                  className="border-none outline-none  bg-primary px-8 py-4 rounded font-raleway md:w-full"
                  placeholder="You are free to type here !!!"
                  onChange={(e) => setAnimeGenre(e.target.value)}
                />
                <Button
                  variant="contained"
                  style={{
                    width: "150px",
                    marginLeft: "20px",
                    justifyItems: "center",
                    backgroundColor: "#063970",
                    fontSize: "11.5px",
                    height: "40px",
                  }}
                  onClick={fetchAnimeSuggestions}
                >
                  {btnText}
                </Button>
              </div>
            </form>
          </div>
          <div
            style={{ color: "GrayText", marginTop: "18px", fontSize: "10.5px" }}
          >
            use (,) separated to enter multiple genres.
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center md:px-8 pt-20">
        <Box sx={{ width: "90%", ml: 3, mr: 3 }}>
          <Grid container spacing={2}>
            {response ? (
              response.map((suggestion, index) => {
                return (
                  <Grid
                    item
                    sm={3}
                    md={3}
                    lg={3}
                    xs={3}
                    sx={{ mt: 2 }}
                    key={index}
                  >
                    <Card
                      style={{
                        width: "75%",
                        display: "flex",
                        flexDirection: "column",
                        backgroundColor: "#90EE90",
                      }}
                    >
                      <CardMedia
                        component="img"
                        alt="green iguana"
                        height="140"
                        image="https://wallpapercave.com/wp/wp1894672.jpg"
                      />
                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="div"
                          style={{
                            fontWeight: "bold",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {suggestion.title.toUpperCase()}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            WebkitLineClamp: 3,
                          }}
                        >
                          {suggestion.description}
                        </Typography>
                      </CardContent>
                      <CardContent
                        style={{
                          marginTop: "auto",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          {suggestion.mediaType != null ? (
                            suggestion.mediaType.toUpperCase() === "MOVIE" ? (
                              <Tooltip title="Movie">
                                <IconButton>
                                  <TheatersIcon />
                                </IconButton>
                              </Tooltip>
                            ) : (
                              <Tooltip title="TV & Others">
                                <IconButton>
                                  <LiveTvIcon />
                                </IconButton>
                              </Tooltip>
                            )
                          ) : (
                            <Tooltip title="TV & Others">
                              <IconButton>
                                <LiveTvIcon />
                              </IconButton>
                            </Tooltip>
                          )}
                        </Typography>
                        <Button
                          size="medium"
                          style={{ color: "black", backgroundColor: "#508D69" }}
                          onClick={() => handleOpen(index, suggestion.title) }
                        >
                          view
                        </Button>
                      </CardContent>
                      <Modal
                        open={openModals[index]}
                        onClose={() => handleClose(index)}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box sx={modalStyle}>
                          <Typography
                            id="modal-modal-title"
                            variant="h4"
                            component="h2"
                            style={{
                              fontWeight: "bolder",
                              fontFamily: "sans-serif",
                            }}
                          >
                            {suggestion.title.toUpperCase()}
                          </Typography>
                          <br />
                          <Typography
                            variant="h6"
                            componenet="h3"
                            style={{ fontWeight: "bold" }}
                          >
                            <span style={{ fontWeight: "bold" }}>
                              Summary:{" "}
                            </span>
                          </Typography>
                          <Typography
                            id="modal-modal-description"
                            sx={{ mt: 2 }}
                          >
                            {suggestion.description}
                          </Typography>
                          <Typography sx={{ mt: 2 }}>
                            <span style={{ fontWeight: "bold" }}> Genre: </span>
                            <Typography sx={{ mt: 1 }}>
                              {suggestion.tags.join(", ")}
                            </Typography>
                          </Typography>
                          <Typography sx={{ mt: 2 }}>
                            <span style={{ fontWeight: "bold" }}>
                              Release Year:{" "}
                            </span>{" "}
                            {suggestion.startYr} & {suggestion.sznOfRelease}
                          </Typography>
                          <Typography></Typography>
                          <Typography sx={{ mt: 2 }}>
                            <span style={{ fontWeight: "bold" }}>
                              Episodes:{" "}
                            </span>{" "}
                            {suggestion.eps}
                          </Typography>
                          <Typography sx={{ mt: 2 }}>
                            <span style={{ fontWeight: "bold" }}>
                              Content Warning:{" "}
                            </span>
                            {suggestion.contentWarn.length !== 0 ? (
                              <ButtonGroup
                                variant="text"
                                aria-label="contained button group"
                                sx={{ mt: 1 }}
                              >
                                {suggestion.contentWarn.map((value) => (
                                  <span key={value}>
                                    <Button color="error">{value}</Button>
                                  </span>
                                ))}{" "}
                              </ButtonGroup>
                            ) : (
                              <Button
                                variant="contained"
                                style={{
                                  backgroundColor: "#90EE90",
                                  color: "black",
                                }}
                              >
                                U/A
                              </Button>
                            )}
                          </Typography>
                          <Typography className="mt-4" >
                            <Accordion style={{backgroundColor: "#6b898e", color:"whitesmoke"}}
                              onChange={handleReview}
                            >
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id={suggestion.title}
                              >
                                {reviewBox}
                              </AccordionSummary>
                              <AccordionDetails style={{height:""}} >
                                {criticsResponse.length > 0 ? criticsResponse.map((value, id) => <><br/>{value}<br/><br/></>) : "Review Not availale"}
                              </AccordionDetails>
                            </Accordion>
                          </Typography>
                        </Box>
                      </Modal>
                    </Card>
                  </Grid>
                );
              })
            ) : response === false ? (
              <>
                <br />
                <br />
                <div className="w-full mt-4 p-8 border border-primary h-full text-lightGrey font-raleway">
                  No Results found
                </div>
              </>
            ) : (
              <div />
            )}
          </Grid>
        </Box>
      </div>
    </main>
  );
}
