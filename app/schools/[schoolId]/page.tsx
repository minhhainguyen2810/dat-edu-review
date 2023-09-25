'use client';

export default function Page({ params }: { params: { schoolId: string } }) {
  return <div>My School id: {params.schoolId}</div>;
}
