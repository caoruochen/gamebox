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
          reviewId: "0",
          uid: "0",
          nickname: "阿尔萨斯",
          sex: "1",
          avatar: "https://upload-images.jianshu.io/upload_images/654237-835e699b6e6fbca8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/700",
          topicId: "1",
          replyCount: "1",
          ratingCount: "999",
          ctime: "2018-01-08 09:00:00",
          content: "光明源于黑暗,黑暗涌现光明.",
          is_rating: "0",
          lastReplys: [{
              replyId: "0",
              reviewId: "0",
              uid: "123",
              uname: "伊利丹.怒风",
              fuid: "2",
              ratingCount: "78",
              ctime: "2018-01-08 09:00:00",
              content: "Akama... your duplicity is hardly surprising. I should have slaughtered you and your malformed brethren long ago."
          }]
      },
      {
          reviewId: "0",
          uid: "0",
          nickname: "wower",
          sex: "1",
          avatar: "https://gss0.baidu.com/-4o3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/8c1001e93901213fa46d2d265fe736d12e2e95e9.jpg",
          topicId: "0",
          replyCount: "12",
          ratingCount: "11231999",
          ctime: "2018-01-08 09:00:00",
          content: "不要在我的墓碑前哭泣，我不在那里，我没有长眠。我是凛冽的寒风，掠过诺森德的雪原。我是温柔的春雨，滋润着西部荒野的麦田。我是清幽的黎明，弥漫在荆棘谷的林间。我是雄浑的鼓声，飞跃纳格兰的云端。我是温暖的群星，点缀达纳苏斯的夜晚。我是高歌的飞鸟，留存于美好的人间。不要在我的墓碑前哭泣，我不在那里，我没有长眠。",
          is_rating: "1",
          lastReplys: [{
              replyId: "0",
              reviewId: "0",
              uid: "123",
              uname: "伊利丹.怒风",
              fuid: "2",
              ratingCount: "78",
              ctime: "2018-01-08 09:00:00",
              content: "Akama... your duplicity is hardly surprising. I should have slaughtered you and your malformed brethren long ago."
          }]
      },
      {
          reviewId: "0",
          uid: "0",
          nickname: "光明使者乌瑟尔",
          sex: "1",
          avatar: "https://upload-images.jianshu.io/upload_images/654237-835e699b6e6fbca8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/700",
          topicId: "0",
          replyCount: "12",
          ratingCount: "999",
          ctime: "2018-01-08 09:00:00",
          content: "我们是圣骑士，不能让复仇的情绪占据我们的意识。",
          is_rating: "1",
          lastReplys: [{
              replyId: "0",
              reviewId: "0",
              uid: "123",
              uname: "伊利丹.怒风",
              fuid: "2",
              ratingCount: "78",
              ctime: "2018-01-08 09:00:00",
              content: "Akama... your duplicity is hardly surprising. I should have slaughtered you and your malformed brethren long ago."
          }],
      }
      ],
      /* 点赞的图片 */
      ratingImage: "../../images/",
        /* textarea-placeholder */
      textarea_placeholder: "留下你的记号",
      /* textarea-value */
      textarea_value: "",
        /* textarea-focus */
      textarea_focus: false,
  },
  methods: 
  {
    /* 发送评论 */ 
    sendReview:function(content) {
        // var app = getApp();
        var app = wx.getStorageSync('loginUser');
        // console.log(app.globalData.loginUser);
        var params = {//token: app.token,
                        // uid: app.uid,
                        type:"1",
                        targetId: "12",
                        // pname: "gamebox",
                        content: "阿尔萨斯,啦啦啦"}
        http.post("/gamebox/topic/review", params,function(data) {
            console.log(data)
        }, function (error) {
            console.log(error)
        })
    },
    bindFormSubmit: function(e) {
        console.log(e.detail.value.comment)
        // // this.sendReview(e.detail.value.comment)
        // console.log(e.detail.value.comment)
        // console.log(e.detail.value)
        // console.log(this.data.textarea_value)
        if (e.detail.value.comment == "") {
            // e.detail.value.comment = "您没有输入任何内容哦!"
            this.setData({
                textarea_placeholder: "您没有输入任何内容哦!"
            })
        } else {
            this.setData({
                textarea_placeholder: "留下你的记号",
                textarea_focus: false,
                textarea_value: "",
            })
        }
    }
  }
})
