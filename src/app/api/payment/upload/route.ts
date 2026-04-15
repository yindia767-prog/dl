import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { id, screenshot } = await req.json();

    if (!id || !screenshot) {
      return NextResponse.json({ error: 'Missing Required Fields' }, { status: 400 });
    }

    const { data: updatedRecord, error } = await supabase
      .from('form_data')
      .update({ payment_screenshot: screenshot })
      .eq('id', parseInt(id))
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ 
      success: true, 
      message: 'Screenshot uploaded successfully',
      id: updatedRecord.id 
    });
  } catch (error: any) {
    console.error('Upload Error:', error);
    return NextResponse.json({ 
      error: 'Failed to upload screenshot', 
      details: error.message 
    }, { status: 500 });
  }
}
