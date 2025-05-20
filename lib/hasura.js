// lib/hasura.js
export const HASURA_GRAPHQL_ENDPOINT = process.env.HASURA_GRAPHQL_ENDPOINT;
export const HASURA_ADMIN_SECRET = process.env.HASURA_ADMIN_SECRET;

export async function queryHasura({ query, variables = {} }) {
  const res = await fetch(HASURA_GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-hasura-admin-secret": HASURA_ADMIN_SECRET,
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();

  if (json.errors) throw new Error(JSON.stringify(json.errors));
  return json.data;
}
