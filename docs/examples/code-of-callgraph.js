function A() {
    B()
    C()
    D()
}

function B() {
    D();
}

function C() {
    D();
}

function D() {
    G();
}

function E() {
    F();
    G();
}

function F() {
    G()
}

function G() {
}
