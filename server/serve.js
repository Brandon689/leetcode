// server.js
const express = require('express');
const axios = require('axios');
const fetch = require('isomorphic-fetch');

const app = express();
const port = 4000;


const apiUrl = "https://leetcode.com/graphql/";


// GraphQL client function
async function graphqlClient(url, query, variables, options = {}) {
  // Construct the HTTP headers
  const headers = {
    //'Content-Type': 'application/json',
    'Referer': " http://localhost:4000",
    'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:120.0) Gecko/20100101 Firefox/120.0",
    'Cookie': options.cookie,
    'x-csrftoken': options.csrfToken,
  };

    // Construct the HTTP request payload
    const body = JSON.stringify({
      query,
      variables,
    });

    // Send the request to the GraphQL API
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body,
    });
    const x = await response.text();
    console.log(x);
  // Parse and return the response data
  const { data, errors } = await response.json();

  if (errors) {
    throw new Error(`GraphQL Error: ${JSON.stringify(errors)}`);
  }

  return data;
}

//module.exports = graphqlClient;










const queries = [
    {
      title: "questionContent",
      query: `
        query questionContent($titleSlug: String!) {
          question(titleSlug: $titleSlug) {
          content
          mysqlSchemas
          }
      }
        `,
      variables: {
        titleSlug: "two-sum",
      },
    },
    {
      title: "questionTitle",
      query: `
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
        `,
      variables: {
        titleSlug: "two-sum",
      },
    },
    {
      title: "",
      query: `
          query questionStats($titleSlug: String!) {
              question(titleSlug: $titleSlug) {
                stats
              }
            }
          `,
      variables: {
        titleSlug: "two-sum",
      },
    },
    {
      title: "problemsetQuestionList",
      query: `
          query problemsetQuestionList($categorySlug: String, $limit: Int, $skip: Int, $filters: QuestionListFilterInput) {
              problemsetQuestionList: questionList(
                categorySlug: $categorySlug
                limit: $limit
                skip: $skip
                filters: $filters
              ) {
                total: totalNum
                questions: data {
                  acRate
                  difficulty
                  freqBar
                  frontendQuestionId: questionFrontendId
                  isFavor
                  paidOnly: isPaidOnly
                  status
                  title
                  titleSlug
                  topicTags {
                    name
                    id
                    slug
                  }
                  hasSolution
                  hasVideoSolution
                }
              }
            }
          `,
      variables: { categorySlug: "", skip: 0, limit: 50, filters: {} },
    },
  ];
  
  const cookie =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfYXV0aF91c2VyX2lkIjoiMTA2OTQ3NjQiLCJfYXV0aF91c2VyX2JhY2tlbmQiOiJhbGxhdXRoLmFjY291bnQuYXV0aF9iYWNrZW5kcy5BdXRoZW50aWNhdGlvbkJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJhZTZlNmVjZTBiZDU3NWQyZmM4ZDgzZGVmZGZkMmNlZjJmNzBiMDk1ZDY5OTg0NzVkMTc4NmZjZTVmMzUzZTQ5IiwiaWQiOjEwNjk0NzY0LCJlbWFpbCI6ImJyYW5kb24xMzlAcHJvdG9ubWFpbC5jb20iLCJ1c2VybmFtZSI6IkJyYW5kb242ODkiLCJ1c2VyX3NsdWciOiJCcmFuZG9uNjg5IiwiYXZhdGFyIjoiaHR0cHM6Ly9hc3NldHMubGVldGNvZGUuY29tL3VzZXJzL2F2YXRhcnMvYXZhdGFyXzE2OTQxNDk0MzkucG5nIiwicmVmcmVzaGVkX2F0IjoxNzAyNTIwODYxLCJpcCI6IjU4LjEwOS4xNDQuMTc3IiwiaWRlbnRpdHkiOiI2NDllZWUwYjk5NDVlM2I1ZTdjYTBhOWY3NWViZDdjOCIsInNlc3Npb25faWQiOjUxNjE1ODgyfQ.0DFOJs2FjYukkIeOKDza4U_s4psjrigZU0gF0sKt7mw";
  const xcsr = "puCD8SWsaZ4sEaCoj7OBMCAtSrBOtXdD6iRv0pytvSi8xcLinqWAGTeWfAaE5zZK";
  
  // Required headers
  const options = {
    cookie: cookie,
    csrfToken: xcsr,
  };







// Define your API endpoints
app.get('/api/lynette', async (req, res) => {
  try {
    //const externalApiResponse = await axios.get('https://animechan.xyz/api/random');
    //res.json(externalApiResponse.data);
//


const variables = {
    titleSlug: "two-sum",
  };

    graphqlClient(apiUrl, queries[1], variables, options)
    .then((data) => {
      console.log('GraphQL response:', data);
      res.json(data);
    })
    .catch((error) => {
      console.error('GraphQL error:', error);
      //res.status(500).json({ error: 'Internal Server Error' });
    });
        
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
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
