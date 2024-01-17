import { queryBuilder } from 'lib/planetscale';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    await queryBuilder
      .insertInto('workplace_comment')
      .values({ ...body, is_approved: false })
      .executeTakeFirst();
    return NextResponse.json({ result: 'Oke' });
  } catch (err) {
    console.log(err);

    return NextResponse.error();
  }
}
