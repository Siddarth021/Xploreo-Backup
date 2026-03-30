export function totalAmount(a){
    let totalamount = 0;
    totalamount = a.reduce((acc, curr) => acc + curr.amount, 0);
    return totalamount;
}
