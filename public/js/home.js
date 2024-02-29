const buttonSubmit = document.querySelector("input[value=Invia]");
buttonSubmit.addEventListener("click", function(event) {
    event.preventDefault();

    const query = `
        mutation insertPost($title: String!, $description: String!, $date: String!){
            insertPost(post: {title: $title, description: $description, date: $date}) {
                title
                description
                date
            }
        }
    `

    console.log(getCookie("token"))
    fetch("http://localhost:3030/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + getCookie("token")
        },
        body: JSON.stringify({
            query,
            variables: {
                title: document.querySelector("input[name=title]").value,
                description: document.querySelector("textarea[name=description]").value,
                date: new Date().toString()
            }
        })
    }).then(result => {
            return result.json()
    }).then(result => {
        console.log(result)
        const post = result.data.insertPost;
        const divPosts = document.querySelector("div#posts");
        const date = new Date(post.date);

        const htmlPost = "<img src='" + result.imageString + "'>" +
            "<h6>" + post.title + "</h6>" +
            "<p>Date: " + date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear() + "</p>" + 
            "<span>Description</span><br/>" +
            "<p>" + post.description + "</p><br/>";

        document.querySelector("input[name=title]").value = "";
        document.querySelector("textarea[name=description]").value = "";
        document.querySelector("input[name=image]").value = null;

        divPosts.innerHTML += htmlPost;
    }).catch(err => {
        document.querySelector("p#errorPost").innerHTML = err;
        document.querySelector("p#errorPost").style.display = "block";
    })
});

const getCookie = (cookieName) => {
    var cookies = document.cookie;
    var cookieSplit = cookies.split(";");

    for(let el of cookieSplit){
        let cookie = el.split("=");
        if (cookie[0] === cookieName)
            return cookie[1];
    }
}

function getAllPosts(){
    const query = {
        query: "{ getPosts {title description date}}"
    };
    fetch("http://localhost:3030/graphql", {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(query)
    }).then(result => result.json())
    .then(result => {
        var html = "";

        console.log(result)
        result.data.getPosts.forEach(el => {
            html += "<h5>" + el.title + "</h5>\n<p>" + el.description + " " + el.date + "</p>\n";
        })
        document.querySelector("div#posts").innerHTML= html;
    });
}