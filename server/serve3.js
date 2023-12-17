const express = require('express');
const axios = require('axios');
const fetch = require('isomorphic-fetch');

const app = express();
const port = 4000;
const apiUrl = 'https://leetcode.com/graphql/';
const cookie =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfYXV0aF91c2VyX2lkIjoiMTA2OTQ3NjQiLCJfYXV0aF91c2VyX2JhY2tlbmQiOiJhbGxhdXRoLmFjY291bnQuYXV0aF9iYWNrZW5kcy5BdXRoZW50aWNhdGlvbkJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJhZTZlNmVjZTBiZDU3NWQyZmM4ZDgzZGVmZGZkMmNlZjJmNzBiMDk1ZDY5OTg0NzVkMTc4NmZjZTVmMzUzZTQ5IiwiaWQiOjEwNjk0NzY0LCJlbWFpbCI6ImJyYW5kb24xMzlAcHJvdG9ubWFpbC5jb20iLCJ1c2VybmFtZSI6IkJyYW5kb242ODkiLCJ1c2VyX3NsdWciOiJCcmFuZG9uNjg5IiwiYXZhdGFyIjoiaHR0cHM6Ly9hc3NldHMubGVldGNvZGUuY29tL3VzZXJzL2F2YXRhcnMvYXZhdGFyXzE2OTQxNDk0MzkucG5nIiwicmVmcmVzaGVkX2F0IjoxNzAyNTIwODYxLCJpcCI6IjU4LjEwOS4xNDQuMTc3IiwiaWRlbnRpdHkiOiI2NDllZWUwYjk5NDVlM2I1ZTdjYTBhOWY3NWViZDdjOCIsInNlc3Npb25faWQiOjUxNjE1ODgyfQ.0DFOJs2FjYukkIeOKDza4U_s4psjrigZU0gF0sKt7mw';
const xcsr = 'puCD8SWsaZ4sEaCoj7OBMCAtSrBOtXdD6iRv0pytvSi8xcLinqWAGTeWfAaE5zZK';
const options = {
  cookie: cookie,
  csrfToken: xcsr,
};
const headers = {
  'Content-Type': 'application/json',
  Cookie: options.cookie,
  'x-csrftoken': options.csrfToken,
};

app.get('/api/questionContent', async (req, res) => {
  try {
    const query = `
    query questionContent($titleSlug: String!) {
      question(titleSlug: $titleSlug) {
      content
      mysqlSchemas
      }
  }`;
    const variables = {
      titleSlug: 'two-sum',
    };
    const body = JSON.stringify({
      query,
      variables,
    });
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers,
      body,
    });

    const { data, errors } = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/questionTitle', async (req, res) => {
  try {
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
    }`;
    const variables = {
      titleSlug: 'two-sum',
    };
    const body = JSON.stringify({
      query,
      variables,
    });
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers,
      body,
    });

    const { data, errors } = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/questionStats', async (req, res) => {
  try {
    const query = `
    query questionStats($titleSlug: String!) {
      question(titleSlug: $titleSlug) {
        stats
      }
    }`;
    const variables = {
      titleSlug: 'two-sum',
    };
    const body = JSON.stringify({
      query,
      variables,
    });
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers,
      body,
    });

    const { data, errors } = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/problemsetQuestionList', async (req, res) => {
  try {
    const query = `
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
    }`;
    const variables = { categorySlug: "", skip: 0, limit: 50, filters: {} };
    const body = JSON.stringify({
      query,
      variables,
    });
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers,
      body,
    });

    const { data, errors } = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
