// pages/api/add-image.js
import { queryHasura } from "@/lib/hasura";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end("Method Not Allowed");

  const { title, image_url, description } = req.body;

  const query = `
    mutation ($title: String!, $image_url: String!, $description: String) {
      insert_gallery_one(object: {
        title: $title,
        image_url: $image_url,
        description: $description
      }) {
        id
        title
      }
    }
  `;

  try {
    const data = await queryHasura({ q
