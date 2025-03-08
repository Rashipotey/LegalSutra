"use client"
import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { FileText, AlertTriangle, CheckCircle, BarChart2 } from "lucide-react"

const SummaryGeneration = () => {
  const { documentId } = useParams()
  const [loading, setLoading] = useState(true)
  const [document, setDocument] = useState(null)
  const [summary, setSummary] = useState(null)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchDocumentAndGenerateSummary = async () => {
      try {
        setLoading(true)

        // Simulate API call to fetch document
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Mock document data
        const mockDocument = {
          id: documentId,
          title: "Employment Contract",
          type: "contract",
          uploadDate: new Date(),
          fileSize: "2.4 MB",
        }

        setDocument(mockDocument)

        // Simulate AI processing for summary generation
        await new Promise((resolve) => setTimeout(resolve, 2000))

        // Mock summary data
        const mockSummary = {
          keyPoints: [
            "This employment contract establishes a full-time employment relationship between the employer and employee.",
            "The contract has a 2-year term with automatic renewal unless terminated with 30 days notice.",
            "Employee will receive an annual salary of $75,000 with quarterly performance reviews.",
            "The contract includes a non-compete clause valid for 12 months after termination.",
            "Intellectual property created during employment belongs to the employer.",
          ],
          parties: [
            { name: "ABC Corporation", role: "Employer" },
            { name: "John Doe", role: "Employee" },
          ],
          effectiveDate: "2023-01-15",
          terminationDate: "2025-01-14",
          potentialRisks: [
            {
              description: "Non-compete clause may not be enforceable in certain jurisdictions",
              severity: "medium",
            },
            {
              description: "Termination clause lacks specific conditions for cause-based termination",
              severity: "high",
            },
            {
              description: "Intellectual property clause is overly broad",
              severity: "medium",
            },
          ],
          riskScore: 65,
        }

        setSummary(mockSummary)
      } catch (err) {
        console.error("Error fetching document or generating summary:", err)
        setError("An error occurred while generating the document summary")
      } finally {
        setLoading(false)
      }
    }

    fetchDocumentAndGenerateSummary()
  }, [documentId])

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "low":
        return "text-green-500"
      case "medium":
        return "text-yellow-500"
      case "high":
        return "text-red-500"
      default:
        return "text-gray-500"
    }
  }

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case "low":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "medium":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case "high":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      default:
        return null
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
            <p className="text-gray-600">Generating document summary...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-red-50">
            <CardContent className="flex flex-col items-center justify-center py-8">
              <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
              <p className="text-red-500 text-center mb-4">{error}</p>
              <Link to="/upload">
                <Button variant="primary">Try Again</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Document Summary</h1>
          <Link to={`/analysis/${documentId}`}>
            <Button variant="primary">
              <BarChart2 className="mr-2 h-4 w-4" />
              View Risk Analysis
            </Button>
          </Link>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center">
              <FileText className="h-6 w-6 text-indigo-500 mr-2" />
              <div>
                <CardTitle>{document.title}</CardTitle>
                <CardDescription>
                  {document.type.charAt(0).toUpperCase() + document.type.slice(1)} • {document.fileSize}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Key Points</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {summary.keyPoints.map((point, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-indigo-100 text-indigo-800 text-xs font-medium mr-3 mt-0.5">
                      {index + 1}
                    </span>
                    <span className="text-gray-700">{point}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Parties</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {summary.parties.map((party, index) => (
                  <div key={index} className="flex flex-col">
                    <span className="text-sm text-gray-500">{party.role}</span>
                    <span className="font-medium">{party.name}</span>
                  </div>
                ))}

                <div className="pt-2 border-t">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Effective Date</span>
                    <span className="font-medium">{summary.effectiveDate}</span>
                  </div>
                </div>

                <div className="pt-2 border-t">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Termination Date</span>
                    <span className="font-medium">{summary.terminationDate}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Potential Risks</CardTitle>
              <div className="flex items-center">
                <span className="text-sm mr-2">Risk Score:</span>
                <span
                  className={`font-bold text-lg ${
                    summary.riskScore < 40
                      ? "text-green-500"
                      : summary.riskScore < 70
                        ? "text-yellow-500"
                        : "text-red-500"
                  }`}
                >
                  {summary.riskScore}%
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {summary.potentialRisks.map((risk, index) => (
                <div key={index} className="flex items-start p-3 rounded-lg bg-gray-50">
                  {getSeverityIcon(risk.severity)}
                  <div className="ml-3">
                    <p className="text-gray-700">{risk.description}</p>
                    <p className={`text-xs font-medium mt-1 ${getSeverityColor(risk.severity)}`}>
                      {risk.severity.toUpperCase()} RISK
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Link to={`/analysis/${documentId}`} className="w-full">
              <Button variant="primary" className="w-full">
                View Detailed Risk Analysis
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default SummaryGeneration

