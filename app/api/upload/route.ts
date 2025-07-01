import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export const config = {
  api: {
    bodyParser: false,
  },
};

const supabase = createClient('https://ibupkheuaufgdgxngtwl.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlidXBraGV1YXVmZ2RneG5ndHdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzOTAwNzIsImV4cCI6MjA2Njk2NjA3Mn0.C65DWGzuI23sCwTt2xrnWHlqfnQg4Mzt7ON5KqXgXyM');

export async function POST(req: NextRequest) {
  const contentType = req.headers.get('content-type') || 'image/jpeg';
  const arrayBuffer = await req.arrayBuffer();
  const file = Buffer.from(arrayBuffer);
  const fileName = `file-${Date.now()}`;

  const { data, error } = await supabase.storage
    .from('uploads')
    .upload(fileName, file, {
      contentType,
    });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { publicUrl } = supabase.storage.from('uploads').getPublicUrl(fileName).data;
  return NextResponse.json({ url: publicUrl });
}
