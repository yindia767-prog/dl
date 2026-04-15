import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const stateId = searchParams.get('stateId');

  if (!stateId) {
    return NextResponse.json({ error: 'stateId is required' }, { status: 400 });
  }

  try {
    const { data: rtos, error } = await supabase
      .from('rto')
      .select('RegNo, Place')
      .eq('state_id', parseInt(stateId))
      .order('RegNo', { ascending: true });

    if (error) throw error;

    // Remap to match the expected format {id, name}
    const formattedRtos = rtos.map((rto) => ({
      id: rto.RegNo,
      name: rto.Place,
    }));

    return NextResponse.json(formattedRtos);
  } catch (error) {
    console.error('Error fetching RTOs:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
