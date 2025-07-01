import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

const supabase = createClient('https://ibupkheuaufgdgxngtwl.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlidXBraGV1YXVmZ2RneG5ndHdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzOTAwNzIsImV4cCI6MjA2Njk2NjA3Mn0.C65DWGzuI23sCwTt2xrnWHlqfnQg4Mzt7ON5KqXgXyM');

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const chunks: Uint8Array[] = [];
  req.on('data', (chunk) => chunks.push(chunk));
  req.on('end', async () => {
    const buffer = Buffer.concat(chunks);
    const fileName = `file-${Date.now()}.jpg`; // or .mp4 for video

    const { data, error } = await supabase.storage
      .from('uploads')
      .upload(fileName, buffer, { contentType: req.headers['content-type'] || 'image/jpeg' });

    if (error) return res.status(500).json({ error: error.message });

    const { publicUrl } = supabase.storage.from('uploads').getPublicUrl(fileName).data;
    res.status(200).json({ url: publicUrl });
  });
}
