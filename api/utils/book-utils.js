var moment = require('moment');
var config = require('../../config/config.json');

module.exports = {

  generateSystemID: function(bookObj) {
    let systemId = 'HB_';

    let initials = bookObj.name.charAt(0) ;
    systemId += initials;

    var temp = Math.floor(1000 + Math.random() * 9000);
    temp = temp.toString();
    systemId += temp;

    return systemId;
  }
};
