// graphqlClient.js

const fetch = require('isomorphic-fetch');

// GraphQL client function
async function graphqlClient(url, queries, variables, options = {}) {
  // Construct the HTTP headers
  const headers = {
    'Content-Type': 'application/json',
    'Cookie': options.cookie,
    'x-csrftoken': options.csrfToken,
  };
  const responses = [];




  for (const queryData of queries) {
    const { query, variables } = queryData;

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

    // Parse and store the response data
    const { data, errors } = await response.json();

    if (errors) {
      throw new Error(`GraphQL Error: ${JSON.stringify(errors)}`);
    }

    responses.push(data);
  }

  return responses;
}

module.exports = graphqlClient;
