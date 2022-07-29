import { Point } from "./point";

export class Line {
    // using line representation mx + b
    public m: number; // slope
    public b: number; // offset
    public range: {x1: number, x2: number};
    public domain: {y1: number, y2: number};

    constructor (
        p1: Point,  
        p2: Point
    ) {
        this.m = (p2.y - p1.y) / (p2.x - p1.x);     // No GO for vertical Lines
        this.b = p1.y - (p1.y * this.m);
        this.range = {
            x1: Math.min(p1.x, p2.x),
            x2: Math.max(p1.x, p2.x)
        }

        this.domain = {
            x1: Math.min(p1.x, p2.x),
            x2: Math.max(p1.x, p2.x)
        }
    }
}