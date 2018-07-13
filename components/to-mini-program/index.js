Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    SDKVersion: {
      type: Number,
      value: 'default value',
    },
    more: {

    }
  },
  data: {
    // 这里是一些组件内部数据
    someData: {}
  },
  methods: {
    // jump: function(e) {
    //   var target = e.currentTarget;
    //   var type = target.dataset.type;
    //   var appId = target.dataset.appid;
    //   var gameId = target.dataset.gameid;
    //   var preview = target.dataset.preview;
    //   var eventDetail = {type: type, appId: appId, gameId: gameId, preview: preview};
    //   this.triggerEvent('mytap', eventDetail);
    // }
  }
})