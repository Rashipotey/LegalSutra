"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { FileText, Upload, BarChart2, Clock } from "lucide-react"
import { formatDate } from "../lib/utils"

const Home = () => {
  const [recentDocuments, setRecentDocuments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching recent documents
    const fetchRecentDocuments = async () => {
      try {
        // In a real app, you would fetch from an API
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock data
        const mockDocuments = [
          {
            id: "1",
            title: "Employment Contract",
            uploadDate: new Date(Date.now() - 86400000 * 2), // 2 days ago
            status: "analyzed",
            riskScore: 75,
          },
          {
            id: "2",
            title: "Non-Disclosure Agreement",
            uploadDate: new Date(Date.now() - 86400000 * 5), // 5 days ago
            status: "analyzed",
            riskScore: 30,
          },
          {
            id: "3",
            title: "Service Agreement",
            uploadDate: new Date(Date.now() - 86400000 * 7), // 7 days ago
            status: "analyzed",
            riskScore: 55,
          },
        ]

        setRecentDocuments(mockDocuments)
      } catch (error) {
        console.error("Error fetching documents:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchRecentDocuments()
  }, [])

  const getRiskColor = (score) => {
    if (score < 40) return "text-green-500"
    if (score < 70) return "text-yellow-500"
    return "text-red-500"
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome to LegalSutra</h1>
        <p className="text-gray-600">Your AI-powered legal document analysis platform</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Upload Document</CardTitle>
            <Upload className="h-5 w-5 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">
              Upload your legal documents for AI-powered analysis and risk assessment.
            </p>
          </CardContent>
          <CardFooter>
            <Link to="/upload" className="w-full">
              <Button variant="primary" className="w-full">
                Upload Now
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Recent Documents</CardTitle>
            <FileText className="h-5 w-5 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">View and manage your recently uploaded and analyzed documents.</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View All Documents
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Risk Analysis</CardTitle>
            <BarChart2 className="h-5 w-5 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">
              Get comprehensive risk analysis and insights for your legal documents.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View Analytics
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Recent Documents</h2>
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        ) : recentDocuments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentDocuments.map((doc) => (
              <Card key={doc.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{doc.title}</CardTitle>
                  <CardDescription className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {formatDate(doc.uploadDate)}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Risk Score:</span>
                    <span className={`text-sm font-bold ${getRiskColor(doc.riskScore)}`}>{doc.riskScore}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div
                      className={`h-2.5 rounded-full ${
                        doc.riskScore < 40 ? "bg-green-500" : doc.riskScore < 70 ? "bg-yellow-500" : "bg-red-500"
                      }`}
                      style={{ width: `${doc.riskScore}%` }}
                    ></div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Link to={`/summary/${doc.id}`}>
                    <Button variant="outline" size="sm">
                      View Summary
                    </Button>
                  </Link>
                  <Link to={`/analysis/${doc.id}`}>
                    <Button variant="primary" size="sm">
                      Risk Analysis
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="bg-gray-50">
            <CardContent className="flex flex-col items-center justify-center py-8">
              <FileText className="h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-500 text-center mb-4">No documents found</p>
              <Link to="/upload">
                <Button variant="primary">Upload Your First Document</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default Home

