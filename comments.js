// get posts from url
function getPosts() {
  var url = "https://jsonplaceholder.typicode.com/posts";

  // transforming to json: https://scotch.io/tutorials/how-to-use-the-javascript-fetch-api-to-get-data
  fetch(url).then(response => response.json()) 
  .then(function (data) {
    data.forEach(function (item) {
      // console.log(item);
      makePost(item.id, item.title, item.body);
    });
  });
}

function makePost(id, title, body) {
  // append each post
  var template = $("#postTemplate").text();
  $("body").append(template);

  var article = $("article:last-of-type");

  body = body.replace("\n", "<br>");

  // fill in values
  article.find("[data-posts='title']").html(title);
  article.find("[data-posts='body']").html(body);
  article.find("[data-posts='id']").attr("value", id);
  article.find("[data-posts='id']").attr("onClick", "toggle(this)");
  article.find(".comments").attr("id", "comments-" + id);
}

function toggle(button) {
  var postid = $(button).val();
  var comments = $("#comments-" + postid);
  console.log(comments);

  if (comments.children().length <= 1) {
    getComments(postid);
    comments.hidden = false;
    comments.textContent = "Hide comments";
  }
  else {
    if (comments.hidden) {
      comments.hidden = false;
      comments.textContent = "Hide comments";
    }
    else {
      comments.hidden = true;
      comments.textContent = "Show comments";
    }
  }
}

// get comments for specific post
function getComments(postid) {
  var url = "https://jsonplaceholder.typicode.com/comments?postID=" + postid;

  fetch(url).then(response => response.json())
  .then(function (data) {
    data.forEach(function (item) {
      // console.log(item);
      makeComment(postid, item.name, item.email, item.body);
    });
  });
}

function makeComment(postid, name, email, body) {
  // append each comment
  var template = $("#commentTemplate").text();
  var section = $("#comments-" + postid + ":last-of-type");
  section.append(template);

  body = body.replace("\n", "<br>");

  // fill in values
  section.find("[data-posts='body']").html(body);
  section.find("[data-comments='email']").html(name);
  section.find("[data-comments='email']").attr("href", email);
}

(function (window) {
  getPosts();
})(window);
