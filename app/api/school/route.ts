import { queryBuilder } from 'lib/planetscale';
import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    console.log(request.url);

    const body = await request.json();

    await queryBuilder
      .insertInto('school')
      .values({ ...body })
      .executeTakeFirst();

    revalidateTag('schools');

    return NextResponse.json({ result: 'Oke' });
  } catch (err) {
    console.log(err);

    return NextResponse.error();
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    console.log(searchParams);
    console.log(request);

    const schools = await queryBuilder
      .selectFrom('school')
      .select(['id', 'name', 'description'])
      .where('name', 'like', `%${searchParams.get('q') || ''}%`)
      .execute();

    return NextResponse.json({ data: schools });
  } catch (err) {
    console.log(err);

    return NextResponse.error();
  }
}
