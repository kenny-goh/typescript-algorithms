/**
 *
 * @param min
 * @param max
 */
export const randomNumberBetween = (min: number, max: number) =>  Math.floor(Math.random() * (max - min + 1)) + min;


// const sum = arr => arr.reduce((a, b) => a + b, 0);
// const mean = arr => sum(arr) / arr.length;

/**
 *
 * @param A
 * @param quantile
 */
export const quantile = (A: number[], quantile: number) => {
    const sorted = A.sort((a, b) => a - b);
    const pos = (sorted.length - 1) * quantile;
    const base = Math.floor(pos);
    const rest = pos - base;
    if (sorted[base + 1] !== undefined) {
        return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
    } else {
        return sorted[base];
    }
};


export const numberListGenerator = function*(size: number, max: number): Generator<number[]> {
    while (true) {
        let numbers: number[] = []
        for (let i = 0; i < size; i++) {
            numbers.push(Math.floor(Math.random() * max))
        }
        yield numbers
    }
};


export const deepCopy = <T>(instance : T): T => {
    if ( instance == null){
        return instance;
    }

    // handle Dates
    if (instance instanceof Date) {
        return new Date(instance.getTime()) as any;
    }

    // handle Array types
    if (instance instanceof Array){
        var cloneArr = [] as any[];
        (instance as any[]).forEach((value)  => {cloneArr.push(value)});
        // for nested objects
        return cloneArr.map((value: any) => deepCopy<any>(value)) as any;
    }
    // handle objects
    if (instance instanceof Object) {
        var copyInstance = { ...(instance as { [key: string]: any }
            ) } as { [key: string]: any };
        for (var attr in instance) {
            if ( (instance as Object).hasOwnProperty(attr))
                copyInstance[attr] = deepCopy<any>(instance[attr]);
        }
        return copyInstance as T;
    }
    // handling primitive data types
    return instance;
};