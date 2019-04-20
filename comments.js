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
  article.find("[data-posts='id']").attr("onClick", "toggleComments(this)");
  article.find(".comments").attr("id", "comments-" + id);
}

function toggleComments(button) {
  var postid = button.value;
  var comments = $("#comments-" + postid);

  if (comments.children().length == 1) {
    getComments(postid);
    button.textContent = "Hide comments";
  }

  // hidden: https://stackoverflow.com/questions/178325/how-do-i-check-if-an-element-is-hidden-in-jquery
  // sliding: https://www.dummies.com/web-design-development/other-web-software/showing-hiding-sliding-and-fading-elements-with-jquery/
  if(comments.is(":hidden")) {
    comments.slideDown();
    button.textContent = "Hide comments";
  }
  else {
    comments.slideUp();
    button.textContent = "Show comments";
  }
}

// get comments for specific post
function getComments(postid) {
  var url = "https://jsonplaceholder.typicode.com/comments?postId=" + postid;

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
  section.find("[data-comments='body']").html(body);
  section.find("[data-comments='email']").html(name);
  section.find("[data-comments='email']").attr("href", email);
}

(function (window) {
  getPosts();

})(window);
