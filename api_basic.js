const http = require("http");
const fs = require("fs");
const api_data = fs.readFileSync("apij.json","utf-8");
const api_temp_holder = fs.readFileSync("api_temp_holder.html","utf-8");
const api_template = fs.readFileSync("api_template.html","utf-8");
const apiobject = JSON.parse(api_data);

const replaceplaceHolder = ((api_template,item_object) => {
    let result_html = api_template.replace("{@id@}",item_object.id);
    result_html = result_html.replace("{@name@}",item_object.name);
    result_html = result_html.replace("{@role@}",item_object.role);
    result_html = result_html.replace("{@phone_number@}",item_object.phone_number);
    

    return result_html;
});



const server = http.createServer((req,respo)=>{
    const pathname = req.url;

    if(pathname === "/" || pathname === "/home"){
        respo.setHeader("content-type","text/html");
        const apiHtml = apiobject.map(item_object => replaceplaceHolder (api_template,item_object)).join(' ');
        const final_html = api_temp_holder.replace("{@user-information@}",apiHtml);
        console.log(apiHtml);
        respo.end(final_html);


    }

});
server.listen(3000,"localhost",()=>{
    console.log("server listening at 3000 port");
});