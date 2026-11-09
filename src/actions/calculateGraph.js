'use client';
import { useGraphStore } from '@/actions/buildGraphTest.js';
import {fetchUnions} from '../actions/database.js';
import ELK from 'elkjs';

const elk = new ELK();

function checkOutsider(familyMembers,memberId){
if (memberId===null){
    return true;
}
const member=familyMembers.find(member=>member.id===memberId);
console.log("MemberId:", memberId);
console.log("Family Members:", familyMembers);
console.log("Checking if member is an outsider:", member);
if(member.name=="Titus, Njoki & Macharia Family"){
        return false;
    }

if(member.father_id===null && member.mother_id===null){

    return true;

}

else{

    return false;

}


}

function checkSpouse(unions, memberId) {
    let spouse= unions.find(union => union.partner_1_id === memberId || union.partner_2_id === memberId);
if(spouse){
let spouseId=spouse.partner_1_id===memberId ? spouse.partner_2_id : spouse.partner_1_id;
return {foundSpouse:true, spouseId:spouseId};
}
else{
    return {foundSpouse:false, spouseId:null};
}
}

export async function calculateGraph() {
const NODE_WIDTH = 150;
const NODE_HEIGHT = 50;
    console.log("Calculating graph layout... due to node:", useGraphStore.getState().Nodes);
const nodes=useGraphStore.getState().Nodes;


const unions=await fetchUnions();

const childNodes=[];
console.log('Nodes in calculateGraph.js:', nodes);
if(nodes.length===0){
    console.log('No nodes found in the store. Exiting calculateGraph.');
    return null;
}

// 2. Iterate through each family member to construct their respective node objects
nodes.forEach((member,index) => {
let memberId=member.id;
if(checkOutsider(nodes, memberId)){
    console.log(`Member ${member.name} (ID: ${memberId}) is an outsider. Skipping.`);
    return;
}
let spouse=unions.find(union=>union.partner_1_id===memberId || union.partner_2_id===memberId);
let spouseId=null;
let spouseMember=null;
if(spouse){

    spouseId=spouse.partner_1_id===memberId ? spouse.partner_2_id : spouse.partner_1_id;
    //Find the spouse member object
     spouseMember=nodes.find(member=>member.id===spouseId);
 
}
if(spouseId!==null && !member.Inserted){
  spouseMember.Inserted=true;   
    //create a subgraph for the couple
    childNodes.push({
        id:`${memberId}-${spouseId}`,
        layoutOptions:{
            'elk.algorithm':'layered',
            'elk.direction':'RIGHT',
            'elk.layered.spacing.nodeNodeBetweenLayers':'50',
        },
        children:[
            {
                id:memberId,
                width:NODE_WIDTH,
                height:NODE_HEIGHT,
                layoutOptions:{
                    'elk.algorithm':'layered',
                }
            },
            {
                id:spouseId,
                width:NODE_WIDTH,
                height:NODE_HEIGHT,
                layoutOptions:{

                }
            }
        ],
        edges:[
            {
                id:`edge-${memberId}-${spouseId}`,
                source:memberId,
                target:spouseId
            }
        ]
    });
console.log('Subgraph created for couple:', member.name, 'and', spouseMember.name);
    }
        
        
  
else if(spouseId==null){
    childNodes.push({
    id: member.id,
    width: NODE_WIDTH,
    height:NODE_HEIGHT,
    layoutOptions:{

    }
    });
    }
});

console.log('Child Nodes in calculateGraph.js:', childNodes);

// 3. Assemble all your relationships (Parents AND Spouses) into a combined ELK Edge Array
const combinedEdges = [];

//Create edges for parent-child relationships
nodes.forEach(member => {
    const isFatherOutsider = checkOutsider(nodes, member.father_id);
    const isMotherOutsider = checkOutsider(nodes, member.mother_id);

    if (member.father_id && !isFatherOutsider) {
const father=nodes.find(father => father.id === member.father_id);
let isSubgraphFather=checkSpouse(unions, father.id);
let isSubgraphChild=checkSpouse(unions, member.id);
let sourceId=isSubgraphFather.foundSpouse ? `${father.id}-${isSubgraphFather.spouseId}` : father.id;
let targetId=isSubgraphChild.foundSpouse ? `${member.id}-${isSubgraphChild.spouseId}` : member.id;

        combinedEdges.push({
            id: `edge-${member.father_id}-${member.id}`,
            source: sourceId,
            target: targetId
        });
        
}

    if (member.mother_id && !isMotherOutsider) {
        const mother=nodes.find(mother => mother.id === member.mother_id);
        const isSubgraphMother=checkSpouse(unions, mother.id);
        const isSubgraphChild=checkSpouse(unions, member.id);
        const sourceId=isSubgraphMother.foundSpouse ? `${mother.id}-${isSubgraphMother.spouseId}` : mother.id;
        const targetId=isSubgraphChild.foundSpouse ? `${member.id}-${isSubgraphChild.spouseId}` : member.id;
        combinedEdges.push({
            id: `edge-${member.mother_id}-${member.id}`,
            source: sourceId,
            target: targetId
        });

    }
});
const marriagesInNodes = nodes
  .map(member => {
    const ifSpouse = checkSpouse(unions, member.id).foundSpouse;
    if (ifSpouse) {
      return { 
        partner_1_id: member.id, 
        partner_2_id: checkSpouse(unions, member.id).spouseId 
      };
    }
    return undefined; // If no spouse, return undefined temporarily
  })
  .filter(item => item !== undefined); // ✅ Cleans up the array so only active marriages remain
console.log("Checking nodes: ",nodes)
console.log('Marriages in Nodes:', marriagesInNodes);

//Create edges for spouse relationships
marriagesInNodes.forEach(union => {
    combinedEdges.push({
        id: `edge-union-${union.partner_1_id}-${union.partner_2_id}`,
        source: union.partner_1_id,
        target: union.partner_2_id
    });
});
console.log('Combined Edges:', combinedEdges);
// 4. Construct the complete single-object layout graph contract
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
    children: childNodes,
    edges: combinedEdges,
};
// 5. Await the math layout calculations promise
const layoutedGraph = await elk.layout(graph);
return layoutedGraph;
}




