const thrift = require('thrift-http');
const LineService = require('LineService');

var _client = '';
var gid = '';
var uids = [];
var token = ''; 

process.argv.forEach(function (val) {
  if(val.includes('gid=')){
	  gid = val.split('gid=').pop();
  }else if(val.includes('uid=')){
	  uids.push(val.split('uid=').pop());
  }else if(val.includes('token=')){
	  token = val.split('token=').pop();
  }
});

function setTHttpClient(options) {
    var connection =
      thrift.createHttpConnection('legy-jp.line.naver.jp', 443, options);
    connection.on('error', (err) => {
      console.log('err',err);
      return err;
    });
    _client = thrift.createHttpClient(LineService, connection);
  }
  
  
setTHttpClient(options={
    protocol: thrift.TCompactProtocol,
    transport: thrift.TBufferedTransport,
    headers: {'User-Agent':'Line/8.14.2','X-Line-Application':'CHROMEOS\t2.1.5\tIphone X\t8.1.0','X-Line-Access':token},
    //headers: {'User-Agent':'Line/2017.0731.2132 CFNetwork/758.6 Darwin/15.0.0','X-Line-Application':'IOS 8.9.0 iPhone OS 1','X-Line-Access':token},
    path: '/S4',
    https: true
    });
	
for (var i=0; i < uids.length; i++) {
  _client.cancelGroupInvitation(0, gid, [uids[i]]);
  _client.kickoutFromGroup(0, gid, [uids[i]]);
}