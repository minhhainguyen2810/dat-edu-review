'use client';

export default function Page({ params }: { params: { programId: string } }) {
  return <div>My program id: {params.programId}</div>;
}
