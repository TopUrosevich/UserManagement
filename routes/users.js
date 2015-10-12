var express = require('express');
var router = express.Router();

/* 
 * Get userlist
 */
router.get('/userlist', function(req, res, next) {
  var db = req.db;
  var collection = db.get('users');
  collection.find({}, {}, function (e, info) {
    res.json(info);
  });
});

/* 
 * Post to adduser
 */
router.post('/adduser', function(req, res) {
  var db = req.db;
  var collection = db.get('users');
  collection.insert(req.body, function(err, result) {
    res.send(
      (err === null) ? { msg: ''} : { msg: err }
    );
  });
});

/* 
 * Delete to deleteuser
 */
router.delete('/deleteuser/:id', function(req, res) {
  var db = req.db;
  var collection = db.get('users');
  var userToDelete = req.params.id;
  
  collection.remove({'_id': userToDelete}, function(err) {
    res.send((err === null) ? { msg: '' } : { msg: 'Error ' + err })
  });
});

module.exports = router;
