export function getPlacement(index: number) {
    
    if(index == 1) return [
            { StartingSquare: { Row: "A", Column: 10 }, EndingSquare : { Row: "E", Column: 10 } },
            { StartingSquare: { Row: "C", Column: 3 }, EndingSquare : { Row: "C", Column: 6 } },
            { StartingSquare: { Row: "I", Column: 7 }, EndingSquare : { Row: "I", Column: 9 } },
            { StartingSquare: { Row: "I", Column: 3 }, EndingSquare : { Row: "I", Column: 5 } },
            { StartingSquare: { Row: "E", Column: 4 }, EndingSquare : { Row: "E", Column: 5 } },
        ]
    if(index == 2) return [
            { StartingSquare: { Row: "A", Column: 5 }, EndingSquare : { Row: "E", Column: 5 } },
            { StartingSquare: { Row: "G", Column: 5 }, EndingSquare : { Row: "J", Column: 5 } },
            { StartingSquare: { Row: "A", Column: 8 }, EndingSquare : { Row: "C", Column: 8 } },
            { StartingSquare: { Row: "E", Column: 8 }, EndingSquare : { Row: "F", Column: 8 } },
            { StartingSquare: { Row: "H", Column: 8 }, EndingSquare : { Row: "J", Column: 8 } },
        ]
    if(index == 3) return [
            { StartingSquare: { Row: "J", Column: 2 }, EndingSquare : { Row: "J", Column: 6 } },
            { StartingSquare: { Row: "C", Column: 10 }, EndingSquare : { Row: "F", Column: 10 } },
            { StartingSquare: { Row: "H", Column: 6 }, EndingSquare : { Row: "H", Column: 8 } },
            { StartingSquare: { Row: "E", Column: 3 }, EndingSquare : { Row: "E", Column: 5 } },
            { StartingSquare: { Row: "B", Column: 2 }, EndingSquare : { Row: "B", Column: 3 } },
        ]
    return [
            { StartingSquare: { Row: "A", Column: 1 }, EndingSquare : { Row: "A", Column: 5 } },
            { StartingSquare: { Row: "C", Column: 1 }, EndingSquare : { Row: "C", Column: 4 } },
            { StartingSquare: { Row: "E", Column: 1 }, EndingSquare : { Row: "E", Column: 3 } },
            { StartingSquare: { Row: "G", Column: 1 }, EndingSquare : { Row: "G", Column: 3 } },
            { StartingSquare: { Row: "I", Column: 1 }, EndingSquare : { Row: "I", Column: 2 } },
        ]
}