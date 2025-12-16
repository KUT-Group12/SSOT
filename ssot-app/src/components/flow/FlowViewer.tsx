'use client';

import { useMemo, useCallback } from 'react';
import ReactFlow, {
    Node,
    Edge,
    useNodesState,
    useEdgesState,
    Background,
    Controls,
    MiniMap,
} from 'reactflow';
import dagre from 'dagre';
import 'reactflow/dist/style.css';

import CustomNode from './CustomNode';
import { ModuleData } from '@/types';

interface FlowViewerProps {
    modules: ModuleData[];
    onNodeClick?: (module: ModuleData) => void;
}

const nodeTypes = {
    custom: CustomNode,
};

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 200;
const nodeHeight = 80;

const getLayoutedElements = (nodes: Node[], edges: Edge[], direction = 'TB') => {
    dagreGraph.setGraph({ rankdir: direction });

    nodes.forEach((node) => {
        dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });

    edges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    const layoutedNodes = nodes.map((node) => {
        const nodeWithPosition = dagreGraph.node(node.id);
        return {
            ...node,
            position: {
                x: nodeWithPosition.x - nodeWidth / 2,
                y: nodeWithPosition.y - nodeHeight / 2,
            },
        };
    });

    return { nodes: layoutedNodes, edges };
};

export default function FlowViewer({ modules, onNodeClick }: FlowViewerProps) {
    const { nodes: initialNodes, edges: initialEdges } = useMemo(() => {
        const nodes: Node[] = modules.map((module) => ({
            id: module.id,
            type: 'custom',
            data: {
                label: module.name,
                method: module.endpoint?.method,
                path: module.endpoint?.path,
            },
            position: { x: 0, y: 0 },
        }));

        const edges: Edge[] = modules.flatMap((module) =>
            module.nextModuleIds
                .filter((nextId) => modules.some((m) => m.id === nextId))
                .map((nextId) => ({
                    id: `${module.id}-${nextId}`,
                    source: module.id,
                    target: nextId,
                    animated: true,
                }))
        );

        return getLayoutedElements(nodes, edges);
    }, [modules]);

    const [nodes, , onNodesChange] = useNodesState(initialNodes);
    const [edges, , onEdgesChange] = useEdgesState(initialEdges);

    const handleNodeClick = useCallback(
        (_: React.MouseEvent, node: Node) => {
            const module = modules.find((m) => m.id === node.id);
            if (module && onNodeClick) {
                onNodeClick(module);
            }
        },
        [modules, onNodeClick]
    );

    return (
        <div className="w-full h-full">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onNodeClick={handleNodeClick}
                nodeTypes={nodeTypes}
                fitView
            >
                <Controls />
                <MiniMap />
                <Background gap={12} size={1} />
            </ReactFlow>
        </div>
    );
}
