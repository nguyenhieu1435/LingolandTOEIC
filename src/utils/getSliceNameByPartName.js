export default function getSliceNameByPartName(partName){
    switch(partName){
        case "part1": return "part1Training";
        case "part2": return "part2Training";
        case "part3": return "part3Training";
        case "part4": return "part4Training";
        case "part6": return "part6Training";
        default: return "part1Training"
    }
}