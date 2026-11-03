'use client';

import { ChevronDown , ChevronUp } from "lucide-react";
import { Handle, Position } from '@xyflow/react';
import { motion } from "motion/react";
import { useGraphStore } from "@/actions/buildGraphTest";
import fetchFamilyMembers from "@/actions/database.js";
import { fetchUnions } from "@/actions/database.js";
import { useEffect } from "react";
import { useState } from "react";
export function CustomContainer(props) {
    const setStoreNodes = useGraphStore((state) => state.setNodes);
    const nodes = useGraphStore.getState().Nodes;
    const GraphNodes = useGraphStore((state) => state.GraphNodes);
    const removeStoreNode = useGraphStore((state) => state.removeNode);
    const [showedChildren, setShowedChildren] = useState(false);
    console.log("CustomContainer props:", props);
    const uuid = props.id.slice(0, 36);
    console.log("CustomContainer uuid:", uuid);

    function AddNodes(nodeId, familyMembers, unions) {
        //Find the children of the node with the given nodeId
        const children = familyMembers.filter(member => member.father_id === nodeId || member.mother_id === nodeId);

        children.forEach(child => {

            //Look if they have a spouse
            const spouse = unions.find(union => union.partner_1_id === child.id || union.partner_2_id === child.id);

            if (spouse) {
                const spouseId = spouse.partner_1_id === child.id ? spouse.partner_2_id : spouse.partner_1_id;
                const spouseMember = familyMembers.find(member => member.id === spouseId);
                if(!showedChildren){
                setStoreNodes(spouseMember);
                }else{
                    removeStoreNode(spouseMember.id);
                }

            }
if(!showedChildren){
            setStoreNodes(child);
}else{
    removeStoreNode(child.id);
}
        });
        console.log("Children of node", nodeId, ":", children);
        console.log("Current nodes in store:", nodes);
    }


    const [familyMembers, setFamilyMembers] = useState([]);
    const [unions, setUnions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const familyMembers = await fetchFamilyMembers();
            const unions = await fetchUnions();
            setFamilyMembers(familyMembers);
            setUnions(unions);
        }
        fetchData();
    }, []);

  const MotionChevronDown = motion.create(ChevronDown);
  const MotionChevronUp = motion.create(ChevronUp);
    console.log("Nodes in customChildContainer:", nodes);
    const largestY = GraphNodes.reduce((maxY, node) => Math.max(maxY, node.position.y), 0);

    console.log("Largest Y value:", largestY);

    //Find nodes with the largest Y value
    const bottomNodes = GraphNodes.filter(node => node.position.y === largestY);

    const setNodes = new Set(bottomNodes.map(node => node.id));

    if (setNodes.has(props.id)) {
        console.log("customChildContainer props.children:", props.id);
    }




    return (
        <div className="relative bg-white w-full h-full bg-light-blue-500 rounded-lg flex flex-col items-center justify-center">

            <Handle type="target" className='opacity-0' position={Position.Top} id="group-top" />
            <Handle type="source" className='opacity-0' position={Position.Bottom} id="group-bottom" />

            
                <div className="absolute bottom-0 right-auto">
                    <motion.button whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.05 }} className="border-none bg-accent text-white hover:cursor-pointer rounded-full text-[4px]" onClick={() =>{ setShowedChildren(!showedChildren); AddNodes(uuid, familyMembers, unions)}}>
                        {showedChildren ? (
                            <MotionChevronUp size={15} whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.05 }} />
                        ) : (
                            <MotionChevronDown size={15} whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.05 }} />
                        )
                    }
                    </motion.button>
                </div>

            
        </div>
    )

}

export function customChildContainer(props) {


    return (
        <div className="relative bg-white w-full h-full bg-light-blue-500 rounded-lg flex flex-col items-center justify-center">
            <Handle type="target" className='opacity-0' position={Position.Left} id="group-top" />
            <Handle type="source" className='opacity-0' position={Position.Right} id="group-bottom" />
                   {props.data.label} 
        </div>
    )
}

export function regularContainer(props) {


    const [familyMembers, setFamilyMembers] = useState([]);
    const [unions, setUnions] = useState([]);
    const [showedChildren, setShowedChildren] = useState(false);
    const removeStoreNode = useGraphStore((state) => state.removeNode);
    useEffect(() => {
        const fetchData = async () => {
            const familyMembers = await fetchFamilyMembers();
            const unions = await fetchUnions();
            setFamilyMembers(familyMembers);
            setUnions(unions);
        }
        fetchData();
        console.log("Mounted useEffect triggered");
    }, []);

    const setStoreNodes = useGraphStore((state) => state.setNodes);
    const GraphNodes = useGraphStore((state) => state.GraphNodes);
    const nodes = useGraphStore((state) => state.Nodes);
    const trialNodes = useGraphStore.getState().Nodes;


    console.log("Nodes in regularContainer:", nodes);
    console.log("Trial Nodes in regularContainer:", trialNodes);

    function AddNodes(nodeId, familyMembers, unions) {
        //Find the children of the node with the given nodeId
        const children = familyMembers.filter(member => member.father_id === nodeId || member.mother_id === nodeId);
        console.log("Children of node", nodeId, ":", children);
        children.forEach(child => {
            console.log("Store Nodes before adding child:", nodes);
            //Look if they have a spouse
            const spouse = unions.find(union => union.partner_1_id === child.id || union.partner_2_id === child.id);

            if (spouse) {
                const spouseId = spouse.partner_1_id === child.id ? spouse.partner_2_id : spouse.partner_1_id;
                const spouseMember = familyMembers.find(member => member.id === spouseId);
             if(!showedChildren){   
                setStoreNodes(spouseMember);
             }else{
                removeStoreNode(spouseMember.id);
            }

            }
if(!showedChildren){
            setStoreNodes(child);
}
else{
    removeStoreNode(child.id);
}
        });

        console.log("Current nodes in store:", nodes);
    }



    const MotionChevronDown = motion.create(ChevronDown);
    const MotionChevronUp = motion.create(ChevronUp);
    console.log("Nodes in regularContainer:", nodes);
    console.log("GraphNodes:", GraphNodes);
    const largestY = GraphNodes.reduce((maxY, node) => Math.max(maxY, node.position.y), 0);
    console.log("Largest Y value:", largestY);
    //Find nodes with the largest Y value

    const bottomNodes = GraphNodes.filter(node => node.position.y === largestY);
    console.log("Bottom nodes:", bottomNodes);
    const setNodes = new Set(bottomNodes.map(node => node.id));

    if (setNodes.has(props.id)) {
        console.log("regularContainer props.children:", props.id);
    }


    return (

        <div className=" bg-white w-fit h-full  rounded-lg flex flex-col items-center justify-center p-5 ">

            <Handle type="target" className='opacity-0' position={Position.Top} id="group-left" />
            <Handle type="source" className='opacity-0' position={Position.Bottom} id="group-right" />
            {props.data.label}

                <div className=" mt-0.5">
                    {console.log("Rendering button for node:", props.id)}
                    {console.log("Rendering button for node:", props.id)}
                    <motion.button whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.05 }} className="border-none bg-accent text-white hover:cursor-pointer rounded-full text-[4px]" onClick={() => {
                        AddNodes(props.id, familyMembers, unions)
                        setShowedChildren(!showedChildren);
                    }}>
                        {showedChildren ? (
                            <MotionChevronUp size={15} whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.05 }} />
                        ) : (
                            <MotionChevronDown size={15} whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.05 }} />
                        )

                        }
   </motion.button>
                </div>

            
        </div>
    )

}