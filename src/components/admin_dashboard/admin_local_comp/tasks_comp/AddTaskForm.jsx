// import { useState } from "react";
// import { FiUpload, FiLink, FiImage, FiCalendar, FiDollarSign, FiTarget, FiRepeat, FiLock, FiUnlock } from "react-icons/fi";

// const ORANGE = "#FF6B00";
// const ORANGE_LIGHT = "#FF8C00";

// const AddTaskForm = () => {
//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     longDescription: "",
//     reward: 0,
//     type: "daily",
//     category: "general",
//     target: 1,
//     expiry: "",
//     image: null,
//     imagePreview: null,
//     link: "",
//     linkText: "Start Task",
//     requirements: "",
//     prerequisites: "",
//     repeatable: false,
//     repeatCooldown: 24,
//     featured: false,
//     difficulty: "medium",
//     points: 0,
//   });

//   const [activeTab, setActiveTab] = useState("basic");
//   const [errors, setErrors] = useState({});

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setForm({
//           ...form,
//           image: file,
//           imagePreview: reader.result
//         });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!form.title.trim()) newErrors.title = "Task title is required";
//     if (!form.description.trim()) newErrors.description = "Short description is required";
//     if (form.reward <= 0) newErrors.reward = "Reward must be greater than 0";
//     if (!form.link.trim()) newErrors.link = "Task link is required";
//     if (form.link && !form.link.startsWith('http')) {
//       newErrors.link = "Link must start with http:// or https://";
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       console.log("New task:", form);
//       alert("✨ Task created successfully!");
//       // API call would go here
//     }
//   };

//   return (
//     <div className="bg-[#0A0A0A] rounded-2xl shadow-2xl border border-[rgba(255,107,0,0.15)] overflow-hidden">
//       {/* Header with orange gradient */}
//       <div className="relative bg-gradient-to-r from-[#0A0A0A] to-[#1A1A1A] px-6 py-5 border-b border-[rgba(255,107,0,0.15)]">
//         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,107,0,0.08),transparent_50%)]"></div>
//         <div className="relative flex items-center gap-3">
//           <div className="w-10 h-10 bg-[rgba(255,107,0,0.1)] rounded-xl flex items-center justify-center border border-[rgba(255,107,0,0.2)]">
//             <FiTarget className="text-[#FF6B00] w-5 h-5" />
//           </div>
//           <div>
//             <h2 className="text-xl font-bold text-white">Create New Task</h2>
//             <p className="text-gray-400 text-sm">Design a task for users to complete and earn rewards</p>
//           </div>
//         </div>
//       </div>

//       {/* Tab Navigation */}
//       <div className="flex border-b border-[rgba(255,107,0,0.1)] px-6 pt-2">
//         {[
//           { id: "basic", label: "Basic Info", icon: "📋" },
//           { id: "media", label: "Media & Link", icon: "🖼️" },
//           { id: "advanced", label: "Advanced", icon: "⚙️" }
//         ].map((tab) => (
//           <button
//             key={tab.id}
//             onClick={() => setActiveTab(tab.id)}
//             className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
//               activeTab === tab.id
//                 ? "border-[#FF6B00] text-[#FF6B00]"
//                 : "border-transparent text-gray-500 hover:text-gray-300"
//             }`}
//           >
//             <span className="mr-2">{tab.icon}</span>
//             {tab.label}
//           </button>
//         ))}
//       </div>

//       <form onSubmit={handleSubmit} className="p-6 space-y-6">
//         {/* Basic Info Tab */}
//         {activeTab === "basic" && (
//           <div className="space-y-5 animate-fadeIn">
//             {/* Task Title */}
//             <div className="space-y-1.5">
//               <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
//                 <span className="w-1 h-4 bg-[#FF6B00] rounded-full"></span>
//                 Task Title <span className="text-[#FF6B00]">*</span>
//               </label>
//               <input
//                 type="text"
//                 value={form.title}
//                 onChange={(e) => setForm({ ...form, title: e.target.value })}
//                 className={`w-full px-4 py-3 bg-[#1A1A1A] border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] transition-all ${
//                   errors.title ? 'border-red-500' : 'border-[rgba(255,107,0,0.2)]'
//                 }`}
//                 placeholder="e.g., Complete 3 Surveys"
//               />
//               {errors.title && (
//                 <p className="text-xs text-red-400 mt-1">{errors.title}</p>
//               )}
//             </div>

//             {/* Short Description */}
//             <div className="space-y-1.5">
//               <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
//                 <span className="w-1 h-4 bg-[#FF6B00] rounded-full"></span>
//                 Short Description <span className="text-[#FF6B00]">*</span>
//               </label>
//               <input
//                 type="text"
//                 value={form.description}
//                 onChange={(e) => setForm({ ...form, description: e.target.value })}
//                 className="w-full px-4 py-3 bg-[#1A1A1A] border border-[rgba(255,107,0,0.2)] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
//                 placeholder="Brief description shown on task card"
//               />
//             </div>

//             {/* Long Description */}
//             <div className="space-y-1.5">
//               <label className="text-sm font-medium text-gray-300">Full Description</label>
//               <textarea
//                 value={form.longDescription}
//                 onChange={(e) => setForm({ ...form, longDescription: e.target.value })}
//                 rows={4}
//                 className="w-full px-4 py-3 bg-[#1A1A1A] border border-[rgba(255,107,0,0.2)] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
//                 placeholder="Detailed instructions and information about the task..."
//               />
//             </div>

//             {/* Task Type & Category */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="space-y-1.5">
//                 <label className="text-sm font-medium text-gray-300">Task Type</label>
//                 <select
//                   value={form.type}
//                   onChange={(e) => setForm({ ...form, type: e.target.value })}
//                   className="w-full px-4 py-3 bg-[#1A1A1A] border border-[rgba(255,107,0,0.2)] rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
//                 >
//                   <option value="daily">Daily</option>
//                   <option value="weekly">Weekly</option>
//                   <option value="one-time">One-Time</option>
//                   <option value="achievement">Achievement</option>
//                   <option value="challenge">Challenge</option>
//                 </select>
//               </div>

//               <div className="space-y-1.5">
//                 <label className="text-sm font-medium text-gray-300">Category</label>
//                 <select
//                   value={form.category}
//                   onChange={(e) => setForm({ ...form, category: e.target.value })}
//                   className="w-full px-4 py-3 bg-[#1A1A1A] border border-[rgba(255,107,0,0.2)] rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
//                 >
//                   <option value="general">General</option>
//                   <option value="social">Social</option>
//                   <option value="game">Game Related</option>
//                   <option value="survey">Survey Related</option>
//                   <option value="referral">Referral</option>
//                   <option value="content">Content Creation</option>
//                 </select>
//               </div>
//             </div>

//             {/* Difficulty & Points */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="space-y-1.5">
//                 <label className="text-sm font-medium text-gray-300">Difficulty</label>
//                 <select
//                   value={form.difficulty}
//                   onChange={(e) => setForm({ ...form, difficulty: e.target.value })}
//                   className="w-full px-4 py-3 bg-[#1A1A1A] border border-[rgba(255,107,0,0.2)] rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
//                 >
//                   <option value="easy">Easy</option>
//                   <option value="medium">Medium</option>
//                   <option value="hard">Hard</option>
//                   <option value="expert">Expert</option>
//                 </select>
//               </div>

//               <div className="space-y-1.5">
//                 <label className="text-sm font-medium text-gray-300">Points</label>
//                 <input
//                   type="number"
//                   value={form.points}
//                   onChange={(e) => setForm({ ...form, points: parseInt(e.target.value) })}
//                   className="w-full px-4 py-3 bg-[#1A1A1A] border border-[rgba(255,107,0,0.2)] rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
//                   placeholder="0"
//                 />
//               </div>
//             </div>

//             {/* Reward & Target */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="space-y-1.5">
//                 <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
//                   <FiDollarSign className="text-[#FF6B00]" />
//                   Reward ($) <span className="text-[#FF6B00]">*</span>
//                 </label>
//                 <input
//                   type="number"
//                   step="0.1"
//                   value={form.reward}
//                   onChange={(e) => setForm({ ...form, reward: parseFloat(e.target.value) })}
//                   className={`w-full px-4 py-3 bg-[#1A1A1A] border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#FF6B00] ${
//                     errors.reward ? 'border-red-500' : 'border-[rgba(255,107,0,0.2)]'
//                   }`}
//                   placeholder="0.00"
//                 />
//               </div>

//               <div className="space-y-1.5">
//                 <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
//                   <FiTarget className="text-[#FF6B00]" />
//                   Target (times to complete)
//                 </label>
//                 <input
//                   type="number"
//                   value={form.target}
//                   onChange={(e) => setForm({ ...form, target: parseInt(e.target.value) })}
//                   min="1"
//                   className="w-full px-4 py-3 bg-[#1A1A1A] border border-[rgba(255,107,0,0.2)] rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
//                 />
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Media & Link Tab */}
//         {activeTab === "media" && (
//           <div className="space-y-6 animate-fadeIn">
//             {/* Image Upload */}
//             <div className="space-y-1.5">
//               <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
//                 <FiImage className="text-[#FF6B00]" />
//                 Task Image
//               </label>
              
//               {form.imagePreview ? (
//                 <div className="relative rounded-xl overflow-hidden border-2 border-[rgba(255,107,0,0.3)]">
//                   <img src={form.imagePreview} alt="Preview" className="w-full h-48 object-cover" />
//                   <button
//                     type="button"
//                     onClick={() => setForm({ ...form, image: null, imagePreview: null })}
//                     className="absolute top-2 right-2 bg-black/70 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
//                   >
//                     ✕
//                   </button>
//                 </div>
//               ) : (
//                 <div className="border-2 border-dashed border-[rgba(255,107,0,0.2)] rounded-xl p-8 text-center hover:border-[#FF6B00] transition-colors group cursor-pointer">
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleImageUpload}
//                     className="hidden"
//                     id="task-image"
//                   />
//                   <label htmlFor="task-image" className="cursor-pointer flex flex-col items-center">
//                     <FiUpload className="w-10 h-10 text-gray-600 group-hover:text-[#FF6B00] transition-colors mb-3" />
//                     <span className="text-sm text-gray-400 group-hover:text-white transition-colors">
//                       Click to upload task image
//                     </span>
//                     <span className="text-xs text-gray-600 mt-2">PNG, JPG, WebP up to 5MB</span>
//                   </label>
//                 </div>
//               )}
//             </div>

