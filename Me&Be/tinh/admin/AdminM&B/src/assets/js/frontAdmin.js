$(document).ready(function () {
    //DataTable chuyen nganh
    //-------------------------------------//
    $("#boPhanTable").dataTable( {
        "columnDefs": [
          {
            "orderable": false,
            "targets": [0,4]
          }
        ],
        "order": [[ 1, 'asc' ]],
        language:{
          "sProcessing":   "Đang xử lý...",
          "sLengthMenu":   "Xem _MENU_ mục",
          "sZeroRecords":  "Không tìm thấy dòng nào phù hợp",
          "sInfo":         "Đang xem _START_ đến _END_ trong tổng số _TOTAL_ mục",
          "sInfoEmpty":    "Đang xem 0 đến 0 trong tổng số 0 mục",
          "sInfoFiltered": "(được lọc từ _MAX_ mục)",
          "sInfoPostFix":  "",
          "sSearch":       "Tìm:",
          "sUrl":          "",
          "oPaginate": {
            "sFirst":    "Đầu",
            "sPrevious": "Trước",
            "sNext":     "Tiếp",
            "sLast":     "Cuối"
          }
        },
        aLengthMenu: [
          [10,25,50,100,-1],
          [10,25,50,100,"All"]
        ]
      });
         //----------------------------------------------------------//
      //pnotify------------------------
      $('#btnSaveAdd').click(function(){
        new PNotify({
          title: 'Thành Công!',
          text: 'Bạn đã thêm dữ liệu thành công!',
          type: 'success'
      }); 
    });
      $('#btnSaveUpdate').click(function(){
          new PNotify({
            title: 'Thành Công!',
            text: 'Bạn đã cập nhật dữ liệu thành công!',
            type: 'info'
        }); 
      });
      $('#btnXoaCF').click(function(){
        new PNotify({
          title: 'Thành Công!',
          text: 'Bạn đã xóa dữ liệu thành công!',
          type: 'error'
      }); 
    });
          //---------deleteBoPhans(boPhans.MABOPHAN); -------------------------------------------------//
    //none exit when click outside modal
    $('.addBoPhan').click(function(){
        $('#addBoPhan').modal({backdrop: 'static'})
      });
   //Login Page Flipbox control
      $('.login-content [data-toggle="flip"]').click(function() {
      	$('.login-box').toggleClass('flipped');
      	return false;
      });
      //treeview 
      var treeviewMenu = $('.app-menu');
    // Toggle Sidebar
        $('[data-toggle="sidebar"]').click(function(event) {
            event.preventDefault();
            $('.app').toggleClass('sidenav-toggled');
        });
      // Activate sidebar treeview toggle
      $("[data-toggle='treeview']").click(function(event) {
          event.preventDefault();
          if(!$(this).parent().hasClass('is-expanded')) {
              treeviewMenu.find("[data-toggle='treeview']").parent().removeClass('is-expanded');
          }
          $(this).parent().toggleClass('is-expanded');
      });
  
      // Set initial active toggle
      $("[data-toggle='treeview.'].is-expanded").parent().toggleClass('is-expanded');
  
      //Activate bootstrip tooltips
      $("[data-toggle='tooltip']").tooltip();
      // data test index admin
      var data = {
      	labels: ["January", "February", "March", "April", "May"],
      	datasets: [
      		{
      			label: "My First dataset",
      			fillColor: "rgba(220,220,220,0.2)",
      			strokeColor: "rgba(220,220,220,1)",
      			pointColor: "rgba(220,220,220,1)",
      			pointStrokeColor: "#fff",
      			pointHighlightFill: "#fff",
      			pointHighlightStroke: "rgba(220,220,220,1)",
      			data: [65, 59, 80, 81, 56]
      		},
      		{
      			label: "My Second dataset",
      			fillColor: "rgba(151,187,205,0.2)",
      			strokeColor: "rgba(151,187,205,1)",
      			pointColor: "rgba(151,187,205,1)",
      			pointStrokeColor: "#fff",
      			pointHighlightFill: "#fff",
      			pointHighlightStroke: "rgba(151,187,205,1)",
      			data: [28, 48, 40, 19, 86]
      		}
      	]
      };
      var pdata = [
      	{
      		value: 300,
      		color: "#46BFBD",
      		highlight: "#5AD3D1",
      		label: "Complete"
      	},
      	{
      		value: 50,
      		color:"#F7464A",
      		highlight: "#FF5A5E",
      		label: "In-Progress"
      	}
      ]
      
      var ctxl = $("#lineChartDemo").get(0).getContext("2d");
      var lineChart = new Chart(ctxl).Line(data);
      
      var ctxp = $("#pieChartDemo").get(0).getContext("2d");
      var pieChart = new Chart(ctxp).Pie(pdata);
//<!-- Google analytics scrip
        if(document.location.hostname == 'pratikborsadiya.in') {
          (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
          })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
          ga('create', 'UA-72504830-1', 'auto');
          ga('send', 'pageview');
        }
       
});
