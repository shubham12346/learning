class Twitter {
  constructor() {
    this.users = new Map();
    this.followers = new Map(); // store whom a user
    this.followees = new Map(); // who follow a user
    this.posts = [];
    this.timestamp = 0;
  }
  createUser(userId) {
    if (!this.users.has(userId)) {
      this.users.set(userId, { userId, posts: [] });
      this.followers.set(userId, new Set());
      this.followees.set(userId, new Set());
    } else {
      console.log("Already account created");
    }
  }
  follow(followerId, followeeId) {
    if (!this.users.has(followeeId) || !this.users.has(followerId)) {
      console.log("Not a valid user");
      return;
    }
    // suppose shubham follows vaibhav
    // add  vaibhav to shubham  followees list

    this.followees.get(followerId).add(followeeId);

    // add shubham to vaibhav follower list
    this.followers.get(followeeId).add(followerId);
  }

  unfollow(followerId, followeeId) {
    if (!this.users.has(followeeId) || !this.users.has(followerId)) {
      console.log("Not a valid user");
      return;
    }

    // shubham unfollows vaibhav

    // remove shubham from vaibhav follower list
    this.followers.get(followeeId).delete(followerId);

    // remove vaibhav from shubham followee list
    this.followees.get(followerId).delete(followeeId);
  }

  showFollowerandFolloweeList(userId) {
    console.log("user :", this.users.get(userId));
    console.log("User followers :", this.followers.get(userId));
    console.log("User followee List :", this.followees.get(userId));
    console.log("***********_____________________********************");
  }

  createPost(userId, content) {
    if (!this.users.get(userId)) {
      console.error("Not a valid user ");
    }

    let newTweet = {
      tweetId: new Date().getTime(),
      userId,
      likes: new Set(),
      comments: [],
      content,
    };

    this.posts.push(newTweet);
    this.users.get(userId).posts.push(newTweet);
  }

  likeTweet(userId, tweetId) {
    if (!this.checkUser(userId)) return;

    const tweet = this.posts.find((t) => t.tweetId === tweetId);
    tweet.likes.add(userId);
  }

  checkUser(userId) {
    const checkUser = this.users.get(userId);
    console.log("Not a valid user");
    return checkUser;
  }
}

let shubh = new Twitter();
shubh.createUser("shubham");
shubh.createUser("satish");
shubh.follow("shubham", "satish");
shubh.showFollowerandFolloweeList("shubham");
shubh.createPost("shubham", "hello this is my first tweet");

const tweetId = shubh.posts[0].tweetId;
shubh.likeTweet("shubham", tweetId);
shubh.showFollowerandFolloweeList("shubham");

console.log("Likes Set:", shubh.posts[0].likes);

// shubh.showFollowerandFolloweeList("satish");
// shubh.unfollow("shubham", "satish");
// shubh.showFollowerandFolloweeList("shubham");

// shubh.follow("satish", "shubham");

// shubh.showFollowerandFolloweeList("shubham");
// shubh.showFollowerandFolloweeList("satish");
