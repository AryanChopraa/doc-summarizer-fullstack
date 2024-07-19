// import React, { useState, useCallback } from 'react';
// import { Dialog, Transition } from '@headlessui/react';
// import { Fragment } from 'react';
// import { XMarkIcon, TrashIcon } from '@heroicons/react/24/outline';
// import toast from 'react-hot-toast';
// import { useSummary } from '@/contexts/SummaryContext';
// import { useRouter } from 'next/navigation';
// import ProgressLoader from '@/components/ProgressLoader';

// const SummaryDialog = ({ isOpen, closeDialog }) => {
//   const { createSummary } = useSummary();
//   const router = useRouter();
//   const [file, setFile] = useState(null);
//   const [text, setText] = useState('');
//   const [summaryLength, setSummaryLength] = useState(500);
//   const [isDragging, setIsDragging] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     if (selectedFile) {
//       setFile(selectedFile);
//       setText('');  
//     }
//   };

//   const handleDragOver = useCallback((e) => {
//     e.preventDefault();
//     setIsDragging(true);
//   }, []);

//   const handleDragLeave = useCallback((e) => {
//     e.preventDefault();
//     setIsDragging(false);
//   }, []);

//   const handleDrop = useCallback((e) => {
//     e.preventDefault();
//     setIsDragging(false);
//     const droppedFile = e.dataTransfer.files[0];
//     if (droppedFile) {
//       setFile(droppedFile);
//       setText(''); 
//     }
//   }, []);

//   const handleRemoveFile = () => {
//     setFile(null);
//   };

//   const handleSubmit = async () => {
//     if (!file && !text) {
//       toast.error('Please provide a file or text');
//       return;
//     }
//     const formData = new FormData();
//     if (file) formData.append('file', file);
//     if (text) formData.append('text', text);
//     formData.append('summaryLength', summaryLength);
//     try {
//       setLoading(true);
//       const id = await createSummary(formData);
//       if(id === undefined){
//         throw new Error('Error creating summary');
//       }
//       toast.success('Summary created successfully');
//       closeDialog();
//       router.push(`/dashboard/summary/${id}`);
//     } catch (error) {
//       console.error('Error creating summary:', error);
//       toast.error('Failed to create summary. Please try again.');
//     } finally {
//       setLoading(false);
//       setText('');
//       setFile(null);
//     }
//   };

//   return (
//     <Transition appear show={isOpen} as={Fragment}>
//       <Dialog as="div" className="relative z-10" onClose={closeDialog}>
//         <Transition.Child
//           as={Fragment}
//           enter="ease-out duration-300"
//           enterFrom="opacity-0"
//           enterTo="opacity-100"
//           leave="ease-in duration-200"
//           leaveFrom="opacity-100"
//           leaveTo="opacity-0"
//         >
//           <div className="fixed inset-0 bg-opacity-25" />
//         </Transition.Child>

//         <div className="fixed inset-0 overflow-y-auto">
//           <div className="flex min-h-full items-center justify-center p-4 text-center">
//             <Transition.Child
//               as={Fragment}
//               enter="ease-out duration-300"
//               enterFrom="opacity-0 scale-95"
//               enterTo="opacity-100 scale-100"
//               leave="ease-in duration-200"
//               leaveFrom="opacity-100 scale-100"
//               leaveTo="opacity-0 scale-95"
//             >
//               <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-gray-700 bg-opacity-30 backdrop-blur-lg  p-6 text-left align-middle shadow-xl transition-all">
//                 <Dialog.Title
//                   as="h3"
//                   className="text-lg font-medium leading-6 text-white flex justify-between items-center"
//                 >
//                   Create New Summary
//                   <button
//                     onClick={closeDialog}
//                     className="text-gray-400 hover:text-gray-500"
//                   >
//                     <XMarkIcon className="h-6 w-6" aria-hidden="true" />
//                   </button>
//                 </Dialog.Title>
//                 <div className="mt-4">
//                   <div
//                     className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer ${
//                       isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
//                     }`}
//                     onDragOver={handleDragOver}
//                     onDragLeave={handleDragLeave}
//                     onDrop={handleDrop}
//                   >
//                     <input
//                       type="file"
//                       onChange={handleFileChange}
//                       accept=".pdf,.html,.docx,text/plain"
//                       className="hidden"
//                       id="fileInput"
//                     />
//                     <label htmlFor="fileInput" className="cursor-pointer">
//                       {file ? (
//                         <div className="flex items-center justify-center">
//                           <p className="mr-2 text-white">{file.name}</p>
//                           <button
//                             onClick={(e) => {
//                               e.preventDefault();
//                               handleRemoveFile();
//                             }}
//                             className="bg-red-500 hover:bg-red-600 text-white rounded-full p-1"
//                           >
//                             <TrashIcon className="h-4 w-4" aria-hidden="true" />
//                           </button>
//                         </div>
//                       ) : (
//                         <div>
//                           <p className="text-lg text-white">Drag and drop a file here, or click to select a file</p>
//                           <p className="text-sm text-gray-300">Supports PDF, HTML, DOCX, and TXT</p>
//                         </div>
//                       )}
//                     </label>
//                   </div>
//                   <div className="mt-4">
//                     <textarea
//                       value={text}
//                       onChange={(e) => setText(e.target.value)}
//                       placeholder="Or enter text here"
//                       className="w-full p-2 border rounded resize-none bg-transparent text-white"
//                       rows="6"
//                       disabled={!!file}
//                     />
//                   </div>
//                   {!loading && (
//                     <div className="mt-4 ">
//                       <label className="block mb-2 text-white font-thin">Summary Length:{summaryLength} words</label>
//                       <input 
//                         type="range" 
//                         min="0"
//                         max="2" 
//                         value={summaryLength === 300 ? 0 : summaryLength === 500 ? 1 : 2}
//                         onChange={(e) => setSummaryLength([300, 500, 800][parseInt(e.target.value)])}
//                         className="w-full "
//                       />
//                       <div className="flex justify-between text-white font-extralight">
//                         <span>Small</span>
//                         <span>Medium</span>
//                         <span>Large</span>
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 <div className="mt-6">
//                   {loading ? (
//                     <ProgressLoader />
//                   ) : (
//                     <div className="flex justify-end">
//                       <button
//                         type="button"
//                         className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-thin text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
//                         onClick={handleSubmit}
//                       >
//                         Create Summary
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </Dialog.Panel>
//             </Transition.Child>
//           </div>
//         </div>
//       </Dialog>
//     </Transition>
//   );
// };

