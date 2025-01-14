// ContentManagement.js
import React, { useState } from 'react';
import { formatters } from '../../utils/formatters';

const ContentManagement = () => {
  const [activeTab, setActiveTab] = useState('articles');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const mockContent = {
    articles: [
      {
        id: 1,
        title: 'How to Prepare for Oxbridge Interviews',
        category: 'guides',
        status: 'published',
        author: 'David Brown',
        publishedAt: new Date('2024-03-15'),
        views: 1250
      },
      {
        id: 2,
        title: 'Writing a Strong Personal Statement',
        category: 'tutorials',
        status: 'draft',
        author: 'Sarah Johnson',
        updatedAt: new Date('2024-03-18'),
        views: 0
      }
    ],
    faqs: [
      {
        id: 1,
        question: 'How does the essay review process work?',
        category: 'essays',
        status: 'published',
        updatedAt: new Date('2024-03-10')
      }
    ],
    resources: [
      {
        id: 1,
        title: 'Interview Question Bank',
        category: 'interviews',
        type: 'pdf',
        downloads: 450,
        updatedAt: new Date('2024-03-01')
      }
    ]
  };

  const handleCreateContent = (type) => {
    console.log('Create new', type);
  };

  const handleEdit = (type, id) => {
    console.log('Edit', type, id);
  };

  const handleDelete = (type, id) => {
    console.log('Delete', type, id);
  };

  const handlePublish = (type, id) => {
    console.log('Publish', type, id);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Content Management</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage articles, FAQs, and resources
            </p>
          </div>
          <div>
            <button
              onClick={() => handleCreateContent(activeTab)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
            >
              Add New {activeTab.slice(0, -1)}
            </button>
          </div>
        </div>
      </div>

      {/* Content Navigation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex">
            {['articles', 'faqs', 'resources'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm
                  ${activeTab === tab
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        {/* Filters */}
        <div className="p-4 border-b border-gray-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Search content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            >
              <option value="all">All Categories</option>
              <option value="guides">Guides</option>
              <option value="tutorials">Tutorials</option>
              <option value="essays">Essays</option>
              <option value="interviews">Interviews</option>
            </select>
          </div>
        </div>

        {/* Content List */}
        <div className="overflow-x-auto">
          {activeTab === 'articles' && (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Author</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Views</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockContent.articles.map((article) => (
                  <tr key={article.id}>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{article.title}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {article.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{article.author}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${article.status === 'published' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {article.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {article.views.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {formatters.formatDate(article.publishedAt || article.updatedAt)}
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit('article', article.id)}
                        className="text-red-600 hover:text-red-900 mr-4"
                      >
                        Edit
                      </button>
                      {article.status === 'draft' ? (
                        <button
                          onClick={() => handlePublish('article', article.id)}
                          className="text-green-600 hover:text-green-900 mr-4"
                        >
                          Publish
                        </button>
                      ) : (
                        <button
                          onClick={() => handleDelete('article', article.id)}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === 'faqs' && (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Question</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Updated</th>
                  <th className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockContent.faqs.map((faq) => (
                  <tr key={faq.id}>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{faq.question}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {faq.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {faq.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {formatters.formatDate(faq.updatedAt)}
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit('faq', faq.id)}
                        className="text-red-600 hover:text-red-900 mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete('faq', faq.id)}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === 'resources' && (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Downloads</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Updated</th>
                  <th className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockContent.resources.map((resource) => (
                  <tr key={resource.id}>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{resource.title}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {resource.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        {resource.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {resource.downloads.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {formatters.formatDate(resource.updatedAt)}
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit('resource', resource.id)}
                        className="text-red-600 hover:text-red-900 mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete('resource', resource.id)}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
{/* Empty State */}
{mockContent[activeTab].length === 0 && (
  <div className="text-center py-12">
    <svg
      className="mx-auto h-12 w-12 text-gray-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
    <h3 className="mt-2 text-sm font-medium text-gray-900">No content found</h3>
    <p className="mt-1 text-sm text-gray-500">
      {searchQuery
        ? 'Try adjusting your search or filters'
        : `Get started by adding a new ${activeTab.slice(0, -1)}`}
    </p>
    <div className="mt-6">
      <button
        onClick={() => handleCreateContent(activeTab)}
        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
      >
        Add New {activeTab.slice(0, -1)}
      </button>
    </div>
  </div>
)}

{/* Pagination */}
<div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
  <div className="flex-1 flex justify-between sm:hidden">
    <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
      Previous
    </button>
    <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
      Next
    </button>
  </div>
  <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
    <div>
      <p className="text-sm text-gray-700">
        Showing <span className="font-medium">1</span> to{' '}
        <span className="font-medium">{mockContent[activeTab].length}</span> of{' '}
        <span className="font-medium">{mockContent[activeTab].length}</span> results
      </p>
    </div>
    <div>
      <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
        <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">Previous</button>
        <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">1</button>
        <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">Next</button>
      </nav>
    </div>
  </div>
</div>
    </div>
  
    </div>
    );
    }
    


export default ContentManagement;