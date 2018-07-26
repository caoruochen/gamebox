Component({
    externalClasses:["records-class"],
    properties: {
        dataList: {
            type:Array,
            value: [],
            observer: function(newValue,oldValue,changedPath) {
                console.log("抽奖 -->" + newValue)
                // console.log("oldValue -->" + oldValue)
                // console.log("changedPath -->" + changedPath)
            }
        }
    },
    data: {
        headers: ["活动","抽奖"]
    },
    methods: {
        
    },
    attached: function () {
        wx.setNavigationBarTitle({
            title: '抽奖详情',
        })
    }
})