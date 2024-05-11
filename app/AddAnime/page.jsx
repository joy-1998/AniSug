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

export default function AddAnime() {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [mediaType, setMediaType] = useState('');
  const [tags, setTags] = useState('');
  const [startYr, setStartYr] = useState('');
  const [sznOfRelease, setSznOfRelease] = useState('');
  const [eps, setEps] = useState('');
  const [contentWarn, setContentWarn] = useState('');
  const [ongoing, setOngoing] = useState(false);
  const [finishYr, setFinishYr] = useState('');
  const [studios, setStudios] = useState('funimation');
  const [watched, setWatched] = useState(10000);
  const [watching, setWatching] = useState(10000);
  const [wantWatch, setWantWatch] = useState(10000);
  const [dropped, setDropped] = useState(0);
  const [rating, setRating] = useState(5);
  const [votes, setVotes] = useState(10000);


  const handlSubmit = async (e) => {
    e.preventDefault();
    const objToAdd = {}
    objToAdd._id=title;
    objToAdd.title = title;
    objToAdd.description = description;
    objToAdd.mediaType = mediaType;
    objToAdd.tags = tags.split(',');
    objToAdd.startYr = startYr;
    objToAdd.sznOfRelease = sznOfRelease;
    objToAdd.eps = eps;
    objToAdd.contentWarn = contentWarn.split(',');
    objToAdd.ongoing = ( ongoing === 'true' ?  true : false );
    objToAdd.finishYr = finishYr;
    objToAdd.studios = studios.split(',');
    objToAdd.watched = watched;
    objToAdd.watching = watching;
    objToAdd.wantWatch = wantWatch;
    objToAdd.dropped = dropped;
    objToAdd.rating = rating;
    objToAdd.votes = votes;

    const headers = {
      'Content-Type': 'application/json'
    }

    const response = await axios.put('http://40.81.248.44:8081/v1/api/insertRecords', objToAdd, {
      headers: headers
    });
    if(response.status === 200) {
      alert("Record added successfully !!!!")
    }else{
      alert("Record is not added, try again with the right information.....")
    }

  };



  return (
    <main className="flex min-h-screen flex-col items-center justify-between mt-4">
      <div className="flex flex-col items-center relative">
        <h3 className="text-lightGrey text-2xl font-raleway font-bold tracking-wide mb-12 md:text-base md:px-4 md:text-center">
          Start adding the Anime that you want to display...
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
                id="mediaType"
                label="Anime Media"
                type="text"
                variant="outlined"
                required
                onChange={e => setMediaType(e.target.value)}
              />
            </div>
            <div className="md:px-4 mb-8">
              <TextField
                fullWidth
                id="tags"
                label="Genre"
                type="text"
                variant="outlined"
                required
                helperText="use (,) to separate between types"
                onChange={e => setTags(e.target.value)}
              />
            </div>
            <div className="md:px-4 mb-8">
              <TextField
                fullWidth
                id="eps"
                label="Episode Count"
                type="text"
                variant="outlined"
                required
                onChange={e => setEps(e.target.value)}
              />
              </div>
            <div className="md:px-4 mb-8">
              <TextField
                fullWidth
                id="startYr"
                label="Start Year"
                type="text"
                variant="outlined"
                required
                onChange={e => setStartYr(e.target.value)}
              />
            </div>
            <div className="md:px-4 mb-8">
              <TextField
                fullWidth
                id="finishYr"
                label="Finish Year"
                type="text"
                variant="outlined"
                required
                onChange={e => setFinishYr(e.target.value)}
              />
            </div>
            <div className="md:px-4 mb-8">
              <TextField
                fullWidth
                id="sznOfRelease"
                label="Season Of Release"
                type="text"
                variant="outlined"
                required
                onChange={e => setSznOfRelease(e.target.value)}
              />
            </div>
            <div className="md:px-4 mb-8">
              <TextField
                fullWidth
                id="contentWarn"
                label="Content Warning"
                type="text"
                variant="outlined"
                required
                helperText="use (,) to separate between types"
                onChange={e => setContentWarn(e.target.value)}
              />
            </div>
            <div className="md:px-4 mb-8">
            <FormLabel id="demo-row-radio-buttons-group-label">OnGoing</FormLabel>
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                onChange={e => setOngoing(e.target.value)}
              >
                <FormControlLabel value={true} control={<Radio />} label="Yes" />
                <FormControlLabel value={false} control={<Radio />} label="No" />
              </RadioGroup>
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
