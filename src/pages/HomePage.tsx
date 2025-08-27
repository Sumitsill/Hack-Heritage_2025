import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  MapPin,
  Brain,
  Users,
  Utensils,
  Clock,
  Shield,
  Baby,
  X,
  User,
  Phone,
  Mail,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import VoiceAssistant from "../components/voice assistance";
export default function HomePage() {
  const { t } = useLanguage();

  const [showRTEEnrollmentForm, setShowRTEEnrollmentForm] = useState(false);
  const [rteEnrollmentForm, setRteEnrollmentForm] = useState({
    child_name: "",
    child_age: "",
    previous_schooling: "", // This line was missing in the original code
    parent_name: "",
    guardian_relation: "parent",
    parent_phone: "",
    parent_email: "",
    address: "",
    preferred_schools: "",
    documents: "",
    special_needs: "",
  });

  // const handleRTEEnrollmentSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   console.log("Form Submitted: ", rteEnrollmentForm);
  //   setShowRTEEnrollmentForm(false); // Close modal after submit
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
  

  const stats = [
    { value: "10M+", label: t("stats.food_saved"), icon: Utensils },
    { value: "50K+", label: t("stats.users"), icon: Users },
    { value: "500+", label: t("stats.locations"), icon: MapPin },
  ];

  const features = [
    {
      icon: MapPin,
      title: t("features.map.title"),
      description: t("features.map.desc"),
      gradient: "from-emerald-500 to-green-600",
    },
    {
      icon: Brain,
      title: t("features.ai.title"),
      description: t("features.ai.desc"),
      gradient: "from-blue-500 to-purple-600",
    },
    {
      icon: Users,
      title: t("features.community.title"),
      description: t("features.community.desc"),
      gradient: "from-orange-500 to-red-600",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* RTE Enrollment Button */}
      {/* <button
          onClick={() => setShowRTEEnrollmentForm(true)}
          className="px-4 py-2 bg-pink-600 text-white rounded-lg font-semibold hover:bg-pink-700 transition"
        >
          RTE Enrollment
      </button> */}
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-50 to-green-100 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/6995247/pexels-photo-6995247.jpeg')] bg-cover bg-center opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {t("hero.title")}
            </motion.h1>

            <motion.p
              className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {t("hero.subtitle")}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link
                to="/contribute"
                className="inline-flex items-center px-8 py-4 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                {t("hero.cta")}
                <ArrowRight size={20} className="ml-2" />
              </Link>

              <Link
                to="/map"
                className="inline-flex items-center px-8 py-4 bg-white text-emerald-600 font-semibold rounded-lg border-2 border-emerald-600 hover:bg-emerald-50 transition-colors shadow-lg"
              >
                Explore Food Map
                <MapPin size={20} className="ml-2" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {/* <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
                    <Icon size={32} className="text-emerald-600" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                  <p className="text-gray-600">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section> */}

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How Hungerr Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform leverages technology and community to create an
              efficient food distribution network
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ y: -5 }}
                >
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-xl mb-6`}
                  >
                    <Icon size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-green-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {t("contribute.title")}
            </h2>
            <p className="text-xl text-emerald-100 mb-8">
              {t("contribute.desc")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contribute"
                className="inline-flex items-center px-8 py-4 bg-white text-emerald-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
              >
                Start Contributing
                <ArrowRight size={20} className="ml-2" />
              </Link>
              <Link
                to="/map"
                className="inline-flex items-center px-8 py-4 bg-transparent text-white font-semibold rounded-lg border-2 border-white hover:bg-white hover:text-emerald-600 transition-colors"
              >
                Find Food Near You
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simple Steps, Big Impact
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands making a difference in their communities
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Share Surplus Food",
                description:
                  "List your excess food with photos, quantity, and pickup details",
                icon: Utensils,
              },
              {
                step: "02",
                title: "Smart Matching",
                description:
                  "Our AI connects your donation with nearby people in need",
                icon: Brain,
              },
              {
                step: "03",
                title: "Safe Collection",
                description:
                  "Verified volunteers coordinate pickup and distribution",
                icon: Shield,
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <div className="relative mb-8">
                    <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon size={32} className="text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {item.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      <VoiceAssistant />
      {/* RTE Enrollment Modal */}
            {showRTEEnrollmentForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="bg-pink-100 p-2 rounded-lg">
                          <Baby className="h-6 w-6 text-pink-600" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900">
                            RTE Act School Enrollment
                          </h3>
                          <p className="text-gray-600">
                            Register a vulnerable child for school admission
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setShowRTEEnrollmentForm(false)}
                        className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                      >
                        <X className="h-6 w-6" />
                      </button>
                    </div>
                  </div>

                  <form
                    onSubmit={handleRTEEnrollmentSubmit}
                    className="p-6 space-y-6"
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
                            <option value="3">3 years</option>
                            <option value="4">4 years</option>
                            <option value="5">5 years</option>
                            <option value="6">6 years</option>
                            <option value="7">7 years</option>
                            <option value="8">8 years</option>
                            <option value="9">9 years</option>
                            <option value="10">10 years</option>
                            <option value="11">11 years</option>
                            <option value="12">12 years</option>
                            <option value="13">13 years</option>
                            <option value="14">14 years</option>
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
                      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        {/* <Clipboard className="h-5 w-5 text-blue-600 mr-2" /> */}
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
                        <li>
                          • Free and compulsory education for children aged 6-14
                          years
                        </li>
                        <li>
                          • 25% seats reserved in private schools for
                          economically weaker sections
                        </li>
                        <li>• No admission fees or capitation fees</li>
                        <li>• Free textbooks, uniforms, and mid-day meals</li>
                        <li>
                          • No detention policy until elementary education
                          completion
                        </li>
                      </ul>
                    </div>

                    <div className="flex space-x-4 pt-4">
                      <button
                        type="submit"
                        className="flex-1 bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-700 transform hover:scale-105 transition-all duration-200"
                      >
                        Submit RTE Application
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowRTEEnrollmentForm(false)}
                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
    </div>
  );
}
