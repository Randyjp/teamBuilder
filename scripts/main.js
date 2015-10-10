/**
 * Created by randyjp on 10/4/15.
 * Main file with all the core functionality of my application
 */
var Main = {
    //function that creates the drop downs, the information comes from Json files read by ajax
    createDropDown: function (data) {
        var ddl = document.createElement("select");
        var prop;
        var option = document.createElement("option");
        var text = document.createTextNode("Select");

        ddl.setAttribute("class", "pure-u-1-6 pure-input-1-2");
        option.setAttribute("value", "select");
        option.appendChild(text);
        ddl.appendChild(option);
        ddl.addEventListener("change", this.changer, false);

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
                var ddls = document.getElementsByTagName("select");
                var option =[];

                Main.loadImgFade(this.value);
                players.add(1);
                for(var i= 0; i < ddls.length;i++){
                    option.push(ddls[i].value);
                }
                Main.printOptions(option);
            }
            if(players.getCount() === players.getMaxPlayers()){
                Main.createSuccessMessage();
                players.setSuccess(true);
            }
        }
        else {
            getJson(this.value);
        }

    },

    playersNumber:(function(){
        var count = 0;
        var success = false;
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
            },
            setSuccess: function (value) {
                success = value;
            },
            getSuccess:function(){
                return success;
            }
        }
    }()),

    createSuccessMessage: function(){
        //console.log("aki");
        //var div = document.getElementById("success");
        //var heading = document.createElement("h2");
        //var headingText = document.createTextNode("Congratulations " + GetCookie("name"));
        //var para = document.createElement("p");
        //var pText = document.createTextNode("Your team with " + players.getMaxPlayers() + " players was created successfully." +
        //    " We will e-mail your dream team to " + GetCookie("email"));
        //para.appendChild(pText);
        //
        //heading.appendChild(headingText);
        //div.appendChild(heading);
        //div.appendChild(para);

        'use strict';
        var modal = new RvVanillaModal({
            showOverlay: true
        });

        var div = document.getElementById("success");
        if(players.getSuccess()){ //div.childElementCount >1
            modal.open(div);
            return;
        }
        var divBody = document.createElement("div");
        divBody.setAttribute("class","rv-vanilla-modal-body");

        var heading = document.createElement("h3");
        var headingText = document.createTextNode("Congratulations " + GetCookie("name"));
        var para = document.createElement("p");
        var pText = document.createTextNode("Your team with " + players.getMaxPlayers() + " players was created successfully." +
            " We will e-mail your dream team to " + GetCookie("email"));
        para.appendChild(pText);

        heading.appendChild(headingText);
        divBody.appendChild(heading);
        divBody.appendChild(para);
        div.appendChild(divBody);


        var closeBtn = div.querySelector(modal.settings.closeSelector)
        closeBtn.addEventListener('click', function(event) {
            event.preventDefault();
            modal.close(div);
        });

        modal.open(div);
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
        //players.setSuccess(false);
        Main.loadDummyImg();
        Main.deleteOption();
    },

    deleteLast: function(){
        if(players.getCount() < 1) return;
        var div = document.getElementById("selectDiv");
        var divImg = document.getElementById("images");
        var lastImg = divImg.firstChild;
        var lastDdl = div.lastChild;
        //console.log(lastImg);
        if(lastImg !== null) divImg.removeChild(lastImg);
        lastDdl.selectedIndex = 0;
        players.add(-1); //substract one to the actual number of players left
        //players.setSuccess(false);
        var img = document.createElement("img");
        img.setAttribute("src", "img/players/empty.jpg");
        img.setAttribute("height", "135");
        img.setAttribute("width", "90");
        divImg.appendChild(img);
        Main.deleteOption();
    },

    loadDummyImg: function(){
        var num = parseInt(players.getMaxPlayers(),10);
        var imgDiv = document.getElementById("images");
        while(num > 0){
            var img = document.createElement("img");
            img.setAttribute("src", "img/players/empty.jpg");
            img.setAttribute("height", "135");
            img.setAttribute("width", "90");
            imgDiv.appendChild(img);
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
    },

    printOptions: function(array){
        Main.deleteOption();
        var options = array;
        var optionsDiv = document.getElementById("options");
        var ul = document.createElement("ul");
        ul.setAttribute("class","mylist");
        for(var i=0;i< options.length;i++){
            var li = document.createElement("li");
            var liText = document.createTextNode(options[i]);
            li.appendChild(liText);
            li.setAttribute("class","myli");
            ul.appendChild(li);
        }
        optionsDiv.appendChild(ul);
    },

    deleteOption:function(){
        var optionsDiv = document.getElementById("options");
        var ul = optionsDiv.getElementsByTagName("ul")[0];
        if(!ul) return;
        optionsDiv.removeChild(ul);
    }

    //insertImg: function (imgName) {
    //    console.log(imgName);
    //    var img = document.createElement("img");
    //    img.setAttribute("src", "img/players/" + imgName);
    //    document.getElementById("images").appendChild(img);
    //}
};