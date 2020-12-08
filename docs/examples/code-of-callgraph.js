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

function e() {
    f();
    G();
}

function f() {
    G()
}

function G() {
}
