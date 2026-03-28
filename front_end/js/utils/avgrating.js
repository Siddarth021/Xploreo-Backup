export function avgrating(a){
    let totalScore = 0;
    console.log(totalScore);
    totalScore = a.reduce((acc, curr) => acc + curr.rating, 0);
    console.log(totalScore);
    let average = a.length > 0 ? (totalScore / a.length).toFixed(1) : 0;
    return average;
}