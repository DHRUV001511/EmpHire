import { JobApplicationForm } from "@/components/applications/job-application-form"

interface ApplyPageProps {
  params: {
    id: string
  }
}

export default function ApplyPage({ params }: ApplyPageProps) {
  return <JobApplicationForm jobId={params.id} />
}
