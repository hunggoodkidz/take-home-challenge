import React, { useState, useCallback } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  BackgroundVariant,
  Edge,
  Node,
  NodeChange,
  EdgeChange,
  Connection,
  type OnConnect
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';


const initialNodes: Node[] = [
  { id: '1', type: 'input', data: { label: 'Input Node' }, position: { x: 250, y: 5 } },
  { id: '2', data: { label: 'Default Node' }, position: { x: 100, y: 100 } },
  { id: '3', type: 'output', data: { label: 'Output Node' }, position: { x: 250, y: 200 } }
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3' }
] satisfies Edge[];

const PipelineFlow: React.FC = () => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [nodeLabel, setNodeLabel] = useState<string>('');

  const onNodesChange = useCallback(
    (changes: NodeChange<Node>[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange<Edge>[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onConnect: OnConnect = useCallback(
    (connection: Connection) => setEdges((edges) => addEdge(connection, edges)),
    [setEdges]
  );

  // Function to add a new node
  const addNode = () => {
    const newNodeId = (nodes.length + 1).toString();
    const newNode: Node = {
      id: newNodeId,
      data: { label: `New Node ${newNodeId}` },
      position: { x: Math.random() * 400, y: Math.random() * 400 }
    };
    setNodes((nds) => [...nds, newNode]);
  };

  // Handle node click
  const onNodeClick = (event: React.MouseEvent, node: Node) => {
    setSelectedNodeId(node.id);
    //setNodeLabel(node.data.label);
  };

  // Update node label
  const handleLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNodeLabel(event.target.value);
  };

  const handleLabelUpdate = () => {
    if (selectedNodeId) {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === selectedNodeId ? { ...node, data: { ...node.data, label: nodeLabel } } : node
        )
      );
      setSelectedNodeId(null);
    }
  };

  // Delete node
  const handleDeleteNode = () => {
    if (selectedNodeId) {
      setNodes((nds) => nds.filter((node) => node.id !== selectedNodeId));
      setEdges((eds) => eds.filter((edge) => edge.source !== selectedNodeId && edge.target !== selectedNodeId));
      setSelectedNodeId(null);
    }
  };

  return (
    <div className="w-full h-full" style={{ height: '100vh' }}>
      <button
        onClick={addNode}
        className="mb-4 p-2 bg-blue-500 text-white rounded"
      >
        Add Node
      </button>
      {selectedNodeId && (
        <div className="absolute top-0 right-0 p-4 bg-white border border-gray-300 shadow-lg">
          <input
            type="text"
            value={nodeLabel}
            onChange={handleLabelChange}
            className="p-2 border border-gray-300 rounded"
          />
          <button onClick={handleLabelUpdate} className="ml-2 p-2 bg-blue-500 text-white rounded">
            Update
          </button>
          <button onClick={handleDeleteNode} className="ml-2 p-2 bg-red-500 text-white rounded">
            Delete
          </button>
        </div>
      )}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        onNodeClick={onNodeClick}
      >
        <MiniMap />
        <Controls />
        <Background variant={BackgroundVariant.Lines} />
      </ReactFlow>

    </div>
  );
};

export default PipelineFlow;
