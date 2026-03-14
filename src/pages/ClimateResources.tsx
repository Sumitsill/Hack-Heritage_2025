import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Video, 
  Download, 
  ExternalLink, 
  Search,
  BookOpen,
  Headphones,
  Image as ImageIcon,
  Calendar,
  Zap,
  Tag,
  TrendingUp,
  Clock,
  ChevronRight,
  Filter,
  Check,
  Star,
  ArrowRight
} from 'lucide-react';

const ClimateResources = () => {
  const [selectedType, setSelectedType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const resourceTypes = [
    { id: 'all', label: 'All Library', count: 42, icon: BookOpen, color: 'emerald' },
    { id: 'articles', label: 'Articles', count: 15, icon: FileText, color: 'blue' },
    { id: 'videos', label: 'Videos', count: 12, icon: Video, color: 'rose' },
    { id: 'podcasts', label: 'Podcasts', count: 8, icon: Headphones, color: 'amber' },
    { id: 'infographics', label: 'Infographics', count: 7, icon: ImageIcon, color: 'indigo' },
  ];

  const resources = [
    { id: 1, type: 'articles', title: 'The Science of Hungerr Climate', description: 'Understanding how ancestral practices protected our ecosystems for centuries.', author: 'Dr. Emily Chen', date: '2024-01-15', time: '12 min', downloads: 2847, rating: 4.9, thumb: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=400', tags: ['Climate Science', 'Hungerr'], featured: true },
    { id: 2, type: 'videos', title: 'Renewable Hungerr Solutions', description: 'Exploring ancient irrigation and energy techniques adapted for the 21st century.', author: 'Green Future Films', date: '2024-01-10', time: '45 min', downloads: 1923, rating: 4.8, thumb: 'https://images.unsplash.com/photo-1466611653911-954ff21b6748?auto=format&fit=crop&q=80&w=400', tags: ['Renewable', 'Solar'], featured: true },
    { id: 3, type: 'podcasts', title: 'Oceanic Whispers', description: 'Weekly podcast featuring interviews with traditional marine conservationists.', author: 'Ocean Voices', date: '2024-01-08', time: '30 min', downloads: 3421, rating: 4.7, thumb: 'https://images.unsplash.com/photo-1439405326854-014607f694d7?auto=format&fit=crop&q=80&w=400', tags: ['Ocean', 'Marine'], featured: false },
    { id: 4, type: 'infographics', title: 'The Carbon Cycle Visualized', description: 'A high-definition visual breakdown of global carbon dynamics and human impact.', author: 'Climate Viz', date: '2024-01-05', time: '5 min', downloads: 1654, rating: 4.6, thumb: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=400', tags: ['Data', 'Visuals'], featured: false },
    { id: 5, type: 'articles', title: 'Vedic Farming Techniques', description: 'Modern agricultural productivity through traditional sustainable wisdom.', author: 'Prof. Maria Santos', date: '2024-01-03', time: '8 min', downloads: 987, rating: 4.5, thumb: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&q=80&w=400', tags: ['Agri', 'Susty'], featured: false },
    { id: 6, type: 'videos', title: 'Zero Waste: The Ancient Way', description: 'Practical strategies for minimalist urban living inspired by historical roots.', author: 'Eco Living', date: '2023-12-28', time: '25 min', downloads: 2156, rating: 4.8, thumb: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=400', tags: ['Waste', 'Urban'], featured: false },
  ];

  const filtered = resources.filter(r => (selectedType === 'all' || r.type === selectedType) && (r.title.toLowerCase().includes(searchTerm.toLowerCase())));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFE] font-outfit pt-10 pb-24 px-6 relative overflow-hidden">
      {/* Visual background accents */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-50/50 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/2 -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 -z-10" />

      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16">
           <div className="max-w-2xl">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/50 border border-emerald-200 text-emerald-700 text-[10px] font-black uppercase tracking-widest mb-6"
              >
                <Zap size={12} fill="currentColor" />
                Climate Literacy Hub
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-none mb-6"
              >
                Hungerr <span className="text-emerald-600">Wisdom</span> Library.
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-slate-500 text-lg font-medium leading-relaxed"
              >
                Explore a curated collection of data, documentaries, and ancestral insights precisely designed to navigate our environmental challenges.
              </motion.p>
           </div>
           <div className="w-full md:w-80">
              <div className="relative group">
                 <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
                 <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search repository..."
                  className="w-full py-5 pl-16 pr-6 bg-white border border-slate-100 rounded-[24px] shadow-sm outline-none focus:ring-4 focus:ring-emerald-50 focus:border-emerald-500 transition-all font-bold text-slate-900"
                 />
              </div>
           </div>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-3 overflow-x-auto pb-4 no-scrollbar mb-16">
           {resourceTypes.map((type) => (
             <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`flex items-center gap-3 px-8 py-3.5 rounded-2xl whitespace-nowrap transition-all ${
                selectedType === type.id 
                  ? 'bg-slate-900 text-white shadow-xl shadow-slate-200' 
                  : 'bg-white text-slate-400 border border-slate-100 hover:bg-slate-50'
              }`}
             >
               <type.icon size={18} />
               <span className="text-[11px] font-black uppercase tracking-widest">{type.label}</span>
               <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${selectedType === type.id ? 'bg-white/10' : 'bg-slate-50'}`}>{type.count}</span>
             </button>
           ))}
        </div>

        {/* Featured Section */}
        {selectedType === 'all' && !searchTerm && (
          <div className="mb-20">
             <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                   <Star size={24} className="text-amber-400" fill="currentColor" />
                   Editor's Pick
                </h2>
                <div className="flex gap-2">
                   <div className="w-10 h-1 h-px bg-slate-200" />
                </div>
             </div>
             
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {resources.filter(r => r.featured).map((res) => (
                   <motion.div 
                    key={res.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{ y: -8 }}
                    className="group bg-white rounded-[40px] p-8 border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col md:flex-row gap-8 overflow-hidden relative"
                   >
                     <div className="w-full md:w-52 h-48 md:h-auto rounded-[32px] overflow-hidden shrink-0 relative">
                        <img src={res.thumb} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                     </div>
                     <div className="flex-1 flex flex-col justify-between py-2">
                        <div>
                           <div className="flex items-center gap-3 mb-4">
                              <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full">{res.type}</span>
                              <span className="flex items-center gap-1.5 text-[10px] font-black text-slate-300 uppercase tracking-widest">
                                 <Clock size={12} />
                                 {res.time}
                              </span>
                           </div>
                           <h3 className="text-2xl font-black text-slate-900 leading-tight mb-3 group-hover:text-emerald-600 transition-colors uppercase tracking-tight">{res.title}</h3>
                           <p className="text-slate-400 text-sm font-medium line-clamp-2 leading-relaxed mb-6">{res.description}</p>
                        </div>
                        <div className="flex items-center justify-between mt-auto">
                           <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                                 <BookOpen size={14} />
                              </div>
                              <span className="text-[11px] font-black text-slate-900 uppercase">{res.author}</span>
                           </div>
                           <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-600 group-hover:translate-x-2 transition-transform">
                              Access <ChevronRight size={14} />
                           </button>
                        </div>
                     </div>
                   </motion.div>
                ))}
             </div>
          </div>
        )}

        {/* Regular Grid */}
        <div className="flex items-center justify-between mb-8">
           <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3">
              <TrendingUp size={24} className="text-indigo-500" />
              Pulse Explorer
           </h2>
           <div className="flex items-center gap-4 text-slate-400">
              <Filter size={16} />
              <span className="text-[10px] font-black uppercase tracking-widest">Sorting by Relevance</span>
           </div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filtered.map((resource) => (
            <motion.div 
              key={resource.id}
              variants={itemVariants}
              whileHover={{ y: -6 }}
              className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden group hover:shadow-2xl hover:shadow-slate-100 transition-all duration-500"
            >
              <div className="h-56 relative overflow-hidden">
                <img src={resource.thumb} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[2px] flex items-center justify-center">
                   <button className="p-4 bg-white rounded-2xl text-slate-900 shadow-xl active:scale-95 transition-all">
                      <ExternalLink size={20} />
                   </button>
                </div>
                <div className="absolute top-4 left-4 flex gap-2">
                   <div className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-xl flex items-center gap-2 shadow-sm">
                      <Tag size={12} className="text-emerald-500" />
                      <span className="text-[9px] font-black text-slate-900 uppercase tracking-widest">{resource.type}</span>
                   </div>
                </div>
              </div>
              
              <div className="p-8">
                <div className="flex items-center gap-4 mb-4">
                   <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{resource.date}</span>
                   <div className="h-1 w-1 rounded-full bg-slate-200" />
                   <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{resource.time}</span>
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-2 leading-tight uppercase tracking-tight group-hover:text-emerald-600 transition-colors h-14 line-clamp-2">{resource.title}</h3>
                <p className="text-slate-400 text-[13px] font-medium leading-relaxed mb-6 line-clamp-3">{resource.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                   {resource.tags.map(tag => (
                     <span key={tag} className="px-3 py-1 bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest rounded-lg border border-slate-100">#{tag}</span>
                   ))}
                </div>

                <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                   <div className="flex flex-col">
                      <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">Impact</span>
                      <div className="flex items-center gap-1 font-black text-emerald-600 text-xs">
                         <Download size={14} strokeWidth={3} />
                         {resource.downloads.toLocaleString()}
                      </div>
                   </div>
                   <button className="flex items-center gap-2 px-6 py-3 bg-slate-50 hover:bg-slate-900 hover:text-white rounded-xl transition-all text-[10px] font-black uppercase tracking-widest text-slate-400 group/btn">
                      Source
                      <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                   </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer Detail */}
        <div className="mt-24 text-center">
           <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-px bg-slate-200" />
              <div className="p-3 bg-white rounded-full border border-slate-100 shadow-sm">
                 <Check size={20} className="text-emerald-500" strokeWidth={3} />
              </div>
              <div className="w-12 h-px bg-slate-200" />
           </div>
           <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.5em]">Global Repository Token: CLH-1029-X • 2025</p>
        </div>
      </div>
    </div>
  );
};

export default ClimateResources;