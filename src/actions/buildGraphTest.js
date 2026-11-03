
import { create } from 'zustand';

export const useGraphStore = create((set,get) => ({

    Nodes: [],
    Edges: [],
    GraphNodes: [],
    setNodes: (newNode) => {
        const pastNodes=get().Nodes || [];
        const existingIds=new Set(pastNodes.map(node => node.id));
        if(existingIds.has(newNode.id)){
            console.log(`Node with id ${newNode.id} already exists in the store. Skipping addition.`);
            return;
        }
        set({ Nodes: [...pastNodes,newNode]});
    },
    setGraphNodes: (newGraphNode) => {
        const pastGraphNodes=get().GraphNodes;
        const existingIds=new Set(pastGraphNodes.map(node => node.id));
        if(existingIds.has(newGraphNode.id)){
            console.log(`Graph node with id ${newGraphNode.id} already exists in the store. Skipping addition.`);
            return;
        }
        set({ GraphNodes: [...pastGraphNodes,newGraphNode]});
    },
    setEdges: (newEdges) => set({ Edges: newEdges }),
    removeNode: (nodeId) => {
     const pastNodes=get().Nodes;
     const existingIds=pastNodes.map(node => node.id);
        if(!existingIds.includes(nodeId)){
            console.log(`Node with id ${nodeId} does not exist in the store. Cannot remove.`);
            return;
        }
        set({ Nodes: pastNodes.filter(node => node.id !== nodeId) });   
    }
})
);
