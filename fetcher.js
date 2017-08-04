const Youtube = require('youtube-node');
const Bluebird = require('bluebird');
const fetch = require('node-fetch');
const fs = require('fs');
const mp3 = require('youtube-mp3');
const webdriver = require('selenium-webdriver');
const By = webdriver.By;

const driver = new webdriver.Builder().forBrowser('chrome').build();
const songList = [ 
	'vaadi ne vaadi hiphop tamizha',
	'raabta title song lyrical',
	'main tera boyfriend lyrical video',
	'vikram vedha karuppu vellai infinite music',
	'london thumakda audio',
	'shaam shaandaar',
	'thupakki theme song',
	'vip title song',
	'udhungada sangu',
	'maari thara local',
	'kuruvi palanathu',
	'malare song malayalam muzik247',
	'kuruvi dandana darna',
	'jalsa pannungada song lyrics',
	'thaen thaen kuruvi hd',
	'thalli pogathey official single',
	'rasaali lyric video',
	'osaka osaka',
	'anbil avan',
	'hosanna vinnaithaandi varuvaaya',
	'omana penne',
	'thodakkam mangalyam mcfilmsongs',
	'maari don u don u',
	'what a karuvaad',
	'mandarame chella chenthamare',
	'high heels arjun kapoor',
	'pista neram',
	'kaadhal ennulle',
	'sau aasmaan full audio',
	'kala chashma full audio',
	'badri ki dulhania full audio',
	'yeh jawaani hai deewane mashup',
	'subhanallah lyrical',
	'gerua/kabira cover medley',
	'ilahi cover bryden',
	'maane ke hum yaar nahin',
	'jeena jeena samjhawan',
	'bahara lyric video',
	'sadka',
	'jab mila tu',
	'i hate luv storys song',
	'bin tere',
	'kanaave kanaave',
	'manwa laage',
	'titli chennai express full audio',
	'jiya re',
	'neeyum naanum',
	'kaadhal cricket full audio',
	'thani oruvan kannala kannala',
	'thani oruvan thani oruvan',
	'ok kanmani kaara aattakkaara',
	'aye sinamika',
	'malargal kaettaen',
	'malarge ketten nila kaigiradhu',
	'kannamoochi yenada',
	'thom karuvil',
	'naane varugiren',
	'alaipayuthey song',
	'maryan sonapareeya audio',
	'd se dance',
	'daingad',
	'nachde ne saare',
	'ye jawaani teri full song audio',
	'buddhu sa mann',
	'top lessi poddi',
	'naaka mukka',
	'vidya vox closer',
	'hey vetri velaa',
	];
const youtube = new Youtube();
let result;
let urlList = [];
let urlList2 = [];
const promiseList = [];
const firstPartURL = 'https://www.youtube.com/watch?v=';
const fetchyURL = 'https://fetchy.io/video/=';
youtube.setKey('AIzaSyBDCtL6BSNMVbMH1WUXmj5tJKIiPf_-7Co');
// note understand asynchrounous vs synchronous first then move on LOL

const getPromise = function(song) {
	const promise = new Bluebird(function(resolve,reject){
		youtube.search(song, 2, function(error,result){
			if(error){
				reject(error);
			}
			else {
				resolve(result);
			}
		});

	});
	
	return promise;

}

/*fetch('https://fetchy.io/video/=BdPAIrzyQBI')
	.then(function(res){
		return res.text();
	}).then(function(body){
		console.log(body);
	});*/

/*songList.forEach(function(song){
	getPromise(song).then(function(data) {
		result = JSON.stringify(data,null,2);
		// console.log(result);
		result = JSON.parse(result)["items"][0]["id"]["videoId"];
		urlList.push(result);
		console.log(urlList);


	})
	.catch(function(err){
		console.log(JSON.stringify(err,null,2));
	});
});*/

// promise list is the best
for(let i = 0; i < songList.length; i++){
	promiseList.push(getPromise(songList[i]));
}

Promise.all(promiseList).then(function(items){
	for(let i = 0; i < items.length; i++){
		result = JSON.stringify(items[i], null, 2);
		result = JSON.parse(result)["items"][0]["id"]["videoId"];
		urlList.push(firstPartURL + result);
		urlList2.push(fetchyURL + result);

	}
	console.log(urlList);
	console.log(urlList2);

	/*for(let i = 0; i < urlList.length; i++) {
		fs.appendFile('urls.txt', urlList2[i] + '\n', function(err){
			if(err) {
				console.log(err);
			}
			else {
				console.log('yee');
			}
		});
	}*/

	for(let i = 0; i < urlList2.length; i++) {
		driver.get(urlList2[i]);
		driver.sleep(2000);
		let element = driver.findElement(By.id('download-mp3-btn'));
		driver.sleep(2000);
		driver.executeScript("window.scrollTo(200,400);");
    	driver.sleep(2000);
    	element.click();
    	driver.sleep(5000);
	}
	/*fs.writeFile('urls.txt', urlList, function(err){
		if(err) {
			console.log(err);
		}
		else {
			console.log('yee');
		}*/
	});








