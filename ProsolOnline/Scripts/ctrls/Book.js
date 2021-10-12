
var app = angular.module('ProsolApp', ['cgBusy', 'datatables']);


app.controller('BookController', function ($scope, $http, $rootScope, $timeout) {
    
    $scope.sub = true;
    $scope.Book1 = [];

    $scope.tablerow1 = 0;
    $scope.x = {};
    $scope.createData = function () {
        if ($scope.Book_id != null|| $scope.Book != null || $scope.Authname != null || $scope.Price != null) {
            $timeout(function () { $scope.NotifiyRes = false; }, 10000);
            var formData = new FormData();

            $scope.dt = [];
            $scope.dt.push({ Book_id: $scope.Book_id, Book: $scope.Book, Authname: $scope.Authname, Price: $scope.Price, Version: $scope.Version })
            
            formData.append("obj", angular.toJson($scope.dt));

            $http({
                url: "/Book/InsertDataplnt1",
                method: "POST",
                headers: { "Content-Type": undefined },
                transformRequest: angular.identity,
                data: formData
            }).success(function (data, status, headers, config) {

                //if (data.success === false) {

                //}
                //else {
                if (data) {
                    $scope.Book_id = "";
                    $scope.Book = "";
                    $scope.Authname = "";
                    $scope.Price = "";
                    $scope.Version = "";
                    $scope.Res = "Data created successfully";
                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $scope.BindList1();
                    $('#divNotifiy').attr('style', 'display: block');
                }
                else {
                    $scope.Res = "Data already exists";
                    //$scope.Book_id = "";
                    //$scope.Book = "";
                    //$scope.Authname = "";
                    //$scope.Price = "";
                    //$scope.Version = "";

                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $('#divNotifiy').attr('style', 'display: block');

                }
                //} else {

                       
                //    $timeout(function () { $scope.NotifiyRes = false; }, 3000);
                //    $scope.Res = response;
                //    $('#divNotifiy').attr('style', 'display: block');
                //    $scope.NotifiyRes = true;
                //    $scope.Notify = "alert-danger";

                //}

            }).error(function (data, status, headers, config) {
                $timeout(function () { $scope.NotifiyRes = false; }, 3000);
                $scope.Res = data;
                $('#divNotifiy').attr('style', 'display: block');
                $scope.NotifiyRes = true;
                $scope.Notify = "alert-danger";

            });

        }
        else {

        }
    };
    $scope.LoadFileData = function (files) {

        $scope.NotifiyRes = false;
        $scope.$apply();
        $scope.files = files;
        if (files[0] != null) {
            var ext = files[0].name.match(/\.(.+)$/)[1];
            if (angular.lowercase(ext) === 'xls' || angular.lowercase(ext) === 'xlsx') {
            } else {
                angular.element("input[type='file']").val(null);
                files[0] = null;

                $scope.Res = "Load valid excel file";
                $scope.Notify = "alert-danger";
                $scope.NotifiyRes = true;
                $scope.$apply();
            }
        }
    };
    $scope.Bookdata = function () {
    
        if ($scope.files[0] != null) {
            //alert(angular.toJson($scope.files[0]));

            //$scope.ShowHide = true;
            $timeout(function () { $scope.NotifiyRes = false; }, 5000);

            var formData = new FormData();
            formData.append('image', $scope.files[0]);
            
            $scope.promise = $http({
                url: "/Book/Bookdata_Upload",
                method: "POST",
                headers: { "Content-Type": undefined },
                transformRequest: angular.identity,
                data: formData
            }).success(function (data, status, headers, config) {
                //  alert(data);
                $scope.ShowHide = false;
                if (data === 0)
                    $scope.Res = "Records already exists"
                else $scope.Res = data + " Records uploaded successfully"


                $scope.Notify = "alert-info";
                $scope.NotifiyRes = true;

                $('.fileinput').fileinput('clear');

            }).error(function (data, status, headers, config) {
                $scope.ShowHide = false;
                $scope.Res = "Please Valid Your Excel File";
                $scope.Notify = "alert-danger";
                $scope.NotifiyRes = true;


            });
        };
    }
    $scope.Loadpop = function () {
        new jBox('Tooltip', {
            attach: '#bookshow',
            //width: 400,
            //height: 500,                   
            closeButton: true,
            //animation: 'zoomIn',
            theme: 'TooltipBorder',
            trigger: 'click',
            width: 600,
            height: 240,
            adjustTracker: true,
            closeOnClick: 'body',
            closeOnEsc: true,
            animation: 'move',
            //position: {
            //    x: 'center',
            //    y: 'center'
            //},
            outside: 'y',
            content: jQuery('#flowconId')
        });
    }

    //$scope.UnspscDel = function (_id) {

    //    if (confirm("Are you sure, delete this record?")) {
    //        $http({
    //            method: 'GET',
    //            url: "/Book/deletedata",
    //            params: { id: _id }
    //        }).success(function (response) {
    //            $scope.Res = "Book info deleted";
    //            $scope.Notify = "alert-info";
    //            $scope.NotifiyRes = true;
    //            $scope.BindList1();
    //        }).error(function (data, status, headers, config) {
    //            // alert("error");
    //        });
    //    }
    //};
    $scope.removerow = function (Book_id) {

        if (confirm("Are you sure, delete this record?")) {
            $http({
                method: 'GET',
                url: "/Book/deletedata",
                params: { id: Book_id }
            }).success(function (response) {
                $scope.Res = "Book info deleted";
                $scope.Notify = "alert-info";
                $scope.NotifiyRes = true;
                $scope.BindList1();
            }).error(function (data, status, headers, config) {
                // alert("error");
            });
        }
    };
    $scope.checkbook = function () {
      
        $scope.Books = [];
        angular.forEach($scope.GetBook, function (value, key) {
                
            if (value.x == true) {
                $scope.Books.push(value.Book);
                 
            }
                    
        });
    }
   
    $scope.loadBook = function (Book_id) {
           
     //alert(angular.toJson(bookform))
        $http({
            method: 'GET',
            url: '/Book/getbookdetails',
            params: { bookdet:Book_id }
        }).success(function (result) {
           
            $scope.bookform = true;
          
            //$scope.books = {};
            $scope.Book_id = result.Book_id;
            $scope.Book = result.Book;
            $scope.Authname = result.Authname;
            $scope.Price = result.Price;
                    
         
        });
    }
    $scope.loadBook1 = function (Version) {

        //alert(angular.toJson(bookform))
        $http({
            method: 'GET',
            url: '/Book/getoldbookdetails',
            params: { oldbook: Version }
        }).success(function (result) {

            $scope.bookform = true;

            //$scope.books = {};
            $scope.Book_id = result.Book_id;
            $scope.Book = result.Book;
            $scope.Authname = result.Authname;
            $scope.Price = result.Price;
            $scope.Version = resul.Version;


        });
    }
    $scope.SearchItem1 = function () {
        //$timeout(function () { $rootScope.NotifiyRes = false; }, 5000);
        //  $timeout(function () { $scope.NotifiyRes = false; }, 30000);
       
        $http({
            method: 'GET',
            url: '/Book/Getbookresult',
            params: { bname: $scope.searchname, by: $scope.searchBY }
            //?sKey=' + $scope.searchkey + '&sBy=' + $scope.search
        }).success(function (response) {
        //alert(angular.toJson(response))
            if (response != '') {
                $scope.bookres = response;
                $scope.Res = "Data Loaded successfully";
                $rootScope.Notify = "alert-info";
                $rootScope.NotifiyRes = true;
            } else {
                $scope.bookres = null;
                $rootScope.Res = "No item found"
                $rootScope.Notify = "alert-danger";
                $rootScope.NotifiyRes = true;

            }

        }).error(function (data, status, headers, config) {
            // alert("error");
        });
    };
    $scope.reset = function () {

        $scope.form.$setPristine();
    }
    $scope.ClearItem = function () {

        $scope.bookres = null;
        $scope.searchname = null;
        $scope.reset();
    }
    $scope.Downloaditem = function () {
    

        $timeout(function () { $scope.NotifiyRes = false; }, 3000);

        $scope.Bookrow = [];
        var flg = 0;
        angular.forEach($scope.Bookdic, function (lst) {

                $scope.Bookrow.push(lst);
        });
        
        if ($scope.Bookrow.length > 0) {
            //alert(angular.toJson($scope.slcteditem))
                var blob = new Blob([document.getElementById('tbldown').innerHTML], {
                    type: "application/ms-excel"
                });

                saveAs(blob, "BookList.xls");

            }
        

    };
   
    //$scope.selectchk = false;
    $scope.checkall = function () {
        $scope.slcteditem = [];
        angular.forEach($scope.Bookdic, function (lst)
        {
            lst.attachment = true;
            $scope.slcteditem.push(lst);
             });
    };
    
    $scope.singlechk = function (x, indx) {
        $scope.slcteditem = [];
        angular.forEach($scope.Bookdic, function (lst) {
            if ($scope.singlechk.length > 0) {
                if(lst.attachment==true)
                {
                    $scope.slcteditem.push(lst);
                }
               
            }
            })
      
     
      
       // $scope.selected = $scope.slcteditem.length;

    };
        $scope.createData1 = function () {
            if ($scope.Books != null) {
                
                $timeout(function () { $scope.NotifiyRes = false; }, 5000);
                var formData = new FormData();

              

                formData.append("obj", $scope.AuthorName);
                formData.append("books", angular.toJson($scope.Books));
                formData.append("id", $scope.Book_id);
                $http({
                    url: "/Book/save",
                    method: "POST",
                    headers: { "Content-Type": undefined },
                    transformRequest: angular.identity,
                    data: formData
                }).success(function (data, status, headers, config) {
                
                    
                    if (data == true) {
                       
                        $scope.GetBook = null;
                        $scope.AuthorName = "";
                        $scope.Book_id = "";
                        $scope.Res = "Data created successfully";
                        $rootScope.Notify = "alert-info";
                        $rootScope.NotifiyRes = true;
                        $scope.BindDicList();

                        $('#divNotifiy').attr('style', 'display: block');
                    }
                    else {
                        
                        $scope.GetBook = "";
                        $scope.AuthorName = "";
                        $scope.Res = "Data already exists";

                        $rootScope.Notify = "alert-info";
                        $rootScope.NotifiyRes = true;
                        $('#divNotifiy').attr('style', 'display: block');

                    }
                   

                }).error(function (data, status, headers, config) {
                    $timeout(function () { $scope.NotifiyRes = false; }, 3000);
                    $scope.Res = data;
                    $('#divNotifiy').attr('style', 'display: block');
                    $scope.NotifiyRes = true;
                    $scope.Notify = "alert-danger";

                });

            }
            else {
        
            }

        };
      
    $scope.BindList1 = function () {
           
        $http({
            method: 'GET',
            url: '/Book/GetDataLists',
            //params: { bn: BookName }
        }).success(function (response) {
            $scope.Book1 = response;
          
        }).error(function (data, status, headers, config) {
                
        });
    };
    $scope.BindList1();
    $scope.BindList2 = function () {

        $http({
            method: 'GET',
            url: '/Book/GetDataLists11',
           
        }).success(function (response) {
            $scope.Book11 = response;

        }).error(function (data, status, headers, config) {

        });
    };
    $scope.BindList2();
    $scope.BindList3 = function () {

        $http({
            method: 'GET',
            url: '/Book/GetDataLists3',

        }).success(function (response) {
            $scope.Book3 = response;

        }).error(function (data, status, headers, config) {

        });
    };
    $scope.BindList3();
    $scope.GetBookname = function (AuthorName) {
       
        $http({
            method: 'GET',

            url: '/Book/GetBook',
            params: { Authname: AuthorName },
        }).success(function (response) {
            $scope.GetBook = response;

        }).error(function (data, status, headers, config) {
            // alert("error");
        });
    };
  //  $scope.GetBookname();
    $scope.BindDicList = function () {
       
        $http({

            method: 'GET',
            url: '/Book/GetDatadicList',
            
        }).success(function (response) {
            $scope.Bookdic = response;
           
            angular.forEach($scope.Bookdic, function (lst) {
               
                if (lst.BookName!= null) {
                    var str = '';
                
                                str = str + lst.BookName + ' ';
                  
                    lst.BookName = str
                }

            })
         
           
        }).error(function (data, status, headers, config) {

        });
    };
    $scope.BindDicList();
    $scope.BindmattList = function () {
        
        $http({
            method: 'GET',
            url: '/Book/GetDataList1'
        }).success(function (response) {
            
            $scope.getmattype1 = response;
            
            $scope.athnm = response[0].Authname;
          
        }).error(function (data, status, headers, config) {
            // alert("error");
        });
    };
    $scope.BindmattList();
    $scope.exportTrack = function () {
        $timeout(function () {
            $('#divNotifiy').attr('style', 'display: none');
        }, 30000);

        if ($scope.materialcode != "" && $scope.materialcode != null && $scope.materialcode != undefined) {
            var formData = new FormData();
            formData.append("materialcode", $scope.materialcode);
            $scope.cgBusyPromises = $http({
                method: 'POST',
                url: '/Report/DownloadTrack1',
                headers: { "Content-Type": undefined },
                transformRequest: angular.identity,
                data: formData,
            }).success(function (response) {
                if (response > 0)
                    $window.location = '/Report/DownloadMulticode';
                else {
                    $scope.Res = "Please enter valid material codes, if more than one code separate by comma(,)";
                    $scope.Notify = "alert-danger";
                    $scope.NotifiyRes = true;
                    $('#divNotifiy').attr('style', 'display: block');
                }
            });

            //if ($scope.tables != null) {
            //    var data = $scope.tables;
            //    var blob = new Blob([document.getElementById('exportable').innerHTML], {
            //        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
            //    });
            //    saveAs(blob, "TrackReport.xls");
            //} else {
            //    $scope.Res = "Please load first";
            //    $scope.Notify = "alert-danger";
            //    $scope.NotifiyRes = true;
            //    $('#divNotifiy').attr('style', 'display: block');
            //}


        } else {
            if ($scope.Fromdate != undefined && $scope.Plant != undefined && $scope.Option != undefined) {

                var fdate = null, tdate = null;
                if ($scope.Fromdate != undefined)
                    fdate = $scope.Fromdate;
                if ($scope.Todate != undefined)
                    tdate = $scope.Todate;



                $window.location = '/Report/DownloadTrack?plant=' + $scope.Plant + '&Fromdate=' + fdate + '&Todate=' + tdate + '&option=' + $scope.Option + '&MaterialType=' + $scope.Materialtype;


            }
            else {
                if ($scope.Plant == undefined) {
                    $scope.Res = "Choose Plant";
                    $scope.Notify = "alert-danger";
                    $scope.NotifiyRes = true;
                    $('#divNotifiy').attr('style', 'display: block');
                }
                else if ($scope.Fromdate == undefined) {
                    $scope.Res = "Select FromDate";
                    $scope.Notify = "alert-danger";
                    $scope.NotifiyRes = true;
                    $('#divNotifiy').attr('style', 'display: block');
                }
                else if ($scope.Option == undefined) {
                    $scope.Res = "Select Option";
                    $scope.Notify = "alert-danger";
                    $scope.NotifiyRes = true;
                    $('#divNotifiy').attr('style', 'display: block');
                }
                else {
                    $scope.Res = "Provide Search Datas";
                    $scope.Notify = "alert-danger";
                    $scope.NotifiyRes = true;
                    $('#divNotifiy').attr('style', 'display: block');
                }

            }
        }
    }
    $scope.updaterow = function (index) {
       // alert(angular.toJson($scope.updaterow))
        // if ($window.confirm("Please confirm to load Row to update?")) {
        $scope.sub = false;
        $scope.btnUpdate = true;

        $scope.tablerow1 = index;
        // alert(angular.toJson($scope.Book1[index].Book))
        $scope.Book_id = $scope.Book1[index].Book_id;
        $scope.Book = $scope.Book1[index].Book;
        $scope.Authname = $scope.Book1[index].Authname;
             
        $scope.Price = $scope.Book1[index].Price;
       
    };

    $scope.changeinfo = function () {
        if ($scope.Book_id != null ||$scope.Book != null || $scope.Authname != null || $scope.Price != null) {


            $timeout(function () { $scope.NotifiyRes = false; }, 5000);
            var formData = new FormData();
            $scope.dt1 = [];
            $scope.dt1.push({Book_id:$scope.Book_id,  Book: $scope.Book, Authname: $scope.Authname, Price: $scope.Price})
            formData.append("obj", angular.toJson($scope.dt1));
            $http({
                url: "/Book/updatedata",
                method: "POST",

                headers: { "Content-Type": undefined },
                transformRequest: angular.identity,
                data: formData
            }).success(function (data, status, headers, config) {

                $scope.Book_id = "";
                $scope.Book = "";
                $scope.Authname = "";
                $scope.Price = "";
               
                $rootScope.Res = "Data updated successfully";
                $scope.btnUpdate = false;
                $scope.sub = true;
                $scope.Reset = true;
                $rootScope.Notify = "alert-info";
                $rootScope.NotifiyRes = true;
                $scope.BindList1();
                $('#divNotifiy').attr('style', 'display: block');




            })
        }
    }
    $scope.Add = function () {
        alert("obj")
        if ($scope.Book_id != null || $scope.Book != null || $scope.Authname != null || $scope.Price != null) {
            $timeout(function () { $scope.NotifiyRes = false; }, 5000);
            var formData = new FormData();

            $scope.dt = [];
            $scope.dt.push({ Book_id: $scope.Book_id, Book: $scope.Book, Authname: $scope.Authname, Price: $scope.Price })
            formData.append("obj", angular.toJson($scope.dt));

            $http({
                url: "/Book/InsertDataplnt1",
                method: "POST",
                headers: { "Content-Type": undefined },
                transformRequest: angular.identity,
                data: formData
            }).success(function (data, status, headers, config) {

                //if (data.success === false) {

                //}
                //else {
                if (data == true) {
                    $scope.Book_id = "";
                    $scope.Book = "";
                    $scope.Authname = "";
                    $scope.Price = "";
                    $scope.Res = "Data created successfully";
                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $scope.BindList1();
                    $('#divNotifiy').attr('style', 'display: block');
                }
                else {
                    $scope.Book_id = "";
                    $scope.Book = "";
                    $scope.Authname = "";
                    $scope.Price = "";
                    $scope.Res = "Data already exists";


                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $('#divNotifiy').attr('style', 'display: block');

                }
                //} else {


                //    $timeout(function () { $scope.NotifiyRes = false; }, 3000);
                //    $scope.Res = response;
                //    $('#divNotifiy').attr('style', 'display: block');
                //    $scope.NotifiyRes = true;
                //    $scope.Notify = "alert-danger";

                //}

            }).error(function (data, status, headers, config) {
                $timeout(function () { $scope.NotifiyRes = false; }, 3000);
                $scope.Res = data;
                $('#divNotifiy').attr('style', 'display: block');
                $scope.NotifiyRes = true;
                $scope.Notify = "alert-danger";

            });

        }
        else {

        }
    };

    })
        
