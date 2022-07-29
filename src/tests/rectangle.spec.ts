import { Adjacency } from "../enums/adjacency";
import { Rectangle } from "../rectangle";

describe("Rectangle Model", () => {

    describe("New Rectangle() ", () => {

        it("should create a Rectangle with valid points", () => {
            const testRectangle = new Rectangle(0,4,0,4);
    
            expect(testRectangle.left).toBe(0);
            expect(testRectangle.top).toBe(4);
            expect(testRectangle.right).toBe(4);
            expect(testRectangle.bottom).toBe(0);
        });
    
        it("should throw error for 0 width", () => {
            expect(() => new Rectangle(0,0,0,6)).toThrowError();
        });
    
        it("should throw error for 0 height", () => {
            expect(() => new Rectangle(0,3,4,4)).toThrowError();
        });
    });

    describe("intersection() ", () => {
        const r1 = new Rectangle(4,8,4,8); // base rectangle
        
        it("should return false for wide left", () => {
            let r2 = new Rectangle(0,1,1,6);     // left

            expect(r1.intersects(r2)).toBe(false);
            expect(r2.intersects(r1)).toBe(false);  // inverse
        });

        it("should return false for wide above", () => {
            let r2 = new Rectangle(4,8,10,13);   // above  

            expect(r1.intersects(r2)).toBe(false);
            expect(r2.intersects(r1)).toBe(false);  // inverse
        });

        it("should return false for wide below", () => {
            let r2 = new Rectangle(4,8,0,2);   // below  

            expect(r1.intersects(r2)).toBe(false);
            expect(r2.intersects(r1)).toBe(false);  // inverse
        });
        
        it("should return false for wide right", () => {
            let r2 = new Rectangle(9,12,4,8);   // right

            expect(r1.intersects(r2)).toBe(false);
            expect(r2.intersects(r1)).toBe(false);  // inverse
        });

        it("should return false for r2 around r1", () => {
            let r2 = new Rectangle(3,9,3,9);   // bigger contains r1     

            expect(r1.intersects(r2)).toBe(false);
            expect(r2.intersects(r1)).toBe(false);  // inverse
        });

        it("should return true exact overlap", () => {
            let r2 = new Rectangle(4,8,4,8); 

            expect(r1.intersects(r2)).toBe(true);
            expect(r2.intersects(r1)).toBe(true);   // inverse
        });

        it("should return true for intersections", () => {
            let r2 = new Rectangle(6,10,3,10); 

            expect(r1.intersects(r2)).toBe(true);
            expect(r2.intersects(r1)).toBe(true);   // inverse
        });

        it("should return true for sub-line intersections", () => {
            let r2 = new Rectangle(6,10,3,6); 

            expect(r1.intersects(r2)).toBe(true);
            expect(r2.intersects(r1)).toBe(true);   // inverse
        });

        it("should return true for sub-line intersections", () => {
            let r2 = new Rectangle(6,10,0,6); 

            expect(r1.intersects(r2)).toBe(true);
            expect(r2.intersects(r1)).toBe(true);   // inverse
        });

        it("should return true for 4 intersection", () => {
            let r2 = new Rectangle(6,7,0,10); 

            expect(r1.intersects(r2)).toBe(true);
            expect(r2.intersects(r1)).toBe(true);   // inverse
        });
    });

    describe("contains() ", () => {
        const r1 = new Rectangle(2,6,2,6); // base rectangle

        it("should return true for containment", () => {
            let r2 = new Rectangle(3,6,3,6); 

            expect(r1.contains(r2)).toBe(true);
        });

        it("should return false of inverse containment", () => {
            let r2 = new Rectangle(3,6,3,6); 

            expect(r2.contains(r1)).toBe(false);
        });

        it("should return false for no containment", () => {
            let r2 = new Rectangle(6,10,3,6); 

            expect(r1.contains(r2)).toBe(false);
        });

        it("should return true for exact match", () => {
            let r2 = new Rectangle(2,6,2,6); 

            expect(r1.contains(r2)).toBe(true);
        });

        it("should return true for adjacent inside", () => {
            let r2 = new Rectangle(3,6,2,6); 

            expect(r1.contains(r2)).toBe(true);
        });
    });

    describe("isAdjacent() ", () => {
        const r1 = new Rectangle(2,6,2,6); // base rectangle

        it("should return Adjacency.NONE for non adjacent rectangles and the inverse", () => {
            let r_above = new Rectangle(3,6,7,10); 
            let r_right = new Rectangle(7,10,3,6); 
            let r_below = new Rectangle(3,6,0,1); 
            let r_left = new Rectangle(0,1,3,6); 

            expect(r1.isAdjacent(r_above)).toBe(Adjacency.NONE);
            expect(r1.isAdjacent(r_right)).toBe(Adjacency.NONE);
            expect(r1.isAdjacent(r_below)).toBe(Adjacency.NONE);
            expect(r1.isAdjacent(r_left)).toBe(Adjacency.NONE);

            // inverse
            expect(r_above.isAdjacent(r1)).toBe(Adjacency.NONE);
            expect(r_right.isAdjacent(r1)).toBe(Adjacency.NONE);
            expect(r_below.isAdjacent(r1)).toBe(Adjacency.NONE);
            expect(r_left.isAdjacent(r1)).toBe(Adjacency.NONE);
        });

        it("should return Adjacency.NONE for r2 around r1 and inverse", () => {
            let r2 = new Rectangle(0,8,0,8); 

            expect(r1.isAdjacent(r2)).toBe(Adjacency.NONE);
            expect(r2.isAdjacent(r1)).toBe(Adjacency.NONE);
        });

        it("should return Adjacency.PARTIAL for adjacent and its inverse", () => {
            let r2 = new Rectangle(6,10,3,8); 
            let r3 = new Rectangle(6,10,0,5); 

            expect(r1.isAdjacent(r2)).toBe(Adjacency.PARTIAL);
            expect(r2.isAdjacent(r1)).toBe(Adjacency.PARTIAL);

            expect(r1.isAdjacent(r3)).toBe(Adjacency.PARTIAL);
            expect(r3.isAdjacent(r1)).toBe(Adjacency.PARTIAL);
        });

        it("should return Adjacency.SUB_LINE for adjacent with shared corner and its inverse", () => {
            let r_above = new Rectangle(3,6,6,10); 
            let r_right = new Rectangle(6,10,3,6); 
            let r_below = new Rectangle(3,6,0,2); 
            let r_left = new Rectangle(0,2,3,6); 

            expect(r1.isAdjacent(r_above)).toBe(Adjacency.SUB_LINE);
            expect(r1.isAdjacent(r_right)).toBe(Adjacency.SUB_LINE);
            expect(r1.isAdjacent(r_below)).toBe(Adjacency.SUB_LINE);
            expect(r1.isAdjacent(r_left)).toBe(Adjacency.SUB_LINE);

            // inverse
            expect(r_above.isAdjacent(r1)).toBe(Adjacency.SUB_LINE);
            expect(r_right.isAdjacent(r1)).toBe(Adjacency.SUB_LINE);
            expect(r_below.isAdjacent(r1)).toBe(Adjacency.SUB_LINE);
            expect(r_left.isAdjacent(r1)).toBe(Adjacency.SUB_LINE);
        });

        it("should return Adjacency.SUB_LINE for smaller adjacent rectangles and the inverse", () => {
            let r_above = new Rectangle(3,5,6,10); 
            let r_right = new Rectangle(6,10,3,5); 
            let r_below = new Rectangle(3,5,0,2); 
            let r_left = new Rectangle(0,2,3,5); 

            expect(r1.isAdjacent(r_above)).toBe(Adjacency.SUB_LINE);
            expect(r1.isAdjacent(r_right)).toBe(Adjacency.SUB_LINE);
            expect(r1.isAdjacent(r_below)).toBe(Adjacency.SUB_LINE);
            expect(r1.isAdjacent(r_left)).toBe(Adjacency.SUB_LINE);

            // inverse
            expect(r_above.isAdjacent(r1)).toBe(Adjacency.SUB_LINE);
            expect(r_right.isAdjacent(r1)).toBe(Adjacency.SUB_LINE);
            expect(r_below.isAdjacent(r1)).toBe(Adjacency.SUB_LINE);
            expect(r_left.isAdjacent(r1)).toBe(Adjacency.SUB_LINE);
        });

        it("should return Adjacency.PROPER same sized adjacent side and the inverse", () => {
            let r_above = new Rectangle(2,6,6,10); 
            let r_right = new Rectangle(6,10,2,6); 
            let r_below = new Rectangle(2,6,0,2); 
            let r_left = new Rectangle(0,2,2,6); 

            expect(r1.isAdjacent(r_above)).toBe(Adjacency.PROPER);
            expect(r1.isAdjacent(r_right)).toBe(Adjacency.PROPER);
            expect(r1.isAdjacent(r_below)).toBe(Adjacency.PROPER);
            expect(r1.isAdjacent(r_left)).toBe(Adjacency.PROPER);

            // inverse
            expect(r_above.isAdjacent(r1)).toBe(Adjacency.PROPER);
            expect(r_right.isAdjacent(r1)).toBe(Adjacency.PROPER);
            expect(r_below.isAdjacent(r1)).toBe(Adjacency.PROPER);
            expect(r_left.isAdjacent(r1)).toBe(Adjacency.PROPER);
        });
    });
});