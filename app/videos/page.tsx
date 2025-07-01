'use client';
import { useState } from 'react';

export default function AdminVideos() {
  const [title, setTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch('https://www.ethiopia-vitality.org/api/create-video', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, video_url: videoUrl }),
    });

    const result = await res.json();
    setMessage(result.message || result.error);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Add Video</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Video Title"
          className="border p-2 w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="YouTube or Video URL"
          className="border p-2 w-full"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Video
        </button>
      </form>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
}
