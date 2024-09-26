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
import { getNodes, createNode, updateNode, deleteNode } from '../../services/nodeService';
import { getLinks, createLink, updateLink, deleteLink } from '../../services/linkService';

const PipelineFlow: React.FC = () => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [nodeLabel, setNodeLabel] = useState<string>('');

  // Map database nodes to React-flow format
  const mapDBNodesToFlow = (nodeData: any[]): Node[] =>
    nodeData.map((node) => ({
      id: node.id.toString(),
      type: node.type,
      data: { label: node.name },
      position: node.position,
    }));

  // Map database links to React-flow edges format
  const mapDBLinksToFlow = (linkData: any[]): Edge[] =>
    linkData.map((link) => ({
      id: `e${link.sourceNodeId}-${link.targetNodeId}`,
      source: link.sourceNodeId.toString(),
      target: link.targetNodeId.toString(),
      //animated: true,  // Add animation or styling if needed
    }));

  // Fetch nodes and edges from the API when component loads
  useEffect(() => {
    async function fetchData() {
      try {
        const nodeData = await getNodes();
        const edgeData = await getLinks();
        setNodes(mapDBNodesToFlow(nodeData));
        setEdges(mapDBLinksToFlow(edgeData));
      } catch (error) {
        console.error('Error loading nodes or links:', error);
      }
    }
    fetchData();
  }, []);

  // Handle node changes
  const onNodesChange = useCallback(
    async (changes: NodeChange<Node>[]) => {
      setNodes((nds) => {
        const updatedNodes = applyNodeChanges(changes, nds);
  
        changes.forEach(async (change) => {
          if (change.type !== 'remove' && 'id' in change) {
            const node = updatedNodes.find((n) => n.id === change.id);
            if (node) {
              try {
                await updateNode(Number(node.id), node.data);
              } catch (error) {
                console.error('Error saving node:', error);
              }
            }
          } else if (change.type === 'remove' && 'id' in change) {
            try {
              await deleteNode(Number(change.id));
            } catch (error) {
              console.error('Error removing node:', error);
            }
          }
        });
  
        return updatedNodes;
      });
    },
    [setNodes]
  );
  

  // Handle edge changes
  const onEdgesChange = useCallback(
    async (changes: EdgeChange<Edge>[]) => {
      setEdges((eds) => {
        const updatedEdges = applyEdgeChanges(changes, eds);
  
        changes.forEach(async (change) => {
          if (change.type !== 'remove' && 'id' in change) {
            const edge = updatedEdges.find((e) => e.id === change.id);
            if (edge) {
              try {
                await updateLink(Number(edge.id), edge);
              } catch (error) {
                console.error('Error saving edge:', error);
              }
            }
          } else if (change.type === 'remove' && 'id' in change) {
            try {
              await deleteLink(Number(change.id));
            } catch (error) {
              console.error('Error removing edge:', error);
            }
          }
        });
  
        return updatedEdges;
      });
    },
    [setEdges]
  );

  // Handle new edge connection
  const onConnect: OnConnect = useCallback(
    async (connection: Connection) => {
      setEdges((edges) => {
        const newEdges = addEdge(connection, edges);
        // Persist the new edge to the database
        createLink(connection).catch((error) =>
          console.error('Error creating link:', error)
        );
        return newEdges;
      });
    },
    [setEdges]
  );



  // Function to add a new node
  const addNode = async () => {
    try {
      const newNode = {
        name: `Node ${nodes.length + 1}`, // Dynamically generate the node name
        type: 'default',                  // Default node type
        position: { x: Math.random() * 400, y: Math.random() * 400 }, // Random position
        pipelineId: 1,                    // Assuming pipeline ID 1 for now (adjust as needed)
      };

      // Pass the entire nodeData object to the createNode function
      const savedNode = await createNode(newNode);

      // Add the newly created node to the local state
      setNodes((nds) => [
        ...nds,
        { id: savedNode.id.toString(), data: { label: savedNode.name }, position: savedNode.position, type: savedNode.type }
      ]);

    } catch (error) {
      console.error('Error creating node:', error);
    }
  };



  // Update node label
  const handleLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNodeLabel(event.target.value);
  };

  const handleLabelUpdate = async () => {
    if (selectedNodeId) {
      const updatedNodes = nodes.map((node) =>
        node.id === selectedNodeId
          ? { ...node, data: { ...node.data, label: nodeLabel } }
          : node
      );
      setNodes(updatedNodes);
      try {
        const updatedNode = updatedNodes.find(
          (node) => node.id === selectedNodeId
        );
        if (updatedNode) {
          await updateNode(Number(updatedNode.id), updatedNode.data);
        }
      } catch (error) {
        console.error('Error updating node label:', error);
      }
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
          <button
            onClick={handleLabelUpdate}
            className="ml-2 p-2 bg-blue-500 text-white rounded"
          >
            Update
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
        // onNodeClick={onNodeClick}
      >
        <MiniMap />
        <Controls />
        <Background variant={BackgroundVariant.Lines} />
      </ReactFlow>
    </div>
  );
};

export default PipelineFlow;
