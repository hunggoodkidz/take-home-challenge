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
import { getNodes, createNode, updateNode } from '../../services/nodeService';
import { getLinks, createLink } from '../../services/linkService';

const PipelineFlow: React.FC = () => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);


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


  // Handle node changes (dragging and updating positions)
  const onNodesChange = useCallback(
    async (changes: NodeChange<Node>[]) => {
      setNodes((nds) => {
        const updatedNodes = applyNodeChanges(changes, nds);
  
        changes.forEach(async (change) => {
          // Ensure that we're handling changes with an ID (position or updates)
          if (change.type === 'position' && 'id' in change) {
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
        }).catch((error) =>
          console.error('Error creating link:', error)
        );
        return newEdges;
      });
    },
    [setEdges]
  );

  // Function to add a new node
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

  return (
    <div className="w-full h-full" style={{ height: '100vh' }}>
      <button
        onClick={addNode}
        className="mb-4 p-2 bg-blue-500 text-white rounded"
      >
        Add Node
      </button>
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
