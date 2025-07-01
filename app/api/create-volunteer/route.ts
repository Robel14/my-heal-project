import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient('https://ibupkheuaufgdgxngtwl.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlidXBraGV1YXVmZ2RneG5ndHdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzOTAwNzIsImV4cCI6MjA2Njk2NjA3Mn0.C65DWGzuI23sCwTt2xrnWHlqfnQg4Mzt7ON5KqXgXyM');

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, description, image_url } = body;

  const { data, error } = await supabase.from('volunteer').insert([
    { name, description, image_url },
  ]);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ message: 'Volunteer work added', data });
}
