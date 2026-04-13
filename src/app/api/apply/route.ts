import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { DateTime } from 'luxon';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // 1. Validation (Already done on client, but always good to have basic check here)
    if (!data.state_id || !data.email || !data.name) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 2. Prepare for Prisma insertion
    // Note: Prisma expects Date objects or ISO strings for DateTime/Date fields.
    // vehicle_class is stored as a string in original DB (comma separated likely)
    
    const formattedData = {
      state_id: data.state_id,
      rto_id: data.rto_id,
      licence_type: data.licence_type,
      pin: data.current_pin, // Original map uses PIN from current address often
      name: data.name,
      relation: data.relation,
      full_name: data.full_name,
      gender: data.gender,
      birth_place: data.birth_place || '',
      qualification: data.qualification,
      phone: data.phone,
      mobile: data.mobile,
      identification_mark_1: data.identification_mark_1 || '',
      dob: data.dob ? new Date(data.dob) : null,
      birth_country: data.birth_country || 'INDIA',
      blood_group: data.blood_group || 'None',
      email: data.email,
      em_mobile: data.em_mobile || '',
      identification_mark_2: data.identification_mark_2 || '',
      current_state_id: data.current_state_id || '',
      current_district_id: data.current_district_id || '0',
      current_sub_district_id: data.current_sub_district_id || '0',
      current_address_type: data.current_address_type || 'town',
      current_village_town: data.current_village_town || '',
      current_house: data.current_house || '',
      current_street: data.current_street || '',
      current_landmark: data.current_landmark || '',
      current_pin: data.current_pin || '',
      present_address_duration_years: data.present_address_duration_years || '0',
      present_address_duration_months: data.present_address_duration_months || '0',
      permanent_state_id: data.permanent_state_id || '',
      permanent_district_id: data.permanent_district_id || '0',
      permanent_sub_district_id: data.permanent_sub_district_id || '0',
      permanent_address_type: data.permanent_address_type || 'town',
      permanent_village_town: data.permanent_village_town || '',
      permanent_house: data.permanent_house || '',
      permanent_street: data.permanent_street || '',
      permanent_landmark: data.permanent_landmark || '',
      permanent_pin: data.permanent_pin || '',
      vehicle_class: Array.isArray(data.vehicle_class) ? data.vehicle_class.join(', ') : data.vehicle_class,
      created_date: new Date(),
      status: 0,
      payment_id: '',
      payment_email: data.email || '',
      razorpay_signature: '',
    };

    // 3. Create record in DB
    const newRecord = await prisma.formData.create({
      data: formattedData as any,
    });

    return NextResponse.json({ 
      success: true, 
      id: newRecord.id,
      message: 'Application saved successfully'
    });

  } catch (error: any) {
    console.error('Error saving application:', error);
    return NextResponse.json({ 
      error: 'Internal Server Error', 
      details: error.message 
    }, { status: 500 });
  }
}
