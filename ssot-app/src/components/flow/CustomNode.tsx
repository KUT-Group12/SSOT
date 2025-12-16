'use client';

import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

interface CustomNodeData {
    label: string;
    method?: string;
    path?: string;
}

const CustomNode = memo(({ data }: NodeProps<CustomNodeData>) => {
    return (
        <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-400 min-w-[150px]">
            <Handle type="target" position={Position.Top} className="w-3 h-3" />
            <div className="flex flex-col">
                <div className="text-lg font-bold text-center">{data.label}</div>
                {data.method && data.path && (
                    <div className="text-xs text-gray-500 text-center mt-1">
                        <span className={`font-semibold ${data.method === 'GET' ? 'text-green-600' :
                                data.method === 'POST' ? 'text-blue-600' :
                                    data.method === 'PUT' ? 'text-yellow-600' :
                                        'text-red-600'
                            }`}>
                            {data.method}
                        </span>
                        {' '}{data.path}
                    </div>
                )}
            </div>
            <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
        </div>
    );
});

CustomNode.displayName = 'CustomNode';

export default CustomNode;
