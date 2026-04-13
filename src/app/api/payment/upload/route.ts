import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { id, screenshot } = await req.json();

    if (!id || !screenshot) {
      return NextResponse.json({ error: 'Missing Required Fields' }, { status: 400 });
    }

    const updatedRecord = await prisma.formData.update({
      where: { id: parseInt(id) },
      data: { payment_screenshot: screenshot }
    });

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
