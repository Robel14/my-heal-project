// pages/api/add-video.js
import { queryHasura } from "@/lib/hasura";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end("Method Not Allowed");

  const { title, url, description, thumbnail_url } = req.body;

  const query = `
    mutation AddVideo($title: String!, $url: String!, $description: String, $thumbnail_url: String) {
      insert_videos_one(object: {
        title: $title,
        url: $url,
        description: $description,
        thumbnail_url: $thumbnail_url
      }) {
        id
        title
      }
    }
  `;

  try {
    const data = await queryHasura({
      query,
      variables: { title, url, description, thumbnail_url },
    });
    res.status(200).json({ success: true, video: data.insert_videos_one });
  } catch (error) {
    console.error("Hasura Error:", error.message);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}
