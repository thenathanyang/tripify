import moment from 'moment';

/**
 * A Trip
 */
export default class Trip {
  /**
   * Creates a Trip
   * 
   * @param {String} id 
   * @param {String} name 
   * @param {moment} date 
   * @param {String} description 
   * @param {String} background 
   * @param {Array<Member>} members 
   * @param {Array<Event>} events 
   */
  constructor(id, name, date, description, background, members, events) {
    this.id = id;
    this.name = name;
    this.date = date ? moment(date).startOf('day') : null;
    this.description = description || null;
    this.background = background || null;
    this.members = members || [];
    this.events = events || [];
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      date: this.date,
      description: this.description,
      background: this.background,
      members: this.members,
      events: this.events,
    };
  }

  /**
   * Creates a Trip from an object with properties corresponding to the constructor
   * 
   * @param {Object} obj
   */
  static fromObject(obj) {
    return new Trip(obj.id, obj.name, obj.date, obj.description, obj.background, obj.members, obj.events);
  }
}