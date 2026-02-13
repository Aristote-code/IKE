import React from 'react';
import { ArrowLeft, Mail, Phone, MapPin, Calendar, Edit2, Download } from 'lucide-react';

interface Props {
  onBack: () => void;
}

export const StudentDetail: React.FC<Props> = ({ onBack }) => {
  return (
    <div className="animate-in fade-in slide-in-from-right-8 duration-300">
      <button 
        onClick={onBack}
        className="mb-4 flex items-center text-sm text-slate-500 hover:text-indigo-600 transition-colors"
      >
        <ArrowLeft size={16} className="mr-1" /> Back to List
      </button>

      {/* Header Profile */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="flex items-start gap-5">
            <div className="h-20 w-20 rounded-full bg-slate-100 flex items-center justify-center text-2xl font-bold text-slate-400 border-4 border-white shadow-sm">
              AO
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Anders Olsson</h1>
              <div className="flex items-center gap-3 mt-1 text-sm text-slate-500">
                <span className="font-mono">20070207-4265</span>
                <span className="h-1 w-1 rounded-full bg-slate-300"></span>
                <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded text-xs font-medium border border-emerald-100">KAA Youth</span>
              </div>
              <div className="flex flex-wrap gap-4 mt-4 text-sm text-slate-600">
                <div className="flex items-center gap-1.5"><Mail size={14} /> anders.o@example.com</div>
                <div className="flex items-center gap-1.5"><Phone size={14} /> 074-943820</div>
                <div className="flex items-center gap-1.5"><MapPin size={14} /> Drottninggatan 69, Kristianstad</div>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
             <button className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2">
              <Download size={16} /> Export Data
            </button>
            <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium shadow-sm flex items-center gap-2">
              <Edit2 size={16} /> Edit Profile
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Tabs area */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="border-b border-slate-200 px-6 flex gap-6">
               <button className="py-4 text-sm font-medium text-indigo-600 border-b-2 border-indigo-600">Occupation & Activities</button>
               <button className="py-4 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors">Personal Data</button>
               <button className="py-4 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors">Documents</button>
             </div>
             
             <div className="p-6">
               <h3 className="font-bold text-lg text-slate-900 mb-4">Current Activities</h3>
               
               <div className="space-y-4">
                  {/* Activity Card 1 */}
                  <div className="border border-slate-200 rounded-lg p-4 bg-slate-50 flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-slate-900">Internship</h4>
                      <p className="text-sm text-slate-500">Local Mechanics Shop • Start: Jan 1, 2025</p>
                    </div>
                    <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-600 shadow-sm">Planned</span>
                  </div>

                   {/* Activity Card 2 */}
                   <div className="border border-emerald-100 rounded-lg p-4 bg-emerald-50/50 flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-slate-900">Study Guidance</h4>
                      <p className="text-sm text-slate-500">Completed on Sep 20, 2024</p>
                    </div>
                    <span className="px-3 py-1 bg-emerald-100 border border-emerald-200 rounded-full text-xs font-bold text-emerald-700">Completed</span>
                  </div>
               </div>

               <div className="mt-8">
                 <h3 className="font-bold text-lg text-slate-900 mb-4">School History</h3>
                 <div className="relative pl-4 border-l-2 border-slate-200 space-y-6">
                    <div className="relative">
                      <div className="absolute -left-[21px] top-1 h-3 w-3 rounded-full bg-slate-300 border-2 border-white"></div>
                      <p className="text-sm text-slate-500 mb-0.5">2023 - Present</p>
                      <p className="font-medium text-slate-900">Katedralskolan</p>
                      <p className="text-sm text-slate-600">Natural Science Program</p>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-[21px] top-1 h-3 w-3 rounded-full bg-slate-300 border-2 border-white"></div>
                      <p className="text-sm text-slate-500 mb-0.5">2018 - 2022</p>
                      <p className="font-medium text-slate-900">Centralskolan</p>
                      <p className="text-sm text-slate-600">Grades 6-9</p>
                    </div>
                 </div>
               </div>
             </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
             <h3 className="font-bold text-slate-900 mb-4">Key Information</h3>
             <dl className="space-y-4 text-sm">
               <div>
                 <dt className="text-slate-500 mb-1">Home Municipality</dt>
                 <dd className="font-medium text-slate-900 flex items-center justify-between">
                   Kristianstad (1290)
                 </dd>
               </div>
               <div className="pt-4 border-t border-slate-100">
                 <dt className="text-slate-500 mb-1">Previous Municipality</dt>
                 <dd className="font-medium text-slate-900">
                   Stockholm (0180)
                   <span className="block text-xs font-normal text-slate-400 mt-0.5">Moved June 2022</span>
                 </dd>
               </div>
               <div className="pt-4 border-t border-slate-100">
                 <dt className="text-slate-500 mb-1">Responsible Officer</dt>
                 <dd className="font-medium text-slate-900">Maria Larsson</dd>
               </div>
             </dl>
           </div>
        </div>
      </div>
    </div>
  );
};