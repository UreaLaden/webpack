const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 9000;
app.use('/',express.static(path.resolve(__dirname,'../dist')));

app.get('*',function (req,res){
    const pathToHtml = path.resolve(__dirname,'../dist/dashboard.html');
    const content = fs.readFileSync(pathToHtml,'utf-8');
    res.send(content);
});

app.listen(port,function(){
    console.log(`Application is running on http://localhost:${port}`);
})