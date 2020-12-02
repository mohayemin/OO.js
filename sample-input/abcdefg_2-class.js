function a() {
    b();
    c();
    d();
}

function b() {
    d();
}

function c() {
    d();
}

function d() {
}

function e() {
    f();
    g();
}

function f() {
    g()
}

function g() {

}