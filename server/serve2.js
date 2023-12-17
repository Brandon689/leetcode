// server.js
const express = require('express');
const axios = require('axios');
const fetch = require('isomorphic-fetch');

const app = express();
const port = 4000;
const apiUrl = "https://leetcode.com/graphql/";


app.get('/api/lynette', async (req, res) => {
  
  try {
    const cookie =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfYXV0aF91c2VyX2lkIjoiMTA2OTQ3NjQiLCJfYXV0aF91c2VyX2JhY2tlbmQiOiJhbGxhdXRoLmFjY291bnQuYXV0aF9iYWNrZW5kcy5BdXRoZW50aWNhdGlvbkJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJhZTZlNmVjZTBiZDU3NWQyZmM4ZDgzZGVmZGZkMmNlZjJmNzBiMDk1ZDY5OTg0NzVkMTc4NmZjZTVmMzUzZTQ5IiwiaWQiOjEwNjk0NzY0LCJlbWFpbCI6ImJyYW5kb24xMzlAcHJvdG9ubWFpbC5jb20iLCJ1c2VybmFtZSI6IkJyYW5kb242ODkiLCJ1c2VyX3NsdWciOiJCcmFuZG9uNjg5IiwiYXZhdGFyIjoiaHR0cHM6Ly9hc3NldHMubGVldGNvZGUuY29tL3VzZXJzL2F2YXRhcnMvYXZhdGFyXzE2OTQxNDk0MzkucG5nIiwicmVmcmVzaGVkX2F0IjoxNzAyNTIwODYxLCJpcCI6IjU4LjEwOS4xNDQuMTc3IiwiaWRlbnRpdHkiOiI2NDllZWUwYjk5NDVlM2I1ZTdjYTBhOWY3NWViZDdjOCIsInNlc3Npb25faWQiOjUxNjE1ODgyfQ.0DFOJs2FjYukkIeOKDza4U_s4psjrigZU0gF0sKt7mw";
const xcsr = "puCD8SWsaZ4sEaCoj7OBMCAtSrBOtXdD6iRv0pytvSi8xcLinqWAGTeWfAaE5zZK";

const options = {
  cookie: cookie,
  csrfToken: xcsr,
};


const headers = {
    'Content-Type': 'application/json',
    'Cookie': options.cookie,
    'x-csrftoken': options.csrfToken,
  };



  const query = `
    query questionTitle($titleSlug: String!) {
        question(titleSlug: $titleSlug) {
          questionId
          questionFrontendId
          title
          titleSlug
          isPaidOnly
          difficulty
          likes
          dislikes
        }
      }
    `;

    // Variables (if any)
    const variables = {
        titleSlug: "two-sum"
    };

    const body = JSON.stringify({
        query,
        variables,
    });
  

    // Send the request to the GraphQL API
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers,
        body,
    });

    // Parse and store the response data
    const { data, errors } = await response.json();
    console.log(data);
    if (errors) {
        throw new Error(`GraphQL Error: ${JSON.stringify(errors)}`);
    }



    res.json(data);




  }
  catch {

  }
  
});



app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});




















// // Define your API endpoints
// app.get('/api/lynette', async (req, res) => {
//   try {
//     // Make a request to the external API
//     const externalApiResponse = await axios.get('https://animechan.xyz/api/random');

//     // Send the data to the client
//     res.json(externalApiResponse.data);
//   } catch (error) {
//     // Handle errors
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running at http://localhost:${port}`);
// });
