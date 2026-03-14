import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Baby, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  BookOpen, 
  GraduationCap, 
  Building2, 
  FileText,
  ShieldCheck,
  ArrowRight,
  Info
} from "lucide-react";

export default function RTEEnrollmentPage() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rteEnrollmentForm, setRteEnrollmentForm] = useState({
    child_name: "",
    child_age: "",
    previous_schooling: "",
    parent_name: "",
    guardian_relation: "parent",
    parent_phone: "",
    parent_email: "",
    address: "",
    preferred_schools: "",
    documents: "",
    special_needs: "",
  });

  const handleRTEEnrollmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("http://localhost:8000/rte_api/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rteEnrollmentForm),
      });

      if (response.ok) {
        setStep(4); // Success Step
      } else {
        alert("Encountered an issue submitting the application. Please verify the details.");
      }
    } catch (err) {
      console.error(err);
      alert("Connectivity issue. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const pageVariants = {
    initial: { opacity: 0, y: 15 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -15 }
  };

  return (
    <div className="min-h-screen bg-[#FDFEFF] py-16 px-6 relative font-outfit">
      {/* Premium Background Blurs */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2 -z-10" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-50/50 rounded-full blur-[100px] translate-y-1/2 translate-x-1/2 -z-10" />

      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        {step < 4 && (
          <div className="text-center mb-16">
            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-xs font-black uppercase tracking-widest mb-6 border border-blue-100/50"
            >
              <GraduationCap size={14} />
              Educational Empowerment
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">RTE Act Enrollment</h1>
            <p className="text-slate-500 font-medium max-w-xl mx-auto leading-relaxed">
              Securing quality education for every child under the Right to Education Act. Complete this form to begin the admission process.
            </p>
          </div>
        )}

        {/* Multi-step Indicator */}
        {step < 4 && (
          <div className="max-w-2xl mx-auto mb-16 relative flex justify-between px-10">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 z-0" />
            <div 
              className="absolute top-1/2 left-0 h-0.5 bg-blue-500 -translate-y-1/2 z-0 transition-all duration-700 ease-in-out"
              style={{ width: `${((step - 1) / 2) * 100}%` }}
            />
            
            {[1, 2, 3].map((s) => (
              <div key={s} className="relative z-10 flex flex-col items-center">
                <motion.div
                  animate={{ 
                    scale: step === s ? 1.1 : 1,
                    backgroundColor: step >= s ? '#3b82f6' : '#ffffff',
                    color: step >= s ? '#ffffff' : '#94a3b8',
                    borderColor: step >= s ? '#3b82f6' : '#f1f5f9',
                    boxShadow: step === s ? '0 8px 16px -4px rgba(59, 130, 246, 0.4)' : 'none'
                  }}
                  className="w-10 h-10 rounded-xl border-2 flex items-center justify-center font-black text-sm transition-all duration-300"
                >
                  {step > s ? <Check size={18} strokeWidth={3} /> : s}
                </motion.div>
                <span className={`absolute top-14 whitespace-nowrap text-[9px] font-black uppercase tracking-widest ${step >= s ? 'text-slate-900' : 'text-slate-400'}`}>
                  {s === 1 ? 'Candidate' : s === 2 ? 'Guardian' : 'Submission'}
                </span>
              </div>
            ))}
          </div>
        )}

        <AnimatePresence mode="wait">
          {step === 4 ? (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-[40px] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.08)] p-16 text-center border border-slate-100"
            >
               <div className="w-24 h-24 bg-blue-50 rounded-[32px] flex items-center justify-center mx-auto mb-10 rotate-12">
                <ShieldCheck className="text-blue-600 w-12 h-12" strokeWidth={2.5} />
              </div>
              <h2 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">Application Standardized!</h2>
              <p className="text-slate-500 text-lg mb-10 max-w-md mx-auto font-medium leading-relaxed">
                Your RTE enrollment application has been logged. Our specialists will review the candidate details and coordinate with partnered schools.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => window.location.href = '/dashboard'}
                  className="px-10 py-5 bg-slate-900 text-white rounded-[24px] font-black hover:bg-black transition-all shadow-xl hover:shadow-slate-200 flex items-center justify-center gap-3"
                >
                  Return to Dashboard
                  <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={step}
              variants={pageVariants}
              initial="initial"
              animate="in"
              exit="out"
              className="bg-white rounded-[40px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.06)] border border-slate-100 overflow-hidden"
            >
              <form onSubmit={handleRTEEnrollmentSubmit}>
                <div className="p-8 md:p-14">
                  {step === 1 && (
                    <div className="space-y-10">
                       <div className="flex items-center gap-5">
                          <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                             <Baby size={30} />
                          </div>
                          <div>
                             <h3 className="text-2xl font-black text-slate-900 leading-none mb-2">Child's Profile</h3>
                             <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">General Information</p>
                          </div>
                       </div>

                       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                         <div className="md:col-span-2 space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Full Name *</label>
                            <input
                              required
                              type="text"
                              value={rteEnrollmentForm.child_name}
                              onChange={(e) => setRteEnrollmentForm({...rteEnrollmentForm, child_name: e.target.value})}
                              placeholder="Legal name as per birth certificate"
                              className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-500 outline-none transition-all font-bold text-slate-900 placeholder:text-slate-300"
                            />
                         </div>
                         <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Age *</label>
                            <select
                              required
                              value={rteEnrollmentForm.child_age}
                              onChange={(e) => setRteEnrollmentForm({...rteEnrollmentForm, child_age: e.target.value})}
                              className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-500 outline-none transition-all font-bold text-slate-900"
                            >
                              <option value="">Select Age</option>
                              {Array.from({ length: 12 }, (_, i) => i + 3).map((age) => (
                                <option key={age} value={age}>{age} Years Old</option>
                              ))}
                            </select>
                         </div>
                       </div>

                       <div className="space-y-4">
                          <div className="flex items-center gap-2">
                             <BookOpen size={14} className="text-blue-500" />
                             <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Previous Schooling</label>
                          </div>
                          <textarea
                            value={rteEnrollmentForm.previous_schooling}
                            onChange={(e) => setRteEnrollmentForm({...rteEnrollmentForm, previous_schooling: e.target.value})}
                            placeholder="Detail any previous educational background or developmental milestones..."
                            rows={3}
                            className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-500 outline-none transition-all font-bold text-slate-900 resize-none leading-relaxed"
                          />
                       </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-10">
                       <div className="flex items-center gap-5">
                          <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                             <User size={28} />
                          </div>
                          <div>
                             <h3 className="text-2xl font-black text-slate-900 leading-none mb-2">Guardian Context</h3>
                             <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">Contact & Relations</p>
                          </div>
                       </div>

                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Guardian Name *</label>
                            <div className="relative">
                              <User size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" />
                              <input
                                required
                                type="text"
                                value={rteEnrollmentForm.parent_name}
                                onChange={(e) => setRteEnrollmentForm({...rteEnrollmentForm, parent_name: e.target.value})}
                                placeholder="Full name of primary guardian"
                                className="w-full pl-14 pr-6 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-500 outline-none transition-all font-bold text-slate-900"
                              />
                            </div>
                         </div>
                         <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Relationship *</label>
                            <select
                              required
                              value={rteEnrollmentForm.guardian_relation}
                              onChange={(e) => setRteEnrollmentForm({...rteEnrollmentForm, guardian_relation: e.target.value})}
                              className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-500 outline-none transition-all font-bold text-slate-900"
                            >
                              <option value="parent">Parent</option>
                              <option value="guardian">Legal Guardian</option>
                              <option value="relative">Relative</option>
                              <option value="ngo">NGO Representative</option>
                            </select>
                         </div>
                         <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Phone Number *</label>
                            <div className="relative">
                              <Phone size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" />
                              <input
                                required
                                type="tel"
                                value={rteEnrollmentForm.parent_phone}
                                onChange={(e) => setRteEnrollmentForm({...rteEnrollmentForm, parent_phone: e.target.value})}
                                placeholder="+91 XXXX XXX XXX"
                                className="w-full pl-14 pr-6 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-500 outline-none transition-all font-bold text-slate-900"
                              />
                            </div>
                         </div>
                         <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Email <span className="normal-case opacity-40 font-bold">(Optional)</span></label>
                            <div className="relative">
                              <Mail size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" />
                              <input
                                type="email"
                                value={rteEnrollmentForm.parent_email}
                                onChange={(e) => setRteEnrollmentForm({...rteEnrollmentForm, parent_email: e.target.value})}
                                placeholder="name@email.com"
                                className="w-full pl-14 pr-6 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-500 outline-none transition-all font-bold text-slate-900"
                              />
                            </div>
                         </div>
                       </div>

                       <div className="space-y-4">
                          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Residential Address *</label>
                          <textarea
                            required
                            value={rteEnrollmentForm.address}
                            onChange={(e) => setRteEnrollmentForm({...rteEnrollmentForm, address: e.target.value})}
                            placeholder="Complete street address, landmarks, and pin code..."
                            rows={3}
                            className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-500 outline-none transition-all font-bold text-slate-900 resize-none"
                          />
                       </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-10">
                       <div className="flex items-center gap-5">
                          <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-white">
                             <Building2 size={26} />
                          </div>
                          <div>
                             <h3 className="text-2xl font-black text-slate-900 leading-none mb-2">Finalization</h3>
                             <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">Preferences & Documents</p>
                          </div>
                       </div>

                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-4">
                            <div className="flex items-center gap-2">
                               <MapPin size={14} className="text-blue-500" />
                               <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Preferred Localized Schools</label>
                            </div>
                            <textarea
                              value={rteEnrollmentForm.preferred_schools}
                              onChange={(e) => setRteEnrollmentForm({...rteEnrollmentForm, preferred_schools: e.target.value})}
                              placeholder="Which schools are closest to your home?"
                              rows={4}
                              className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent rounded-3xl focus:bg-white focus:border-blue-500 outline-none transition-all font-bold text-slate-900 resize-none shadow-sm"
                            />
                          </div>
                          <div className="space-y-4">
                            <div className="flex items-center gap-2">
                               <FileText size={14} className="text-blue-500" />
                               <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Available Documentation</label>
                            </div>
                            <textarea
                              value={rteEnrollmentForm.documents}
                              onChange={(e) => setRteEnrollmentForm({...rteEnrollmentForm, documents: e.target.value})}
                              placeholder="e.g., Aadhar, Birth Cert, Income Proof..."
                              rows={4}
                              className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent rounded-3xl focus:bg-white focus:border-blue-500 outline-none transition-all font-bold text-slate-900 resize-none shadow-sm"
                            />
                          </div>
                       </div>

                       <div className="bg-blue-600 rounded-[32px] p-8 text-white relative overflow-hidden shadow-2xl shadow-blue-200">
                          <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12">
                             <BookOpen size={120} />
                          </div>
                          <div className="flex items-start gap-5 relative z-10">
                             <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                                <Info size={24} className="text-white" />
                             </div>
                             <div>
                                <h4 className="text-lg font-black uppercase tracking-wider mb-2">RTE Act Benefits</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 opacity-90 font-bold text-xs uppercase tracking-widest">
                                   <p>• 100% Free Primary Education</p>
                                   <p>• 25% Reserved Private Seats</p>
                                   <p>• Free Uniforms & Textbooks</p>
                                   <p>• No Admission Assessment</p>
                                </div>
                             </div>
                          </div>
                       </div>
                    </div>
                  )}
                </div>

                <div className="bg-slate-50/50 p-10 flex items-center justify-between border-t border-slate-100">
                   <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    disabled={step === 1 || isSubmitting}
                    className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${
                      step === 1 ? 'opacity-0 pointer-events-none' : 'text-slate-400 hover:text-slate-900 hover:bg-white shadow-sm'
                    }`}
                   >
                    <ChevronLeft size={16} strokeWidth={3} />
                    Previous Phase
                   </button>

                   <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`flex items-center gap-3 px-10 py-4 bg-blue-600 text-white rounded-[24px] font-black text-[10px] uppercase tracking-[0.2em] hover:bg-blue-700 shadow-xl shadow-blue-500/20 active:scale-95 transition-all disabled:opacity-50`}
                   >
                    {isSubmitting ? 'Verifying...' : step === 3 ? 'Finalize Registration' : 'Continue'}
                    {!isSubmitting && <ChevronRight size={16} strokeWidth={3} />}
                   </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="text-center mt-12 text-slate-300 text-[9px] font-black uppercase tracking-[0.4em]">
          Official Enrollment Gateway • Powered by Hack Heritage
        </p>
      </div>
    </div>
  );
}
