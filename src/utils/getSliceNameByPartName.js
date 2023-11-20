export default function getSliceNameByPartName(partName){
    switch(partName){
        case "part1": return "part1Training";
        case "part2": return "part2Training";
        case "part3": return "part3Training"
        default: return "part1Training"
    }
}