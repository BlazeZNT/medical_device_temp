const TAG = 'ZEGOUIKit';
export const zloginfo = (...msg) => {
    console.log(`${TAG}[INFO]: `, ...msg);
};
export const zlogwarning = (...msg) => {
    console.warn(`${TAG}[WARN]: `, ...msg);
};
export const zlogerror = (...msg) => {
    const stack = new Error().stack;
    console.error(`${TAG}[ERROR]: `, ...msg, stack);
};
export const zlogtrace = (msg) => {
    const stack = new Error(msg).stack;
    console.error(`${TAG}[TRACE]: `, stack);
};
