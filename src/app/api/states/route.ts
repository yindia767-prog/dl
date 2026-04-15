import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { data: states, error } = await supabase
      .from('states')
      .select('*')
      .order('name', { ascending: true });

    if (error) throw error;

    return NextResponse.json(states);
  } catch (error) {
    console.error('SERVER ERROR IN /api/states:', error);
    return NextResponse.json({ error: 'Internal Server Error', details: (error as any).message }, { status: 500 });
  }
}
