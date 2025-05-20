// pages/api/add-volunteer.js
import { queryHasura } from "@/lib/hasura";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end("Method Not Allowed");

  const { title, description, location, deadline } = req.body;

  const query = `
    mutation ($title: String!, $description: String!, $location: String, $deadline: timestamptz) {
      insert_volunteer_jobs_one(object: {
        title: $title,
        description: $description,
        location: $location,
        deadline: $deadline
      }) {
        id
        title
      }
    }
  `;

  try {
    const data = await queryHasura({ query, variables: { title, description, location, deadline } });
    res.status(200).json({ success: true, job: data.insert_volunteer_jobs_one });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}
