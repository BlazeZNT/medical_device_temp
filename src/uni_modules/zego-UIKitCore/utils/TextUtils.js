function isEmpty(str) {
    return !str || /^\s*$/.test(str.trim());
}
export default {
    isEmpty
};
