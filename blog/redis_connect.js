const redis = require('redis')

const jwt = require('jsonwebtoken');

const client = redis.createClient()
var ss = '1233' + 'dsad'
console.log(ss)
var token = jwt.sign({ password: ss, exp: Math.floor(Date.now() / 1000) + (60 * 60)}, 'nihao');
console.log(token)
var decoded = jwt.verify(token, 'nihao');
console.log(decoded)
console.log(decoded.password) 
client.setex('username', 60 * 60, token, redis.print)
console.log('___________________')
var kk 
// client.get('username',(err, kk, ss) => {
//     //console.log(kk.toString())
//     ss = kk.toString();
//     //console.log(dd)
//     client.quit();
// })

function get (kk){
    client.get('jj', (err, result)=>{
        if (!result) {
            console.log(result)
            client.quit();
        }else {
            console.log('nihao')
            client.quit();
        }
       
        //console.log(kk)
    })
    setTimeout(()=>{console.log(kk)}, 3);
}
get(kk)
setTimeout(()=>{console.log(kk)}, 3);



   


