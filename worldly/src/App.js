import ButtonAppBar from "./components/navbar.js" 
import Map from "./components/map.js"
import React, { useState } from "react";
import ReactTooltip from "react-tooltip";
import clsx from 'clsx';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import axios from "axios";
import {useStyles} from './components/styles';
import './App.css';




function App() {
  const [content, setContent] = useState("");
  const [country, setCountry] = useState("");
  const [countryAbbreviation, setCountryAbbreviation] = useState("");

  // store
  const [title, setTitle] = useState([{title:"Hello"}]);
 
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  
  //get from API Demo
  const refreshList = () => {
    axios
      .get("/api/todos/")
      .then((res) => setTitle(res.data))
      .catch((err) => console.log(err));
  };

  async function getAbbreviation () {
    axios
      .get("/api/wikipedia/")
      .then((res) => setCountryAbbreviation(JSON.stringify(res.data.data)))
      .catch((err) => console.log(err));
  };

  async function postCountry(val){
    axios.post("/api/wikipedia/", {
      "Country": val
    })
    .then(function (response) {
      console.log(response);
    })}

  async function getWikiData(val){
    if (val==country){
    }
    else{
    
    await postCountry(val);
    
    await getAbbreviation();
    setCountry(val);
    }

  }

  return (
    <>
    <div className="App">
      <ButtonAppBar>
      </ButtonAppBar>

      <main >
        <div />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
              <Typography id="Country" variant="h3" component="h2" gutterBottom>
                {country}  
              </Typography>
              <Typography id="Country" variant="h7" component="h2" gutterBottom>
                {countryAbbreviation} 
              </Typography>
                
              </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                Hello
              </Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
              <div>
                <Map setTooltipContent={setContent} getWikiData={getWikiData} style={{position:'relative'}}/>
                <ReactTooltip>{content}</ReactTooltip>  
              </div>
              </Paper>
            </Grid>
            
          </Grid>
          <Box pt={4}>
            I have a chode
          </Box>
        </Container>
      </main>
      
    </div>
     </>
  );
}

export default App;
