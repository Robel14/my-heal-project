'use client';
import { useState } from 'react';

export default function AdminVolunteer() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');

  const uploadFile = async (file: File) => {
    const res = await fetch('https://your-main-site.com/api/upload', {
      method: 'POST',
      headers: {
        'Content-Type': file.type,
      },
      body: file,
    });
    const data = await res.json();
    return data.url;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let imageUrl = '';

    if (file) imageUrl = await uploadFile(file);

    const res = await fetch('https://www.ethiopia-vitality.org/api/create-volunteer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description, image_url: imageUrl }),
    });

    const result = await res.json();
    setMessage(result.message || result.error);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Add Volunteer Work</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Volunteer Name"
          className="border p-2 w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="Description"
          className="border p-2 w-full"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Volunteer Work
        </button>
      </form>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
}
