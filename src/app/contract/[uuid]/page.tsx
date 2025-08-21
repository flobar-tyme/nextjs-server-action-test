export default function ContractPage({ params }: { params: { uuid: string } }) {
  return (
    <div>
      Contract Page
      <br /> {params.uuid}
    </div>
  );
}
