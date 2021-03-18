var listOfArticles = [];

function addBlog(){
    if(document.getElementById("artTitle").value == "" || document.getElementById("artDes").value == "" || document.getElementById("imageID").files[0] == undefined){
        alert("Must Input Data Before Adding Blog");
        return;
    }
    console.log("ArticlesList Length: " + listOfArticles.length);
    if(listOfArticles.length >= 3){
        console.log("Too Many Blogs");
        alert("Too Many Blogs, Remove One");
        return;
    } 
    else if(listOfArticles.length < 3){
        var articleData = readArticleData();
        displayData(articleData);
        listOfArticles.push(articleData);
        sessionStorage.setItem("blogInfo",JSON.stringify(listOfArticles));
        console.log("Pushing session storage");
        var obj = JSON.parse(sessionStorage.getItem("blogInfo"));
        console.log(obj);
    }
    resetArtData();
    //mainArticleDiv.appendChild(h1);
    console.log(listOfArticles.length);
}

function readArticleData() {
    var artDetails = {};
    
    artDetails.title = document.getElementById("artTitle").value;
    artDetails.des = document.getElementById("artDes").value;
    //artDetails.img = document.getElementById("imageID");

    artDetails.img = document.getElementById("imageID").files[0].name;
 


    return artDetails; 
}

function displayData(data){
    var mainArticleDiv = document.getElementById("mainArtDiv");
        var subDiv = document.createElement('div');
        subDiv.setAttribute('class', 'col-lg-4 col-md-6 mb-2-6');
            var articleTag = document.createElement('article');
            articleTag.setAttribute('class', 'card card-style2');
                var imgDiv = document.createElement('div');
                imgDiv.setAttribute('class', 'card-img')
                    var artImage = document.createElement('img');
                    artImage.setAttribute('class', 'rounded-top');
                    artImage.setAttribute('height', '280');
                    artImage.setAttribute('width', '350');
                    artImage.src = data.img;
                imgDiv.appendChild(artImage);
                var bodyDiv = document.createElement('div');
                bodyDiv.setAttribute('class', 'card-body');
                    var cardTitle = document.createElement('h3');
                    cardTitle.textContent = data.title;
                    cardTitle.setAttribute('class', 'h5');
                    var cardText = document.createElement('p');
                    cardText.textContent = data.des;
                    cardText.setAttribute('class', 'display-30');
                    var remBlog = document.createElement('input');
                    remBlog.setAttribute('type', 'button');
                    remBlog.setAttribute('value', 'Remove Blog');
                    remBlog.setAttribute('class', 'btn btn-link');
                    remBlog.setAttribute('onclick', 'removeBlog(this.parentElement.parentElement.parentElement)');
                    
                bodyDiv.appendChild(cardTitle);
                bodyDiv.appendChild(cardText);
                bodyDiv.appendChild(remBlog);
            articleTag.appendChild(imgDiv);
            articleTag.appendChild(bodyDiv);
        subDiv.appendChild(articleTag);
    mainArticleDiv.appendChild(subDiv);
}

function resetArtData() {
    document.getElementById("artTitle").value = "";
    document.getElementById("artDes").value = "";
    document.getElementById("imageID").files[0].name = "No File Chosen";
}

function removeBlog(blog){
    console.log("Remove Blog");
    var blogImgLoc = blog.children[0].children[0].children[0].src
    var blogImgName = blogImgLoc.split('/')[blogImgLoc.split('/').length - 1];
    console.log(blogImgLoc.split('/')[blogImgLoc.split('/').length - 1]);

    if(blog != null){
        for(x in listOfArticles){

            if(listOfArticles[x].title == blog.children[0].children[1].children[0].textContent
                && listOfArticles[x].des == blog.children[0].children[1].children[1].textContent
                && listOfArticles[x].img == blogImgName){
                    console.log("content match");
                    listOfArticles.pop(x);
                }
        }
        blog.remove();
        console.log("Length of articles list: " + listOfArticles.length);
        sessionStorage.setItem("blogInfo",JSON.stringify(listOfArticles));
    }
}

function onLoadArticles(){
    var obj = JSON.parse(sessionStorage.getItem("blogInfo"));
    console.log(obj);
    for(x in obj){
        listOfArticles.push(obj[x]);
        displayData(obj[x]);
    }
}