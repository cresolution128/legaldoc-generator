import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import jsPDF from 'jspdf'

function DocumentPreview() {
  const { docType } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({})

  useEffect(() => {
    const savedData = localStorage.getItem('documentFormData')
    if (savedData) {
      setFormData(JSON.parse(savedData))
    } else {
      navigate(`/documents/${docType}/form`)
    }
  }, [docType, navigate])

  const handleDownload = () => {
    generatePDF(formData)
  }

  const generatePDF = (data) => {
    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()
    let yPosition = 20
    const margin = 20
    const lineHeight = 7
    const sectionSpacing = 10

    // Helper function to add a new page if needed
    const checkPageBreak = (requiredSpace) => {
      if (yPosition + requiredSpace > pageHeight - margin) {
        doc.addPage()
        yPosition = 20
      }
    }

    // Title
    doc.setFontSize(20)
    doc.setFont(undefined, 'bold')
    doc.text('LEGAL DOCUMENT', pageWidth / 2, yPosition, { align: 'center' })
    yPosition += 8

    doc.setFontSize(14)
    doc.setFont(undefined, 'normal')
    const docTitle = docType.toUpperCase().replace(/-/g, ' ')
    doc.text(docTitle, pageWidth / 2, yPosition, { align: 'center' })
    yPosition += 10

    // Generated date
    doc.setFontSize(10)
    doc.setTextColor(100, 100, 100)
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, pageWidth / 2, yPosition, { align: 'center' })
    yPosition += sectionSpacing

    doc.setTextColor(0, 0, 0)

    // Business Information Section
    checkPageBreak(30)
    doc.setFontSize(14)
    doc.setFont(undefined, 'bold')
    doc.text('BUSINESS INFORMATION', margin, yPosition)
    yPosition += lineHeight
    doc.setDrawColor(200, 200, 200)
    doc.line(margin, yPosition, pageWidth - margin, yPosition)
    yPosition += sectionSpacing

    doc.setFontSize(11)
    doc.setFont(undefined, 'normal')
    const businessFields = [
      ['Business Name', data.businessName],
      ['Business Type', data.businessType],
      ['EIN', data.ein],
      ['Business Address', data.businessAddress],
      ['City, State, ZIP', `${data.city || ''}, ${data.state || ''} ${data.zipCode || ''}`.trim()],
      ['Phone', data.phone],
      ['Email', data.email],
      ['Website', data.website],
    ]

    businessFields.forEach(([label, value]) => {
      checkPageBreak(lineHeight + 2)
      doc.setFont(undefined, 'bold')
      doc.text(`${label}:`, margin, yPosition)
      doc.setFont(undefined, 'normal')
      const textWidth = doc.getTextWidth(value || 'N/A')
      if (textWidth > pageWidth - margin - 60) {
        const lines = doc.splitTextToSize(value || 'N/A', pageWidth - margin - 60)
        doc.text(lines, margin + 50, yPosition)
        yPosition += (lines.length - 1) * lineHeight
      } else {
        doc.text(value || 'N/A', margin + 50, yPosition)
      }
      yPosition += lineHeight
    })

    yPosition += sectionSpacing

    // Owner/Member Information Section
    checkPageBreak(30)
    doc.setFontSize(14)
    doc.setFont(undefined, 'bold')
    doc.text('OWNER/MEMBER INFORMATION', margin, yPosition)
    yPosition += lineHeight
    doc.line(margin, yPosition, pageWidth - margin, yPosition)
    yPosition += sectionSpacing

    doc.setFontSize(11)
    doc.setFont(undefined, 'normal')
    const owner1Fields = [
      ['Owner 1 Name', `${data.owner1FirstName || ''} ${data.owner1LastName || ''}`.trim()],
      ['Owner 1 Title', data.owner1Title],
      ['Owner 1 Ownership', data.owner1Ownership ? `${data.owner1Ownership}%` : 'N/A'],
      ['Owner 1 Address', data.owner1Address],
    ]

    owner1Fields.forEach(([label, value]) => {
      checkPageBreak(lineHeight + 2)
      doc.setFont(undefined, 'bold')
      doc.text(`${label}:`, margin, yPosition)
      doc.setFont(undefined, 'normal')
      doc.text(value || 'N/A', margin + 50, yPosition)
      yPosition += lineHeight
    })

    if (data.owner2FirstName) {
      yPosition += 5
      const owner2Fields = [
        ['Owner 2 Name', `${data.owner2FirstName} ${data.owner2LastName || ''}`.trim()],
        ['Owner 2 Title', data.owner2Title],
        ['Owner 2 Ownership', data.owner2Ownership ? `${data.owner2Ownership}%` : 'N/A'],
      ]

      owner2Fields.forEach(([label, value]) => {
        checkPageBreak(lineHeight + 2)
        doc.setFont(undefined, 'bold')
        doc.text(`${label}:`, margin, yPosition)
        doc.setFont(undefined, 'normal')
        doc.text(value || 'N/A', margin + 50, yPosition)
        yPosition += lineHeight
      })
    }

    yPosition += sectionSpacing

    // Business Details Section
    checkPageBreak(30)
    doc.setFontSize(14)
    doc.setFont(undefined, 'bold')
    doc.text('BUSINESS DETAILS', margin, yPosition)
    yPosition += lineHeight
    doc.line(margin, yPosition, pageWidth - margin, yPosition)
    yPosition += sectionSpacing

    doc.setFontSize(11)
    doc.setFont(undefined, 'normal')
    const businessDetailsFields = [
      ['Formation Date', data.formationDate],
      ['Fiscal Year End', data.fiscalYearEnd],
      ['Registered Agent', data.registeredAgent],
      ['Registered Agent Address', data.registeredAgentAddress],
      ['Initial Capital', data.initialCapital ? `$${data.initialCapital}` : 'N/A'],
      ['Number of Members', data.numberOfMembers],
      ['Management Type', data.managementType],
      ['State of Formation', data.stateOfFormation],
      ['Operating Agreement', data.operatingAgreement],
    ]

    businessDetailsFields.forEach(([label, value]) => {
      checkPageBreak(lineHeight + 2)
      doc.setFont(undefined, 'bold')
      doc.text(`${label}:`, margin, yPosition)
      doc.setFont(undefined, 'normal')
      const textWidth = doc.getTextWidth(value || 'N/A')
      if (textWidth > pageWidth - margin - 60) {
        const lines = doc.splitTextToSize(value || 'N/A', pageWidth - margin - 60)
        doc.text(lines, margin + 50, yPosition)
        yPosition += (lines.length - 1) * lineHeight
      } else {
        doc.text(value || 'N/A', margin + 50, yPosition)
      }
      yPosition += lineHeight
    })

    // Business Purpose (can be long)
    if (data.businessPurpose) {
      checkPageBreak(lineHeight + 10)
      doc.setFont(undefined, 'bold')
      doc.text('Business Purpose:', margin, yPosition)
      yPosition += lineHeight
      doc.setFont(undefined, 'normal')
      const purposeLines = doc.splitTextToSize(data.businessPurpose, pageWidth - margin * 2)
      doc.text(purposeLines, margin, yPosition)
      yPosition += purposeLines.length * lineHeight
    }

    yPosition += sectionSpacing

    // Additional Information Section
    checkPageBreak(30)
    doc.setFontSize(14)
    doc.setFont(undefined, 'bold')
    doc.text('ADDITIONAL INFORMATION', margin, yPosition)
    yPosition += lineHeight
    doc.line(margin, yPosition, pageWidth - margin, yPosition)
    yPosition += sectionSpacing

    doc.setFontSize(11)
    doc.setFont(undefined, 'normal')
    const additionalFields = [
      ['Bank Name', data.bankName],
      ['Industry', data.industry],
      ['Number of Employees', data.employees],
      ['Annual Revenue', data.annualRevenue],
      ['Tax Classification', data.taxClassification],
    ]

    additionalFields.forEach(([label, value]) => {
      checkPageBreak(lineHeight + 2)
      doc.setFont(undefined, 'bold')
      doc.text(`${label}:`, margin, yPosition)
      doc.setFont(undefined, 'normal')
      doc.text(value || 'N/A', margin + 50, yPosition)
      yPosition += lineHeight
    })

    if (data.notes) {
      checkPageBreak(lineHeight + 10)
      yPosition += 5
      doc.setFont(undefined, 'bold')
      doc.text('Additional Notes:', margin, yPosition)
      yPosition += lineHeight
      doc.setFont(undefined, 'normal')
      const notesLines = doc.splitTextToSize(data.notes, pageWidth - margin * 2)
      doc.text(notesLines, margin, yPosition)
      yPosition += notesLines.length * lineHeight
    }

    // Footer
    const totalPages = doc.internal.pages.length - 1
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i)
      doc.setFontSize(8)
      doc.setTextColor(150, 150, 150)
      doc.text(
        `Page ${i} of ${totalPages}`,
        pageWidth / 2,
        pageHeight - 10,
        { align: 'center' }
      )
      doc.text(
        'This document was generated by LegalDocs Pro. For legal advice, please consult with a qualified attorney.',
        pageWidth / 2,
        pageHeight - 5,
        { align: 'center' }
      )
    }

    // Save the PDF
    const fileName = `${docType}-document-${new Date().toISOString().split('T')[0]}.pdf`
    doc.save(fileName)
  }

  const generateDocument = (data) => {
    return `
LEGAL DOCUMENT - ${docType.toUpperCase().replace(/-/g, ' ')}

Generated on: ${new Date().toLocaleDateString()}

========================================
BUSINESS INFORMATION
========================================
Business Name: ${data.businessName || 'N/A'}
Business Type: ${data.businessType || 'N/A'}
EIN: ${data.ein || 'N/A'}
Business Address: ${data.businessAddress || 'N/A'}
City: ${data.city || 'N/A'}
State: ${data.state || 'N/A'}
ZIP Code: ${data.zipCode || 'N/A'}
Phone: ${data.phone || 'N/A'}
Email: ${data.email || 'N/A'}
Website: ${data.website || 'N/A'}

========================================
OWNER/MEMBER INFORMATION
========================================
Owner 1 Name: ${data.owner1FirstName || 'N/A'} ${data.owner1LastName || 'N/A'}
Owner 1 Title: ${data.owner1Title || 'N/A'}
Owner 1 Ownership: ${data.owner1Ownership || 'N/A'}%
Owner 1 Address: ${data.owner1Address || 'N/A'}

${data.owner2FirstName ? `
Owner 2 Name: ${data.owner2FirstName} ${data.owner2LastName}
Owner 2 Title: ${data.owner2Title || 'N/A'}
Owner 2 Ownership: ${data.owner2Ownership || 'N/A'}%
` : ''}

========================================
BUSINESS DETAILS
========================================
Formation Date: ${data.formationDate || 'N/A'}
Fiscal Year End: ${data.fiscalYearEnd || 'N/A'}
Business Purpose: ${data.businessPurpose || 'N/A'}
Registered Agent: ${data.registeredAgent || 'N/A'}
Registered Agent Address: ${data.registeredAgentAddress || 'N/A'}
Initial Capital: $${data.initialCapital || 'N/A'}
Number of Members: ${data.numberOfMembers || 'N/A'}
Management Type: ${data.managementType || 'N/A'}
State of Formation: ${data.stateOfFormation || 'N/A'}
Operating Agreement: ${data.operatingAgreement || 'N/A'}

========================================
ADDITIONAL INFORMATION
========================================
Bank Name: ${data.bankName || 'N/A'}
Industry: ${data.industry || 'N/A'}
Number of Employees: ${data.employees || 'N/A'}
Annual Revenue: ${data.annualRevenue || 'N/A'}
Tax Classification: ${data.taxClassification || 'N/A'}
${data.notes ? `Notes: ${data.notes}` : ''}

========================================
END OF DOCUMENT
========================================

This document was generated by LegalDocs Pro.
For legal advice, please consult with a qualified attorney.
    `.trim()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/" className="text-2xl font-bold text-primary-700">LegalDocs Pro</Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Document Ready!</h1>
            <p className="text-gray-600">Your document has been generated successfully</p>
          </div>

          {/* Document Preview */}
          <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-6 mb-8 max-h-96 overflow-y-auto">
            <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">
              {generateDocument(formData)}
            </pre>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleDownload}
              className="flex-1 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors font-semibold flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download PDF
            </button>
            <Link
              to={`/documents/${docType}/form`}
              className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-semibold text-center"
            >
              Edit Information
            </Link>
            <Link
              to="/documents"
              className="flex-1 bg-white border-2 border-primary-600 text-primary-600 px-6 py-3 rounded-lg hover:bg-primary-50 transition-colors font-semibold text-center"
            >
              Create Another
            </Link>
          </div>

          {/* Important Notice */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> Your document will be downloaded as a professional PDF file. 
              Please review all information carefully before using. For legal advice, please consult with a qualified attorney.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default DocumentPreview
