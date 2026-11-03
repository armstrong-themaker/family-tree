'use client'
import {useState,useEffect} from 'react';
import ELK from 'elkjs';
import { ReactFlow, Background, Controls, Node, Edge,getSmoothStepPath, BaseEdge } from '@xyflow/react';
// Important: This import provides the structural styling for the canvas layout
import '@xyflow/react/dist/base.css';
import {SeedDatabase} from '../actions/database.js'
import fetchFamilyMembers from '../actions/database.js';
import {fetchUnions} from '../actions/database.js';
import {CustomContainer} from './components/customContainer.jsx';
import { useGraphStore } from '@/actions/buildGraphTest.js';
import { customChildContainer } from './components/customContainer.jsx';
import { regularContainer } from './components/customContainer.jsx';
import { calculateGraph } from '@/actions/calculateGraph.js';
const elk = new ELK();

const nodeTypes = {
    customBox: CustomContainer,
    childBox: customChildContainer,
    regularBox: regularContainer
  };



export default function Home(){

    // 1. Establish constant dimensional bounds for your family member node cards
const NODE_WIDTH = 150;
const NODE_HEIGHT = 50;
const [nodes, setNodes] = useState([]);
const [edges, setEdges] = useState([]);
const [familyMembers, setFamilyMembers] = useState([]);
const [unions, setUnions] = useState([]);
const setGraphNodes = useGraphStore((state) => state.setGraphNodes);
const setStoreNodes = useGraphStore((state) => state.setNodes);
const setStoreEdges = useGraphStore((state) => state.setEdges);
const storeNodes = useGraphStore((state) => state.Nodes);
const storeEdges = useGraphStore((state) => state.Edges);

useEffect(() => {
    
const createGraph = async () => {
    const familyMembers = await fetchFamilyMembers();
    const unions = await fetchUnions();
    setFamilyMembers(familyMembers);
    setUnions(unions);
const intialNodeName="Titus, Njoki & Macharia Family";
const initialFamilyMember=familyMembers.find(member => member.name===intialNodeName);
const initialNode={
    id:initialFamilyMember.id,
    width:NODE_WIDTH,
    height:NODE_HEIGHT,
    layoutOptions: {
    }
};
const graph = {
    id: 'root',
    layoutOptions: {
      'elk.algorithm': 'layered',          // Uses ELK's flagship multi-layered hierarchy strategy
      'elk.direction': 'DOWN',             // Flows generations top-to-bottom
      'elk.spacing.nodeNode': '60',        // Horizontal spacing margin between siblings
      'elk.layered.spacing.nodeNodeBetweenLayers': '100', // Vertical distance between generation tiers
      'elk.edgeRouting': 'POLYLINE',       // Directs connection lines to bend nicely
      'elk.layered.crossingMinimization.forceNodeRealignment': 'true' 
    },
    children: [initialNode],
    edges: [],
};
const layoutedGraph = await elk.layout(graph);
layoutedGraph.children.forEach((node) => {
    const person=familyMembers.find(member=>member.id === node.id);
    console.log("Nodes in store before adding:", storeNodes);
    console.log("Adding node to store:", person);
    setStoreNodes(person);
    console.log("Nodes in store after adding:", storeNodes);
    console.log("Position of node:", node.id, "is", node.x, node.y);
    const firstNode={
    id: node.id,
    type: 'regularBox',
    position: { x: node.x, y: node.y },
    data:{label:`${person.name}`},   
}
console.log("Store nodes after adding first node:", storeNodes);
setNodes(prevNodes => [...prevNodes, firstNode]);
setGraphNodes(firstNode);

});
}

createGraph();
}, []); 

const nodesLength=storeNodes.length;

useEffect(() => {
  console.log("🔴 LIVE STATE UPDATE - Nodes inside store changed:", storeNodes);
const ExpandGraph = async () => {
const layoutedGraph = await calculateGraph();
if (!layoutedGraph) {
    console.log("Failed to calculate graph layout.");
    console.log("Current nodes in store:", storeNodes);
    return;
}
const reactFlowNodes = [];
layoutedGraph.children.forEach((node) => {
    if(node.children && node.children.length>0){
reactFlowNodes.push({
    id:node.id,
    type:'customBox',
    position:{x:node.x, y:node.y},
    data:{label:node.id},
    style:{backgroundColor:'#f0f0f0', padding:'10px',width:node.width, height:node.height},

})
node.children.forEach((childNode)=>{
const person=familyMembers.find(member=>member.id === childNode.id);
    reactFlowNodes.push({
        id:childNode.id,
        type:'childBox',
        parentId:node.id,
        extent:'parent',
        position:{x:childNode.x, y:childNode.y},
        data:{label:`${person.name}`},
        sourcePosition:'right',
        targetPosition:'left',
        style:{width:childNode.width, height:childNode.height}
    });
});
    }
else{
const person=familyMembers.find(member => member.id === node.id);
reactFlowNodes.push({
    isFreeNode: true,
    id: node.id,
    type: 'regularBox',
    position: { x: node.x, y: node.y },
    data:{label:`${person.name}`},
    
});
}
});
console.log('Nodes:', reactFlowNodes);
setNodes(reactFlowNodes);
reactFlowNodes.forEach((node) => {
    if(!node.parentId){
    setGraphNodes(node);
    }
});
const reactFlowEdges = [];
layoutedGraph.edges.forEach((edge) => {
    reactFlowEdges.push({
        id: edge.id,
        source: edge.source,
        target: edge.target
    });
});
setEdges(reactFlowEdges);
};
ExpandGraph();
}, [nodesLength]);

return (
    <div className="w-full h-screen bg-cream text-black">
<ReactFlow nodes={nodes} edges={edges}  nodeTypes={nodeTypes} fitView>
<Background gap={16}/>
<Controls />

</ReactFlow>
    </div>
);
}