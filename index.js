var Downloader = require('mt-files-downloader');
var url = require("url");
var path = require("path");

var downloader = new Downloader();

var urlArray = [
  'https://commoncrawl.s3.amazonaws.com/crawl-data/CC-MAIN-2016-40/segments/1474738659496.36/warc/CC-MAIN-20160924173739-00000-ip-10-143-35-109.ec2.internal.warc.gz',
  'https://commoncrawl.s3.amazonaws.com/crawl-data/CC-MAIN-2016-40/segments/1474738659496.36/warc/CC-MAIN-20160924173739-00001-ip-10-143-35-109.ec2.internal.warc.gz'
];

for (var item in urlArray) {

  downloadFiles(urlArray[item]);
}



function downloadFiles(urlFile) {
  var parsed = url.parse(
    urlFile
  );
  var dl = downloader.download(
    urlFile,
    path.basename(parsed.pathname));

  dl.setOptions({
    threadsCount: 5
  });
  dl.start();

  dl.on('end', function() {
    console.log('Download finished ! ' + urlFile);
    console.log(dl.getStats());
  });

  // Called in case of error
  dl.on('error', function() {
    console.log('Download error ! ' + urlFile);
    console.log(dl.error);
  });
}
