import React, { useState } from 'react';
import { 
  FileText, 
  Video, 
  Download, 
  ExternalLink, 
  Search,
  BookOpen,
  Headphones,
  Image as ImageIcon,
  Calendar
} from 'lucide-react';

const ClimateResources = () => {
  const [selectedType, setSelectedType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const resourceTypes = [
    { id: 'all', label: 'All Resources', count: 42, icon: BookOpen },
    { id: 'articles', label: 'Articles', count: 15, icon: FileText },
    { id: 'videos', label: 'Videos', count: 12, icon: Video },
    { id: 'podcasts', label: 'Podcasts', count: 8, icon: Headphones },
    { id: 'infographics', label: 'Infographics', count: 7, icon: ImageIcon },
  ];

  const resources = [
    {
      id: 1,
      type: 'articles',
      title: 'The Science Behind Climate Change',
      description: 'A comprehensive guide to understanding the fundamental science of climate change, greenhouse gases, and global warming.',
      author: 'Dr. Emily Chen',
      publishDate: '2024-01-15',
      readTime: '12 min read',
      downloads: 2847,
      rating: 4.9,
      thumbnail: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=300',
      tags: ['Climate Science', 'Greenhouse Gases', 'Global Warming'],
      featured: true,
    },
    {
      id: 2,
      type: 'videos',
      title: 'Renewable Energy Solutions',
      description: 'Documentary exploring various renewable energy technologies and their potential to combat climate change.',
      author: 'Green Future Films',
      publishDate: '2024-01-10',
      readTime: '45 min watch',
      downloads: 1923,
      rating: 4.8,
      thumbnail: 'https://images.pexels.com/photos/2800832/pexels-photo-2800832.jpeg?auto=compress&cs=tinysrgb&w=300',
      tags: ['Renewable Energy', 'Solar Power', 'Wind Energy'],
      featured: false,
    },
    {
      id: 3,
      type: 'podcasts',
      title: 'Ocean Conservation Conversations',
      description: 'Weekly podcast featuring interviews with marine biologists and ocean conservation experts.',
      author: 'Ocean Voices',
      publishDate: '2024-01-08',
      readTime: '30 min listen',
      downloads: 3421,
      rating: 4.7,
      thumbnail: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=300',
      tags: ['Ocean Conservation', 'Marine Biology', 'Sustainability'],
      featured: true,
    },
    {
      id: 4,
      type: 'infographics',
      title: 'Carbon Footprint Breakdown',
      description: 'Visual breakdown of individual and household carbon footprints across different activities and sectors.',
      author: 'Climate Data Viz',
      publishDate: '2024-01-05',
      readTime: '5 min read',
      downloads: 1654,
      rating: 4.6,
      thumbnail: 'https://images.pexels.com/photos/3850512/pexels-photo-3850512.jpeg?auto=compress&cs=tinysrgb&w=300',
      tags: ['Carbon Footprint', 'Data Visualization', 'Sustainability'],
      featured: false,
    },
    {
      id: 5,
      type: 'articles',
      title: 'Sustainable Agriculture Practices',
      description: 'Exploring modern farming techniques that reduce environmental impact while maintaining productivity.',
      author: 'Prof. Maria Santos',
      publishDate: '2024-01-03',
      readTime: '8 min read',
      downloads: 987,
      rating: 4.5,
      thumbnail: 'https://images.pexels.com/photos/2518861/pexels-photo-2518861.jpeg?auto=compress&cs=tinysrgb&w=300',
      tags: ['Agriculture', 'Farming', 'Sustainability'],
      featured: false,
    },
    {
      id: 6,
      type: 'videos',
      title: 'Zero Waste Lifestyle Guide',
      description: 'Practical tips and strategies for adopting a zero waste lifestyle in urban environments.',
      author: 'Eco Living Channel',
      publishDate: '2023-12-28',
      readTime: '25 min watch',
      downloads: 2156,
      rating: 4.8,
      thumbnail: 'https://images.pexels.com/photos/3850512/pexels-photo-3850512.jpeg?auto=compress&cs=tinysrgb&w=300',
      tags: ['Zero Waste', 'Lifestyle', 'Urban Living'],
      featured: false,
    },
  ];

  const getTypeIcon = (type: string) => {
    const typeData = resourceTypes.find(t => t.id === type);
    return typeData?.icon || FileText;
  };

  const filteredResources = resources.filter(resource => {
    const matchesType = selectedType === 'all' || resource.type === selectedType;
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesType && matchesSearch;
  });

  const featuredResources = resources.filter(resource => resource.featured);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Climate Literacy Resources</h1>
        <p className="text-gray-600">
          Discover curated content to deepen your understanding of environmental challenges and solutions
        </p>
      </div>

      {/* Featured Resources */}
      {featuredResources.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Featured Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredResources.map((resource) => {
              const Icon = getTypeIcon(resource.type);
              return (
                <div key={resource.id} className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 p-6 hover:shadow-md transition-all duration-200">
                  <div className="flex items-start space-x-4">
                    <img 
                      src={resource.thumbnail} 
                      alt={resource.title}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Icon className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-green-600 capitalize">{resource.type}</span>
                        <span className="text-sm text-gray-500">•</span>
                        <span className="text-sm text-gray-500">{resource.readTime}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{resource.title}</h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{resource.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>{resource.author}</span>
                          <div className="flex items-center space-x-1">
                            <Download className="w-4 h-4" />
                            <span>{resource.downloads.toLocaleString()}</span>
                          </div>
                        </div>
                        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                          Access Resource
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>
      </div>

      {/* Resource Types */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {resourceTypes.map((type) => {
            const Icon = type.icon;
            return (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedType === type.id
                    ? 'bg-green-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{type.label} ({type.count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => {
          const Icon = getTypeIcon(resource.type);
          return (
            <div key={resource.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
              <div className="relative">
                <img 
                  src={resource.thumbnail} 
                  alt={resource.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <div className="flex items-center space-x-1 bg-white bg-opacity-90 rounded-full px-2 py-1">
                    <Icon className="w-3 h-3" />
                    <span className="text-xs font-medium capitalize">{resource.type}</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{resource.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{resource.description}</p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {resource.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>{resource.author}</span>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(resource.publishDate).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                  <span>{resource.readTime}</span>
                  <div className="flex items-center space-x-1">
                    <Download className="w-4 h-4" />
                    <span>{resource.downloads.toLocaleString()} downloads</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium">
                    Access Resource
                  </button>
                  <button className="p-2 text-gray-600 hover:text-green-600 border border-gray-300 rounded-lg hover:border-green-300 transition-colors">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ClimateResources;