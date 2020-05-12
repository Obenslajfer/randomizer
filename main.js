window.onload = function() {
// SETTING A CLICK EFFECT ON A BUTTON THAT CALLS THE FUNCTION "HANDLECLICK"
    document.getElementById("srcbtn").addEventListener("click", handleClick); 

    // LOADING 20 RANDOM ITEMS WHEN OPENING THE WEBPAGE.
    let script = document.createElement("script");
    script.src = `https://api.flickr.com/services/feeds/photos_public.gne?format=json&tags=$&jsoncallback=getUrlInfo`;
    document.querySelector('head').appendChild(script);
}

// FUNCTION HANDLECLICK
function handleClick(){
    // SETTING A VARIABLE ON THE INPUT PUT IN BY THE USER
    let result = document.getElementById("searchinput").value;

    let script = document.createElement("script");
    // URL THAT FROM ALL THE DATA IS BEING CALLED FROM.
    script.src = `https://api.flickr.com/services/feeds/photos_public.gne?format=json&tags=${result}&jsoncallback=getUrlInfo`;
    document.querySelector('head').appendChild(script);

}
// CREATING A CLASS CALLED "THEINFO". AND PRESENTING THE TITLE, IMAGE AND AUTHOR.
    function TheInfo(a, b, c){

        this.titleOfPic = a;
        this.srcOfPic = b;
        this.authorOfPic = c;
    };

    // FUNCTION  CALLED AT THE END OF THE URL-STRING AND PLACING THE INFO IN THE VARIBLE "DATA".
    function getUrlInfo(data){
        // CREATING AN EMPTY ARRAY CALLED CORRECTDATA
        correctData = [];

        // EMPTYING THE CONTAINER WITH ALL MAIN CONTENT EVERYTIME THE FUNCTION IS BEING CALLED
        let emptyContainer = document.getElementById("container");
        emptyContainer.innerHTML = " ";
        
        // LOOPING THROUGH ALL THE DATA FOUND IN THE URL, AND PICKING THE INFO WE WANT TO USE.
        for (let i = 0; i < data.items.length; i++) {
            var newObj = new TheInfo(data.items[i].title, data.items[i].media.m, data.items[i].author)
            correctData.push(newObj);
        }

    for (let i = 0; i < correctData.length; i++) {
          
        // CREATING ALL THE ELEMENTS NEEDED TO STORE THE INFO
        var findMain = document.getElementById("container");
        var createDiv = document.createElement("div");
        var createImg = document.createElement("img");
        var newImg = document.createElement("img");
        createDiv.setAttribute("class", "myDiv"+[i]);
        findMain.appendChild(createDiv);
        console.log(correctData[i].authorOfPic);

        // SETTING ALL THE ATTRIBUTES NEEDED TO MAKE THE IMAGES ABLE TO CALL THE MODAL.
        createImg.setAttribute("id", "modalbutton");
        createImg.setAttribute("data-toggle", "modal");
        createImg.setAttribute("data-target", "#Modal");
        createImg.setAttribute("class", "frontimg")
        createImg.src = correctData[i].srcOfPic;
        createDiv.appendChild(createImg);

        // SETTING A CLICK-EVENT ON ALL THE IMAGES BEING SHOWN AFTER MAKING A SEARCH 
        createImg.addEventListener("click", function(){

        // EMPTYING THE MODAL BEFORE STUFFING IT FULL OF INFORMATION OVER AND OVER AGAIN.
        let emptyModal = document.getElementById("modalbody");
        emptyModal.innerHTML = " ";

        // PLACING ALL INFO NEEDED IN THE MODAL
        document.getElementById("modaltitle").innerHTML = "Title: " + correctData[i].titleOfPic;
        document.getElementById("modalbody").appendChild(newImg);
        newImg.src = correctData[i].srcOfPic;
        document.getElementById("modalfooter").innerHTML = "Author: " + correctData[i].authorOfPic;
        console.log(correctData[i].authorOfPic);
        });
    }
}

