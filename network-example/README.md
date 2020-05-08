### Structure of our routes

- GET '/': Home view. Most recent posts from every channel. List of popular channels. Link to create channel.
- GET '/channel/create': Channel creation view. Has form that allows user to create a new channel.
- POST '/channel/create': Channel creation form submission.
- GET '/channel/:channelId': Channel view. Display posts from that specific channel.

- GET '/channel/:channelId/post/create': Post creation view for specific channel.
- POST '/channel/:channelId/post/create': Post creation form submission.

* GET '/channel/:channelId/post/:postId': Post display view. Should display post message and comment form.
* POST '/channel/:channelId/post/:postId/comment/create': Comment creation form submission.

<!-- Auithentication -->
