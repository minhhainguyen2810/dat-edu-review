import { queryBuilder } from 'lib/planetscale';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    await queryBuilder
      .insertInto('program')
      .values({ ...body })
      .executeTakeFirst();
    return NextResponse.json({ result: 'Oke' });
  } catch (err) {
    console.log(err);

    return NextResponse.error();
  }
}
