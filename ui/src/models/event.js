/**
 * A Event
 */
export default class Event {
  /**
   * Creates an Event
   * 
   * @param {String} id 
   * @param {String} name 
   * @param {Date} startDate 
   * @param {Date} endDate 
   * @param {String} location 
   * @param {String} description
   * @param {Array<String>} images
   */
  constructor(id, name, startDate, endDate, location, description, images) {
    this.id = id;
    this.name = name;
    this.startDate = startDate;
    this.endDate = endDate;
    this.location = location;
    this.description = description || null;
    this.images = images || [];
  }

  /**
   * Creates a Event from an object with properties corresponding to the constructor
   * 
   * @param {Object} obj
   */
  static fromObject(obj) {
    return new Trip(obj.id, obj.name, obj.startDate, obj.endDate, obj.location, obj.description, obj.images);
  }
}