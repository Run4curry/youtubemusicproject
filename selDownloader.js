const webdriver = require('selenium-webdriver');
const fs = require('fs');
const By = webdriver.By;
const readline = require('readline');
const fetchyURLs = [];


const rd = readline.createInterface({
	input: fs.createReadStream('./urls.txt'),
	console: true
});
const driver = new webdriver.Builder().forBrowser('chrome').build();

rd.on('line', function(line){
	console.log(line);
	driver.get(line);
	let element = driver.findElement(By.id('download-mp3-btn'));
	driver.executeScript("arguments[0].scrollIntoView()", element);
    driver.sleep(300);
    element.click();
});
