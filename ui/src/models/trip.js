/**
 * A Trip
 */
export default class Trip {
  /**
   * Creates a Trip
   * 
   * @param {String} id 
   * @param {String} name 
   * @param {Date} date 
   * @param {String} description 
   * @param {Array<Member>} members 
   * @param {Array<Event>} events 
   */
  constructor(id, name, date, description, members, events) {
    this.id = id;
    this.name = name;
    this.date = date;
    this.description = description;
    this.members = members || [];
    this.events = events || [];
  }

  /**
   * Creates a Trip from an object with properties corresponding to the constructor
   * 
   * @param {Object} obj
   */
  static fromObject(obj) {
    return new Trip(obj.id, obj.name, obj.date, obj.description, obj.members, obj.events);
  }
}