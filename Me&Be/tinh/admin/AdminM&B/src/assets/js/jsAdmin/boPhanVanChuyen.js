$(document).ready(function () {
	//-----------------------------------------------------------//
  //none exit when click outside modal
  //----------------------------------------------------------//
  var tbl, inforData;
  //datatable
  tbl = $('#vanChuyenTable').DataTable({
    columnDefs: [
      { orderable: false, targets: [0,4] }
    ],
    aLengthMenu: [
      [10, 25, 50, 100, -1],
      [10, 25, 50, 100, "All"]
    ],
    iDisplayLength: 10,
    //sap xep cot 3 tang dan
    order: [[1, "asc"]],
    language: {
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
    aaData: null,
    rowId: "ID_BOPHANVC",
    columns:[
      {data: null, className: "text-center", width:"20px"},
      {data: "TENBOPHAN", className: "text-center"},
      {data: "SDT_BOPHAN", className: "text-center"},
      {data: "EMAIL_BOPHAN", className: "text-center"},
      {data: null,className: "text-center", render: function (data, type, row){
        return '<i data-group="grpEdit" class="fa fa-check text-warning m-1 pointer"></i>'+
                '<i data-group="grpDelete" class="fa fa-remove text-danger m-1 pointer"></i>';
      }}
    ],
    //load data
    initComplete: function(setting, json){
      loadReader();
      $("select[name=tbl_length]").select2({ width: '80px', minimunResultsForSearch: -1});
    },
    drawCallback: function(settings){
      bindTableEvents();
    }
  });


  //custom stt datatable
  tbl.on('order.dt search.dt', function(){
    tbl.column(0, {search: 'applied', order: 'applied'}).nodes().each(function(cell,i){
      cell.innerHTML = i + 1;
    })
  }).draw();

  //function load data to api
  function loadReader(){
    var url = "http://localhost:88/bophan";
    $.get(url, function(res){
      if(res.errorCode ==  0)
      {
        dataKT=res.data;
        tbl.clear().draw();
        tbl.rows.add(res.data);//add new data
        tbl.columns.adjust().draw();// reraw datatable
      }
      else
      {
        $("#error").text(res.errorCode);
      }   
    },'json');
  }

  //select2
//   $('.select2').select2()
  
  //open model+none click outside
  $('#addVanChuyen').modal({show: false, backdrop: 'static', keyboard: false }).on('show.bs.modal',function(){
    var Id=$('#hideId').val();
    if(Id==0)
    {
      var validator = $("#add").validate();
      validator.resetForm();
      $('.form-control').removeClass('has-error');
      $('.form-group').removeClass('has-error');
      $("#uncode_BPVC").hide();
      //.....................
      $('#TENBOPHAN').val("").prop('readonly',false);
      $('#SDT_BOPHAN').val("");
      $('#EMAIL_BOPHAN').val("");
      //  default disable
       $('#btnSave').prop('disabled', true);
    }
      else
    {
        var validator = $("#add").validate();
      validator.resetForm();
      $('.form-control').removeClass('has-error');
      $('.form-group').removeClass('has-error');
      $("#uncode_BPVC").hide();
      $('#TENBOPHAN').val(inforData.TENBOPHAN).prop('readonly', true);
      $('#SDT_BOPHAN').val(inforData.SDT_BOPHAN);   
      $('#EMAIL_BOPHAN').val(inforData.EMAIL_BOPHAN);
    }
  });

  //if click button add, this code will run
  $('.btn_add').click(function(){
    $('#hideId').val('0');
    $('#addVanChuyen').modal('show');
  });

  //function binding data when datatable work
  function bindTableEvents()
  {
    //click button edit
    $('i[data-group=grpEdit]').off('click').click(function(){
  
      var rowId=$(this).closest('tr').attr('id');
      var url = "http://localhost:88/bophan"+"/"+rowId;       
      $('#hideId').val(rowId);
      $.get(url, function(res){
        if(res.errorCode == 0)
        {
          inforData=res.data;
          $('#addVanChuyen').modal('show');
        }
      });
      $(this).removeData('bs.modal');
    });
    //click button delete
    $('i[data-group=grpDelete]').off('click').click(function(){
      var rowId=$(this).closest('tr').attr('id');
      var url = "http://localhost:88/bophan"+"/"+rowId;       
      $.confirm({
        title: 'Xác nhận xóa!',
        content: 'Bạn có chắc muốn xóa?',
        buttons: {
            info: {
              text: 'Xóa',
              btnClass: 'btn-red',
                action: function(){
                  $.ajax({
                    url: url,
                    dataType: 'json',
                    type: 'DELETE',
                    success: function(res){
                      if(res.errorCode == 0)
                      {
                        showStackContext('delete success',true);
                        loadReader();
                      }
                      else
                      {
                        showStackContext('delete error',true);
                      }
                    }    
                  });
              }
            },
            danger: {
              text: 'Hủy',
              btnClass: 'btn-default', // multiple classes.
              action:function(){
              }
            }
        }
      });
    });
  }


  //insert and update
  $("#btnSave").click(function(){
    var iD = $("#hideId").val();
    if(iD == 0)
    {
      var data = {
        "TENBOPHAN": $('#TENBOPHAN').val(),
        "SDT_BOPHAN": $('#SDT_BOPHAN').val(),
        "EMAIL_BOPHAN": $("#EMAIL_BOPHAN").val()
      };
      var url = "http://localhost:88/bophan";
      $.post(url,data, function(res){
        if(res.errorCode == 0)
        {
          $('#addVanChuyen').modal('hide');
          showStackContext('insert success',true);
          loadReader();
        }
        else
        {
          showStackContext('insert error',true);
        }
      });
    }
    else
    {
      var data = {
        "TENBOPHAN": $('#TENBOPHAN').val(),
        "SDT_BOPHAN": $('#SDT_BOPHAN').val(),
        "EMAIL_BOPHAN": $("#EMAIL_BOPHAN").val()
      };
      var url = "http://localhost:88/bophan"+"/"+iD;
      $.ajax({
        url: url,
        dataType: 'json',
        data: data,
        type: 'PUT',
        success: function(res){
          if(res.errorCode == 0)
          {
            $('#addVanChuyen').modal('hide');
            showStackContext('update success',true);
            loadReader();
          }
          else
          {
            showStackContext('update error',true);
          }
        }    
      });
    }
  })

  //pnotify
  function showStackContext(type, modal) {
    if (typeof window.stackContext === 'undefined') {
        window.stackContext = {
            'dir1': 'down',
            'dir2': 'left',
            'firstpos1': 25,
            'firstpos2': 25,
            'context': document.getElementById('stack-context')
        };
    }
    if (typeof window.stackContextModal === 'undefined') {
        window.stackContextModal = {
            'dir1': 'down',
            'firstpos1': 25,
            'context': document.getElementById('stack-context'),
            'modal': true,
            'overlayClose': true
        };
    }
    var opts = {
        title: 'Over Here',
        text: "Check me out. I'm in a different stack.",
        stack: modal ? window.stackContextModal : window.stackContext
    };
    switch (type) {
        case 'insert success':
            opts.title = 'Thành công';
            opts.text = 'Thêm thành công!';
            opts.type = 'success';
            break;
        case 'delete success':
            opts.title = 'Thành công';
            opts.text = 'Xóa thành công!';
            opts.type = 'success';
            break;
        case 'update success':
            opts.title = 'Thành công';
            opts.text = 'Cập nhật thành công!';
            opts.type = 'success';
            break;
        case 'insert error':
            opts.title = 'Thất bại';
            opts.text = "Thêm thất bại!";
            opts.type = 'error';
            break;
        case 'delete error':
            opts.title = 'Thất bại';
            opts.text = "Xóa thất bại!";
            opts.type = 'error';
            break;
        case 'update error':
            opts.title = 'Thất bại';
            opts.text = "Cập nhật thất bại!";
            opts.type = 'error';
            break;
    }
    PNotify.alert(opts);
}
  //custom width datatable 
  $('#subject-table_wrapper').removeClass("container-fluid");
   //validate
   $("#add").validate({
    debug: true,
    focusCleanup: true,
    rules:{
        TENBOPHAN:{
            required:true,
            maxlength:255
          },
          SDT_BOPHAN:{
              required:true,
              maxlength:11,
              min: 1
          },
          EMAIL_BOPHAN:{
              maxlength:255,
              email: true
          }
    },
    messages:{
        TENBOPHAN:{
            required:"Tên bộ phận không được trống.",
            maxlength:"Tên bộ phận chỉ tối đa 255 ký tự"
        },
        SDT_BOPHAN:{
          required:"Số điện thoại không được trống.",
          maxlength:"Số điện thoại chỉ tối đa 11 ký tự",
          min:"Không được nhập số âm"
        },
        EMAIL_BOPHAN:{
          maxlength:"Email có độ dài không vượt quá 255 số",
          email: "Email phải có định dạng email@xxx.xxx"
        }
    },
    highlight : function (element) {
      $(element).closest('.form-control').addClass('has-error');
      $(element).closest('.form-group').addClass('has-error');
  },
  unhighlight : function (element) {
      $(element).closest('.form-control').removeClass('has-error');
      $(element).closest('.form-group').removeClass('has-error');
  }
    
  });
  //validate code_SBJ
  function name()
  {
    var input_name = $("#TENBOPHAN").val().trim();
    var result_name = false;
      $("#uncode_BPVC").show();
        $.each(dataKT, function( key, value ) {
      if(input_name==value.TENBOPHAN )
      {    
        result_name = true;        
      }
    });
    if(result_name)
    {
      $("#uncode_BPVC").html("<span class='not-exists'>Bộ phận vận chuyển này đã tồn tại.</span>");
      result_check = false;
    }
    else
    {
      $("#uncode_BPVC").html("");
      result_check = true;
    }
  }
  $("#TENBOPHAN").keyup(function(){
    name();
  });
  $("#TENBOPHAN").change(function(){
    name();
  });
 
  $('#add input').bind('keyup blur change', function () {   //keyup + change
    //check validate from jquery
    var Id=$('#hideId').val();
    if(Id==0)
    {
      if ($('#add').validate().checkForm() ) {  
        //call custom function valdidate to check
        name();
        //check custom function validate
        if(result_check == true)
        {            
          $('#btnSave').removeClass('button_disabled').prop('disabled', false); 
        }   
        else
        {
          $('#btnSave').removeClass('button_disabled').prop('disabled', true); 
        }
      } else {
        $('#btnSave').addClass('button_disabled').prop('disabled', true);   
      }
    }
    else
    {
        $("#uncode_BPVC").hide();
      if ($('#add').validate().checkForm() ) {  
        //call custom function valdidate to check
        name();
        $("#uncode_BPVC").hide();
        //check custom function validate
        if(result_check == false)
        {            
          $('#btnSave').removeClass('button_disabled').prop('disabled', false); 
        }   
        else
        {
          $('#btnSave').removeClass('button_disabled').prop('disabled', true); 
        }
      } else {
        $('#btnSave').addClass('button_disabled').prop('disabled', true);   
      }
    }
  });
})