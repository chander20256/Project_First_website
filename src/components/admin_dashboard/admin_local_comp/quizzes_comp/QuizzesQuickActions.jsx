import { FiUpload, FiDownload, FiCopy, FiBarChart2 } from "react-icons/fi";

const QuizzesQuickActions = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow flex gap-4">

      <button className="flex items-center gap-2">
        <FiUpload />
        Import
      </button>

      <button className="flex items-center gap-2">
        <FiDownload />
        Export
      </button>

      <button className="flex items-center gap-2">
        <FiCopy />
        Duplicate
      </button>

      <button className="flex items-center gap-2">
        <FiBarChart2 />
        Analytics
      </button>

    </div>
  );
};

export default QuizzesQuickActions;