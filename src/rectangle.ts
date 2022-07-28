import { Adjacency } from "./enums/adjacency";

export class Rectangle {
    // edges
    public left: number;  
    public right: number;
    public bottom: number;  
    public top: number;

    constructor (
        left: number,  
        right: number,
        bottom: number,
        top: number
    ) {
        if (right - left <= 0          // width <= 0
            || top - bottom <= 0) {     // height <= 0

            throw new Error('New Rectangle() -> rectangle can not have dimensions <= 0');
        }

        this.left = left;
        this.right = right;
        this.bottom = bottom;
        this.top = top;
    }

    /*
        // #TODO egde cases: 
        //  1) same rectangle
        //  2) Adjacent
    */
    public intersects(r2: Rectangle): boolean {
        if (r2.right < this.left) {     // out of range left 
             return false;
        }

        if (r2.bottom > this.top) {     // out of range top
            return false;
        }

        if (r2.left > this.right) {     // Out of range right
            return false;
        }

        if (r2.top < this.bottom) {     // Out of range below
            return false;
        }

        if (r2.bottom === this.bottom
            && r2.top === this.top
            && r2.right === this.right
            && r2.left === this.left
        ) {                             // exact overlap
            return true;
        }

        if (r2.contains(this) || this.contains(r2)) {
            return false;
        }

        return true;
    }

    public contains(r2: Rectangle): boolean {
        // #TODO egde cases: 
        //  1) same rectangle
        //  2) Adjacent inside

        if (r2.left < this.left) {     // left edge outside 
            return false;
        }

        if (r2.top > this.top) {     // top edge outside
            return false;
        }

        if (r2.right > this.right) {     // right edge outside
            return false;
        }

        if (r2.bottom < this.bottom) {     // bottom edge outside
            return false;
        }

        return true;
    }

    public isAdjacent(r2: Rectangle): Adjacency {
        let inline = false;
        let l1_start = 0, l1_end = 0, l2_start = 0, l2_end = 0;
        
        if (this.left === r2.right       // left edge inline
            || this.right === r2.left    // right edge inline     
        ) {     
            inline = true;
            l1_start = this.bottom;
            l1_end = this.top;
            l2_start = r2.bottom;
            l2_end = r2.top;
        }

        if (this.top === r2.bottom       // top edge inline
            || this.bottom === r2.top    // bottom edge 
        ) {     
            inline = true;
            l1_start = this.left;
            l1_end = this.right;
            l2_start = r2.left;
            l2_end = r2.right;
        }

        if (!inline) {
            return Adjacency.NONE;
        }

        if (l2_start >= l1_end || l2_end <= l1_start) {     // no overlap
            return Adjacency.NONE;
        }

        if (l2_start === l1_start && l2_end === l1_end) {   // full overlap
            return Adjacency.PROPER;
        }

        if (l2_start >= l1_start) { 
            if (l2_end <= l1_end) {
                return Adjacency.SUB_LINE;
            } else {
                return Adjacency.PARTIAL;
            }

        } else {
            if (l2_end >= l1_end) {
                return Adjacency.SUB_LINE;
            }
        }

        return Adjacency.PARTIAL;
    }
}