"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, DollarSign, FileText, Clock } from "lucide-react"

interface Contract {
  id: string
  freelancer: {
    name: string
    avatar: string
    title: string
  }
  job: {
    title: string
    id: string
  }
  terms: {
    hourlyRate: number
    totalBudget: number
    startDate: string
    endDate: string
    paymentSchedule: string
  }
  status: "draft" | "sent" | "signed" | "active" | "completed"
  createdDate: string
}

export function ContractManagement() {
  const [isCreatingContract, setIsCreatingContract] = useState(false)
  const [selectedFreelancer] = useState({
    name: "Sarah Chen",
    avatar: "/professional-woman-developer.png",
    title: "Full Stack Developer",
    proposedRate: 85,
  })

  const [contractTerms, setContractTerms] = useState({
    hourlyRate: selectedFreelancer.proposedRate,
    estimatedHours: 320,
    startDate: "",
    endDate: "",
    paymentSchedule: "weekly",
    projectDescription: "",
    deliverables: "",
    additionalTerms: "",
  })

  const mockContracts: Contract[] = [
    {
      id: "1",
      freelancer: {
        name: "Sarah Chen",
        avatar: "/professional-woman-developer.png",
        title: "Full Stack Developer",
      },
      job: {
        title: "Senior React Developer",
        id: "1",
      },
      terms: {
        hourlyRate: 85,
        totalBudget: 27200,
        startDate: "2024-02-01",
        endDate: "2024-05-01",
        paymentSchedule: "Weekly",
      },
      status: "active",
      createdDate: "2024-01-25",
    },
  ]

  const handleCreateContract = () => {
    // In real app, this would create a contract in the database
    console.log("Creating contract with terms:", contractTerms)
    setIsCreatingContract(false)
  }

  const getStatusColor = (status: Contract["status"]) => {
    switch (status) {
      case "draft":
        return "bg-gray-100 text-gray-800"
      case "sent":
        return "bg-blue-100 text-blue-800"
      case "signed":
        return "bg-yellow-100 text-yellow-800"
      case "active":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (isCreatingContract) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Create Contract</h1>
          <p className="text-muted-foreground">Set up the terms for your project</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Freelancer Info */}
            <Card>
              <CardHeader>
                <CardTitle>Freelancer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={selectedFreelancer.avatar || "/placeholder.svg"} />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold">{selectedFreelancer.name}</h3>
                    <p className="text-muted-foreground">{selectedFreelancer.title}</p>
                    <p className="text-sm text-green-600 font-medium">
                      Proposed Rate: ${selectedFreelancer.proposedRate}/hr
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contract Terms */}
            <Card>
              <CardHeader>
                <CardTitle>Contract Terms</CardTitle>
                <CardDescription>Define the project scope and payment terms</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="hourlyRate">Hourly Rate (USD)</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="hourlyRate"
                        type="number"
                        value={contractTerms.hourlyRate}
                        onChange={(e) => setContractTerms({ ...contractTerms, hourlyRate: Number(e.target.value) })}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="estimatedHours">Estimated Hours</Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="estimatedHours"
                        type="number"
                        value={contractTerms.estimatedHours}
                        onChange={(e) => setContractTerms({ ...contractTerms, estimatedHours: Number(e.target.value) })}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={contractTerms.startDate}
                      onChange={(e) => setContractTerms({ ...contractTerms, startDate: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={contractTerms.endDate}
                      onChange={(e) => setContractTerms({ ...contractTerms, endDate: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="paymentSchedule">Payment Schedule</Label>
                  <select
                    id="paymentSchedule"
                    className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                    value={contractTerms.paymentSchedule}
                    onChange={(e) => setContractTerms({ ...contractTerms, paymentSchedule: e.target.value })}
                  >
                    <option value="weekly">Weekly</option>
                    <option value="bi-weekly">Bi-weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="milestone">Milestone-based</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="projectDescription">Project Description</Label>
                  <Textarea
                    id="projectDescription"
                    placeholder="Describe the project scope, requirements, and expectations..."
                    rows={4}
                    value={contractTerms.projectDescription}
                    onChange={(e) => setContractTerms({ ...contractTerms, projectDescription: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="deliverables">Deliverables</Label>
                  <Textarea
                    id="deliverables"
                    placeholder="List the specific deliverables and milestones..."
                    rows={3}
                    value={contractTerms.deliverables}
                    onChange={(e) => setContractTerms({ ...contractTerms, deliverables: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="additionalTerms">Additional Terms</Label>
                  <Textarea
                    id="additionalTerms"
                    placeholder="Any additional terms, conditions, or requirements..."
                    rows={3}
                    value={contractTerms.additionalTerms}
                    onChange={(e) => setContractTerms({ ...contractTerms, additionalTerms: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Button onClick={handleCreateContract} className="flex-1">
                Send Contract
              </Button>
              <Button variant="outline" onClick={() => setIsCreatingContract(false)}>
                Cancel
              </Button>
            </div>
          </div>

          {/* Contract Summary */}
          <div>
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="text-lg">Contract Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Hourly Rate:</span>
                    <span className="font-medium">${contractTerms.hourlyRate}/hr</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Estimated Hours:</span>
                    <span className="font-medium">{contractTerms.estimatedHours}h</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Budget:</span>
                    <span className="font-semibold text-green-600">
                      ${(contractTerms.hourlyRate * contractTerms.estimatedHours).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Payment:</span>
                    <span className="font-medium capitalize">{contractTerms.paymentSchedule}</span>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="space-y-2 text-xs text-muted-foreground">
                    <p>• Contract will be sent to freelancer for signature</p>
                    <p>• Work begins after both parties sign</p>
                    <p>• Payments processed automatically based on schedule</p>
                    <p>• Either party can modify terms with mutual agreement</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Contract Management</h1>
          <p className="text-muted-foreground">Manage your project contracts and agreements</p>
        </div>
        <Button onClick={() => setIsCreatingContract(true)}>
          <FileText className="w-4 h-4 mr-2" />
          Create Contract
        </Button>
      </div>

      <div className="grid gap-6">
        {mockContracts.map((contract) => (
          <Card key={contract.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={contract.freelancer.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {contract.freelancer.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold">{contract.job.title}</h3>
                    <p className="text-muted-foreground">
                      {contract.freelancer.name} • {contract.freelancer.title}
                    </p>
                  </div>
                </div>
                <Badge className={`${getStatusColor(contract.status)}`}>{contract.status}</Badge>
              </div>

              <div className="grid md:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center">
                  <DollarSign className="w-4 h-4 text-green-600 mr-2" />
                  <div>
                    <p className="text-sm text-muted-foreground">Rate</p>
                    <p className="font-semibold">${contract.terms.hourlyRate}/hr</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <DollarSign className="w-4 h-4 text-green-600 mr-2" />
                  <div>
                    <p className="text-sm text-muted-foreground">Total Budget</p>
                    <p className="font-semibold">${contract.terms.totalBudget.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 text-blue-600 mr-2" />
                  <div>
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="font-semibold">
                      {contract.terms.startDate} - {contract.terms.endDate}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-purple-600 mr-2" />
                  <div>
                    <p className="text-sm text-muted-foreground">Payment</p>
                    <p className="font-semibold">{contract.terms.paymentSchedule}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button variant="outline" size="sm">
                  View Details
                </Button>
                <Button variant="outline" size="sm">
                  Download PDF
                </Button>
                {contract.status === "active" && (
                  <Button variant="outline" size="sm">
                    Track Progress
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {mockContracts.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Contracts Yet</h3>
            <p className="text-muted-foreground mb-4">Create your first contract to get started</p>
            <Button onClick={() => setIsCreatingContract(true)}>Create Contract</Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