// export default SummaryDialog;


import React, { useState, useCallback, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, TrashIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { useSummary } from '@/contexts/SummaryContext';
import { useRouter } from 'next/navigation';
import ProgressLoader from '@/components/ProgressLoader';

const SummaryDialog = ({ isOpen, closeDialog }) => {
  const { createSummary } = useSummary();
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');
  const [summaryLength, setSummaryLength] = useState(500);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);

  // Reset the dialog when it closes
  useEffect(() => {
    if (!isOpen) {
      setFile(null);
      setText('');
      setSummaryLength(500);
      setIsDragging(false);
      setLoading(false);
    }
  }, [isOpen]);

  const handleFileChange = useCallback((selectedFile) => {
    if (selectedFile) {
      setFile(selectedFile);
      setText('');
    }
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    handleFileChange(droppedFile);
  }, [handleFileChange]);

  const handleRemoveFile = useCallback(() => setFile(null), []);

  const handleSubmit = useCallback(async () => {
    if (!file && !text) {
      toast.error('Please provide a file or text');
      return;
    }

    const formData = new FormData();
    if (file) formData.append('file', file);
    if (text) formData.append('text', text);
    formData.append('summaryLength', summaryLength);

    try {
      setLoading(true);
      const id = await createSummary(formData);
      if (!id) throw new Error('Error creating summary');

      toast.success('Summary created successfully');
      closeDialog();
      router.push(`/dashboard/summary/${id}`);
    } catch (error) {
      console.error('Error creating summary:', error);
      toast.error('Failed to create summary. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [file, text, summaryLength, createSummary, closeDialog, router]);

  const renderFileInput = () => (
    <div
      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer ${
        isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        onChange={(e) => handleFileChange(e.target.files[0])}
        accept=".pdf,.html,.docx,text/plain"
        className="hidden"
        id="fileInput"
      />
      <label htmlFor="fileInput" className="cursor-pointer">
        {file ? (
          <div className="flex items-center justify-center">
            <p className="mr-2 text-white">{file.name}</p>
            <button
              onClick={(e) => {
                e.preventDefault();
                handleRemoveFile();
              }}
              className="bg-red-500 hover:bg-red-600 text-white rounded-full p-1"
            >
              <TrashIcon className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        ) : (
          <div>
            <p className="text-lg text-white">Drag and drop a file here, or click to select a file</p>
            <p className="text-sm text-gray-300">Supports PDF, HTML, DOCX, and TXT</p>
          </div>
        )}
      </label>
    </div>
  );

  const renderTextInput = () => (
    <textarea
      value={text}
      onChange={(e) => setText(e.target.value)}
      placeholder="Or enter text here"
      className="w-full p-2 border rounded resize-none bg-transparent text-white"
      rows="6"
      disabled={!!file}
    />
  );

  const renderSummaryLengthSlider = () => (
    <div className="mt-4">
      <label className="block mb-2 text-white font-thin">Summary Length: {summaryLength} words</label>
      <input 
        type="range" 
        min="0"
        max="2" 
        value={summaryLength === 300 ? 0 : summaryLength === 500 ? 1 : 2}
        onChange={(e) => setSummaryLength([300, 500, 800][parseInt(e.target.value)])}
        className="w-full"
      />
      <div className="flex justify-between text-white font-extralight">
        <span>Small</span>
        <span>Medium</span>
        <span>Large</span>
      </div>
    </div>
  );

  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeDialog}>
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-gray-700 bg-opacity-30 backdrop-blur-lg p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-white flex justify-between items-center">
                  Create New Summary
                  <button onClick={closeDialog} className="text-gray-400 hover:text-gray-500">
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </Dialog.Title>
                <div className="mt-4">
                  {renderFileInput()}
                  <div className="mt-4">{renderTextInput()}</div>
                  {!loading && renderSummaryLengthSlider()}
                </div>
                <div className="mt-6">
                  {loading ? (
                    <ProgressLoader />
                  ) : (
                    <div className="flex justify-end">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-thin text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={handleSubmit}
                      >
                        Create Summary
                      </button>
                    </div>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default React.memo(SummaryDialog);