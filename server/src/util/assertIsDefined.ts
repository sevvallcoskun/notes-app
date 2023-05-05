export function assertIsDefined<T>(val:T):asserts val is NonNullable<T>{
    if(!val){
        throw Error("expected 'val' to be defined "+val);
        
    }
}