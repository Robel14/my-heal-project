import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

const supabase = createClient('https://ibupkheuaufgdgxngtwl.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlidXBraGV1YXVmZ2RneG5ndHdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzOTAwNzIsImV4cCI6MjA2Njk2NjA3Mn0.C65DWGzuI23sCwTt2xrnWHlqfnQg4Mzt7ON5KqXgXyM');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { title, body, image_url } = req.body;

  const { data, error } = await supabase.from('news').insert([{ title, body, image_url }]);

  if (error) return res.status(500).json({ error: error.message });

  res.status(200).json({ message: 'News added', data });
}
