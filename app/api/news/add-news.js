// pages/api/add-news.js
import { queryHasura } from "@/lib/hasura";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end("Method Not Allowed");

  const { title, content, cover_image_url } = req.body;

  const query = `
    mutation ($title: String!, $content: String!, $cover_image_url: String) {
      insert_news_one(object: {
        title: $title,
        content: $content,
        cover_image_url: $cover_image_url
      }) {
        id
        title
      }
    }
  `;

  try {
    const data = await queryHasura({ query, variables: { title, content, cover_image_url } });
    res.status(200).json({ success: true, news: data.insert_news_one });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}
