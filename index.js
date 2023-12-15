// index.js

const graphqlClient = require('./graphqlClient');

// GraphQL API URL
const apiUrl = 'https://leetcode.com/graphql/';

// GraphQL query string
const query = `
    query questionContent($titleSlug: String!) {
        question(titleSlug: $titleSlug) {
        content
        mysqlSchemas
        }
    }
`;

const queries = [
    {
      query: `
      query questionContent($titleSlug: String!) {
        question(titleSlug: $titleSlug) {
        content
        mysqlSchemas
        }
    }
      `,
      variables: {
        titleSlug: 'two-sum',
      },
    },
    {
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
        titleSlug: 'two-sum',
      },
    },
];
  

const cookie = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfYXV0aF91c2VyX2lkIjoiMTA2OTQ3NjQiLCJfYXV0aF91c2VyX2JhY2tlbmQiOiJhbGxhdXRoLmFjY291bnQuYXV0aF9iYWNrZW5kcy5BdXRoZW50aWNhdGlvbkJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJhZTZlNmVjZTBiZDU3NWQyZmM4ZDgzZGVmZGZkMmNlZjJmNzBiMDk1ZDY5OTg0NzVkMTc4NmZjZTVmMzUzZTQ5IiwiaWQiOjEwNjk0NzY0LCJlbWFpbCI6ImJyYW5kb24xMzlAcHJvdG9ubWFpbC5jb20iLCJ1c2VybmFtZSI6IkJyYW5kb242ODkiLCJ1c2VyX3NsdWciOiJCcmFuZG9uNjg5IiwiYXZhdGFyIjoiaHR0cHM6Ly9hc3NldHMubGVldGNvZGUuY29tL3VzZXJzL2F2YXRhcnMvYXZhdGFyXzE2OTQxNDk0MzkucG5nIiwicmVmcmVzaGVkX2F0IjoxNzAyNTIwODYxLCJpcCI6IjU4LjEwOS4xNDQuMTc3IiwiaWRlbnRpdHkiOiI2NDllZWUwYjk5NDVlM2I1ZTdjYTBhOWY3NWViZDdjOCIsInNlc3Npb25faWQiOjUxNjE1ODgyfQ.0DFOJs2FjYukkIeOKDza4U_s4psjrigZU0gF0sKt7mw';
const xcsr = 'puCD8SWsaZ4sEaCoj7OBMCAtSrBOtXdD6iRv0pytvSi8xcLinqWAGTeWfAaE5zZK';

// Required headers
const options = {
  cookie: cookie,
  csrfToken: xcsr,
};

// // Send GraphQL request
// graphqlClient(apiUrl, query, variables, options)
//   .then((data) => {
//     console.log('GraphQL response:', data);
//     // Handle the response data
//   })
//   .catch((error) => {
//     console.error('GraphQL error:', error);
//     // Handle the error
//   });


  graphqlClient(apiUrl, queries, options)
  .then((responses) => {
    for (const response of responses) {
      console.log('GraphQL response:', response);
    }
  })
  .catch((error) => {
    console.error('GraphQL error:', error);
  });