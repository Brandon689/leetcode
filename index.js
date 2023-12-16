// index.js

const graphqlClient = require('./graphqlClient');
const fs = require('fs');
// GraphQL API URL
const apiUrl = 'https://leetcode.com/graphql/';

const queries = [
    {
      title: 'questionContent',
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
      }
    },
    {
      title: 'questionTitle',
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
      }
    },
    {
        title: '',
        query: `
        query questionStats($titleSlug: String!) {
            question(titleSlug: $titleSlug) {
              stats
            }
          }
        `,
        variables: {
          titleSlug: 'two-sum',
        }
    },
    {
        title: 'problemsetQuestionList',
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
        variables: {"categorySlug": "", "skip": 0, "limit": 50, "filters": {}}
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


    let i = 0;
  graphqlClient(apiUrl, queries, options)
  .then((responses) => {
    for (const response of responses) {
      console.log('GraphQL response:', response);
      var fileName = queries[i++].title + ".json";
      fs.writeFileSync(fileName, JSON.stringify(response, null, 2));

    }
  })
  .catch((error) => {
    console.error('GraphQL error:', error);
  });