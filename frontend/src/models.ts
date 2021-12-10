// interfaces for all objects defined in UML and ERD


enum Year {
    FE, SE, TE, BE
}
enum Department {
    IT, CSE, ENTC, MECH
}

interface Person {
    name: string,
    email: string,
    password?: string | null
}

interface Student extends Person {
    year: Year,
    department: Department
}

interface Teacher extends Person {}

export type {
    Student,
    Teacher
}