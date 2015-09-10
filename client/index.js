  // This code only runs on the client
  Meteor.subscribe("comments");
  Meteor.subscribe("posts");

  Template.allPosts.helpers({
    posts: function () {
      return Posts.find({},{sort: {dateAdded: -1}});
    }
  });

  Template.newsPost.helpers({
    comments: function () {
      return Comments.find({postId: this._id},{sort: {dateAdded: -1}});
    }
  });

  Template.newsPost.events({
    "submit .new-comment": function (event) {
      // Prevent default browser form submit
      event.preventDefault();

      // Get value from form element
      var text = event.target.text.value;

      // Insert a comment into the collection
      Meteor.call("addComment", this._id, text);

      // Clear form
      event.target.text.value = "";
    }
  });

  Template.comment.events({
    "click .delete": function () {
      Meteor.call("deleteComment", this._id);
    }
  });

  Template.comment.helpers({
    isOwner: function () {
      return this.owner === Meteor.userId();
    }
  });

  Template.addPost.events({
    'submit .addPostsForm':function(e){

      var title= e.target.title.value; //get title

      var content= e.target.content.value; //get url

      if(!title || !content){
        return false;
      }

      Meteor.call('addPost',title,content); //Method to create and add new item

      Router.go('post.all'); //load new route

      return false; //Tell JavaScript that you have handled the submit event
    }
  });

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });