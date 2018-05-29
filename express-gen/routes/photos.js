const fs = require('fs');
var express = require('express');
var router = express.Router();

// 模拟图片数据
const photosData = [];
for (let index = 0; index < 9; index++) {
  photosData.push(`img${index+1}.png`);
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('photos', { title: '图片列表', photosData: photosData });
});

module.exports = router;
