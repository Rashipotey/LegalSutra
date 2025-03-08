"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { FileText, AlertTriangle, CheckCircle, ArrowLeft, Info, Shield } from "lucide-react"

const RiskAnalysis = () => {
  const { documentId } = useParams()
  const [loading, setLoading] = useState(true)
  const [document, setDocument] = useState(null)
  const [analysis, setAnalysis] = useState(null)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchDocumentAndAnalysis = async () => {
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

        // Simulate AI processing for risk analysis
        await new Promise((resolve) => setTimeout(resolve, 2000))

        // Mock analysis data
        const mockAnalysis = {
          overallRiskScore: 65,
          riskCategories: [
            {
              name: "Compliance",
              score: 70,
              issues: [
                {
                  description: "Non-compete clause duration exceeds legal limits in some jurisdictions",
                  severity: "high",
                  recommendation: "Reduce non-compete duration to 6 months or specify applicable jurisdictions",
                  clauseReference: "Section 8.2",
                },
                {
                  description: "Missing mandatory employment law disclosures",
                  severity: "medium",
                  recommendation: "Add required disclosures about employee rights and protections",
                  clauseReference: "N/A",
                },
              ],
            },
            {
              name: "Enforceability",
              score: 55,
              issues: [
                {
                  description: "Termination clause lacks specific conditions for cause-based termination",
                  severity: "high",
                  recommendation: "Define specific conditions that constitute cause for termination",
                  clauseReference: "Section 12.1",
                },
                {
                  description: "Intellectual property clause is overly broad",
                  severity: "medium",
                  recommendation: "Narrow scope to work created during employment and related to business",
                  clauseReference: "Section 9.3",
                },
              ],
            },
            {
              name: "Clarity",
              score: 40,
              issues: [
                {
                  description: "Ambiguous language in compensation section regarding bonus calculation",
                  severity: "medium",
                  recommendation: "Clearly define bonus calculation method and eligibility criteria",
                  clauseReference: "Section 5.2",
                },
              ],
            },
            {
              name: "Completeness",
              score: 85,
              issues: [
                {
                  description: "Missing details on remote work policy",
                  severity: "low",
                  recommendation: "Add section detailing remote work eligibility and requirements",
                  clauseReference: "N/A",
                },
              ],
            },
          ],
          keyRisks: [
            "Non-compete clause may be unenforceable in certain jurisdictions",
            "Termination provisions lack clarity and may be challenged",
            "Intellectual property provisions are overly broad",
            "Missing mandatory employment law disclosures",
          ],
          recommendations: [
            "Revise non-compete clause to comply with jurisdictional limitations",
            "Clearly define conditions for termination with and without cause",
            "Narrow intellectual property clause to work created during employment",
            "Add required employment law disclosures",
            "Clarify bonus calculation method and eligibility criteria",
          ],
        }

        setAnalysis(mockAnalysis)
      } catch (err) {
        console.error("Error fetching document or analysis:", err)
        setError("An error occurred while generating the risk analysis")
      } finally {
        setLoading(false)
      }
    }

    fetchDocumentAndAnalysis()
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

  const getSeverityBgColor = (severity) => {
    switch (severity) {
      case "low":
        return "bg-green-100"
      case "medium":
        return "bg-yellow-100"
      case "high":
        return "bg-red-100"
      default:
        return "bg-gray-100"
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

  const getRiskScoreColor = (score) => {
    if (score < 40) return "text-green-500"
    if (score < 70) return "text-yellow-500"
    return "text-red-500"
  }

  const getRiskScoreBgColor = (score) => {
    if (score < 40) return "bg-green-500"
    if (score < 70) return "bg-yellow-500"
    return "bg-red-500"
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
            <p className="text-gray-600">Generating comprehensive risk analysis...</p>
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
        <div className="flex items-center mb-6">
          <Link to={`/summary/${documentId}`} className="mr-4">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Summary
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Risk Analysis</h1>
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
            <div className="flex items-center mt-4">
              <div className="flex-1">
                <div className="flex items-center">
                  <span className="text-sm font-medium mr-2">Overall Risk Score:</span>
                  <span className={`font-bold text-lg ${getRiskScoreColor(analysis.overallRiskScore)}`}>
                    {analysis.overallRiskScore}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div
                    className={`h-2.5 rounded-full ${getRiskScoreBgColor(analysis.overallRiskScore)}`}
                    style={{ width: `${analysis.overallRiskScore}%` }}
                  ></div>
                </div>
              </div>
              <Shield className="h-10 w-10 text-indigo-500 ml-4" />
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Key Risks</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {analysis.keyRisks.map((risk, index) => (
                  <li key={index} className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{risk}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {analysis.recommendations.map((recommendation, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{recommendation}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-xl font-bold mb-4">Risk Categories</h2>

        <div className="space-y-6">
          {analysis.riskCategories.map((category, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>{category.name}</CardTitle>
                  <div className="flex items-center">
                    <span className="text-sm mr-2">Risk Score:</span>
                    <span className={`font-bold ${getRiskScoreColor(category.score)}`}>{category.score}%</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className={`h-2 rounded-full ${getRiskScoreBgColor(category.score)}`}
                    style={{ width: `${category.score}%` }}
                  ></div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {category.issues.map((issue, issueIndex) => (
                    <div key={issueIndex} className={`p-4 rounded-lg ${getSeverityBgColor(issue.severity)}`}>
                      <div className="flex items-start">
                        {getSeverityIcon(issue.severity)}
                        <div className="ml-3 flex-1">
                          <div className="flex justify-between">
                            <p className="font-medium text-gray-900">{issue.description}</p>
                            <span
                              className={`text-xs font-bold px-2 py-1 rounded-full ${
                                issue.severity === "high"
                                  ? "bg-red-200 text-red-800"
                                  : issue.severity === "medium"
                                    ? "bg-yellow-200 text-yellow-800"
                                    : "bg-green-200 text-green-800"
                              }`}
                            >
                              {issue.severity.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            <span className="font-medium">Recommendation:</span> {issue.recommendation}
                          </p>
                          <div className="flex items-center mt-2 text-xs text-gray-500">
                            <Info className="h-3 w-3 mr-1" />
                            <span>Clause Reference: {issue.clauseReference}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RiskAnalysis

