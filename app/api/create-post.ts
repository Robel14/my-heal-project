// pages/api/create-post.ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://ibupkheuaufgdgxngtwl.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlidXBraGV1YXVmZ2RneG5ndHdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzOTAwNzIsImV4cCI6MjA2Njk2NjA3Mn0.C65DWGzuI23sCwTt2xrnWHlqfnQg4Mzt7ON5KqXgXyM'
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { title, content } = req.body;

  const { data, error } = await supabase.from('posts').insert([{ title, content }]);

  if (error) return res.status(500).json({ error: error.message });

  return res.status(200).json({ message: 'Post created!', post: data });
}
