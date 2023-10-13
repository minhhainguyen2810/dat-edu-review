import { queryBuilder } from 'lib/planetscale';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    console.log(body);
    

    await queryBuilder.insertInto('program').values(body).executeTakeFirst();
    return NextResponse.json({ result: 'Oke' });
  } catch (err) {
    console.log(err);

    return NextResponse.error();
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const schools = await queryBuilder
      .selectFrom('program')
      .select(['id', 'name', 'description'])
      .where('school_id', '=', Number(searchParams.get('schoolId')))
      .execute();

    return NextResponse.json({ data: schools });
  } catch (err) {
    console.log(err);

    return NextResponse.error();
  }
}