//             {/* Task Link */}
//             <div className="space-y-1.5">
//               <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
//                 <FiLink className="text-[#FF6B00]" />
//                 Task Link / URL <span className="text-[#FF6B00]">*</span>
//               </label>
//               <input
//                 type="url"
//                 value={form.link}
//                 onChange={(e) => setForm({ ...form, link: e.target.value })}
//                 className={`w-full px-4 py-3 bg-[#1A1A1A] border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] ${
//                   errors.link ? 'border-red-500' : 'border-[rgba(255,107,0,0.2)]'
//                 }`}
//                 placeholder="https://example.com/task"
//               />
//               {errors.link && (
//                 <p className="text-xs text-red-400 mt-1">{errors.link}</p>
//               )}
//               <p className="text-xs text-gray-500 mt-1">
//                 Users will be redirected to this link when they click the task
//               </p>
//             </div>

//             {/* Button Text */}
//             <div className="space-y-1.5">
//               <label className="text-sm font-medium text-gray-300">Button Text</label>
//               <input
//                 type="text"
//                 value={form.linkText}
//                 onChange={(e) => setForm({ ...form, linkText: e.target.value })}
//                 className="w-full px-4 py-3 bg-[#1A1A1A] border border-[rgba(255,107,0,0.2)] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
//                 placeholder="Start Task"
//               />
//             </div>

