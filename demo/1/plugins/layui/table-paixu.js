

        $.fn.serializeJson = function () {
            var serializeObj = {};
            var array = this.serializeArray();
            $(array).each(function () {
                if (serializeObj[this.name]) {
                    if ($.isArray(serializeObj[this.name])) {
                        serializeObj[this.name].push(this.value);
                    } else {
                        serializeObj[this.name] = [serializeObj[this.name], this.value];
                    }
                } else {
                    serializeObj[this.name] = this.value;
                }
            });
            return serializeObj;
        };

        var data = [];
        var now = new Date(2021, 11, 1);
        var mm = now.getMinutes();

        function getNowFormatDate(date) {
            var seperator1 = "-";
            var seperator2 = ":";
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            var currentdate = year +
                seperator1 +
                month +
                seperator1 +
                strDate +
                " " +
                date.getHours() +
                seperator2 +
                date.getMinutes() +
                seperator2 +
                date.getSeconds();
            return currentdate;
        }

        for (var i = 1; i < 10; i++) {
            now.setMinutes(mm + i);
            var model = {
                Id: i,
                排序: "我是排序" + i,
                Body: "文字内容" + i,
                Sex: "文字",
                Name: "我是name" + i,
                Hobby: "这是文字内容……这是文字内容……这是文字内容……这是文字内容……这是文字内容……这是文字内容……",
                CreateTime: getNowFormatDate(now)
            }
            data.push(model);
        }

