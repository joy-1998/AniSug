"use client";
import * as React from "react";
import { useState } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import { TextField } from "@mui/material";

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
  bgcolor: "#CEC2EB",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function home() {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [criticName, setCriticName] = useState('');
  const [criticsReview, setCriticReview] = useState('');
  const [ratings, setRatings] = useState('');



  const handlSubmit = async (e) => {
    e.preventDefault();
    const objToAdd = {}
    objToAdd._id=title;
    objToAdd.title = title;
    objToAdd.description = description;
    objToAdd.critics_reviews = [{}];
    objToAdd.critics_reviews[0].critic_name = criticName;
    objToAdd.critics_reviews[0].critics_review = criticsReview;
    objToAdd.critics_reviews[0].ratings = ratings;

    const headers = {
      'Content-Type': 'application/json'
    }

    const response = await axios.post('http://localhost:8080/v1/api/addOrUpdateCriticReviews', objToAdd, {
      headers: headers
    });
    if(response.status === 200) {
      alert("Review added successfully !!!!")
    }else{
      alert("Review is not added, try again with the right information.....")
    }

  };


  return (
    <main className="flex min-h-screen flex-col items-center justify-between mt-4">
      <div className="flex flex-col items-center relative">
        <h3 className="text-lightGrey text-2xl font-raleway font-bold tracking-wide mb-12 md:text-base md:px-4 md:text-center">
          Start adding your valuable Review for the Anime you watched !!!!
        </h3>
        <div
          className="flex flex-col justify-between"
          style={{ width: "700px" }}
        >
          <form className="bg-white shadow-md rounded p-12" onSubmit={handlSubmit}>
            <div className="md:px-4 mb-8">
              <TextField
                fullWidth
                id="title"
                label="Anime Title"
                type="text"
                variant="outlined"
                required
                onChange={e => setTitle(e.target.value)}
              />
            </div>
            <div className="md:px-4 mb-8">
              <TextField
                fullWidth
                id="description"
                multiline
                label="Anime Description"
                type="text"
                variant="outlined"
                required
                helperText="use newline to type more..."
                onChange={e => setDescription(e.target.value)}
              />
            </div>
            <div className="md:px-4 mb-8">
              <TextField
                fullWidth
                id="criticName"
                label="Critic Name"
                type="text"
                variant="outlined"
                required
                onChange={e => setCriticName(e.target.value)}
              />
            </div>
            <div className="md:px-4 mb-8">
              <TextField
                fullWidth
                id="criticsReview"
                label="Critics Review"
                type="text"
                variant="outlined"
                required
                helperText="use newline to type more..."
                onChange={e => setCriticReview(e.target.value)}
              />
            </div>
            <div className="md:px-4 mb-8">
              <TextField
                fullWidth
                id="ratings"
                label="Ratings"
                type="text"
                variant="outlined"
                required
                onChange={e => setRatings(e.target.value)}
              />
              </div>
            <div className="md:px-4 mb-8">
              <Button 
                variant='contained'
                fullWidth
                style={{justifyItems: "center", backgroundColor: "#063970"}}
                type="submit"
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
