import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function DocumentForm() {
  const { docType } = useParams()
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({})

  // Sample form fields - can be expanded to 40+ fields
  const formSteps = [
    {
      title: 'Business Information',
      fields: [
        { id: 'businessName', label: 'Business Name', type: 'text', required: true },
        { id: 'businessType', label: 'Business Type', type: 'select', required: true, options: ['LLC', 'Corporation', 'Partnership', 'Sole Proprietorship'] },
        { id: 'ein', label: 'EIN (Employer Identification Number)', type: 'text', required: false },
        { id: 'businessAddress', label: 'Business Address', type: 'text', required: true },
        { id: 'city', label: 'City', type: 'text', required: true },
        { id: 'state', label: 'State', type: 'text', required: true },
        { id: 'zipCode', label: 'ZIP Code', type: 'text', required: true },
        { id: 'phone', label: 'Business Phone', type: 'tel', required: true },
        { id: 'email', label: 'Business Email', type: 'email', required: true },
        { id: 'website', label: 'Website (if applicable)', type: 'url', required: false },
      ]
    },
    {
      title: 'Owner/Member Information',
      fields: [
        { id: 'owner1FirstName', label: 'Owner 1 - First Name', type: 'text', required: true },
        { id: 'owner1LastName', label: 'Owner 1 - Last Name', type: 'text', required: true },
        { id: 'owner1Title', label: 'Owner 1 - Title', type: 'text', required: true },
        { id: 'owner1Ownership', label: 'Owner 1 - Ownership %', type: 'number', required: true },
        { id: 'owner1Address', label: 'Owner 1 - Address', type: 'text', required: true },
        { id: 'owner1SSN', label: 'Owner 1 - SSN (last 4 digits)', type: 'text', required: false },
        { id: 'owner2FirstName', label: 'Owner 2 - First Name', type: 'text', required: false },
        { id: 'owner2LastName', label: 'Owner 2 - Last Name', type: 'text', required: false },
        { id: 'owner2Title', label: 'Owner 2 - Title', type: 'text', required: false },
        { id: 'owner2Ownership', label: 'Owner 2 - Ownership %', type: 'number', required: false },
      ]
    },
    {
      title: 'Business Details',
      fields: [
        { id: 'formationDate', label: 'Intended Formation Date', type: 'date', required: true },
        { id: 'fiscalYearEnd', label: 'Fiscal Year End', type: 'select', required: true, options: ['December 31', 'June 30', 'Other'] },
        { id: 'businessPurpose', label: 'Business Purpose', type: 'textarea', required: true },
        { id: 'registeredAgent', label: 'Registered Agent Name', type: 'text', required: true },
        { id: 'registeredAgentAddress', label: 'Registered Agent Address', type: 'text', required: true },
        { id: 'initialCapital', label: 'Initial Capital Contribution', type: 'number', required: true },
        { id: 'numberOfMembers', label: 'Number of Members', type: 'number', required: true },
        { id: 'managementType', label: 'Management Type', type: 'select', required: true, options: ['Member-Managed', 'Manager-Managed'] },
        { id: 'stateOfFormation', label: 'State of Formation', type: 'text', required: true },
        { id: 'operatingAgreement', label: 'Operating Agreement Required?', type: 'select', required: true, options: ['Yes', 'No'] },
      ]
    },
    {
      title: 'Additional Information',
      fields: [
        { id: 'bankName', label: 'Bank Name', type: 'text', required: false },
        { id: 'accountNumber', label: 'Account Number (last 4)', type: 'text', required: false },
        { id: 'businessLicense', label: 'Business License Number', type: 'text', required: false },
        { id: 'industry', label: 'Industry', type: 'text', required: true },
        { id: 'employees', label: 'Number of Employees', type: 'number', required: false },
        { id: 'annualRevenue', label: 'Estimated Annual Revenue', type: 'select', required: false, options: ['Under $100k', '$100k-$500k', '$500k-$1M', 'Over $1M'] },
        { id: 'taxClassification', label: 'Tax Classification', type: 'select', required: true, options: ['Single-Member LLC', 'Multi-Member LLC', 'S-Corp', 'C-Corp', 'Partnership'] },
        { id: 'notes', label: 'Additional Notes', type: 'textarea', required: false },
      ]
    }
  ]

  const totalSteps = formSteps.length

  const handleInputChange = (fieldId, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: value
    }))
  }

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    // Save form data to localStorage
    localStorage.setItem('documentFormData', JSON.stringify(formData))
    navigate(`/documents/${docType}/preview`)
  }

  const isStepValid = () => {
    const currentFields = formSteps[currentStep].fields
    return currentFields.filter(f => f.required).every(field => {
      const value = formData[field.id]
      return value !== undefined && value !== null && value !== ''
    })
  }

  const renderField = (field) => {
    const value = formData[field.id] || ''

    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            id={field.id}
            value={value}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            rows="4"
            required={field.required}
          />
        )
      case 'select':
        return (
          <select
            id={field.id}
            value={value}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            required={field.required}
          >
            <option value="">Select...</option>
            {field.options.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        )
      default:
        return (
          <input
            type={field.type}
            id={field.id}
            value={value}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            required={field.required}
          />
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-primary-700">LegalDocs Pro</h1>
            <div className="text-sm text-gray-600">
              Step {currentStep + 1} of {totalSteps}
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Form Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            {formSteps[currentStep].title}
          </h2>

          <div className="space-y-6">
            {formSteps[currentStep].fields.map((field) => (
              <div key={field.id}>
                <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-2">
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                {renderField(field)}
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-8 border-t">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            {currentStep < totalSteps - 1 ? (
              <button
                onClick={handleNext}
                disabled={!isStepValid()}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!isStepValid()}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Review & Generate
              </button>
            )}
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>Tip:</strong> All fields marked with <span className="text-red-500">*</span> are required. 
            You can save your progress and return later to complete the form.
          </p>
        </div>
      </main>
    </div>
  )
}

export default DocumentForm