//             {/* Expiry Date */}
//             <div className="space-y-1.5">
//               <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
//                 <FiCalendar className="text-[#FF6B00]" />
//                 Expiry Date (Optional)
//               </label>
//               <input
//                 type="date"
//                 value={form.expiry}
//                 onChange={(e) => setForm({ ...form, expiry: e.target.value })}
//                 className="w-full px-4 py-3 bg-[#1A1A1A] border border-[rgba(255,107,0,0.2)] rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
//               />
//             </div>
//           </div>
//         )}

//         {/* Advanced Tab */}
//         {activeTab === "advanced" && (
//           <div className="space-y-5 animate-fadeIn">
//             {/* Requirements */}
//             <div className="space-y-1.5">
//               <label className="text-sm font-medium text-gray-300">Requirements</label>
//               <textarea
//                 value={form.requirements}
//                 onChange={(e) => setForm({ ...form, requirements: e.target.value })}
//                 rows={3}
//                 className="w-full px-4 py-3 bg-[#1A1A1A] border border-[rgba(255,107,0,0.2)] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
//                 placeholder="What users need to do to complete this task..."
//               />
//             </div>

//             {/* Prerequisites */}
//             <div className="space-y-1.5">
//               <label className="text-sm font-medium text-gray-300">Prerequisites</label>
//               <textarea
//                 value={form.prerequisites}
//                 onChange={(e) => setForm({ ...form, prerequisites: e.target.value })}
//                 rows={2}
//                 className="w-full px-4 py-3 bg-[#1A1A1A] border border-[rgba(255,107,0,0.2)] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
//                 placeholder="What users need before attempting this task..."
//               />
//             </div>

