import ProposalClient from "./ProposalClient";

export default async function Page({ params }) {
  const { taskId } = await params;

  return <ProposalClient taskId={taskId} />;
}