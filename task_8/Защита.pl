// С клавиатуры вводятся 4 числа. Если из суммы любых трех чисел можно получить
// четвёротое, то вывести true, иначе false.

condition(A,B,C,D) :- A is (B + C + D); B is (A + C + D); C is (A + B + D); D is (A + B + C).

start:- write("Number 1: "), nl,
        read(A), nl,
        write("Number 2: "), nl,
        read(B), nl,
        write("Number 3: "), nl,
        read(C), nl,
        write("Number 4: "), nl,
        read(D), nl,
        condition(A, B, C, D).
