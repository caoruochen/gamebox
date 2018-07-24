Component({
    externalClasses:["records-class"],
    properties: {
        celltype: {
            type:String,
            value: "红包",
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
            title: '红包详情',
        })
    }
})