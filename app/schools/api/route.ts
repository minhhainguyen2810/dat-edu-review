import { queryBuilder } from 'lib/planetscale';
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    await queryBuilder
      .insertInto('school')
      .values({ ...body })
      .executeTakeFirst();
    return NextResponse.json({ result: 'Oke' });
  } catch (err) {
    console.log(err);

    return NextResponse.error();
  }
}
