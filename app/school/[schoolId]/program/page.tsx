export default function Page({ params }: { params: { schoolId: string } }) {
  console.log(params);
  return <div>My Page</div>;
}
