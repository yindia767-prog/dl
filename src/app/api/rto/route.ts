import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const stateId = searchParams.get('stateId');

  if (!stateId) {
    return NextResponse.json({ error: 'stateId is required' }, { status: 400 });
  }

  try {
    // Need to find the state first to get its ID if stateId is a name, 
    // but looking at getstates.php, it expects the ID (departid).
    // Note: in the original SQL, state_id in RTO table is an Int.
    const rtos = await prisma.rto.findMany({
      where: {
        state_id: parseInt(stateId),
      },
      select: {
        RegNo: true,
        Place: true,
      },
      orderBy: {
        RegNo: 'asc',
      },
    });

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
