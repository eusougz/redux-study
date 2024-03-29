function add(a) {
    return function (b) {
        return a + b;
    }
}

const add2 = a => b => a + b;

add(1)(5); // 1 + 5
add2(1)(5); // 1 + 5
