"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Upload, X, FileText } from "lucide-react"
import { generateRandomId } from "../lib/utils"

const DocumentUpload = () => {
  const [file, setFile] = useState(null)
  const [documentTitle, setDocumentTitle] = useState("")
  const [documentType, setDocumentType] = useState("")
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      if (selectedFile.type !== "application/pdf") {
        setError("Only PDF files are supported")
        return
      }

      setFile(selectedFile)
      setError("")

      // Auto-fill document title from filename
      const fileName = selectedFile.name.replace(".pdf", "")
      setDocumentTitle(fileName)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()

    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      if (droppedFile.type !== "application/pdf") {
        setError("Only PDF files are supported")
        return
      }

      setFile(droppedFile)
      setError("")

      // Auto-fill document title from filename
      const fileName = droppedFile.name.replace(".pdf", "")
      setDocumentTitle(fileName)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const removeFile = () => {
    setFile(null)
    setDocumentTitle("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!file) {
      setError("Please select a file to upload")
      return
    }

    if (!documentTitle.trim()) {
      setError("Please enter a document title")
      return
    }

    try {
      setUploading(true)
      setError("")

      // Simulate file upload and processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Generate a random document ID
      const documentId = generateRandomId()

      // In a real app, you would upload the file to a server
      // and then redirect to the summary page

      navigate(`/summary/${documentId}`)
    } catch (err) {
      setError("An error occurred while uploading the document")
      console.error(err)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Upload Document</h1>

        <Card>
          <CardHeader>
            <CardTitle>Upload Legal Document</CardTitle>
            <CardDescription>Upload your legal document for AI-powered analysis and risk assessment</CardDescription>
          </CardHeader>
          <CardContent>
            {error && <div className="bg-red-50 text-red-500 p-3 rounded-md mb-4 text-sm">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="documentTitle" className="block text-sm font-medium text-gray-700 mb-1">
                    Document Title
                  </label>
                  <Input
                    id="documentTitle"
                    value={documentTitle}
                    onChange={(e) => setDocumentTitle(e.target.value)}
                    placeholder="Enter document title"
                  />
                </div>

                <div>
                  <label htmlFor="documentType" className="block text-sm font-medium text-gray-700 mb-1">
                    Document Type
                  </label>
                  <select
                    id="documentType"
                    value={documentType}
                    onChange={(e) => setDocumentType(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select document type</option>
                    <option value="contract">Contract</option>
                    <option value="agreement">Agreement</option>
                    <option value="nda">Non-Disclosure Agreement</option>
                    <option value="employment">Employment Contract</option>
                    <option value="lease">Lease Agreement</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Upload File</label>

                  {!file ? (
                    <div
                      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors"
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      onClick={() => document.getElementById("fileInput").click()}
                    >
                      <input id="fileInput" type="file" accept=".pdf" onChange={handleFileChange} className="hidden" />
                      <Upload className="h-10 w-10 text-gray-400 mx-auto mb-3" />
                      <p className="text-sm text-gray-600 mb-1">
                        <span className="font-medium text-indigo-600">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">PDF (up to 10MB)</p>
                    </div>
                  ) : (
                    <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                      <FileText className="h-8 w-8 text-indigo-500 mr-3" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                        <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                      <button
                        type="button"
                        onClick={removeFile}
                        className="ml-4 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-gray-500"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="button" variant="outline" className="mr-2" onClick={() => navigate("/")}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={uploading || !file} onClick={handleSubmit}>
              {uploading ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                  Uploading...
                </>
              ) : (
                "Upload & Analyze"
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default DocumentUpload

