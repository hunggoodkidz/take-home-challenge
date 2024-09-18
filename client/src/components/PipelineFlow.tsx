import React, { useState, useCallback } from 'react';
import { ReactFlow, MiniMap, Controls, Background, addEdge, applyEdgeChanges, applyNodeChanges, BackgroundVariant, Edge, Node, NodeChange, EdgeChange, Connection } from '@xyflow/react';

const initialNodes: Node[] = [
  { id: '1', type: 'input', data: { label: 'Input Node' }, position: { x: 250, y: 5 } },
  { id: '2', data: { label: 'Default Node' }, position: { x: 100, y: 100 } },
  { id: '3', type: 'output', data: { label: 'Output Node' }, position: { x: 250, y: 200 } }
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3' }
];

const PipelineFlow: React.FC = () => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  // Memoize the onNodesChange function
  const onNodesChange = useCallback(
    (changes: NodeChange<Node>[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  // Memoize the onEdgesChange function
  const onEdgesChange = useCallback(
    (changes: EdgeChange<Edge>[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  // Memoize the onConnect function
  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params as Edge, eds)),
    [setEdges]
  );


  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background variant={BackgroundVariant.Lines} />
      </ReactFlow>
    </div>
  );
};

export default PipelineFlow;
