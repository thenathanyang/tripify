const validState = state => [MEMBER_INVITED, MEMBER_DECLINED, MEMBER_INVITED].includes(states);

export const MEMBER_INVITED  = 1;
export const MEMBER_DECLINED = 2;
export const MEMBER_ACCEPTED = 3;

/**
 * A Trip Member
 */
export default class Member {
  /**
   * Creates a Member
   * 
   * @param {String} name 
   * @param {String} email 
   * @param {String} picture 
   * @param {number} state 
   */
  constructor(name, email, picture, state) {
    this.name = name;
    this.email = email || null;
    this.picture = picture || null;
    this.state = validState(state) ? state : MEMBER_INVITED;
  }

  /**
   * Creates a Member from an object with properties corresponding to the constructor
   * 
   * @param {Object} obj
   */
  static fromObject(obj) {
    return new Trip(obj.name, obj.email, obj.picture, obj.state);
  }
}
