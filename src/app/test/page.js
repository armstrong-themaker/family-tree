'use client'
import ELK from 'elkjs';

import { ReactFlow, Background, Controls, Node, Edge,getSmoothStepPath, BaseEdge,Handle,Position} from '@xyflow/react';
import { useGraphStore } from '@/actions/buildGraphTest.js';
import {useState,useEffect} from 'react';

import '@xyflow/react/dist/style.css';

import { CustomContainer}  from '../components/customContainer.jsx';
const nodeTypes = {
    customBox: CustomContainer,
  };

const elk = new ELK();



export default  function TestPage() {
const [graph, setGraph] = useState(null);
const [nodes, setNodes] = useState([]);
const [edges, setEdges] = useState([]);

const setStoreNodes = useGraphStore((state) => state.setNodes);
const setStoreEdges = useGraphStore((state) => state.setEdges);
const setStoreGraph = useGraphStore((state) => state.setGraph);

useEffect(() => {
async function calculateLayout(){

    const graph={
        id:'root',
        layoutOptions:{
        'elk.algorithm':'layered',
        'elk.direction':'DOWN',
        'elk.layered.spacing.nodeNodeBetweenLayers':'50',
        'elk.layered.spacing.nodeNode':'50',
        'elk.layered.spacing.edgeNode':'50',
        'elk.edgeRouting': 'POLYLINE',
        },
        children:[
{id:'1', width:100, height:50},
{
    id:'horizontal-cluster-1',
    layoutOptions:{
        'elk.algorithm':'layered',
        'elk.direction':'RIGHT',
        'elk.layered.spacing.nodeNodeBetweenLayers':'50',
        'elk.layered.spacing.nodeNode':'50',
        'elk.layered.spacing.edgeNode':'50',
        'elk.edgeRouting': 'POLYLINE',
        'elk.hierarchyHandling': 'INCLUDE_CHILDREN'
    },
    children:[
        {id:'2', width:100, height:50},
        {id:'3', width:100, height:50},
    ],
    edges:[
        {id:'2-3', source:'2', target:'3'}
    ]

},
{id:'4', width:100, height:50}
        ],
        edges:[
            {id:'1-horizontal-cluster-1', source:'1', target:'horizontal-cluster-1'},
            {id:'horizontal-cluster-1-4', source:'horizontal-cluster-1', target:'4'},
            
        ]
    }
    const layoutedGraph = await elk.layout(graph);
    console.log('Layouted Graph:', layoutedGraph);
        
    setGraph(layoutedGraph);
    console.log('Graph:', graph);
    console.log('Graph Children:', graph.children);
    let newNodes=[]
    layoutedGraph.children.forEach((node)=>{
        const isGroup=node.children && node.children.length>0;
        if(isGroup){
newNodes.push({
id:node.id,
type:'customBox',
position:{x:node.x, y:node.y},
data:{
    
    label:(
        <>
    <Handle type="target" position={Position.Top} id="group-top" />

    <Handle type="source" position={Position.Bottom} id="group-bottom" />
        </>
    )

},
style:{padding:'10px',width:node.width, height:node.height},

});
node.children.forEach((childNode)=>{
    newNodes.push({
        id:childNode.id,
        type:'default',
        parentId:node.id,
        extent:'parent',
        position:{x:childNode.x, y:childNode.y},
        data:{label:childNode.id},
        sourcePosition:'right',
        targetPosition:'left',
        style:{width:childNode.width, height:childNode.height}
    });
});
        }
else{
newNodes.push({
    id:node.id,
    type:'customBox',
    position:{x:node.x, y:node.y},
    data:{label:node.id},
    style:{width:node.width, height:node.height},

});
}
    });
    setStoreNodes(newNodes);
    setNodes(newNodes);
    
    const newEdges=[]

    layoutedGraph.children.forEach((node)=>{
    if(node.children && node.children.length>0){
        newEdges.push(...node.edges);
    }
});

layoutedGraph.edges.forEach((edge)=>{
newEdges.push({
    id:edge.id,
    source:edge.source,
    target:edge.target,
    sourcePosition:'right',
    targetPosition:'left',
    type:'smoothstep'
});
});

const testEdges=[
    { id: 'e1', source: '1', target: '2', type: 'smoothstep' },
    { id: 'e2', source: '2', target: '3', type: 'smoothstep' },
    { id: 'e3', source: '3', target: '4', type: 'smoothstep' }
];
    setStoreEdges(newEdges);
    setEdges(testEdges);
}

        calculateLayout(); 

},[]);
console.log('Nodes:', nodes);
console.log('Edges:', edges);
const trialNodes=[
    { id: '1', position: { x: 12, y: 12 }, data: { label: '1' } },
  
  // 📦 THE CONTAINER (Must have width and height from ELK!)
  { 
    id: 'horizontal-cluster-1', 
    type: 'group', 
    position: { x: 12, y: 82 }, 
    style: { width: 320, height: 80, backgroundColor: 'rgba(240,240,240,0.1)', border: '1px dashed #fff' }, // Dimensions are mandatory!
    data: { label: 'Cluster' } 
  },
  
  // ➡️ INNER NODES (Positions are relative to the group container)
  { id: '2', parentId: 'horizontal-cluster-1', extent: 'parent', position: { x: 12, y: 15 }, data: { label: '2' } },
  { id: '3', parentId: 'horizontal-cluster-1', extent: 'parent', position: { x: 165, y: 15 }, data: { label: '3' } },
  
  // ⬇️ BOTTOM NODE (Must be pushed down past the height of the group container)
  { id: '4', position: { x: 132, y: 12 }, data: { label: '4' } }
];

const trialEdges=[
    // 1. Connect Node 1 down to the first inner node (2)
  { id: 'e1', 
    source: '1',
     target: 'horizontal-cluster-1',
   targetHandle: 'group-top',     // Connect to the top handle of the group 
    type: 'smoothstep' 
    },
  
  // 2. Connect Node 2 to Node 3 horizontally inside the box
  { id: 'e2', 
    source: '2', 
    target: '3', 
    type: 'smoothstep' 
},
  
  // 3. Connect the last inner node (3) down to Node 4 outside
  { id: 'e3', 
    source: 'horizontal-cluster-1',
    sourceHandle: 'group-bottom',  // Connect to the bottom handle of the group 
    target: '4', 
    type: 'smoothstep' 
}
];
    return (
        <div className="w-full h-screen text-black">
        <h1>Test Page</h1>
        <p>This is a test page for the family tree application.</p>
<ReactFlow nodes={useGraphStore((state) => state.Nodes)} edges={useGraphStore((state) => state.Edges)} nodeTypes={nodeTypes} fitView>
<Background />
<Controls />
</ReactFlow>
        </div>
    );
    }