  // This code only runs on the server
  // Only publish comments that are public or belong to the current user
  Meteor.publish("comments", function () {
    return Comments.find();
  });

  Meteor.publish("posts", function () {
    return Posts.find();
  });

  Meteor.methods({
    addPost: function (title,content) {
      // Make sure the user is logged in before inserting a comment
      if (! Meteor.userId()) {
        throw new Meteor.Error("not-authorized");
      }
          
      Posts.insert({
        title: title,
        content: content,
        owner: Meteor.userId(),
        username: (typeof Meteor.user().username != 'undefined')?Meteor.user().username:Meteor.user().profile.name,
        dateAdded:new Date()
      });
    },

    addComment: function (postId, text) {
      // Make sure the user is logged in before inserting a comment
      if (! Meteor.userId()) {
        throw new Meteor.Error("not-authorized");
      }

      Comments.insert({
        postId: postId,
        text: text,
        owner: Meteor.userId(),
        username: (typeof Meteor.user().username != 'undefined')?Meteor.user().username:Meteor.user().profile.name,
        dateAdded: new Date()
      });
    },

    deleteComment: function (commentId) {
      var comment = Comments.findOne(commentId);
      if (comment.owner !== Meteor.userId()) {
        // If the comment is private, make sure only the owner can delete it
        throw new Meteor.Error("not-authorized");
      }

      Comments.remove(commentId);
    },
  });