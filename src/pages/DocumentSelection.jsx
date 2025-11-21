import { Link } from 'react-router-dom'

function DocumentSelection() {
  const documents = [
    {
      id: 'llc-formation',
      title: 'LLC Formation',
      description: 'Form your Limited Liability Company with our comprehensive form. Includes all necessary information for state filing.',
      fields: 38,
      estimatedTime: '15-20 minutes',
      icon: '🏢'
    },
    {
      id: 'partnership-agreement',
      title: 'Partnership Agreement',
      description: 'Create a detailed partnership agreement covering roles, responsibilities, and profit sharing.',
      fields: 32,
      estimatedTime: '12-15 minutes',
      icon: '🤝'
    },
    {
      id: 'service-agreement',
      title: 'Service Agreement',
      description: 'Professional service agreement template for businesses and contractors.',
      fields: 28,
      estimatedTime: '10-12 minutes',
      icon: '📋'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-primary-700">LegalDocs Pro</Link>
            <nav className="flex gap-6">
              <Link to="/" className="text-gray-700 hover:text-primary-600">Home</Link>
              <Link to="/documents" className="text-primary-600 font-semibold">Documents</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Document</h1>
          <p className="text-xl text-gray-600">Select a document type to get started</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((doc) => (
            <Link
              key={doc.id}
              to={`/documents/${doc.id}/form`}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 border-2 border-transparent hover:border-primary-300"
            >
              <div className="text-4xl mb-4">{doc.icon}</div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">{doc.title}</h2>
              <p className="text-gray-600 mb-4">{doc.description}</p>
              <div className="flex justify-between text-sm text-gray-500 pt-4 border-t">
                <span>{doc.fields} fields</span>
                <span>{doc.estimatedTime}</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Need Help Choosing?</h3>
          <p className="text-blue-800">
            Our forms guide you through each step with clear instructions. You can save your progress 
            and return anytime to complete your document.
          </p>
        </div>
      </main>
    </div>
  )
}

export default DocumentSelection
