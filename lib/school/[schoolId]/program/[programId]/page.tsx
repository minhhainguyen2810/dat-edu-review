'use client';

export default function Page({ params }: { params: { slug: string } }) {
  return <div>My program id: {params.slug}</div>
}