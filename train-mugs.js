/* Yolo */
var clarifai;
var mugShotPhoto;
$(document).ready(function() {
  clarifai = new Clarifai({
    'clientId': '35jcg0WIW8KDHG5TKA9D61-XB_LsDPc442OWyuRl',
    'clientSecret': 'Brfgub1h4VO0-7yP0Xl9Oxi5KMFydWPUY7tP7zVi'
  });
});

function positive(imgurl) {
  clarifai.positive(imgurl, 'jennylian', callback).then(
    promiseResolved,
    promiseRejected
  );
}

function negative(imgurl) {
  clarifai.negative(imgurl, 'jennylian', callback).then(
    promiseResolved,
    promiseRejected
  );
}

function train() {
  clarifai.train('jennylian', callback).then(
    promiseResolved,
    promiseRejected
  );
}

function displayTags(url){
  // var picUrl = "http://www.clarifai.com/static/img_ours/metro-north.jpg";
  // var picUrl = "http://i.imgur.com/bphqBAT.jpg";
  var picUrl = url;
  var appToken = "QL5sg8NV0Q9rhdJhH1lZapL0fydnHF";
  var baseUrl = "https://api.clarifai.com/v1/tag/?url=";
  $.ajax({
         url: baseUrl + picUrl,
     
         type: "GET",
         beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Bearer ' + appToken);},
         success: function(data) { 



          $('#answers').text(data.results[0].result.tag.classes);
          console.log(data); 
        }
      });
 
}

function predict(imgurl) {
  clarifai.predict(imgurl, 'jennylian', callback)
  .then(function(obj) {
      if (obj.score < 0.6) {
        swal({
          title: 'Go ahead and use it!',
          text: 'This is not jenny lian\'s mug',
          imageUrl: obj.url
        });
      } else {
        swal({
          title: 'No touch allowed!',
          text: 'This is MINE',
          imageUrl: obj.url
        });
      }
    },
    promiseRejected
  );
}

function promiseResolved(obj){
  console.log('Promise resolved', obj);
}

function promiseRejected(obj){
  console.log('Promise rejected', obj);
}

function callback(obj){
  console.log('callback', obj);
}

function mugSubmit() {
  predict($("#new-mug").val());
}

function samplePositives() {
  clarifai.positive('https://larvalsubjects.files.wordpress.com/2010/04/450x450std-cobalt-blue-mug.jpg', 'jennylian', callback).then(
    promiseResolved,
    promiseRejected
  );
  clarifai.positive('http://arswarehouse.com/images/87168-06.jpg', 'jennylian', callback).then(
    promiseResolved,
    promiseRejected
  );
  clarifai.positive('http://www.promo-mugs.co.uk/acatalog/sparta-light-blue-297.jpg', 'jennylian', callback).then(
    promiseResolved,
    promiseRejected
  );
  clarifai.positive('http://www.leaderpromos.com/ProdImages/xlarge/BUL_sm6303_lightblue.jpg', 'jennylian', callback).then(
    promiseResolved,
    promiseRejected
  );
  clarifai.positive('http://www.piercingglance.com/image/cache/data/Mugs/supreme-mug-blue-750x750.jpg', 'jennylian', callback).then(
    promiseResolved,
    promiseRejected
  );
  clarifai.positive('http://www.ikea.com/PIAimages/0209837_PE365557_S5.JPG', 'jennylian', callback).then(
    promiseResolved,
    promiseRejected
  );
  clarifai.positive('http://www.woodenurecover.com/assets/images/Coffe-Mugs/Blue-Recovery-Mug.jpg', 'jennylian', callback).then(
    promiseResolved,
    promiseRejected
  );
}

function sampleNegatives() {
  clarifai.negative('http://i.imgur.com/GeMQsiQ.jpg', 'jennylian', callback).then(
    promiseResolved,
    promiseRejected
  );
  clarifai.negative('http://studiodiner.com/images/F31865175.png', 'jennylian', callback).then(
    promiseResolved,
    promiseRejected
  );
  clarifai.negative('http://cdn3.volusion.com/bvdx6.cp5fo/v/vspfiles/photos/1085040852515505-2.jpg', 'jennylian', callback).then(
    promiseResolved,
    promiseRejected
  );
  clarifai.negative('https://www.connox.com/m/100031/137802/media/iittala/Teema-rot/Teema-becher-rot.jpg', 'jennylian', callback).then(
    promiseResolved,
    promiseRejected
  );
  clarifai.negative('http://www.woodenurecover.com/assets/images/Coffe-Mugs/Red-Recovery-Mug.jpg', 'jennylian', callback).then(
    promiseResolved,
    promiseRejected
  );
}
