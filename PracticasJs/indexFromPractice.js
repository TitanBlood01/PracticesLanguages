import defaultclass from "./personFromPractice.js";

try {
    let person = new defaultclass({firstName: "ana", lastName: "lopez", age: 28})
    console.log(person)
    let person2 = {...person}
    person2.age = 29
    console.group("Original Person")
    console.log(person.firstName)
    console.log(person.lastName)
    console.log(person.age)
    console.groupEnd()
    console.group("Copy Person")
    console.log(person2.firstName)
    console.log(person2.lastName)
    console.log(person2.age)
    console.groupEnd()
} catch (error) {
    console.log("An error has happened: ", error)
}
/*Version correcta o mas eficiente
import Person from "./person.js";

try {
  const person = Person.fromObject({ firstName: "ana", lastName: "lopez", age: 28 });
  const modified = { ...person, age: 29 };

  console.group("Person data");
  console.log("Original:", person.fullName(), person.age);
  console.log("Modified:", `${modified.firstName} ${modified.lastName}`, modified.age);
  console.groupEnd();
} catch (error) {
  console.log("Could not create person:", error.message);
}
*/