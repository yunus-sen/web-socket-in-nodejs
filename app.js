const http=require('http');
const socket = require("socket.io");

//server oluşturdum.
const server=http.createServer((req,res)=>
{
    res.writeHead(200,
        {"Content-Type" : "text/plain"});
    res.end("Hello World\n");
});
server.listen(3000);

//3000 portuna gelecek olan tüm istekleri socket tarafından dinlememiz gerekmektedir.
const io = socket.listen(server);
//socket tarafından ilgili server dinlenmeye alınmıştır. Dolayısıyla gelecek olan tüm talepler socket tarafından yakalanacaktır.
//Bu şekilde her talep neticesinde server ile client arasında aktif bir TCP bağlantısı oluşturulacaktır.

io.sockets.on("connection", socket => {
    //Server'a bir client bağlandığı zaman "connection" isimli olay tetiklenecektir. socket parametresi ise bağlantı yapan client'ın bilgisini içermektedir.
    console.log("User connection", socket.client.id);
    socket.on("disconnect", () => {
        console.log("User disconnect");
    });

    setInterval(()=>{
        socket.emit('merhaba de',{country:"türkiye"});
    },1000);

    socket.on('sendMessageToServer',()=>{
        console.log("mesaj geldi.") ;
    });
});