/**
 * Created by randyjp on 10/4/15.
 */
//generic function create a dropdown menue.
var Main = {
    createDropDown: function (data) {
        var ddl = document.createElement("select");
        var prop;
        var option = document.createElement("option");
        option.setAttribute("value", "select");
        var text = document.createTextNode("Select");
        option.appendChild(text);
        ddl.appendChild(option);
        ddl.addEventListener("change", this.changer, false);

        //console.log(data);
        for (prop in data) {
            //console.log(prop);
            if (typeof  prop !== "function") {
                var option = document.createElement("option");
                option.setAttribute("value", data[prop])
                var text = document.createTextNode(prop);
                option.appendChild(text);
                ddl.appendChild(option);
            }
        }

        return ddl;
    },

    begin: function (name) {
        getJson(name);
        this.loadDummyImg();
        //this.playersNumber;
    },

    changer: function () {
        //console.log(this);
        if (this.value === "select" || this.value === undefined) return;
        if (this.nextSibling !== null) {
            while (( child = this.nextSibling) !== null) {
                this.parentNode.removeChild(child);
            }
        }
        if (this.value.indexOf(".jpg") > -1) {
            //insertImg(this.value);
            if(players.getCount() < players.getMaxPlayers()){
                //var img = document.createElement("img");
                //img.setAttribute("src", "img/players/" + this.value);
                //img.setAttribute("height", "135");
                //img.setAttribute("width", "90");
                //document.getElementById("images").appendChild(img);
                Main.loadImgFade(this.value);
                players.add(1);
            }
            if(players.getCount() === players.getMaxPlayers()){
                Main.createSuccessMessage();
            }
            //else{
            //    var img = document.createElement("img");
            //    img.setAttribute("src", "img/players/" + this.value);
            //    document.getElementById("images").appendChild(img);
            //    players.add(1);
            //}
        }
        else {
            getJson(this.value);
        }

    },

    playersNumber:(function(){
        var count = 0;
        var maxPlayers = parseInt(localStorage.getItem("numberOfPlayers"),10);
        return{
            add: function(number){
                count += number;
            },
            getCount: function(){
                return count;
            },
            getMaxPlayers: function(){
                return maxPlayers;
            },
            resetCount:function(){
                count = 0;
            }
        }
    }()),

    createSuccessMessage: function(){
        //console.log("aki");
        var div = document.getElementById("success");
        var heading = document.createElement("h2");
        var headingText = document.createTextNode("Congratulations " + GetCookie("name"));
        var para = document.createElement("p");
        var pText = document.createTextNode("Your team with " + players.getMaxPlayers() + " players was created successfully." +
            " We will e-mail your dream team to " + GetCookie("email"));
        para.appendChild(pText);

        heading.appendChild(headingText);
        div.appendChild(heading);
        div.appendChild(para);
    },

    restart: function(){
        var div = document.getElementById("selectDiv");
        var divImg = document.getElementById("images");
        var firstDdl = div.firstElementChild;
        while (( child = firstDdl.nextSibling) !== null) {
            div.removeChild(child);
        }
        while(divImg.firstChild){
            divImg.removeChild(divImg.firstChild);
        }
        firstDdl.selectedIndex = 0; //get the dummy option
        players.resetCount();
    },

    deleteLast: function(){
        var div = document.getElementById("selectDiv");
        var divImg = document.getElementById("images");
        var lastImg = divImg.lastChild;
        var lastDdl = div.lastChild;
        //console.log(lastImg);
        if(lastImg !== null) divImg.removeChild(lastImg);
        lastDdl.selectedIndex = 0;
        players.add(-1); //substract one to the actual number of players left

    },

    loadDummyImg: function(){
        var num = parseInt(players.getMaxPlayers(),10);
        while(num > 0){
            var img = document.createElement("img");
            img.setAttribute("src", "img/players/empty.jpg");
            img.setAttribute("height", "135");
            img.setAttribute("width", "90");
            document.getElementById("images").appendChild(img);
            num--;
        }
    },

    loadImgFade: function(path){
        var imgDiv = document.getElementById("images");
        var img = document.createElement("img");
        var opac = 0.1;
        img.setAttribute("src", "img/players/" + path);
        img.setAttribute("height", "135");
        img.setAttribute("width", "90");
        img.setAttribute("class", "playerImg");
        img.style.opacity = opac;
        imgDiv.removeChild(imgDiv.lastChild);
        imgDiv.insertBefore(img,imgDiv.firstChild);
        var interval = setInterval(function(){
            opac += 0.1;
            img.style.opacity = opac;
            if(opac >=1){
                clearInterval(interval);
            }
        },125);
    }

    //insertImg: function (imgName) {
    //    console.log(imgName);
    //    var img = document.createElement("img");
    //    img.setAttribute("src", "img/players/" + imgName);
    //    document.getElementById("images").appendChild(img);
    //}
};