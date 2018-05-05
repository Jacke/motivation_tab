(function(){

var $  = document.getElementById.bind(document);
var $$ = document.querySelectorAll.bind(document);

var App = function($el){
  this.$el = $el;
  this.load();

  this.$el.addEventListener(
    'submit', this.submit.bind(this)
  );

  if (this.dob) {
    this.renderAgeLoop();
    this.renderPrice();
  } else {
    this.renderChoose();
  }
};

App.fn = App.prototype;

App.fn.load = function(){
  var value;

  if (value = localStorage.dob)
    this.dob = new Date(parseInt(value));
};

App.fn.save = function(){
  if (this.dob)
    localStorage.dob = this.dob.getTime();
};

App.fn.submit = function(e){
  e.preventDefault();

  var input = this.$$('input')[0];
  if ( !input.valueAsDate ) return;

  this.dob = input.valueAsDate;
  this.save();
  this.renderAgeLoop();
};

App.fn.renderChoose = function(){
  this.html(this.view('dob')());
};

App.fn.renderAgeLoop = function(){
  this.interval = setInterval(this.renderAge.bind(this), 100);
};

var PRICE_USD = 0;
App.fn.renderPrice = function() {

}

App.fn.renderAge = function(){
  var now       = new Date
  var duration  = now - this.dob;
  var years     = duration / 31556900000;

  var majorMinor = years.toFixed(9).toString().split('.');

  requestAnimationFrame(function(){
    this.html(this.view('age')({
      year:         majorMinor[0],
      milliseconds: majorMinor[1]
    }));
  }.bind(this));
};

App.fn.$$ = function(sel){
  return this.$el.querySelectorAll(sel);
};

App.fn.html = function(html){
  this.$el.innerHTML = html;
};

App.fn.view = function(name){
  var $el = $(name + '-template');
  return Handlebars.compile($el.innerHTML);
};

window.app = new App($('app'))

var changeBackground = (back) => {
  document.querySelector('body').classList = '';
  document.querySelector('body').classList.add(back);
  localStorage.setItem('background', back)
}


document.addEventListener("DOMContentLoaded", function(event) { 



document.getElementById('background-button-default').onclick = function() {changeBackground('default')};
document.getElementById('background-button-red').onclick = function() {changeBackground('red')};
document.getElementById('background-button-green').onclick = function() {changeBackground('green')};
document.getElementById('background-button-purple').onclick = function() {changeBackground('purple')};
document.getElementById('background-button-whiteblue').onclick = function() {changeBackground('whiteblue')};
document.getElementById('background-button-whitewhiteblue').onclick = function() {changeBackground('whitewhiteblue')};

    var old_price = localStorage.getItem('eth');
    if (old_price) {
      document.querySelector('.eth-count')
        .innerHTML = '$ '+old_price.split('.')[0] + `<sup>.${old_price.split('.')[1]}</sup>`;
    }


    if(localStorage.getItem('background')) {
      document.querySelector('body').classList = '';
      document.querySelector('body').classList.add(localStorage.getItem('background'));
    } else {
      document.querySelector('body').classList = '';
      document.querySelector('body').classList.add('default');
    }


 const unwrapUrl = (url) => {
  if (url.includes('chrome-extension://klbibkeccnjlkjkiokjodocebajanakg/suspended')) {
    console.log('wrapped', url, url.split('uri=')[1])
    return url.split('uri=')[1];
  } else {
    return url;
  }
 }   

/***
 * Tabs list
 */

 console.log('Tabs');
 chrome.tabs.getCurrent((c) => {
  console.log(c);
 })
 chrome.tabs.getAllInWindow((c) => {
  console.log(c);
  c.map(tab => {
    chrome.tabs.get(tab.id, (existedTab) => console.log('existedTab url: ', 
      unwrapUrl( existedTab.url) 
    ));
  });
 })


 /////////// ETH Balance fethcher

    fetch('https://api.coinmarketcap.com/v1/ticker/?convert=usd&limit=10').then((response) => {
      return response.json();
    }).then((json) => {
      console.log(json);
      let eth = json.find((ticker) => ticker.id == "ethereum");
      console.log(eth.price_usd);
      localStorage.setItem('eth', eth.price_usd);      
      console.log(document.querySelector('.eth-count'));
      console.log(document.querySelector('body'))
     window.web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/LjMVIfNpbOOPz2auuHUW"));
     console.log('web3', Web3, window.web3);


      if (document.querySelector('.eth-count') != null) {
        document.querySelector('.eth-count').innerHTML = '$ '+eth.price_usd.split('.')[0] + `<sup>.${eth.price_usd.split('.')[1]}</sup>`;
      }

      if (document.querySelector('.eth-balance-count') != null) {
        var balance = window.web3.eth.getBalance('0x34cc574b4528799b5c0a2aa9fda71fd0830a6086');
        document.querySelector('.eth-balance-count').innerHTML = `${window.web3.fromWei(balance, 'ether').toString().slice(0,6)} ETH`;
      }

    });





});



})();
