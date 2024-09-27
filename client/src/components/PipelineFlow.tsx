import React, { useState, useCallback, useEffect } from 'react';
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
  type OnConnect,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { getNodesByPipelineId, createNode, updateNode, deleteNode } from '../services/nodeService';
import { getLinks, createLink, deleteLink } from '../services/linkService';
import { getPipelinesByDeviceId } from '../services/pipelinesService'; // Import for getting pipelines by device ID

type PipelineFlowProps = {
  deviceId: number | null; // Accept deviceId as prop
};

const PipelineFlow: React.FC<PipelineFlowProps> = ({ deviceId }) => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [pipelineId, setPipelineId] = useState<number | null>(null); // Store the pipeline ID
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [nodeLabel, setNodeLabel] = useState<string>('');
  const [nodeType, setNodeType] = useState<string>('default'); // New state for node type selection


  // Map database nodes to React-flow format
  const mapDBNodesToFlow = (nodeData: any[]): Node[] =>
    nodeData.map((node) => ({
      id: node.id.toString(),
      type: node.type,
      data: { label: node.name },
      position: node.position,
    }));

  // Map database links to React-flow edges format, storing the numeric link.id
  const mapDBLinksToFlow = (linkData: any[]): Edge[] =>
    linkData.map((link) => ({
      id: link.id.toString(), // Store the actual numeric link.id from the database
      source: link.sourceNodeId.toString(),
      target: link.targetNodeId.toString(),
    }));


  // Fetch pipeline ID by selected device ID
  useEffect(() => {
    async function fetchPipeline() {
      if (deviceId) {
        try {
          const pipelines = await getPipelinesByDeviceId(deviceId);
          if (pipelines && pipelines.length > 0) {
            setPipelineId(pipelines[0].id); // Assuming one pipeline per device
          } else {
            console.error('No pipelines found for this device.');
          }
        } catch (error) {
          console.error('Error fetching pipeline:', error);
        }
      }
    }
    fetchPipeline();
  }, [deviceId]);

  // Fetch nodes and edges based on the selected pipelineId
  useEffect(() => {
    async function fetchData() {
      if (pipelineId) {
        try {
          const nodeData = await getNodesByPipelineId(pipelineId);
          const edgeData = await getLinks();
          setNodes(mapDBNodesToFlow(nodeData));
          setEdges(mapDBLinksToFlow(edgeData));
        } catch (error) {
          console.error('Error loading nodes or links:', error);
        }
      }
    }
    fetchData();
  }, [pipelineId]);



  // Handle node changes (dragging and updating positions)
  const onNodesChange = useCallback(
    async (changes: NodeChange<Node>[]) => {
      setNodes((nds) => {
        const updatedNodes = applyNodeChanges(changes, nds);
  
        changes.forEach(async (change) => {
          if (change.type === 'position' && change.id) {
            const node = updatedNodes.find((n) => n.id === change.id);
            if (node) {
              try {
                await updateNode(Number(node.id), { position: node.position });
              } catch (error) {
                console.error('Error updating node position:', error);
              }
            }
          }
        });
  
        return updatedNodes;
      });
    },
    [setNodes]
  );

  // Handle edge (link) changes
  const onEdgesChange = useCallback(
    async (changes: EdgeChange<Edge>[]) => {
      setEdges((eds) => {
        const updatedEdges = applyEdgeChanges(changes, eds);
        return updatedEdges;
      });
    },
    [setEdges]
  );

  // Handle new edge connection (Link)
  const onConnect: OnConnect = useCallback(
    async (connection: Connection) => {
      setEdges((edges) => {
        const newEdges = addEdge(connection, edges);
        createLink({
          sourceNodeId: Number(connection.source),
          targetNodeId: Number(connection.target),
        }).catch((error) => console.error('Error creating link:', error));
        return newEdges;
      });
    },
    [setEdges]
  );

  // Function to add a new node
  const addNode = async () => {
    try {
      if (!pipelineId) {
        console.error('No pipeline selected.');
        return;
      }

      // Generate a base node name
      const baseName = `Node ${nodes.length + 1}`;

      // Check if a node with the same name already exists
      const existingNode = nodes.find((node) => node.data.label === baseName);

      // If the base name already exists, generate a new unique name
      let uniqueName = baseName;
      if (existingNode) {
        // Append a unique suffix to the name
        const timestamp = new Date().getTime();
        uniqueName = `${baseName}-${timestamp}`;
      }

      // Create the new node with the unique name
      const newNode = {
        name: uniqueName,
        type: nodeType,
        position: { x: Math.random() * 400, y: Math.random() * 400 },
        pipelineId: pipelineId, // Link to the selected pipelineId
      };

      const savedNode = await createNode(newNode);

      setNodes((nds) => [
        ...nds,
        { id: savedNode.id.toString(), data: { label: savedNode.name }, position: savedNode.position, type: savedNode.type }
      ]);

    } catch (error) {
      console.error('Error creating node:', error);
    }
  };
  

  // Handle node click to select node for editing or deleting
  const onNodeClick = (_: React.MouseEvent, node: Node) => {
    setSelectedNodeId(node.id);
    setNodeLabel(node.data.label as string); 
  };

  // Handle label change
  const handleLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNodeLabel(event.target.value);
  };

  // Update the node label
  const handleLabelUpdate = async () => {
    if (selectedNodeId) {
      const updatedNodes = nodes.map((node) =>
        node.id === selectedNodeId
          ? { ...node, data: { ...node.data, label: nodeLabel } }
          : node
      );
      setNodes(updatedNodes);

      try {
        const updatedNode = updatedNodes.find((node) => node.id === selectedNodeId);
        if (updatedNode) {
          await updateNode(Number(updatedNode.id), { name: updatedNode.data.label });
        }
      } catch (error) {
        console.error('Error updating node:', error);
      }
      setSelectedNodeId(null); // Clear selection after update
    }
  };

  // Delete selected node and its associated links
  const handleDeleteNode = async () => {
    if (selectedNodeId) {
      try {
        // Filter out edges associated with the selected node
        const relatedEdges = edges.filter(
          (edge) => edge.source === selectedNodeId || edge.target === selectedNodeId
        );

        // Delete the related edges from the backend using the actual `link.id`
        await Promise.all(
          relatedEdges.map((edge) => deleteLink(Number(edge.id))) // Use the numeric `link.id`
        );

        // Delete the node from the backend
        await deleteNode(Number(selectedNodeId));

        // Update frontend: Remove node and its edges
        setNodes((nds) => nds.filter((node) => node.id !== selectedNodeId));
        setEdges((eds) =>
          eds.filter((edge) => edge.source !== selectedNodeId && edge.target !== selectedNodeId)
        );

        setSelectedNodeId(null); // Clear selection after deletion
      } catch (error) {
        console.error('Error deleting node or its links:', error);
      }
    }
  };

  return (
    <div className="w-full h-full" style={{ height: '100vh' }}>
      {/* Node Type Selection */}
      <div className="mb-4">
        <label className="mr-4">Choose Node Type:</label>
        <label>
          <input
            type="radio"
            value="default"
            checked={nodeType === 'default'}
            onChange={() => setNodeType('default')}
            className="mr-1"
          />
          Default
        </label>
        <label className="ml-4">
          <input
            type="radio"
            value="input"
            checked={nodeType === 'input'}
            onChange={() => setNodeType('input')}
            className="mr-1"
          />
          Input
        </label>
        <label className="ml-4">
          <input
            type="radio"
            value="output"
            checked={nodeType === 'output'}
            onChange={() => setNodeType('output')}
            className="mr-1"
          />
          Output
        </label>
      </div>

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
          <button
            onClick={handleLabelUpdate}
            className="ml-2 p-2 bg-blue-500 text-white rounded"
          >
            Update
          </button>
          <button
            onClick={handleDeleteNode}
            className="ml-2 p-2 bg-red-500 text-white rounded"
          >
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
        onNodeClick={onNodeClick} // Add node click handler
      >
        <MiniMap />
        <Controls />
        <Background variant={BackgroundVariant.Lines} />
      </ReactFlow>
    </div>
  );
};

export default PipelineFlow;
