Component({
    externalClasses:["records-class"],
    properties: {
        dataList: {
            type:Array,
            value: [],
            observer: function(newValue,oldValue,changedPath) {
                console.log("红包 -->" + newValue)
                // console.log("oldValue -->" + oldValue)
                // console.log("changedPath -->" + changedPath)
            }
        }
    },
    data: {
        headers: ["活动", "红包"],
    },
    methods: {
        
    },
    attached: function () {
        wx.setNavigationBarTitle({
            title: '红包详情',
        })
    }
})