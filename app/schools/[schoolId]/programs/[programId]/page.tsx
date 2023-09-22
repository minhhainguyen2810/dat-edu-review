'use client';

export default function Page({ params }: { params: { programId: string } }) {
  console.log(params);

  return <div>My program id: {params.programId}</div>;
}
