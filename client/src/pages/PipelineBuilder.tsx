import React from 'react';
import PipelineFlow from '../components/PipelineFlow'; // Make sure this path is correct

const PipelineBuilder: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Pipeline Builder</h1>
      <div className="mt-4 w-full h-full">
        <PipelineFlow />
      </div>
    </div>
  );
};

export default PipelineBuilder;