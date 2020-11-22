export type EdgeInfo = {
    source: NodeInfo;
    target: NodeInfo;
};

export type NodeInfo = {
    label: string;
    file: string;
    start: LocationInfo;
    end: LocationInfo;
    range: { start: number; end: number };
};

export type LocationInfo = {
    row: number;
    column: number;
};

