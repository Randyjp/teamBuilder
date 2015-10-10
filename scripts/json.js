/**
 * Created by randyjp on 10/5/15.
 */
function readJson(fileName,callback){
    var http = new XMLHttpRequest();
    var file = "http://kelvin.ist.rit.edu/~rjp7034/teamBuilder/jsonFiles/" + fileName + ".json";
    var jsonData;
    http.onreadystatechange = function(){
        if(http.readyState === 4 ){
            if(http.status === 200){
                jsonData = JSON.parse(http.responseText);
                if(callback) callback(jsonData);
            }
        }
    };
    http.open("GET",file,true);
    http.send();
    //return jsonData;
}

function getJson(filename){
    //rervar result;
    readJson(filename,function(data){
        document.getElementById("selectDiv").appendChild(Main.createDropDown(data));
    });
    //console.log(result);
    //return result;
}