//             {/* Repeatable & Cooldown */}
//             <div className="space-y-4">
//               <div className="flex items-center gap-3 p-4 bg-[#1A1A1A] rounded-xl border border-[rgba(255,107,0,0.1)]">
//                 <div className="flex items-center gap-2 flex-1">
//                   <FiRepeat className={`text-[#FF6B00] ${form.repeatable ? 'opacity-100' : 'opacity-50'}`} />
//                   <span className="text-sm text-gray-300">Repeatable Task</span>
//                 </div>
//                 <label className="relative inline-flex items-center cursor-pointer">
//                   <input
//                     type="checkbox"
//                     checked={form.repeatable}
//                     onChange={(e) => setForm({ ...form, repeatable: e.target.checked })}
//                     className="sr-only peer"
//                   />
//                   <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#FF6B00] rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF6B00]"></div>
//                 </label>
//               </div>

//               {form.repeatable && (
//                 <div className="pl-4">
//                   <label className="text-sm font-medium text-gray-300 mb-2 block">
//                     Cooldown (hours)
//                   </label>
//                   <input
//                     type="number"
//                     value={form.repeatCooldown}
//                     onChange={(e) => setForm({ ...form, repeatCooldown: parseInt(e.target.value) })}
//                     min="1"
//                     className="w-32 px-4 py-2 bg-[#1A1A1A] border border-[rgba(255,107,0,0.2)] rounded-lg text-white"
//                   />
//                 </div>
//               )}
//             </div>

//             {/* Featured Toggle */}
//             <div className="flex items-center gap-3 p-4 bg-[#1A1A1A] rounded-xl border border-[rgba(255,107,0,0.1)]">
//               <div className="flex items-center gap-2 flex-1">
//                 <span className="text-yellow-500">⭐</span>
//                 <span className="text-sm text-gray-300">Featured Task</span>
//               </div>
//               <label className="relative inline-flex items-center cursor-pointer">
//                 <input
//                   type="checkbox"
//                   checked={form.featured}
//                   onChange={(e) => setForm({ ...form, featured: e.target.checked })}
//                   className="sr-only peer"
//                 />
//                 <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#FF6B00] rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF6B00]"></div>
//               </label>
//             </div>
//           </div>
//         )}

//         {/* Task Preview Card */}
//         <div className="mt-8 p-5 bg-[#1A1A1A] rounded-xl border border-[rgba(255,107,0,0.15)]">
//           <h3 className="text-sm font-medium text-gray-400 mb-4 flex items-center gap-2">
//             <span className="w-1 h-4 bg-[#FF6B00] rounded-full"></span>
//             Preview - How users will see it
//           </h3>
          
//           <div className="bg-[#0A0A0A] rounded-lg overflow-hidden border border-[rgba(255,107,0,0.1)]">
//             {form.imagePreview ? (
//               <div className="h-32 w-full overflow-hidden">
//                 <img src={form.imagePreview} alt="Task" className="w-full h-full object-cover" />
//               </div>
//             ) : (
//               <div className="h-20 bg-gradient-to-r from-[rgba(255,107,0,0.1)] to-transparent flex items-center justify-center">
//                 <FiImage className="w-8 h-8 text-gray-700" />
//               </div>
//             )}
            
//             <div className="p-4">
//               <div className="flex justify-between items-start mb-2">
//                 <h4 className="font-semibold text-white">
//                   {form.title || "Task Title"}
//                 </h4>
//                 <span className="text-xs px-2 py-1 bg-[rgba(255,107,0,0.1)] text-[#FF6B00] rounded-full">
//                   {form.type || "daily"}
//                 </span>
//               </div>
              
//               <p className="text-sm text-gray-400 mb-3 line-clamp-2">
//                 {form.description || "Task description will appear here"}
//               </p>
              
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                   <span className="text-lg font-bold text-white">
//                     ${form.reward > 0 ? form.reward.toFixed(2) : "0.00"}
//                   </span>
//                   <span className="text-xs text-gray-500">reward</span>
//                 </div>
                
//                 <button className="px-4 py-1.5 bg-[#FF6B00] text-white text-sm rounded-lg hover:bg-[#FF8C00] transition-colors">
//                   {form.linkText || "Start Task"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Form Actions */}
//         <div className="flex justify-end gap-3 pt-6 border-t border-[rgba(255,107,0,0.1)]">
//           <button
//             type="button"
//             className="px-6 py-3 border border-[rgba(255,107,0,0.2)] rounded-xl text-gray-300 hover:bg-[#1A1A1A] transition-colors"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="px-8 py-3 bg-[#FF6B00] text-white rounded-xl hover:bg-[#FF8C00] transition-all hover:shadow-lg hover:shadow-[rgba(255,107,0,0.3)] font-medium"
//           >
//             Create Task
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddTaskForm;














