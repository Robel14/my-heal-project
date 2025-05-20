// pages/api/add-pdf.js
import { queryHasura } from "@/lib/hasura";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end("Method Not Allowed");

  const { title, file_url, description } = req.body;

  const query = `
    mutation ($title: String!, $file_url: String!, $description: String) {
      insert_pdfs_one(object: {
        title: $title,
        file_url: $file_url,
        description: $description
      }) {
        id
        title
      }
    }
  `;

  try {
    const data = await queryHasura({ query, variables: { title, file_url, description } });
    res.status(200).json({ success: true, pdf: data.insert_pdfs_one });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}
