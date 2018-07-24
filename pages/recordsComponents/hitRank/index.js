Component({
    externalClasses:["records-class"],
    properties: {
        celltype: {
            type:String,
            value: "打榜",
            observer: function(newValue,oldValue,changedPath) {
                console.log("newValue -->" + newValue)
                console.log("oldValue -->" + oldValue)
                console.log("changedPath -->" + changedPath)
            }
        }
    },
    data: {

    },
    methods: {
        
    },
    attached: function () {
        wx.setNavigationBarTitle({
            title: '打榜详情',
        })
    }
})