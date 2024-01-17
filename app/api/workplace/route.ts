import { queryBuilder } from 'lib/planetscale';
import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    console.log(request.url);

    const body = await request.json();

    await queryBuilder
      .insertInto('workplace')
      .values({ ...body })
      .executeTakeFirst();

    revalidateTag('workplaces');

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

    const workplaces = await queryBuilder
      .selectFrom('workplace')
      .select(['id', 'name', 'description', 'location'])
      .where('name', 'like', `%${searchParams.get('q') || ''}%`)
      .execute();

    return NextResponse.json({ data: workplaces });
  } catch (err) {
    console.log(err);

    return NextResponse.error();
  }
}
