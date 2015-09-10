Router.route('/', function () {
    this.render('allPosts');
},{
    name:'post.all'
});

Router.route('/post/add', function () {
    this.render('addPost');
},{
    name: 'post.add'
});

Router.route('/post/:postId', function () {
    this.render('newsPost', {
        data: function () {
            return Posts.findOne({_id: this.params.postId});
        }
    });
},{
    name: 'post.single'
});