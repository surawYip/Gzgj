    <script>
        // var time1 = new Date().getTime();
        layui.config({
            base: 'plugins/table2/'
        }).use(['table2', "table2"], function () {
            var table = layui.table2;
            
            function initTable14() {
                var tableIns = table.render({
                    elem: "#table14",
                    data: data,
                    height: 450,
                    page: true,
                    cols: [
                        [
                            { field: 'Id', title: '标题1', width: '10%' },
                            { field: 'Name', title: '标题1', width: '*', align: 'left', sort: true, resize: true, dataType: 'html' },
                            { field: '标题3', title: '标题2', width: '20%', align: 'center', resize: true },
                            { field: 'Hobby', title: '标题3', width: '20%', align: 'center', resize: true },
                            { field: '标题6', title: '标题4', width: '20%' }
                        ]
                    ]
                });
            }

            function initTable13() {
                var tmpdata = $.extend(true, [], data);
                tmpdata[0].Name = "<script>alert('不该弹窗的');<\/script>";
                var tableIns = table.render({
                    elem: "#table13",
                    data: tmpdata,
                    height: 500,
                    page: true,
                    expandRow: true,
                    cols: [
                        [
                            { title: 'asdfsd', colspan: 3 },
                            { title: 'asdfasdf', colspan: 3 }
                        ],
                        [
                            { field: 'Id', title: '标题1', width: 50 },
                            { field: 'Name', title: '标题2', width: 120, align: 'left', sort: true, resize: true, dataType: 'html' },
                            { field: '标题3', title: '标题3', width: 120, align: 'center', resize: true },
                            { field: 'Hobby', title: '标题4', minWidth: 100, align: 'center', resize: true },
                            { field: '标题6', title: '标题5', width: 150 },
                            {
                                field: 'opts', title: '操作', width: 150, align: 'center', resize: true, formatter: function () {
                                    return '<a class="rayui-btn rayui-btn-success" event="edit">编辑</a>&nbsp; <a class="rayui-btn rayui-btn-danger" event="del">删除</a>';
                                }
                            }
                        ]]
                });
                tableIns.on("tool", function (evt, obj) {
                    if (evt === "del") {
                        if (window.confirm("确定删除[" + obj.data.Name + "]吗？")) {
                            $.getJSON("data.ashx?action=DeleteData", { id: obj.data.Id }, function (data) {
                                if (data.ret === 0)
                                    obj.del();
                                else
                                    alert("删除失败");
                            });
                        }
                    } else if (evt === "edit") {
                        var name = window.prompt("请输入姓名", obj.data.Name);
                        if (name != null) {
                            obj.data.Name = name;
                            obj.update();
                        }
                    }
                });
                tableIns.on("expand", function (index, rowdata, $container) {
                    if (index % 2 === 0) {
                        return [
                            '<div>我是详情页面</div>',
                            '<div>标题2:' + rowdata.Name.replace(/[<>&"]/g, function (c) { return { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[c]; }) + '</div>',
                            '<div>标题1:' + rowdata.Id + '</div>',
                            '<div>标题3:' + rowdata.标题3 + '</div>',
                            '<div>标题5' + rowdata.Hobby + '</div>'
                        ].join('');
                    } else {
                        var id = "tableDetail" + index;
                        $container.append('<table id="' + id + '"></table>');
                        table.render({
                            elem: "#" + id,
                            data: data.slice(0, 2),
                            width: $container.width(),
                            cols: [[
                                { field: 'Id', title: '标题1', width: 50 },
                                { field: 'Name', title: '标题2', width: 120, align: 'left', dataType: 'html' },
                                { field: '标题3', title: '标题3', width: 120, align: 'center', resize: true },
                                { field: 'Hobby', title: '标题4', minWidth: 100, align: 'center', resize: true },
                                { field: '标题6', title: '标题5', width: 150 }
                            ]]
                        });
                    }
                });
            }

            function initTable12() {
                var dataTmp = [];
                for (var i = 1; i < 102; i++) {
                    now.setMinutes(mm + i);
                    var model = {
                        Id: i,
                        Name: "我是name" + Math.round(i / 2),
                        标题3: "我是标题3" + Math.round(i / 2),
                        Body: "我是body" + i,
                        Sex: "男",
                        Hobby: "这是内容文字这是内容文字这是内容文字",
                        CreateTime: getNowFormatDate(now)
                    }
                    dataTmp.push(model);
                }

                var tableIns = table.render({
                    elem: "#table12",
                    data: dataTmp,
                    height: 300,
                    colspanDefs: ["Name", "标题3"],
                    cols: [[
                        { field: 'Id', title: '标题1', width: 120, fixed: 'left' },
                        { field: 'Name', title: '标题2', width: 150, align: 'left', sort: true, fixed: 'left' },
                        { field: '标题3', title: '标题3', width: 150, align: 'center', resize: true },
                        { field: 'Hobby', title: '标题5', width: 150, align: 'center', resize: true },
                        { field: '标题6', title: '标题6', width: 150 },
                        {
                            field: 'opts', title: '操作', width: 150, fixed: 'right', align: 'center', resize: true, formatter: function () {
                                return '<a class="rayui-btn rayui-btn-danger" event="del">删除</a>&nbsp;<a class="rayui-btn rayui-btn-success" event="edit">编辑</a>';
                            }
                        }
                    ]]
                });

                tableIns.on("tool", function (evt, obj) {
                    if (evt === "del") {
                        if (window.confirm("确定删除吗？")) {
                            $.getJSON("data.ashx?action=DeleteData", { id: obj.data.Id }, function (data) {
                                if (data.ret === 0)
                                    obj.del();
                                else
                                    alert("删除失败");
                            });
                        }
                    } else if (evt === "edit") {
                        var name = window.prompt("请输入", obj.data.Name);
                        if (name != null) {
                            obj.data.Name = name;
                            obj.update();
                        }
                    }
                });
            }

            function initTable11() {
                var tableIns = table.render({
                    elem: "#table11",
                    url: "/Data.ashx?action=GetList",
                    method: "post",
                    height: 'full-300',
                    //singleSelect: true,
                    serialField: "Id",
                    page: true,
                    even: true,
                    initSort: {
                        sortField: 'Id',
                        sortType: 'asc'
                    },
                    cols: [
                        [
                            { field: 'chk', width: 60, align: 'center', fixed: 'left' },
                            { field: 'Id', title: '标题1', width: 60, fixed: 'left', sort: true, resize: true },
                            { field: 'Name', title: '标题2', width: 150, align: 'center', fixed: 'left' },
                            { field: '标题3', title: '标题3', minWidth: 100, align: 'center', sort: true, resize: true },
                            {
                                field: 'Sex', title: '性别', width: 100, align: 'center', resize: true, formatter: function (data) {
                                    return data.Sex ? "男" : "女";
                                }
                            },
                            { field: 'Hobby', title: '标题5', width: 250, align: 'center', resize: true },
                            { field: '标题6', title: '标题6', width: 150, resize: true },
                            { field: 'CreateTime', title: '时间', width: 165, sort: true },
                            {
                                field: 'opts', title: '操作', width: 150, fixed: 'right', align: 'center', resize: true, formatter: function () {
                                    return '<a class="rayui-btn rayui-btn-danger" event="del">删除</a>&nbsp;<a class="rayui-btn rayui-btn-success" event="edit">编辑</a>';
                                }
                            }
                        ]
                    ],
                    onPageLimitChanged: function (preLimit, currLimit) {
                        alert("每页条数从每页 " + preLimit + " 条 改变为 每页 " + currLimit + " 条");
                    },
                    onPageJump: function (prePage, currPage) {
                        alert("从第 " + prePage + " 页 跳转到 第 " + currPage + " 页");
                    }

                });

                tableIns.on("tool", function (evt, obj) {
                    if (evt === "del") {
                        if (window.confirm("确定删除吗？")) {
                            $.getJSON("data.ashx?action=DeleteData", { id: obj.data.Id }, function (data) {
                                if (data.ret === 0)
                                    obj.del();
                                else
                                    alert("删除失败");
                            });
                        }
                    } else if (evt === "edit") {
                        var name = window.prompt("请输入姓名", obj.data.Name);
                        if (name != null) {
                            obj.data.Name = name;
                            obj.update();
                        }
                    }
                });

                $("#query11").click(function () {
                    tableIns.reload({
                        where: $("#form11").serializeJson()
                    });
                });

                $("#reload11").click(function () {
                    tableIns.reload({ page: { curr: 1 } });
                });

                $("#getSelectRow11").click(function () {
                    var list = tableIns.getSelectedRows();
                    alert(JSON.stringify(list));
                });

                $("#resetData11").click(function () {
                    $.getJSON("data.ashx?action=ResetData",
                        function (data) {
                            if (data.ret === 0)
                                alert("操作成功");
                            else
                                alert("操作失败");

                        });
                });

            }

            function initTable10() {
                var tableIns = table.render({
                    elem: "#table10",
                    data: data,
                    singleSelect: true,
                    height: 300,
                    page: true,
                    initSort: {
                        sortField: 'Id',
                        sortType: 'asc'
                    },
                    cols: [
                        [
                            { field: 'chk', width: 60, align: 'center', fixed: 'left' },
                            { field: 'Id', title: '标题1', width: 60, fixed: 'left', sort: true },
                            { field: 'Name', title: '标题2', width: 100, align: 'center', fixed: 'left' },
                            { field: '标题3', title: '标题3', minWidth: 100, align: 'center', sort: true, resize: true },
                            { field: 'Sex', title: '性别', width: 100, align: 'center', resize: true },
                            { field: 'Hobby', title: '标题5', width: 250, align: 'center', resize: true },
                            { field: '标题6', title: '标题6', width: 150, resize: true },
                            { field: 'CreateTime', title: '时间', width: 165, sort: true },
                            {
                                field: 'opts',
                                title: '操作',
                                width: 150,
                                fixed: 'right',
                                align: 'center',
                                resize: true,
                                formatter: function () {
                                    return '<a class="rayui-btn rayui-btn-danger" event="del">删除</a>&nbsp;<a class="rayui-btn rayui-btn-success" event="edit">编辑</a>';
                                }
                            }
                        ]
                    ]
                });

                tableIns.on("tool", function (evt, obj) {
                    if (evt === "del") {
                        if (window.confirm("确定删除吗？"))
                            obj.del();
                    } else if (evt === "edit") {
                        alert('您选中了第' + index + '行');
                    }
                });

                tableIns.on("check", function (obj) {
                    alert("点击了第" + obj.index + "行，状态：" + obj.checked);
                });

                $("#getSelectRow").click(function () {
                    var list = tableIns.getSelectedRows();
                    alert(JSON.stringify(list));
                });
            }

            function initTable9() {
                var tableIns = table.render({
                    elem: "#table9",
                    data: data,
                    height: 300,
                    width: 700,
                    initSort: {
                        sortField: 'Id',
                        sortType: 'desc'
                    },
                    cols: [
                        [
                            { field: 'Id', title: '标题1', width: 60, fixed: 'left', sort: true },
                            { field: 'Name', title: '标题2', width: 120, align: 'center', fixed: 'left' },
                            { field: '标题3', title: '标题3', minWidth: 100, align: 'center', sort: true, resize: true },
                            { field: 'Sex', title: '性别', width: 80, align: 'center', resize: true },
                            { field: 'Hobby', title: '标题5', width: 240, align: 'center', resize: true },
                            { field: '标题6', title: '标题6', width: 120, resize: true },
                            { field: 'CreateTime', title: '时间', width: 165, sort: true },
                            {
                                field: 'opts',
                                title: '操作',
                                width: 125,
                                fixed: 'right',
                                align: 'center',
                                resize: true,
                                formatter: function () {
                                    return '<a class="rayui-btn rayui-btn-danger" event="del">删除</a>&nbsp;<a class="rayui-btn rayui-btn-success" event="edit">编辑</a>';
                                }
                            }
                        ]
                    ]
                });

                tableIns.on("tool",
                    function (evt, obj) {
                        if (evt === "del") {
                            if (window.confirm("确定删除吗？"))
                                obj.del();
                        } else if (evt === "edit") {
                            alert('您选中了第' + index + '行');
                        }
                    });
            }

            function initTable8() {
                var tableIns = table.render({
                    elem: "#table8",
                    data: data,
                    nowrap: false,
                    height: 400,
                    page: {
                        local: true,
                        limit: 15
                    },
                    cols: [
                        [
                            { field: 'Id', title: '标题1', width: 60, fixed: 'left' },
                            { field: 'Name', title: '标题2', width: 120, align: 'center', fixed: 'left' },
                            { field: '标题3', title: '标题3', width: 150, align: 'center', resize: true },
                            { field: 'Sex', title: '性别', width: 60, align: 'center' },
                            { field: 'Hobby', title: '标题5', minWidth: 240, align: 'center', resize: true },
                            { field: '标题6', title: '标题6', width: 120, resize: true },
                            {
                                field: 'opts',
                                title: '操作',
                                width: 125,
                                fixed: 'right',
                                align: 'center',
                                formatter: function () {
                                    return '<a class="rayui-btn rayui-btn-danger" event="del">删除</a>&nbsp;<a class="rayui-btn rayui-btn-success" event="edit">编辑</a>';
                                }
                            }
                        ]
                    ]
                });
                tableIns.on("tool", function (evt, obj) {
                    if (evt === "del") {
                        obj.del();
                    } else if (evt === "edit") {
                        alert('您选中了第' + index + '行');
                    }
                });
            }

            function initTable7() {
                var tableIns = table.render({
                    elem: "#table7",
                    data: data,
                    height: 300,
                    even: true,
                    page: {
                        local: true
                    },
                    cols: [
                        [
                            { field: 'Id', title: '标题1', width: 60, fixed: 'left' },
                            {
                                field: 'Name', title: '标题2', width: 150, align: 'center', fixed: 'left', resize: true, islink: true, formatter: function (v) {
                                    return "<a target='_blank' href='http://www.baidu.com'>" + v + "，我是链接可以点击</a>";
                                }
                            },
                            { field: 'Hobby', title: '标题5', width: 150, align: 'center', resize: true },
                            { field: '标题3', title: '标题3', width: 150, align: 'center' },
                            { field: 'Sex', title: '性别', width: 150, align: 'center' },
                            { field: '标题6', title: '标题6', width: 120, fixed: 'right' }
                        ]
                    ]
                });
            }

            function initTable6() {
                var tableIns = table.render({
                    elem: "#table6",
                    data: data,
                    height: 400,
                    even: true,
                    page: {
                        local: true
                    },
                    cols: [
                        [
                            { title: '我是主标题在最上面', align: 'center', colspan: 6 }
                        ],
                        [
                            { title: '左侧固定', colspan: 2, fixed: 'left' },
                            { title: '我是副标题', align: 'center', colspan: 2 },
                            { title: '右侧固定', align: 'center', colspan: 2 }
                        ],
                        [
                            { field: 'Id', title: '标题1', width: 60, fixed: 'left' },
                            { field: 'Name', title: '标题2', width: 150, align: 'center', fixed: 'left', resize: true },
                            { field: '标题3', title: '标题3', minWidth: 100, align: 'center', resize: true },
                            { field: 'Sex', title: '性别', width: 50, align: 'center' },
                            { field: 'Hobby', title: '标题5', minWidth: 150, align: 'center' },
                            { field: '标题6', title: '标题6', width: 150, fixed: 'right', resize: true }
                        ]
                    ]
                });
            }

            function initTable5() {
                var tableIns = table.render({
                    elem: "#table5",
                    data: data,
                    height: 400,
                    page: {
                        local: true
                    },
                    cols: [
                        [
                            { title: '我是主标题在最上面', align: 'center', width: 120, colspan: 5 }
                        ],
                        [
                            { field: 'Id', title: '标题1', width: 60, rowspan: 2 },
                            {
                                title: '我是副标题在下面，我字号小一点，同时我是红色的',
                                align: 'center',
                                width: 120,
                                colspan: 4,
                                style: { "font-size": "14px", color: "#f00" }
                            }
                        ],
                        [
                            { field: 'Name', title: '标题2', width: 120, align: 'left', dataStyle: { color: "#159200" } },
                            {
                                field: '标题3',
                                title: '标题3',
                                align: 'left',
                                style: { "text-align": "center" },
                                dataStyle: { "text-align": "right" } //此时align无效
                            },
                            { field: 'Hobby', title: '标题5', align: 'center', resize: true },
                            { field: '标题6', title: '标题6', width: 120 }
                        ]
                    ]
                });
            }

            function initTable4() {
                var tableIns = table.render({
                    elem: "#table4",
                    data: data,
                    nowrap: false,
                    height: 300,
                    cols: [[
                        { field: 'Id', title: '标题1', width: 50, hidden: true },
                        { field: 'Name', title: '标题2', width: 150 },
                        { field: '标题3', title: '标题3', width: 150, align: 'center' },
                        { field: 'Hobby', title: '标题5', minWidth: 100, align: 'center', resize: true, dataStyle: { color: '#159200' } },
                        { field: '标题6', title: '标题6', width: 150, fixed: 'right' }
                    ]]
                });
            }

            function initTable3() {
                var tableIns = table.render({
                    elem: "#table3",
                    data: data,
                    height: 300,
                    page: true,
                    cols: [[
                        { field: 'Id', title: '标题1', rowspan: 2 },
                        { field: 'Name', title: '标题2', align: 'left' },
                        { field: '标题3', title: '标题3', align: 'center', resize: true },
                        { field: '标题6', title: '标题6' }
                    ]]
                });
            }

            function initTable2() {
                var tableIns = table.render({
                    elem: "#table2",
                    data: data,
                    height: 300,
                    page: true,
                    cols: [
                        [
                            { field: 'Id', title: '标题1', width: 120, rowspan: 2 },
                            { field: 'Name', title: '标题2', width: 100, align: 'left' },
                            { field: '标题3', title: '标题3', width: 150, align: 'center', resize: true },
                            { field: '标题6', title: '标题6', width: 150 }
                        ]
                    ]
                });
            }

            function initTable1() {
                var dataTmp = [], index = 0;
                while (index < 25) {
                    dataTmp.push(data[index++]);
                }
                var tableIns = table.render({
                    elem: "#table1",
                    data: dataTmp,
                    height: 300,
                    even: true,
                    cols: [
                        [
                            { field: 'Id', title: '标题1', width: 120 },
                            { field: 'Name', title: '标题2', width: 100, align: 'left' },
                            { field: '标题3', title: '标题3', width: 150, align: 'center', resize: true },
                            { field: 'Hobby', title: '标题5', minWidth: 150, align: 'center', resize: true },
                            { field: '标题6', title: '标题6', width: 150 }
                        ]
                    ]
                });
            }

            // initTable1();
            // initTable2();
            // initTable3();
            // initTable4();
            // initTable5();
            // initTable6();
            // initTable7();
            // initTable8();
            initTable9();
            // initTable10();
            // initTable11();
            // initTable12();
            // initTable13();
            // initTable14();

            $(function () {
                // $("#query").click(function () {

                // });
                // $("#textarea").on("mouseenter mousemove mouseleave", function () {
                //     $("#iframe").height($(this).height()).width($(this).width());
                // });
            });
        });
    </script>