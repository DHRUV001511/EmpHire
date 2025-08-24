import { JobDetail } from "@/components/jobs/job-detail"

interface JobDetailPageProps {
  params: {
    id: string
  }
}

export default function JobDetailPage({ params }: JobDetailPageProps) {
  return <JobDetail jobId={params.id} />
}
