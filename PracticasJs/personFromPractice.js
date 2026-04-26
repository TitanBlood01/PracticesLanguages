export default class Person {
  constructor({ firstName, lastName, age }) {
    if (firstName == "" || lastName == "") {
      throw new Error("One value firstname or lastname are empty");
    } else {
      this.firstName = firstName;
      this.lastName = lastName;
      this.age = age;
    }
  }
  fullname() {
    return `First: ${this.firstName} Last: ${this.lastName}`;
  }

  static fromObject(obj) {
    let newPerson = new Person(obj);
    return newPerson;
  }
}
/*Manera correcta o eficiente
export default class Person {
  constructor({ firstName, lastName, age }) {
    if (
      typeof firstName !== "string" || !firstName.trim() ||
      typeof lastName !== "string" || !lastName.trim()
    ) {
      throw new TypeError("firstName and lastName must be non-empty strings");
    }

    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
  }

  fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  static fromObject(obj) {
    return new Person(obj);
  }
}
*/