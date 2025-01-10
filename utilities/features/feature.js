

export function SieveOfEratosthenes() {

}

export function primeFactorization() {

}

export function findGCD(x,y) {
    if(x==0n)return y;
    return findGCD(BigInt(y%x),x);
}

export function findLCM(x,y) {
    return x*y/findGCD(x,y);
}