import { useState } from "react";
import { FiUpload, FiLink, FiCalendar, FiDollarSign } from "react-icons/fi";

const AddTaskForm = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    reward: "",
    type: "daily",
    link: "",
    expiry: "",
    image: null,
    imagePreview: null,
  });

  const [errors, setErrors] = useState({});

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({
          ...form,
          image: file,
          imagePreview: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.description.trim()) newErrors.description = "Description is required";
    if (!form.reward) newErrors.reward = "Reward is required";
    if (form.reward && parseFloat(form.reward) <= 0) newErrors.reward = "Reward must be greater than 0";
    if (!form.link.trim()) newErrors.link = "Task link is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("New task:", form);
      alert("Task created successfully!");
      setForm({
        title: "",
        description: "",
        reward: "",
        type: "daily",
        link: "",
        expiry: "",
        image: null,
        imagePreview: null,
      });
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4">
        <h2 className="text-xl font-bold text-white">Create New Task</h2>
        <p className="text-orange-100 text-sm mt-1">Add a task for users to complete</p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-5">
        {/* Image Upload */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Task Image</label>
          {form.imagePreview ? (
            <div className="relative rounded-lg overflow-hidden border border-gray-200">
              <img src={form.imagePreview} alt="Preview" className="w-full h-36 object-cover" />
              <button
                type="button"
                onClick={() => setForm({ ...form, image: null, imagePreview: null })}
                className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 text-sm w-6 h-6 flex items-center justify-center"
              >
                ✕
              </button>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center hover:border-orange-300 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="task-image"
              />
              <label htmlFor="task-image" className="cursor-pointer flex flex-col items-center">
                <FiUpload className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-500">Click to upload image</span>
                <span className="text-xs text-gray-400 mt-1">PNG, JPG up to 2MB</span>
              </label>
            </div>
          )}
        </div>

        {/* Title */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Task Title <span className="text-orange-500">*</span>
          </label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
              errors.title ? 'border-red-500' : 'border-gray-200'
            }`}
            placeholder="e.g., Complete 3 Surveys"
          />
          {errors.title && <p className="text-xs text-red-500">{errors.title}</p>}
        </div>

        {/* Description */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Description <span className="text-orange-500">*</span>
          </label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={3}
            className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
              errors.description ? 'border-red-500' : 'border-gray-200'
            }`}
            placeholder="Brief description of the task"
          />
          {errors.description && <p className="text-xs text-red-500">{errors.description}</p>}
        </div>

        {/* Type & Reward */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Task Type</label>
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="one-time">One-Time</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Reward ($) <span className="text-orange-500">*</span>
            </label>
            <input
              type="number"
              step="0.01"
              min="0.01"
              value={form.reward}
              onChange={(e) => setForm({ ...form, reward: e.target.value })}
              className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                errors.reward ? 'border-red-500' : 'border-gray-200'
              }`}
              placeholder="0.00"
            />
            {errors.reward && <p className="text-xs text-red-500">{errors.reward}</p>}
          </div>
        </div>

        {/* Task Link */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Task Link <span className="text-orange-500">*</span>
          </label>
          <div className="relative">
            <FiLink className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="url"
              value={form.link}
              onChange={(e) => setForm({ ...form, link: e.target.value })}
              className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                errors.link ? 'border-red-500' : 'border-gray-200'
              }`}
              placeholder="https://example.com/task"
            />
          </div>
          {errors.link && <p className="text-xs text-red-500">{errors.link}</p>}
        </div>

        {/* Expiry Date */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Expiry Date (Optional)</label>
          <div className="relative">
            <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="date"
              value={form.expiry}
              onChange={(e) => setForm({ ...form, expiry: e.target.value })}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        {/* Preview Card */}
        {form.title || form.description || form.reward ? (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Preview</h3>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              {form.imagePreview && (
                <div className="h-24 w-full mb-3 rounded-lg overflow-hidden">
                  <img src={form.imagePreview} alt="Task" className="w-full h-full object-cover" />
                </div>
              )}
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-gray-900">{form.title || "Task Title"}</h4>
                <span className="text-xs px-2 py-1 bg-orange-100 text-orange-600 rounded-full capitalize">
                  {form.type}
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-3">{form.description || "Task description"}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <FiDollarSign className="text-orange-500" />
                  <span className="font-bold text-gray-900">
                    {form.reward ? parseFloat(form.reward).toFixed(2) : "0.00"}
                  </span>
                </div>
                <button className="px-4 py-1.5 bg-orange-500 text-white text-sm rounded-lg hover:bg-orange-600">
                  Start Task
                </button>
              </div>
            </div>
          </div>
        ) : null}

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors font-medium"
          >
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTaskForm;