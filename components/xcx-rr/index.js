var util = require("../../util/util");
var http = require("../../util/http");
Component({
  externalClasses: ['rr-class'],
  properties: {
    game: {
      type: Object,
      value: null
    }
  },
  data: {
      reviews: [{
          topicId: "0",
          reviewId: "0",
          icon: "https://upload-images.jianshu.io/upload_images/654237-835e699b6e6fbca8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/700",
          nickname: "昵称",
          uid: "0",
          replyCount: "12",
          ratingCount: "999",
          ctime: "2018-01-08 09:00:00",
          content: "评论内容这是一条评论评论评论asdasdasdasdasdasdasdqweqweqwe评论",
          replys: [{
              replyId: "0",
              reviewId: "0",
              uid: "123",
              ratingCount: "78",
              ctime: "2018-01-08 09:00:00",
              content: "回复内容"
          }]
      },
      {
          topicId: "0",
          reviewId: "0",
          icon: "https://upload-images.jianshu.io/upload_images/654237-835e699b6e6fbca8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/700",
          nickname: "昵称",
          uid: "0",
          replyCount: "12",
          ratingCount: "11231999",
          ctime: "2018-01-08 09:00:00",
          content: "评论内容",
          replys: [{
              reviewId: "0",
              uid: "123",
              ratingCount: "78",
              ctime: "2018-01-08 09:00:00",
              content: "回复内容"
          }]
      },
      {
          topicId: "0",
          reviewId: "0",
          icon: "https://upload-images.jianshu.io/upload_images/654237-835e699b6e6fbca8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/700",
          nickname: "昵称",
          uid: "0",
          replyCount: "12",
          ratingCount: "999",
          ctime: "2018-01-08 09:00:00",
          content: "评论内容",
          replys: [{
              replyId: "0",
              reviewId: "0",
              uid: "123",
              ratingCount: "78",
              ctime: "2018-01-08 09:00:00",
              content: "回复内容"
          }],
      }
      ],
      /* 点赞的图片 */
      ratingImage: "../../images/ratingNormal.png"
  },
  methods: {

  }
})
