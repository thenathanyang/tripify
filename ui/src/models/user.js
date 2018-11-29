/**
 * A User for login/register
 */
export default class User {
  /**
   * Creates a User
   * 
   * @param {String} name
   * @param {String} email
   * @param {String} id
   */
  constructor(name, email, id) {
    this.name = name;
    this.email = email;
    this.id = id;
  }

  toObject() {
    return {
      name: this.name,
      email: this.email,
      id: this.id ? this.id : undefined,
    }
  }

  /**
   * Creates a User from an object with properties corresponding to the constructor
   * 
   * @param {Object} obj
   */
  static fromObject(obj) {
    return new User(obj.name, obj.email, obj.id);
  }
}
