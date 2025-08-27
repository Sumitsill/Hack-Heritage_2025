// import React, { useState } from 'react';
// import { 
//   BookOpen, 
//   Clock, 
//   Users, 
//   Star, 
//   Play, 
//   CheckCircle, 
//   Lock,
//   Search,
//   Filter
// } from 'lucide-react';

// const LearningModules = () => {
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [searchTerm, setSearchTerm] = useState('');

//   const categories = [
//     { id: 'all', label: 'All Modules', count: 24 },
//     { id: 'food-waste', label: 'Food Waste Reduction', count: 8 },
//     { id: 'sustainability', label: 'Sustainable Practices', count: 6 },
//     { id: 'community', label: 'Community Building', count: 5 },
//     { id: 'volunteer', label: 'Volunteer Management', count: 5 },
//   ];

//   const modules = [
//     {
//       id: 1,
//       title: 'Food Waste Reduction Fundamentals',
//       description: 'Learn proven strategies to reduce food waste in households and organizations',
//       category: 'food-waste',
//       duration: '2.5 hours',
//       lessons: 8,
//       students: 1247,
//       rating: 4.8,
//       difficulty: 'Beginner',
//       progress: 100,
//       status: 'completed',
//       thumbnail: 'https://images.pexels.com/photos/3850512/pexels-photo-3850512.jpeg?auto=compress&cs=tinysrgb&w=400',
//     },
//     {
//       id: 2,
//       title: 'Sustainable Food Packaging',
//       description: 'Understanding biodegradable packaging solutions for food distribution',
//       category: 'sustainability',
//       duration: '3 hours',
//       lessons: 10,
//       students: 892,
//       rating: 4.9,
//       difficulty: 'Beginner',
//       progress: 75,
//       status: 'in-progress',
//       thumbnail: 'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=400',
//     },
//     {
//       id: 3,
//       title: 'Community Food Networks',
//       description: 'Building effective networks for food distribution and community support',
//       category: 'community',
//       duration: '4 hours',
//       lessons: 12,
//       students: 634,
//       rating: 4.7,
//       difficulty: 'Intermediate',
//       progress: 0,
//       status: 'locked',
//       thumbnail: 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=400',
//     },
//     {
//       id: 4,
//       title: 'Food Safety and Handling',
//       description: 'Essential guidelines for safe food collection, storage, and distribution',
//       category: 'food-waste',
//       duration: '2 hours',
//       lessons: 6,
//       students: 1156,
//       rating: 4.6,
//       difficulty: 'Beginner',
//       progress: 40,
//       status: 'in-progress',
//       thumbnail: 'https://images.pexels.com/photos/4099354/pexels-photo-4099354.jpeg?auto=compress&cs=tinysrgb&w=400',
//     },
//     {
//       id: 5,
//       title: 'Volunteer Coordination Strategies',
//       description: 'Effective methods for recruiting, training, and managing volunteers',
//       category: 'volunteer',
//       duration: '3.5 hours',
//       lessons: 9,
//       students: 743,
//       rating: 4.8,
//       difficulty: 'Intermediate',
//       progress: 0,
//       status: 'available',
//       thumbnail: 'https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=400',
//     },
//     {
//       id: 6,
//       title: 'Impact Measurement and Reporting',
//       description: 'Tools and techniques for measuring social impact and creating reports',
//       category: 'community',
//       duration: '4.5 hours',
//       lessons: 14,
//       students: 521,
//       rating: 4.7,
//       difficulty: 'Advanced',
//       progress: 0,
//       status: 'available',
//       thumbnail: 'https://images.pexels.com/photos/7176319/pexels-photo-7176319.jpeg?auto=compress&cs=tinysrgb&w=400',
//     },
//   ];

//   const getStatusIcon = (status: string, progress: number) => {
//     switch (status) {
//       case 'completed':
//         return <CheckCircle className="w-5 h-5 text-green-600" />;
//       case 'in-progress':
//         return <Play className="w-5 h-5 text-blue-600" />;
//       case 'locked':
//         return <Lock className="w-5 h-5 text-gray-400" />;
//       default:
//         return <Play className="w-5 h-5 text-gray-600" />;
//     }
//   };

//   const getDifficultyColor = (difficulty: string) => {
//     switch (difficulty) {
//       case 'Beginner':
//         return 'bg-green-100 text-green-700';
//       case 'Intermediate':
//         return 'bg-yellow-100 text-yellow-700';
//       case 'Advanced':
//         return 'bg-red-100 text-red-700';
//       default:
//         return 'bg-gray-100 text-gray-700';
//     }
//   };

