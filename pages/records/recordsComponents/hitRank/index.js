Component({
    externalClasses:["records-class"],
    properties: {
        dataList: {
            type:Array,
            value: [],
            observer: function(newValue,oldValue,changedPath) {
                console.log("打榜 -->" + newValue)
            }
        }
    },
    data: {
        headers: ["活动","打榜"]
    },
    methods: {
        
    },
    attached: function () {
        wx.setNavigationBarTitle({
            title: '打榜详情',
        })
    }
})