import moment from "moment";

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
   * @param {number} price
   * @param {String} description
   * @param {Array<String>} images
   */
  constructor(id, name, startDate, endDate, location, price, description, images) {
    this.id = id;
    this.name = name;
    this.startDate = startDate ? moment(startDate).startOf('minute') : null;
    this.endDate = endDate ? moment(endDate).startOf('minute') : null;
    this.location = location;
    this.price = parseInt(price) || 0;
    this.description = description || null;
    this.images = images || [];
  }

  /**
   * Creates a Event from an object with properties corresponding to the constructor
   * 
   * @param {Object} obj
   */
  static fromObject(obj) {
    return new Event(obj.id, obj.name, obj.startDate, obj.endDate, obj.location, obj.price, obj.description, obj.images);
  }

  /**
   * Creates a Event from a Mappening object 
   * 
   * @param {Object} obj
   */
  static fromMappeningObject(obj) {
    var location = obj.properties.place.location.street + ", " + obj.properties.place.location.city + " " +obj.properties.place.location.state;
    return new Event(obj.id, obj.properties.name, obj.properties.start_time , obj.properties.end_time , location, null , obj.properties.description, [obj.properties.cover_picture]);
  }

}