//   const filteredModules = modules.filter(module => {
//     const matchesCategory = selectedCategory === 'all' || module.category === selectedCategory;
//     const matchesSearch = module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          module.description.toLowerCase().includes(searchTerm.toLowerCase());
//     return matchesCategory && matchesSearch;
//   });

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       {/* Header */}
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-900 mb-2">Learning Modules</h1>
//         <p className="text-gray-600">
//           Master essential skills for food donation, community building, and sustainable impact
//         </p>
//       </div>

//       {/* Search and Filter */}
//       <div className="mb-8">
//         <div className="flex flex-col sm:flex-row gap-4">
//           <div className="relative flex-1">
//             <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search modules..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//             />
//           </div>
//           <button className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
//             <Filter className="w-5 h-5" />
//             <span>Filters</span>
//           </button>
//         </div>
//       </div>

//       {/* Categories */}
//       <div className="mb-8">
//         <div className="flex flex-wrap gap-2">
//           {categories.map((category) => (
//             <button
//               key={category.id}
//               onClick={() => setSelectedCategory(category.id)}
//               className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
//                 selectedCategory === category.id
//                   ? 'bg-green-600 text-white shadow-md'
//                   : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//               }`}
//             >
//               {category.label} ({category.count})
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Modules Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredModules.map((module) => (
//           <div key={module.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
//             <div className="relative">
//               <img 
//                 src={module.thumbnail} 
//                 alt={module.title}
//                 className="w-full h-48 object-cover"
//               />
//               <div className="absolute top-4 left-4">
//                 <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(module.difficulty)}`}>
//                   {module.difficulty}
//                 </span>
//               </div>
//               <div className="absolute top-4 right-4">
//                 {getStatusIcon(module.status, module.progress)}
//               </div>
//               {module.progress > 0 && module.status === 'in-progress' && (
//                 <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2">
//                   <div className="w-full bg-gray-300 rounded-full h-1">
//                     <div 
//                       className="bg-green-500 h-1 rounded-full transition-all duration-300"
//                       style={{ width: `${module.progress}%` }}
//                     ></div>
//                   </div>
//                 </div>
//               )}
//             </div>

//             <div className="p-6">
//               <h3 className="text-lg font-semibold text-gray-900 mb-2">{module.title}</h3>
//               <p className="text-gray-600 text-sm mb-4 line-clamp-2">{module.description}</p>

//               <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
//                 <div className="flex items-center space-x-4">
//                   <div className="flex items-center space-x-1">
//                     <Clock className="w-4 h-4" />
//                     <span>{module.duration}</span>
//                   </div>
//                   <div className="flex items-center space-x-1">
//                     <BookOpen className="w-4 h-4" />
//                     <span>{module.lessons} lessons</span>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
//                 <div className="flex items-center space-x-1">
//                   <Users className="w-4 h-4" />
//                   <span>{module.students.toLocaleString()} students</span>
//                 </div>
//                 <div className="flex items-center space-x-1">
//                   <Star className="w-4 h-4 text-yellow-500 fill-current" />
//                   <span>{module.rating}</span>
//                 </div>
//               </div>

//               <button 
//                 className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
//                   module.status === 'locked'
//                     ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
//                     : module.status === 'completed'
//                     ? 'bg-green-100 text-green-700 hover:bg-green-200'
//                     : 'bg-green-600 text-white hover:bg-green-700 shadow-md hover:shadow-lg'
//                 }`}
//                 disabled={module.status === 'locked'}
//               >
//                 {module.status === 'locked' ? 'Unlock Required' :
//                  module.status === 'completed' ? 'Review Module' :
//                  module.status === 'in-progress' ? 'Continue Learning' :
//                  'Start Learning'}
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default LearningModules;

import { useState } from "react";
import { Baby, User, Phone, Mail } from "lucide-react";

export default function RTEEnrollmentPage() {
  const [rteEnrollmentForm, setRteEnrollmentForm] = useState({
    child_name: "",
    child_age: "",
    previous_schooling: "",
    parent_name: "",
    guardian_relation: "",
    parent_phone: "",
    parent_email: "",
    address: "",
    preferred_schools: "",
    documents: "",
    special_needs: "",
  });

  // const handleRTEEnrollmentSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   // TODO: Replace with Axios POST to your backend
  //   console.log("Form Submitted:", rteEnrollmentForm);
  // };

  const handleRTEEnrollmentSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
  
      try {
        const response = await fetch("http://localhost:8000/rte_api/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(rteEnrollmentForm),
        });
  
        if (response.ok) {
          alert(
            "RTE enrollment application submitted successfully! We will match the child with nearby schools having vacancies and contact you within 5-7 business days with admission details."
          );
          // Optionally reset the form
        } else {
          const errorData = await response.json();
          console.error("Submission error:", errorData);
          alert("Error submitting form.");
        }
      } catch (err) {
        console.error("Network error:", err);
        alert("Network error.");
      }
    };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">
          RTE Act School Enrollment
        </h2>
        <p className="text-gray-600">
          Register a vulnerable child for school admission
        </p>
      </div>

      <form
        onSubmit={handleRTEEnrollmentSubmit}
        className="space-y-6"
      >
        {/* Child Information */}
        <div className="bg-pink-50 p-4 rounded-lg">
          <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Baby className="h-5 w-5 text-pink-600 mr-2" />
            Child Information
          </h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Child's Full Name *
              </label>
              <input
                type="text"
                value={rteEnrollmentForm.child_name}
                onChange={(e) =>
                  setRteEnrollmentForm({
                    ...rteEnrollmentForm,
                    child_name: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                placeholder="Enter child's full name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Child's Age *
              </label>
              <select
                value={rteEnrollmentForm.child_age}
                onChange={(e) =>
                  setRteEnrollmentForm({
                    ...rteEnrollmentForm,
                    child_age: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                required
              >
                <option value="">Select age</option>
                {Array.from({ length: 12 }, (_, i) => i + 3).map((age) => (
                  <option key={age} value={age}>
                    {age} years
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Previous Schooling Experience
            </label>
            <textarea
              value={rteEnrollmentForm.previous_schooling}
              onChange={(e) =>
                setRteEnrollmentForm({
                  ...rteEnrollmentForm,
                  previous_schooling: e.target.value,
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              rows={2}
              placeholder="Has the child attended school before? If yes, provide details..."
            />
          </div>
        </div>

        {/* Parent/Guardian Information */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <User className="h-5 w-5 text-gray-600 mr-2" />
            Parent/Guardian Information
          </h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Parent/Guardian Name *
              </label>
              <input
                type="text"
                value={rteEnrollmentForm.parent_name}
                onChange={(e) =>
                  setRteEnrollmentForm({
                    ...rteEnrollmentForm,
                    parent_name: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                placeholder="Enter parent/guardian name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Relation to Child *
              </label>
              <select
                value={rteEnrollmentForm.guardian_relation}
                onChange={(e) =>
                  setRteEnrollmentForm({
                    ...rteEnrollmentForm,
                    guardian_relation: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                required
              >
                <option value="parent">Parent</option>
                <option value="guardian">Legal Guardian</option>
                <option value="relative">Relative</option>
                <option value="ngo">NGO Representative</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  type="tel"
                  value={rteEnrollmentForm.parent_phone}
                  onChange={(e) =>
                    setRteEnrollmentForm({
                      ...rteEnrollmentForm,
                      parent_phone: e.target.value,
                    })
                  }
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  placeholder="+91 98765 43210"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  value={rteEnrollmentForm.parent_email}
                  onChange={(e) =>
                    setRteEnrollmentForm({
                      ...rteEnrollmentForm,
                      parent_email: e.target.value,
                    })
                  }
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Complete Address *
            </label>
            <textarea
              value={rteEnrollmentForm.address}
              onChange={(e) =>
                setRteEnrollmentForm({
                  ...rteEnrollmentForm,
                  address: e.target.value,
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              rows={2}
              placeholder="Enter complete residential address"
              required
            />
          </div>
        </div>

        {/* School Preferences & Documents */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            School Preferences & Documents
          </h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Schools/Areas
              </label>
              <textarea
                value={rteEnrollmentForm.preferred_schools}
                onChange={(e) =>
                  setRteEnrollmentForm({
                    ...rteEnrollmentForm,
                    preferred_schools: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                rows={2}
                placeholder="List preferred schools or areas near your residence"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Available Documents
              </label>
              <textarea
                value={rteEnrollmentForm.documents}
                onChange={(e) =>
                  setRteEnrollmentForm({
                    ...rteEnrollmentForm,
                    documents: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                rows={2}
                placeholder="List available documents (Birth Certificate, Aadhar, Income Certificate, etc.)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Special Needs/Requirements
              </label>
              <textarea
                value={rteEnrollmentForm.special_needs}
                onChange={(e) =>
                  setRteEnrollmentForm({
                    ...rteEnrollmentForm,
                    special_needs: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                rows={2}
                placeholder="Any special needs, learning difficulties, or specific requirements"
              />
            </div>
          </div>
        </div>

        {/* RTE Information */}
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <h5 className="font-semibold text-green-800 mb-2">
            Right to Education (RTE) Act Benefits
          </h5>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• Free and compulsory education for children aged 6-14 years</li>
            <li>• 25% seats reserved in private schools for economically weaker sections</li>
            <li>• No admission fees or capitation fees</li>
            <li>• Free textbooks, uniforms, and mid-day meals</li>
            <li>• No detention policy until elementary education completion</li>
          </ul>
        </div>

        {/* Buttons */}
        <div className="flex space-x-4 pt-4">
          <button
            type="submit"
            className="flex-1 bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-700 transform hover:scale-105 transition-all duration-200"
          >
            Submit RTE Application
          </button>
        </div>
      </form>
    </div>
  );
}
