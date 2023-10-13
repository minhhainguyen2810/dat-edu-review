import { queryBuilder } from 'lib/planetscale';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    await queryBuilder
      .updateTable('program_comment')
      .set({ is_approved: 1 })
      .where('id', '=', body.id)
      .executeTakeFirst();
    return NextResponse.json({ result: 'Oke' });
  } catch (err) {
    console.log(err);

    return NextResponse.error();
  }
}
