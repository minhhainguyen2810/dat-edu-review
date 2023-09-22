'use client';

export default function Page({ params }: { params: { slug: string } }) {
  return <div>My School id: {params.slug}</div>
}