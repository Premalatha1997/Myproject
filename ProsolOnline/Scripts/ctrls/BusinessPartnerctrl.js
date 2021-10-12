﻿
(function () {
    'use strict';
    var app = angular.module('ProsolApp', ['datatables']);
    //Genral
    app.controller('CategoryController', function ($scope, $http, $timeout,$rootScope, DTOptionsBuilder) {

        
        $scope.dtOptions = DTOptionsBuilder.newOptions()
           .withDisplayLength(10)
           .withOption('bLengthChange', true);

        $rootScope.NotifiyResclose = function () {
            $('#divNotifiy').attr('style', 'display: none');
        }

        $scope.BindList = function () {

            $http({
                method: 'GET',
                url: '/BusinessPartner/GetDataList',
                params: { label: 'BP Category' },
            }).success(function (response) {

                $scope.Categorys = response;
            }).error(function (data, status, headers, config) {
                // alert("error");
            });
        };
        $scope.BindList();
        $scope.reset = function () {

            $scope.form.$setPristine();
        }
        $scope.createData = function () {

            $timeout(function () {  $('#divNotifiy').attr('style', 'display: none');}, 5000);          

            $timeout(function () { $scope.NotifiyRes = false; }, 5000);
            $scope.obj.Label = "BP Category";
            var formData = new FormData();
            formData.append("data", angular.toJson($scope.obj));

            $http({
                url: "/BusinessPartner/InsertData",
                method: "POST",
                headers: { "Content-Type": undefined },
                transformRequest: angular.identity,
                data: formData
            }).success(function (data, status, headers, config) {

                if (data.success === false) {
                    
                }
                else {
                    if (data === false)
                        $rootScope.Res = "Data already exists";
                    else {
                        $rootScope.Res = "Data created successfully";
                        $scope.BindList();
                    }
                    $scope.reset();
                    $scope.obj = null;

                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $('#divNotifiy').attr('style', 'display: block');
                }
            }).error(function (data, status, headers, config) {
               
            });

            // }
        };
        $scope.btnSubmit = true;
        $scope.btnUpdate = false;
        $scope.DataDel = function (_id) {
            if (confirm("Are you sure, delete this record?")) {
                $http({
                    method: 'GET',
                    url: '/BusinessPartner/DelData',
                    params: { id: _id }
                    //?id=' + _id
                }).success(function (response) {
                    $rootScope.Res = "Data deleted";
                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $scope.BindList();
                    $('#divNotifiy').attr('style', 'display: block');
                }).error(function (data, status, headers, config) {
                    // alert("error");
                });
            }
        };
        $scope.DataEdit = function (x, idx) {

            var i = 0;
            angular.forEach($scope.Categorys, function (lst) {
                $('#inds' + i).attr("style", "");
                i++;
            });
            $('#inds' + idx).attr("style", "background-color:lightblue");
            $scope.obj = {};
            $scope.btnSubmit = false;
            $scope.btnUpdate = true;
            $scope.obj._id = x._id;
            $scope.obj.Code = x.Code;
            $scope.obj.Title = x.Title;
        };
        $scope.updateData = function () {

            //if (!$scope.form.$invalid) { 
            $timeout(function () { $scope.NotifiyRes = false; }, 5000);
            $scope.obj.Label = "BP Category";
            var formData = new FormData();
            formData.append("data", angular.toJson($scope.obj));

            $http({
                url: "/BusinessPartner/InsertData",
                method: "POST",
                headers: { "Content-Type": undefined },
                transformRequest: angular.identity,
                data: formData
            }).success(function (data, status, headers, config) {

                if (data.success === false) {
                   
                }
                else {
                    if (data === false)
                        $rootScope.Res = "Data already exists";
                    else {
                        $rootScope.Res = "Data updated successfully";
                        $scope.BindList();
                    }
                    $scope.reset();
                    $scope.obj = null;
                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $('#divNotifiy').attr('style', 'display: block');
                }
            }).error(function (data, status, headers, config) {
                
            });
            $scope.btnSubmit = true;
            $scope.btnUpdate = false;
        };
        $scope.ClearFrm = function () {
           
            $scope.obj = null;
            $scope.btnSubmit = true;
            $scope.btnUpdate = false;
            $scope.reset();
        }
        $scope.DisableData = function (idx, enable, _id) {
           
            if (enable == false) {

                if (confirm("Are you sure, disable this record?")) {

                    $http({
                        method: 'GET',
                        url: '/BusinessPartner/DisableData',
                        params: { id: _id, Islive: enable }
                        //?id=' + _id + '&Islive=' + enable

                    }).success(function (response) {
                        $rootScope.Res = "Data disabled";
                        $rootScope.Notify = "alert-info";
                        $('#divNotifiy').attr('style', 'display: block');
                        $scope.BindList();
                    }).error(function (data, status, headers, config) {
                        // alert("error");
                    });
                } else $scope.Categorys[idx].Islive = true;

            } else {
                if (confirm("Are you sure, enable this record?")) {

                    $http({
                        method: 'GET',
                        url: '/BusinessPartner/DisableData',
                        params: { id: _id, Islive: enable }
                        //?id=' + _id + '&Islive=' + enable
                    }).success(function (response) {
                        $rootScope.Res = "Data enabled";
                        $rootScope.Notify = "alert-info";
                        $('#divNotifiy').attr('style', 'display: block');
                        $scope.BindList();
                    }).error(function (data, status, headers, config) {
                        // alert("error");
                    });
                } else $scope.Categorys[idx].Islive = false;


            }

        };
    });
    app.controller('TypeController', function ($scope, $http, $timeout,$rootScope, DTOptionsBuilder) {

       $timeout(function () {  $('#divNotifiy').attr('style', 'display: none');}, 5000);
        $scope.dtOptions = DTOptionsBuilder.newOptions()
            .withDisplayLength(10)
            .withOption('bLengthChange', true);

      

        $scope.BindList = function () {

            $http({
                method: 'GET',
                url: '/BusinessPartner/GetDataList',
                params :{label:'BP Type'}
            }).success(function (response) {
                $scope.Types = response;
            }).error(function (data, status, headers, config) {
                // alert("error");
            });
        };
        $scope.BindList();
        $scope.reset = function () {

            $scope.form.$setPristine();
        }
        $scope.createData = function () {

            $timeout(function () {  $('#divNotifiy').attr('style', 'display: none');}, 5000);          

            $timeout(function () { $scope.NotifiyRes = false; }, 5000);
            $scope.obj.Label = "BP Type";
            var formData = new FormData();
            formData.append("data", angular.toJson($scope.obj));

            $http({
                url: "/BusinessPartner/InsertData",
                method: "POST",
                headers: { "Content-Type": undefined },
                transformRequest: angular.identity,
                data: formData
            }).success(function (data, status, headers, config) {

                if (data.success === false) {
                 
                }
                else {
                    if (data === false)
                        $rootScope.Res = "Data already exists";
                    else {
                        $rootScope.Res = "Data created successfully";
                        $scope.BindList();
                    }
                    $scope.reset();
                    $scope.obj = null;
                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $('#divNotifiy').attr('style', 'display: block');
                }
            }).error(function (data, status, headers, config) {
               
            });

            // }
        };
        $scope.btnSubmit = true;
        $scope.btnUpdate = false;
        $scope.DataDel = function (_id) {
            if (confirm("Are you sure, delete this record?")) {
                $http({
                    method: 'GET',
                    url: '/BusinessPartner/DelData',
                    params: { id: _id }
                    //?id=' + _id
                }).success(function (response) {
                    $rootScope.Res = "Data deleted";
                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $scope.BindList();
                    $('#divNotifiy').attr('style', 'display: block');
                }).error(function (data, status, headers, config) {
                    // alert("error");
                });
            }
        };
        $scope.DataEdit = function (x, idx) {

            var i = 0;
            angular.forEach($scope.Types, function (lst) {
                $('#mat' + i).attr("style", "");
                i++;
            });
            $('#mat' + idx).attr("style", "background-color:lightblue");

            $scope.obj = {};

            $scope.btnSubmit = false;
            $scope.btnUpdate = true;

            $scope.obj._id = x._id;
            $scope.obj.Code = x.Code;
            $scope.obj.Title = x.Title;


        };
        $scope.updateData = function () {

            //if (!$scope.form.$invalid) { 
            $timeout(function () { $scope.NotifiyRes = false; }, 5000);
            $scope.obj.Label = "BP Type";
            var formData = new FormData();
            formData.append("data", angular.toJson($scope.obj));

            $http({
                url: "/BusinessPartner/InsertData",
                method: "POST",
                headers: { "Content-Type": undefined },
                transformRequest: angular.identity,
                data: formData
            }).success(function (data, status, headers, config) {

                if (data.success === false) {
                
                }
                else {
                    if (data === false)
                        $rootScope.Res = "Data already exists";
                    else {
                        $rootScope.Res = "Data updated successfully";
                        $scope.BindList();
                    }
                    $scope.reset();
                    $scope.obj = null;

                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $('#divNotifiy').attr('style', 'display: block');
                }
            }).error(function (data, status, headers, config) {
               
            });

            $scope.btnSubmit = true;
            $scope.btnUpdate = false;
           
        };
        $scope.ClearFrm = function () {

            $scope.obj = null;
            $scope.btnSubmit = true;
            $scope.btnUpdate = false;
            $scope.reset();
        }
        $scope.DisableData = function (idx, enable, _id) {

            if (enable == false) {

                if (confirm("Are you sure, disable this record?")) {

                    $http({
                        method: 'GET',
                        url: '/BusinessPartner/DisableData',
                        params: { id: _id, Islive: enable }
                        //?id=' + _id + '&Islive=' + enable
                    }).success(function (response) {
                        $rootScope.Res = "Data disabled";
                        $rootScope.Notify = "alert-info";
                        $('#divNotifiy').attr('style', 'display: block');
                        $scope.BindList();
                    }).error(function (data, status, headers, config) {
                        // alert("error");
                    });
                } else $scope.Types[idx].Islive = true;

            } else {
                if (confirm("Are you sure, enable this record?")) {

                    $http({
                        method: 'GET',
                        url: '/BusinessPartner/DisableData',
                        params: { id: _id, Islive: enable }
                    }).success(function (response) {
                        $rootScope.Res = "Data enabled";
                        $rootScope.Notify = "alert-info";
                        $('#divNotifiy').attr('style', 'display: block');
                        $scope.BindList();
                    }).error(function (data, status, headers, config) {
                        // alert("error");
                    });
                } else $scope.Types[idx].Islive = false;


            }

        };
    });
    app.controller('GroupingController', function ($scope, $http, $timeout,$rootScope, DTOptionsBuilder) {

     
        $scope.dtOptions = DTOptionsBuilder.newOptions()
            .withDisplayLength(10)
            .withOption('bLengthChange', true);

        $scope.BindList = function () {

            $http({
                method: 'GET',
                url: '/BusinessPartner/GetDataList',
                params:{label:'BP Grouping'}
            }).success(function (response) {
                $scope.Groupings = response;
            }).error(function (data, status, headers, config) {
                // alert("error");
            });
        };

        $rootScope.NotifiyResclose = function () {
            $('#divNotifiy').attr('style', 'display: none');
        }
        $scope.BindList();
        $scope.reset = function () {

            $scope.form.$setPristine();
        }
        $scope.createData = function () {

            $timeout(function () {  $('#divNotifiy').attr('style', 'display: none');}, 5000);          

            $timeout(function () { $scope.NotifiyRes = false; }, 5000);
            $scope.obj.Label = "BP Grouping";
            var formData = new FormData();
            formData.append("data", angular.toJson($scope.obj));

            $http({
                url: "/BusinessPartner/InsertData",
                method: "POST",
                headers: { "Content-Type": undefined },
                transformRequest: angular.identity,
                data: formData
            }).success(function (data, status, headers, config) {

                if (data.success === false) {
                   
                }
                else {
                    if (data === false)
                        $rootScope.Res = "Data already exists";
                    else {
                        $rootScope.Res = "Data created successfully";
                        $scope.BindList();
                    }
                    $scope.reset();
                    $scope.obj = null;
                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $('#divNotifiy').attr('style', 'display: block');
                }
            }).error(function (data, status, headers, config) {
                
            });

            // }
        };
        $scope.btnSubmit = true;
        $scope.btnUpdate = false;
        $scope.DataDel = function (_id) {
            if (confirm("Are you sure, delete this record?")) {
                $http({
                    method: 'GET',
                    url: '/BusinessPartner/DelData',
                    params : {id: _id}
                }).success(function (response) {
                    $rootScope.Res = "Data deleted";
                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $scope.BindList();
                    $('#divNotifiy').attr('style', 'display: block');
                }).error(function (data, status, headers, config) {
                    // alert("error");
                });
            }
        };
        $scope.DataEdit = function (x, idx) {

            var i = 0;
            angular.forEach($scope.Groupings, function (lst) {
                $('#bas' + i).attr("style", "");
                i++;
            });
            $('#bas' + idx).attr("style", "background-color:lightblue");

            $scope.obj = {};

            $scope.btnSubmit = false;
            $scope.btnUpdate = true;

            $scope.obj._id = x._id;
            $scope.obj.Code = x.Code;
            $scope.obj.Title = x.Title;


        };
        $scope.updateData = function () {

            //if (!$scope.form.$invalid) { 
            $timeout(function () { $scope.NotifiyRes = false; }, 5000);
            $scope.obj.Label = "BP Grouping";
            var formData = new FormData();
            formData.append("data", angular.toJson($scope.obj));

            $http({
                url: "/BusinessPartner/InsertData",
                method: "POST",
                headers: { "Content-Type": undefined },
                transformRequest: angular.identity,
                data: formData
            }).success(function (data, status, headers, config) {

                if (data.success === false) {
                    
                }
                else {
                    if (data === false)
                        $rootScope.Res = "Data already exists";
                    else {
                        $rootScope.Res = "Data updated successfully";
                        $scope.BindList();
                    }
                    $scope.reset();
                    $scope.obj = null;
                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $('#divNotifiy').attr('style', 'display: block');
                }
            }).error(function (data, status, headers, config) {
              
            });

            $scope.btnSubmit = true;
            $scope.btnUpdate = false;
           
        };
        $scope.ClearFrm = function () {

            $scope.obj = null;
            $scope.btnSubmit = true;
            $scope.btnUpdate = false;
            $scope.reset();
        }
        $scope.DisableData = function (idx, enable, _id) {

            if (enable == false) {

                if (confirm("Are you sure, disable this record?")) {

                    $http({
                        method: 'GET',
                        url: '/BusinessPartner/DisableData',
                        params : {id:_id,Islive:enable}
                        //?id=' + _id + '&Islive=' + enable
                    }).success(function (response) {
                        $rootScope.Res = "Data disabled";
                        $rootScope.Notify = "alert-info";
                        $('#divNotifiy').attr('style', 'display: block');
                        $scope.BindList();
                    }).error(function (data, status, headers, config) {
                        // alert("error");
                    });
                } else $scope.Groupings[idx].Islive = true;

            } else {
                if (confirm("Are you sure, enable this record?")) {

                    $http({
                        method: 'GET',
                        url: '/BusinessPartner/DisableData',
                        params : {id:_id,Islive:enable}
                    }).success(function (response) {
                        $rootScope.Res = "Data enabled";
                        $rootScope.Notify = "alert-info";
                        $('#divNotifiy').attr('style', 'display: block');
                        $scope.BindList();
                    }).error(function (data, status, headers, config) {
                        // alert("error");
                    });
                } else $scope.Groupings[idx].Islive = false;


            }

        };
    });
    app.controller('KeyController', function ($scope, $http, $timeout,$rootScope, DTOptionsBuilder) {

     
        $scope.dtOptions = DTOptionsBuilder.newOptions()
            .withDisplayLength(10)
            .withOption('bLengthChange', true);
        $rootScope.NotifiyResclose = function () {
            $('#divNotifiy').attr('style', 'display: none');
        }
        $scope.BindList = function () {

            $http({
                method: 'GET',
                url: '/BusinessPartner/GetDataList',
                params :{label:'BP Key'}
            }).success(function (response) {
                $scope.Keys = response;
            }).error(function (data, status, headers, config) {
                // alert("error");
            });
        };
        $scope.BindList();
        $scope.reset = function () {

            $scope.form.$setPristine();
        }
        $scope.createData = function () {

            $timeout(function () {  $('#divNotifiy').attr('style', 'display: none');}, 5000);          

            $timeout(function () { $scope.NotifiyRes = false; }, 5000);
            $scope.obj.Label = "BP Key";
            var formData = new FormData();
            formData.append("data", angular.toJson($scope.obj));

            $http({
                url: "/BusinessPartner/InsertData",
                method: "POST",
                headers: { "Content-Type": undefined },
                transformRequest: angular.identity,
                data: formData
            }).success(function (data, status, headers, config) {

                if (data.success === false) {
                   
                }
                else {
                    if (data === false)
                        $rootScope.Res = "Data already exists";
                    else {
                        $rootScope.Res = "Data created successfully";
                        $scope.BindList();
                    }
                    $scope.reset();
                    $scope.obj = null;
                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $('#divNotifiy').attr('style', 'display: block');
                }
            }).error(function (data, status, headers, config) {
                
            });

            // }
        };
        $scope.btnSubmit = true;
        $scope.btnUpdate = false;
        $scope.DataDel = function (_id) {
            if (confirm("Are you sure, delete this record?")) {
                $http({
                    method: 'GET',
                    url: '/BusinessPartner/DelData',
                    params :{id: _id}
                }).success(function (response) {
                    $rootScope.Res = "Data deleted";
                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $scope.BindList();
                    $('#divNotifiy').attr('style', 'display: block');
                }).error(function (data, status, headers, config) {
                    // alert("error");
                });
            }
        };
        $scope.DataEdit = function (x, idx) {

            var i = 0;
            angular.forEach($scope.Keys, function (lst) {
                $('#unt' + i).attr("style", "");
                i++;
            });
            $('#unt' + idx).attr("style", "background-color:lightblue");

            $scope.obj = {};

            $scope.btnSubmit = false;
            $scope.btnUpdate = true;

            $scope.obj._id = x._id;
            $scope.obj.Code = x.Code;
            $scope.obj.Title = x.Title;


        };
        $scope.updateData = function () {

            //if (!$scope.form.$invalid) { 
            $timeout(function () { $scope.NotifiyRes = false; }, 5000);
            $scope.obj.Label = "BP Key";
            var formData = new FormData();
            formData.append("data", angular.toJson($scope.obj));

            $http({
                url: "/BusinessPartner/InsertData",
                method: "POST",
                headers: { "Content-Type": undefined },
                transformRequest: angular.identity,
                data: formData
            }).success(function (data, status, headers, config) {

                if (data.success === false) {
                
                }
                else {
                    if (data === false)
                        $rootScope.Res = "Data already exists";
                    else {
                        $rootScope.Res = "Data updated successfully";
                        $scope.BindList();
                    }
                    $scope.reset();
                    $scope.obj = null;
                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $('#divNotifiy').attr('style', 'display: block');
                }
            }).error(function (data, status, headers, config) {
               
            });
            $scope.btnSubmit = true;
            $scope.btnUpdate = false;
        };
        $scope.ClearFrm = function () {

            $scope.obj = null;
            $scope.btnSubmit = true;
            $scope.btnUpdate = false;
            $scope.reset();
        }
        $scope.DisableData = function (idx, enable, _id) {

            if (enable == false) {

                if (confirm("Are you sure, disable this record?")) {

                    $http({
                        method: 'GET',
                        url: '/BusinessPartner/DisableData',
                        params:{id:_id ,Islive: enable}
                    }).success(function (response) {
                        $rootScope.Res = "Data disabled";
                        $rootScope.Notify = "alert-info";
                        $('#divNotifiy').attr('style', 'display: block');
                        $scope.BindList();
                    }).error(function (data, status, headers, config) {
                        // alert("error");
                    });
                } else $scope.Keys[idx].Islive = true;

            } else {
                if (confirm("Are you sure, enable this record?")) {

                    $http({
                        method: 'GET',
                        url: '/BusinessPartner/DisableData',
                        params:{id:_id ,Islive: enable}
                    }).success(function (response) {
                        $rootScope.Res = "Data enabled";
                        $rootScope.Notify = "alert-info";
                        $('#divNotifiy').attr('style', 'display: block');
                        $scope.BindList();
                    }).error(function (data, status, headers, config) {
                        // alert("error");
                    });
                } else $scope.Keys[idx].Islive = false;


            }

        };
    });
    app.controller('CountryController', function ($scope, $http, $timeout,$rootScope, DTOptionsBuilder) {

       $timeout(function () {  $('#divNotifiy').attr('style', 'display: none');}, 5000);
        $scope.dtOptions = DTOptionsBuilder.newOptions()
            .withDisplayLength(10)
            .withOption('bLengthChange', true);

        $scope.BindList = function () {

            $http({
                method: 'GET',
                url: '/BusinessPartner/GetDataList',
                params :{label:'Country'}
            }).success(function (response) {
                $scope.Countrys = response;
            }).error(function (data, status, headers, config) {
                // alert("error");
            });
        };

        $rootScope.NotifiyResclose = function () {
            $('#divNotifiy').attr('style', 'display: none');
        }

        $scope.BindList();
        $scope.reset = function () {

            $scope.form.$setPristine();
        }
        $scope.createData = function () {

            $timeout(function () {  $('#divNotifiy').attr('style', 'display: none');}, 5000);          

            $timeout(function () { $scope.NotifiyRes = false; },5000);
            $scope.obj.Label = "Country";
            var formData = new FormData();
            formData.append("data", angular.toJson($scope.obj));

            $http({
                url: "/BusinessPartner/InsertData",
                method: "POST",
                headers: { "Content-Type": undefined },
                transformRequest: angular.identity,
                data: formData
            }).success(function (data, status, headers, config) {

                if (data.success === false) {
                  
                }
                else {
                    if (data === false)
                        $rootScope.Res = "Data already exists";
                    else {
                        $rootScope.Res = "Data created successfully";
                        $scope.BindList();
                    }
                    $scope.reset();
                    $scope.obj = null;
                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $('#divNotifiy').attr('style', 'display: block');
                }
            }).error(function (data, status, headers, config) {
               
            });

            // }
        };
        $scope.btnSubmit = true;
        $scope.btnUpdate = false;
        $scope.DataDel = function (_id) {
            if (confirm("Are you sure, delete this record?")) {
                $http({
                    method: 'GET',
                    url: '/BusinessPartner/DelData',
                    params :{id: _id}
                }).success(function (response) {
                    $rootScope.Res = "Data deleted";
                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $scope.BindList();
                    $('#divNotifiy').attr('style', 'display: block');
                }).error(function (data, status, headers, config) {
                    // alert("error");
                });
            }
        };
        $scope.DataEdit = function (x, idx) {

            var i = 0;
            angular.forEach($scope.Countrys, function (lst) {
                $('#alt' + i).attr("style", "");
                i++;
            });
            $('#alt' + idx).attr("style", "background-color:lightblue");

            $scope.obj = {};

            $scope.btnSubmit = false;
            $scope.btnUpdate = true;

            $scope.obj._id = x._id;
            $scope.obj.Code = x.Code;
            $scope.obj.Title = x.Title;


        };
        $scope.updateData = function () {

            //if (!$scope.form.$invalid) { 
            $timeout(function () { $scope.NotifiyRes = false; }, 5000);
            $scope.obj.Label = "Country";
            var formData = new FormData();
            formData.append("data", angular.toJson($scope.obj));

            $http({
                url: "/BusinessPartner/InsertData",
                method: "POST",
                headers: { "Content-Type": undefined },
                transformRequest: angular.identity,
                data: formData
            }).success(function (data, status, headers, config) {

                if (data.success === false) {
                   
                }
                else {
                    if (data === false)
                        $rootScope.Res = "Data already exists";
                    else {
                        $rootScope.Res = "Data updated successfully";
                        $scope.BindList();
                    }
                    $scope.reset();
                    $scope.obj = null;

                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $('#divNotifiy').attr('style', 'display: block');
                }
            }).error(function (data, status, headers, config) {
               
            });

            $scope.btnSubmit = true;
            $scope.btnUpdate = false;
            // }

        };
        $scope.ClearFrm = function () {

            $scope.obj = null;
            $scope.btnSubmit = true;
            $scope.btnUpdate = false;
            $scope.reset();
        }
        $scope.DisableData = function (idx, enable, _id) {

            if (enable == false) {

                if (confirm("Are you sure, disable this record?")) {

                    $http({
                        method: 'GET',
                        url: '/BusinessPartner/DisableData',
                        params: { id: _id, Islive: enable }
                    }).success(function (response) {
                        $rootScope.Res = "Data disabled";
                        $rootScope.Notify = "alert-info";
                        $('#divNotifiy').attr('style', 'display: block');
                        $scope.BindList();
                    }).error(function (data, status, headers, config) {
                        // alert("error");
                    });
                } else $scope.Countrys[idx].Islive = true;

            } else {
                if (confirm("Are you sure, enable this record?")) {

                    $http({
                        method: 'GET',
                        url: '/BusinessPartner/DisableData',
                        params:{id:_id ,Islive: enable}
                    }).success(function (response) {
                        $rootScope.Res = "Data enabled";
                        $rootScope.Notify = "alert-info";
                        $('#divNotifiy').attr('style', 'display: block');
                        $scope.BindList();
                    }).error(function (data, status, headers, config) {
                        // alert("error");
                    });
                } else $scope.Countrys[idx].Islive = false;


            }

        };
    });
    app.controller('LanguageController', function ($scope, $http, $timeout,$rootScope, DTOptionsBuilder) {

  
        $scope.dtOptions = DTOptionsBuilder.newOptions()
            .withDisplayLength(10)
            .withOption('bLengthChange', true);

        $scope.BindList = function () {

            $http({
                method: 'GET',
                url: '/BusinessPartner/GetDataList',
                params: { label: 'Language' }
            }).success(function (response) {
                $scope.languages = response;
            }).error(function (data, status, headers, config) {
                // alert("error");
            });
        };
        $scope.BindList();

        $rootScope.NotifiyResclose = function () {
            $('#divNotifiy').attr('style', 'display: none');
        }

        $scope.reset = function () {

            $scope.form.$setPristine();
        }
        $scope.createData = function () {

            $timeout(function () {  $('#divNotifiy').attr('style', 'display: none');}, 5000);          

            $timeout(function () { $scope.NotifiyRes = false; }, 5000);
            $scope.obj.Label = "Language";
            var formData = new FormData();
            formData.append("data", angular.toJson($scope.obj));

            $http({
                url: "/BusinessPartner/InsertData",
                method: "POST",
                headers: { "Content-Type": undefined },
                transformRequest: angular.identity,
                data: formData
            }).success(function (data, status, headers, config) {

                if (data.success === false) {
                 
                }
                else {
                    if (data === false)
                        $rootScope.Res = "Data already exists";
                    else {
                        $rootScope.Res = "Data created successfully";
                        $scope.BindList();
                    }
                    $scope.reset();
                    $scope.obj = null;
                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $('#divNotifiy').attr('style', 'display: block');
                }
            }).error(function (data, status, headers, config) {
                
            });

            // }
        };
        $scope.btnSubmit = true;
        $scope.btnUpdate = false;
        $scope.DataDel = function (_id) {
            if (confirm("Are you sure, delete this record?")) {
                $http({
                    method: 'GET',
                    url: '/BusinessPartner/DelData',
                    params :{id: _id}
                }).success(function (response) {
                    $rootScope.Res = "Data deleted";
                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $scope.BindList();
                    $('#divNotifiy').attr('style', 'display: block');
                }).error(function (data, status, headers, config) {
                    // alert("error");
                });
            }
        };
        $scope.DataEdit = function (x, idx) {

            var i = 0;
            angular.forEach($scope.languages, function (lst) {
                $('#inst' + i).attr("style", "");
                i++;
            });
            $('#inst' + idx).attr("style", "background-color:lightblue");

            $scope.obj = {};

            $scope.btnSubmit = false;
            $scope.btnUpdate = true;

            $scope.obj._id = x._id;
            $scope.obj.Code = x.Code;
            $scope.obj.Title = x.Title;


        };
        $scope.updateData = function () {

            //if (!$scope.form.$invalid) { 
            $timeout(function () { $scope.NotifiyRes = false; }, 5000);
            $scope.obj.Label = "Languages";
            var formData = new FormData();
            formData.append("data", angular.toJson($scope.obj));

            $http({
                url: "/BusinessPartner/InsertData",
                method: "POST",
                headers: { "Content-Type": undefined },
                transformRequest: angular.identity,
                data: formData
            }).success(function (data, status, headers, config) {

                if (data.success === false) {
                   
                }
                else {
                    if (data === false)
                        $rootScope.Res = "Data already exists";
                    else {
                        $rootScope.Res = "Data updated successfully";
                        $scope.BindList();
                    }
                    $scope.reset();
                    $scope.obj = null;

                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $('#divNotifiy').attr('style', 'display: block');
                }
            }).error(function (data, status, headers, config) {
                
            });

            $scope.btnSubmit = true;
            $scope.btnUpdate = false;
            // }

        };
        $scope.ClearFrm = function () {

            $scope.obj = null;
            $scope.btnSubmit = true;
            $scope.btnUpdate = false;
            $scope.reset();
        }
        $scope.DisableData = function (idx, enable, _id) {

            if (enable == false) {

                if (confirm("Are you sure, disable this record?")) {

                    $http({
                        method: 'GET',
                        url: '/BusinessPartner/DisableData',
                        params: { id: _id, Islive: enable }
                    }).success(function (response) {
                        $rootScope.Res = "Data disabled";
                        $rootScope.Notify = "alert-info";
                        $('#divNotifiy').attr('style', 'display: block');
                        $scope.BindList();
                    }).error(function (data, status, headers, config) {
                        // alert("error");
                    });
                } else $scope.languages[idx].Islive = true;

            } else {
                if (confirm("Are you sure, enable this record?")) {

                    $http({
                        method: 'GET',
                        url: '/BusinessPartner/DisableData',
                        params: { id: _id, Islive: enable }
                    }).success(function (response) {
                        $rootScope.Res = "Data enabled";
                        $rootScope.Notify = "alert-info";
                        $('#divNotifiy').attr('style', 'display: block');
                        $scope.BindList();
                    }).error(function (data, status, headers, config) {
                        // alert("error");
                    });
                } else $scope.languages[idx].Islive = false;


            }

        };
    });
      
    //Cust
    app.controller('CompanycodeController', function ($scope, $http, $timeout, $rootScope, DTOptionsBuilder) {


        $scope.dtOptions = DTOptionsBuilder.newOptions()
           .withDisplayLength(10)
           .withOption('bLengthChange', true);

        $rootScope.NotifiyResclose = function () {
            $('#divNotifiy').attr('style', 'display: none');
        }

        $scope.BindList = function () {

            $http({
                method: 'GET',
                url: '/BusinessPartner/GetDataList',
                params: { label: 'Company Code' },
            }).success(function (response) {
                $scope.CompanyCodes = response;
            }).error(function (data, status, headers, config) {
                // alert("error");
            });
        };
        $scope.BindList();
        $scope.reset = function () {

            $scope.form.$setPristine();
        }
        $scope.createData = function () {

            $timeout(function () { $('#divNotifiy').attr('style', 'display: none'); }, 5000);

            $scope.obj.Label = "Company Code";
            var formData = new FormData();
            formData.append("data", angular.toJson($scope.obj));

            $http({
                url: "/BusinessPartner/InsertData",
                method: "POST",
                headers: { "Content-Type": undefined },
                transformRequest: angular.identity,
                data: formData
            }).success(function (data, status, headers, config) {

                if (data.success === false) {

                }
                else {
                    if (data === false)
                        $rootScope.Res = "Data already exists";
                    else {
                        $rootScope.Res = "Data created successfully";
                        $scope.BindList();
                    }
                    $scope.reset();
                    $scope.obj = null;

                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $('#divNotifiy').attr('style', 'display: block');
                }
            }).error(function (data, status, headers, config) {

            });

            // }
        };
        $scope.btnSubmit = true;
        $scope.btnUpdate = false;
        $scope.DataDel = function (_id) {
            if (confirm("Are you sure, delete this record?")) {
                $http({
                    method: 'GET',
                    url: '/BusinessPartner/DelData',
                    params: { id: _id }
                    //?id=' + _id
                }).success(function (response) {
                    $rootScope.Res = "Data deleted";
                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $scope.BindList();
                    $('#divNotifiy').attr('style', 'display: block');
                }).error(function (data, status, headers, config) {
                    // alert("error");
                });
            }
        };
        $scope.DataEdit = function (x, idx) {

            var i = 0;
            angular.forEach($scope.CompanyCodes, function (lst) {
                $('#inds' + i).attr("style", "");
                i++;
            });
            $('#inds' + idx).attr("style", "background-color:lightblue");
            $scope.obj = {};
            $scope.btnSubmit = false;
            $scope.btnUpdate = true;
            $scope.obj._id = x._id;
            $scope.obj.Code = x.Code;
            $scope.obj.Title = x.Title;
        };
        $scope.updateData = function () {

            //if (!$scope.form.$invalid) { 
            $timeout(function () { $scope.NotifiyRes = false; }, 5000);
            $scope.obj.Label = "Company Code";
            var formData = new FormData();
            formData.append("data", angular.toJson($scope.obj));

            $http({
                url: "/BusinessPartner/InsertData",
                method: "POST",
                headers: { "Content-Type": undefined },
                transformRequest: angular.identity,
                data: formData
            }).success(function (data, status, headers, config) {

                if (data.success === false) {

                }
                else {
                    if (data === false)
                        $rootScope.Res = "Data already exists";
                    else {
                        $rootScope.Res = "Data updated successfully";
                        $scope.BindList();
                    }
                    $scope.reset();
                    $scope.obj = null;
                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $('#divNotifiy').attr('style', 'display: block');
                }
            }).error(function (data, status, headers, config) {

            });
            $scope.btnSubmit = true;
            $scope.btnUpdate = false;
        };
        $scope.ClearFrm = function () {

            $scope.obj = null;
            $scope.btnSubmit = true;
            $scope.btnUpdate = false;
            $scope.reset();
        }
        $scope.DisableData = function (idx, enable, _id) {

            if (enable == false) {

                if (confirm("Are you sure, disable this record?")) {

                    $http({
                        method: 'GET',
                        url: '/BusinessPartner/DisableData',
                        params: { id: _id, Islive: enable }
                        //?id=' + _id + '&Islive=' + enable

                    }).success(function (response) {
                        $rootScope.Res = "Data disabled";
                        $rootScope.Notify = "alert-info";
                        $('#divNotifiy').attr('style', 'display: block');
                        $scope.BindList();
                    }).error(function (data, status, headers, config) {
                        // alert("error");
                    });
                } else $scope.CompanyCodes[idx].Islive = true;

            } else {
                if (confirm("Are you sure, enable this record?")) {

                    $http({
                        method: 'GET',
                        url: '/BusinessPartner/DisableData',
                        params: { id: _id, Islive: enable }
                        //?id=' + _id + '&Islive=' + enable
                    }).success(function (response) {
                        $rootScope.Res = "Data enabled";
                        $rootScope.Notify = "alert-info";
                        $('#divNotifiy').attr('style', 'display: block');
                        $scope.BindList();
                    }).error(function (data, status, headers, config) {
                        // alert("error");
                    });
                } else $scope.CompanyCodes[idx].Islive = false;


            }

        };
    });
    app.controller('CCAController', function ($scope, $http, $timeout, $rootScope, DTOptionsBuilder) {

        $timeout(function () { $('#divNotifiy').attr('style', 'display: none'); }, 5000);
        $scope.dtOptions = DTOptionsBuilder.newOptions()
            .withDisplayLength(10)
            .withOption('bLengthChange', true);

        $scope.BindList = function () {

            $http({
                method: 'GET',
                url: '/BusinessPartner/GetDataList',
                params: { label: 'Creditcontrolarea' }
            }).success(function (response) {
                $scope.Creditcontrolareas = response;
            }).error(function (data, status, headers, config) {
                // alert("error");
            });
        };
        $scope.BindList();
        $scope.reset = function () {

            $scope.form.$setPristine();
        }
        $scope.createData = function () {

            $timeout(function () { $('#divNotifiy').attr('style', 'display: none'); }, 5000);
            $scope.obj.Label = "Creditcontrolarea";
            var formData = new FormData();
            formData.append("data", angular.toJson($scope.obj));

            $http({
                url: "/BusinessPartner/InsertData",
                method: "POST",
                headers: { "Content-Type": undefined },
                transformRequest: angular.identity,
                data: formData
            }).success(function (data, status, headers, config) {

                if (data.success === false) {

                }
                else {
                    if (data === false)
                        $rootScope.Res = "Data already exists";
                    else {
                        $rootScope.Res = "Data created successfully";
                        $scope.BindList();
                    }
                    $scope.reset();
                    $scope.obj = null;
                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $('#divNotifiy').attr('style', 'display: block');
                }
            }).error(function (data, status, headers, config) {

            });

            // }
        };
        $scope.btnSubmit = true;
        $scope.btnUpdate = false;
        $scope.DataDel = function (_id) {
            if (confirm("Are you sure, delete this record?")) {
                $http({
                    method: 'GET',
                    url: '/BusinessPartner/DelData',
                    params: { id: _id }
                    //?id=' + _id
                }).success(function (response) {
                    $rootScope.Res = "Data deleted";
                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $scope.BindList();
                    $('#divNotifiy').attr('style', 'display: block');
                }).error(function (data, status, headers, config) {
                    // alert("error");
                });
            }
        };
        $scope.DataEdit = function (x, idx) {

            var i = 0;
            angular.forEach($scope.Types, function (lst) {
                $('#mat' + i).attr("style", "");
                i++;
            });
            $('#mat' + idx).attr("style", "background-color:lightblue");

            $scope.obj = {};

            $scope.btnSubmit = false;
            $scope.btnUpdate = true;

            $scope.obj._id = x._id;
            $scope.obj.Code = x.Code;
            $scope.obj.Title = x.Title;


        };
        $scope.updateData = function () {

            //if (!$scope.form.$invalid) { 
            $timeout(function () { $scope.NotifiyRes = false; }, 5000);
            $scope.obj.Label = "Creditcontrolarea";
            var formData = new FormData();
            formData.append("data", angular.toJson($scope.obj));

            $http({
                url: "/BusinessPartner/InsertData",
                method: "POST",
                headers: { "Content-Type": undefined },
                transformRequest: angular.identity,
                data: formData
            }).success(function (data, status, headers, config) {

                if (data.success === false) {

                }
                else {
                    if (data === false)
                        $rootScope.Res = "Data already exists";
                    else {
                        $rootScope.Res = "Data updated successfully";
                        $scope.BindList();
                    }
                    $scope.reset();
                    $scope.obj = null;

                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $('#divNotifiy').attr('style', 'display: block');
                }
            }).error(function (data, status, headers, config) {

            });

            $scope.btnSubmit = true;
            $scope.btnUpdate = false;

        };
        $scope.ClearFrm = function () {

            $scope.obj = null;
            $scope.btnSubmit = true;
            $scope.btnUpdate = false;
            $scope.reset();
        }
        $scope.DisableData = function (idx, enable, _id) {

            if (enable == false) {

                if (confirm("Are you sure, disable this record?")) {

                    $http({
                        method: 'GET',
                        url: '/BusinessPartner/DisableData',
                        params: { id: _id, Islive: enable }
                        //?id=' + _id + '&Islive=' + enable
                    }).success(function (response) {
                        $rootScope.Res = "Data disabled";
                        $rootScope.Notify = "alert-info";
                        $('#divNotifiy').attr('style', 'display: block');
                        $scope.BindList();
                    }).error(function (data, status, headers, config) {
                        // alert("error");
                    });
                } else $scope.Creditcontrolareas[idx].Islive = true;

            } else {
                if (confirm("Are you sure, enable this record?")) {

                    $http({
                        method: 'GET',
                        url: '/BusinessPartner/DisableData',
                        params: { id: _id, Islive: enable }
                    }).success(function (response) {
                        $rootScope.Res = "Data enabled";
                        $rootScope.Notify = "alert-info";
                        $('#divNotifiy').attr('style', 'display: block');
                        $scope.BindList();
                    }).error(function (data, status, headers, config) {
                        // alert("error");
                    });
                } else $scope.Creditcontrolareas[idx].Islive = false;


            }

        };
    });
    app.controller('IncoController', function ($scope, $http, $timeout, $rootScope, DTOptionsBuilder) {


        $scope.dtOptions = DTOptionsBuilder.newOptions()
           .withDisplayLength(10)
           .withOption('bLengthChange', true);

        $rootScope.NotifiyResclose = function () {
            $('#divNotifiy').attr('style', 'display: none');
        }

        $scope.BindList = function () {

            $http({
                method: 'GET',
                url: '/BusinessPartner/GetDataList',
                
                params: { label: 'Inco Terms' },
            }).success(function (response) {
                $scope.IncoTerms = response;
            }).error(function (data, status, headers, config) {
                // alert("error");
            });
        };
        $scope.BindList();
        $scope.reset = function () {

            $scope.form.$setPristine();
        }
        $scope.createData = function () {

            $timeout(function () { $('#divNotifiy').attr('style', 'display: none'); }, 5000);

            $scope.obj.Label = "Inco Terms";
            var formData = new FormData();
            formData.append("data", angular.toJson($scope.obj));

            $http({
                url: "/BusinessPartner/InsertData",
                method: "POST",
                headers: { "Content-Type": undefined },
                transformRequest: angular.identity,
                data: formData
            }).success(function (data, status, headers, config) {

                if (data.success === false) {

                }
                else {
                    if (data === false)
                        $rootScope.Res = "Data already exists";
                    else {
                        $rootScope.Res = "Data created successfully";
                        $scope.BindList();
                    }
                    $scope.reset();
                    $scope.obj = null;

                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $('#divNotifiy').attr('style', 'display: block');
                }
            }).error(function (data, status, headers, config) {

            });

            // }
        };
        $scope.btnSubmit = true;
        $scope.btnUpdate = false;
        $scope.DataDel = function (_id) {
            if (confirm("Are you sure, delete this record?")) {
                $http({
                    method: 'GET',
                    url: '/BusinessPartner/DelData',
                    params: { id: _id }
                    //?id=' + _id
                }).success(function (response) {
                    $rootScope.Res = "Data deleted";
                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $scope.BindList();
                    $('#divNotifiy').attr('style', 'display: block');
                }).error(function (data, status, headers, config) {
                    // alert("error");
                });
            }
        };
        $scope.DataEdit = function (x, idx) {

            var i = 0;
            angular.forEach($scope.cust, function (lst) {
                $('#inds' + i).attr("style", "");
                i++;
            });
            $('#inds' + idx).attr("style", "background-color:lightblue");
            $scope.obj = {};
            $scope.btnSubmit = false;
            $scope.btnUpdate = true;
            $scope.obj._id = x._id;
            $scope.obj.Code = x.Code;
            $scope.obj.Title = x.Title;
        };
        $scope.updateData = function () {

            //if (!$scope.form.$invalid) { 
            $timeout(function () { $scope.NotifiyRes = false; }, 5000);
            $scope.obj.Label = "Inco Terms";
            var formData = new FormData();
            formData.append("data", angular.toJson($scope.obj));

            $http({
                url: "/BusinessPartner/InsertData",
                method: "POST",
                headers: { "Content-Type": undefined },
                transformRequest: angular.identity,
                data: formData
            }).success(function (data, status, headers, config) {

                if (data.success === false) {

                }
                else {
                    if (data === false)
                        $rootScope.Res = "Data already exists";
                    else {
                        $rootScope.Res = "Data updated successfully";
                        $scope.BindList();
                    }
                    $scope.reset();
                    $scope.obj = null;
                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $('#divNotifiy').attr('style', 'display: block');
                }
            }).error(function (data, status, headers, config) {

            });
            $scope.btnSubmit = true;
            $scope.btnUpdate = false;
        };
        $scope.ClearFrm = function () {

            $scope.obj = null;
            $scope.btnSubmit = true;
            $scope.btnUpdate = false;
            $scope.reset();
        }
        $scope.DisableData = function (idx, enable, _id) {

            if (enable == false) {

                if (confirm("Are you sure, disable this record?")) {

                    $http({
                        method: 'GET',
                        url: '/BusinessPartner/DisableData',
                        params: { id: _id, Islive: enable }
                        //?id=' + _id + '&Islive=' + enable

                    }).success(function (response) {
                        $rootScope.Res = "Data disabled";
                        $rootScope.Notify = "alert-info";
                        $('#divNotifiy').attr('style', 'display: block');
                        $scope.BindList();
                    }).error(function (data, status, headers, config) {
                        // alert("error");
                    });
                } else $scope.IncoTerms[idx].Islive = true;

            } else {
                if (confirm("Are you sure, enable this record?")) {

                    $http({
                        method: 'GET',
                        url: '/BusinessPartner/DisableData',
                        params: { id: _id, Islive: enable }
                        //?id=' + _id + '&Islive=' + enable
                    }).success(function (response) {
                        $rootScope.Res = "Data enabled";
                        $rootScope.Notify = "alert-info";
                        $('#divNotifiy').attr('style', 'display: block');
                        $scope.BindList();
                    }).error(function (data, status, headers, config) {
                        // alert("error");
                    });
                } else $scope.IncoTerms[idx].Islive = false;


            }

        };
    });
    app.controller('paytermsController', function ($scope, $http, $timeout, $rootScope, DTOptionsBuilder) {

        $timeout(function () { $('#divNotifiy').attr('style', 'display: none'); }, 5000);
        $scope.dtOptions = DTOptionsBuilder.newOptions()
            .withDisplayLength(10)
            .withOption('bLengthChange', true);

        $scope.BindList = function () {

            $http({
                method: 'GET',
                url: '/BusinessPartner/GetDataList',
                params: { label: 'Payterm' }
            }).success(function (response) {
                $scope.Payterms = response;
            }).error(function (data, status, headers, config) {
                // alert("error");
            });
        };
        $scope.BindList();
        $scope.reset = function () {

            $scope.form.$setPristine();
        }
        $scope.createData = function () {

            $timeout(function () { $('#divNotifiy').attr('style', 'display: none'); }, 5000);
            $scope.obj.Label = "Payterm";
            var formData = new FormData();
            formData.append("data", angular.toJson($scope.obj));

            $http({
                url: "/BusinessPartner/InsertData",
                method: "POST",
                headers: { "Content-Type": undefined },
                transformRequest: angular.identity,
                data: formData
            }).success(function (data, status, headers, config) {

                if (data.success === false) {

                }
                else {
                    if (data === false)
                        $rootScope.Res = "Data already exists";
                    else {
                        $rootScope.Res = "Data created successfully";
                        $scope.BindList();
                    }
                    $scope.reset();
                    $scope.obj = null;
                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $('#divNotifiy').attr('style', 'display: block');
                }
            }).error(function (data, status, headers, config) {

            });

            // }
        };
        $scope.btnSubmit = true;
        $scope.btnUpdate = false;
        $scope.DataDel = function (_id) {
            if (confirm("Are you sure, delete this record?")) {
                $http({
                    method: 'GET',
                    url: '/BusinessPartner/DelData',
                    params: { id: _id }
                    //?id=' + _id
                }).success(function (response) {
                    $rootScope.Res = "Data deleted";
                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $scope.BindList();
                    $('#divNotifiy').attr('style', 'display: block');
                }).error(function (data, status, headers, config) {
                    // alert("error");
                });
            }
        };
        $scope.DataEdit = function (x, idx) {

            var i = 0;
            angular.forEach($scope.Types, function (lst) {
                $('#mat' + i).attr("style", "");
                i++;
            });
            $('#mat' + idx).attr("style", "background-color:lightblue");

            $scope.obj = {};

            $scope.btnSubmit = false;
            $scope.btnUpdate = true;

            $scope.obj._id = x._id;
            $scope.obj.Code = x.Code;
            $scope.obj.Title = x.Title;


        };
        $scope.updateData = function () {

            //if (!$scope.form.$invalid) { 
            $timeout(function () { $scope.NotifiyRes = false; }, 5000);
            $scope.obj.Label = "Payterm";
            var formData = new FormData();
            formData.append("data", angular.toJson($scope.obj));

            $http({
                url: "/BusinessPartner/InsertData",
                method: "POST",
                headers: { "Content-Type": undefined },
                transformRequest: angular.identity,
                data: formData
            }).success(function (data, status, headers, config) {

                if (data.success === false) {

                }
                else {
                    if (data === false)
                        $rootScope.Res = "Data already exists";
                    else {
                        $rootScope.Res = "Data updated successfully";
                        $scope.BindList();
                    }
                    $scope.reset();
                    $scope.obj = null;

                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $('#divNotifiy').attr('style', 'display: block');
                }
            }).error(function (data, status, headers, config) {

            });

            $scope.btnSubmit = true;
            $scope.btnUpdate = false;

        };
        $scope.ClearFrm = function () {

            $scope.obj = null;
            $scope.btnSubmit = true;
            $scope.btnUpdate = false;
            $scope.reset();
        }
        $scope.DisableData = function (idx, enable, _id) {

            if (enable == false) {

                if (confirm("Are you sure, disable this record?")) {

                    $http({
                        method: 'GET',
                        url: '/BusinessPartner/DisableData',
                        params: { id: _id, Islive: enable }
                        //?id=' + _id + '&Islive=' + enable
                    }).success(function (response) {
                        $rootScope.Res = "Data disabled";
                        $rootScope.Notify = "alert-info";
                        $('#divNotifiy').attr('style', 'display: block');
                        $scope.BindList();
                    }).error(function (data, status, headers, config) {
                        // alert("error");
                    });
                } else $scope.Payterms[idx].Islive = true;

            } else {
                if (confirm("Are you sure, enable this record?")) {

                    $http({
                        method: 'GET',
                        url: '/BusinessPartner/DisableData',
                        params: { id: _id, Islive: enable }
                    }).success(function (response) {
                        $rootScope.Res = "Data enabled";
                        $rootScope.Notify = "alert-info";
                        $('#divNotifiy').attr('style', 'display: block');
                        $scope.BindList();
                    }).error(function (data, status, headers, config) {
                        // alert("error");
                    });
                } else $scope.Payterms[idx].Islive = false;


            }

        };
    });
    app.controller('CustCurController', function ($scope, $http, $timeout, $rootScope, DTOptionsBuilder) {


        $scope.dtOptions = DTOptionsBuilder.newOptions()
           .withDisplayLength(10)
           .withOption('bLengthChange', true);

        $rootScope.NotifiyResclose = function () {
            $('#divNotifiy').attr('style', 'display: none');
        }

        $scope.BindList = function () {

            $http({
                method: 'GET',
                url: '/BusinessPartner/GetDataList',
                params: { label: 'CustCur' },
            }).success(function (response) {
                $scope.custs = response;
            }).error(function (data, status, headers, config) {
                // alert("error");
            });
        };
        $scope.BindList();
        $scope.reset = function () {

            $scope.form.$setPristine();
        }
        $scope.createData = function () {

            $timeout(function () { $('#divNotifiy').attr('style', 'display: none'); }, 5000);

            $scope.obj.Label = "CustCur";
            var formData = new FormData();
            formData.append("data", angular.toJson($scope.obj));

            $http({
                url: "/BusinessPartner/InsertData",
                method: "POST",
                headers: { "Content-Type": undefined },
                transformRequest: angular.identity,
                data: formData
            }).success(function (data, status, headers, config) {

                if (data.success === false) {

                }
                else {
                    if (data === false)
                        $rootScope.Res = "Data already exists";
                    else {
                        $rootScope.Res = "Data created successfully";
                        $scope.BindList();
                    }
                    $scope.reset();
                    $scope.obj = null;

                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $('#divNotifiy').attr('style', 'display: block');
                }
            }).error(function (data, status, headers, config) {

            });

            // }
        };
        $scope.btnSubmit = true;
        $scope.btnUpdate = false;
        $scope.DataDel = function (_id) {
            if (confirm("Are you sure, delete this record?")) {
                $http({
                    method: 'GET',
                    url: '/BusinessPartner/DelData',
                    params: { id: _id }
                    //?id=' + _id
                }).success(function (response) {
                    $rootScope.Res = "Data deleted";
                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $scope.BindList();
                    $('#divNotifiy').attr('style', 'display: block');
                }).error(function (data, status, headers, config) {
                    // alert("error");
                });
            }
        };
        $scope.DataEdit = function (x, idx) {

            var i = 0;
            angular.forEach($scope.cust, function (lst) {
                $('#inds' + i).attr("style", "");
                i++;
            });
            $('#inds' + idx).attr("style", "background-color:lightblue");
            $scope.obj = {};
            $scope.btnSubmit = false;
            $scope.btnUpdate = true;
            $scope.obj._id = x._id;
            $scope.obj.Code = x.Code;
            $scope.obj.Title = x.Title;
        };
        $scope.updateData = function () {

            //if (!$scope.form.$invalid) { 
            $timeout(function () { $scope.NotifiyRes = false; }, 5000);
            $scope.obj.Label = "CustCur";
            var formData = new FormData();
            formData.append("data", angular.toJson($scope.obj));

            $http({
                url: "/BusinessPartner/InsertData",
                method: "POST",
                headers: { "Content-Type": undefined },
                transformRequest: angular.identity,
                data: formData
            }).success(function (data, status, headers, config) {

                if (data.success === false) {

                }
                else {
                    if (data === false)
                        $rootScope.Res = "Data already exists";
                    else {
                        $rootScope.Res = "Data updated successfully";
                        $scope.BindList();
                    }
                    $scope.reset();
                    $scope.obj = null;
                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $('#divNotifiy').attr('style', 'display: block');
                }
            }).error(function (data, status, headers, config) {

            });
            $scope.btnSubmit = true;
            $scope.btnUpdate = false;
        };
        $scope.ClearFrm = function () {

            $scope.obj = null;
            $scope.btnSubmit = true;
            $scope.btnUpdate = false;
            $scope.reset();
        }
        $scope.DisableData = function (idx, enable, _id) {

            if (enable == false) {

                if (confirm("Are you sure, disable this record?")) {

                    $http({
                        method: 'GET',
                        url: '/BusinessPartner/DisableData',
                        params: { id: _id, Islive: enable }
                        //?id=' + _id + '&Islive=' + enable

                    }).success(function (response) {
                        $rootScope.Res = "Data disabled";
                        $rootScope.Notify = "alert-info";
                        $('#divNotifiy').attr('style', 'display: block');
                        $scope.BindList();
                    }).error(function (data, status, headers, config) {
                        // alert("error");
                    });
                } else $scope.custs[idx].Islive = true;

            } else {
                if (confirm("Are you sure, enable this record?")) {

                    $http({
                        method: 'GET',
                        url: '/BusinessPartner/DisableData',
                        params: { id: _id, Islive: enable }
                        //?id=' + _id + '&Islive=' + enable
                    }).success(function (response) {
                        $rootScope.Res = "Data enabled";
                        $rootScope.Notify = "alert-info";
                        $('#divNotifiy').attr('style', 'display: block');
                        $scope.BindList();
                    }).error(function (data, status, headers, config) {
                        // alert("error");
                    });
                } else $scope.cust[idx].Islive = false;


            }

        };
    });
    app.controller('BankKeyController', function ($scope, $http, $timeout, $rootScope, DTOptionsBuilder) {

        $timeout(function () { $('#divNotifiy').attr('style', 'display: none'); }, 5000);
        $scope.dtOptions = DTOptionsBuilder.newOptions()
            .withDisplayLength(10)
            .withOption('bLengthChange', true);

        $scope.BindList = function () {

            $http({
                method: 'GET',
                url: '/BusinessPartner/GetDataList',
                params: { label: 'BankKey' }
            }).success(function (response) {
                $scope.BankKeys = response;
            }).error(function (data, status, headers, config) {
                // alert("error");
            });
        };
        $scope.BindList();
        $scope.reset = function () {

            $scope.form.$setPristine();
        }
        $scope.createData = function () {

            $timeout(function () { $('#divNotifiy').attr('style', 'display: none'); }, 5000);
            $scope.obj.Label = "BankKey";
            var formData = new FormData();
            formData.append("data", angular.toJson($scope.obj));

            $http({
                url: "/BusinessPartner/InsertData",
                method: "POST",
                headers: { "Content-Type": undefined },
                transformRequest: angular.identity,
                data: formData
            }).success(function (data, status, headers, config) {

                if (data.success === false) {

                }
                else {
                    if (data === false)
                        $rootScope.Res = "Data already exists";
                    else {
                        $rootScope.Res = "Data created successfully";
                        $scope.BindList();
                    }
                    $scope.reset();
                    $scope.obj = null;
                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $('#divNotifiy').attr('style', 'display: block');
                }
            }).error(function (data, status, headers, config) {

            });

            // }
        };
        $scope.btnSubmit = true;
        $scope.btnUpdate = false;
        $scope.DataDel = function (_id) {
            if (confirm("Are you sure, delete this record?")) {
                $http({
                    method: 'GET',
                    url: '/BusinessPartner/DelData',
                    params: { id: _id }
                    //?id=' + _id
                }).success(function (response) {
                    $rootScope.Res = "Data deleted";
                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $scope.BindList();
                    $('#divNotifiy').attr('style', 'display: block');
                }).error(function (data, status, headers, config) {
                    // alert("error");
                });
            }
        };
        $scope.DataEdit = function (x, idx) {

            var i = 0;
            angular.forEach($scope.Types, function (lst) {
                $('#mat' + i).attr("style", "");
                i++;
            });
            $('#mat' + idx).attr("style", "background-color:lightblue");

            $scope.obj = {};

            $scope.btnSubmit = false;
            $scope.btnUpdate = true;

            $scope.obj._id = x._id;
            $scope.obj.Code = x.Code;
            $scope.obj.Title = x.Title;


        };
        $scope.updateData = function () {

            //if (!$scope.form.$invalid) { 
            $timeout(function () { $scope.NotifiyRes = false; }, 5000);
            $scope.obj.Label = "BankKey";
            var formData = new FormData();
            formData.append("data", angular.toJson($scope.obj));

            $http({
                url: "/BusinessPartner/InsertData",
                method: "POST",
                headers: { "Content-Type": undefined },
                transformRequest: angular.identity,
                data: formData
            }).success(function (data, status, headers, config) {

                if (data.success === false) {

                }
                else {
                    if (data === false)
                        $rootScope.Res = "Data already exists";
                    else {
                        $rootScope.Res = "Data updated successfully";
                        $scope.BindList();
                    }
                    $scope.reset();
                    $scope.obj = null;

                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $('#divNotifiy').attr('style', 'display: block');
                }
            }).error(function (data, status, headers, config) {

            });

            $scope.btnSubmit = true;
            $scope.btnUpdate = false;

        };
        $scope.ClearFrm = function () {

            $scope.obj = null;
            $scope.btnSubmit = true;
            $scope.btnUpdate = false;
            $scope.reset();
        }
        $scope.DisableData = function (idx, enable, _id) {

            if (enable == false) {

                if (confirm("Are you sure, disable this record?")) {

                    $http({
                        method: 'GET',
                        url: '/BusinessPartner/DisableData',
                        params: { id: _id, Islive: enable }
                        //?id=' + _id + '&Islive=' + enable
                    }).success(function (response) {
                        $rootScope.Res = "Data disabled";
                        $rootScope.Notify = "alert-info";
                        $('#divNotifiy').attr('style', 'display: block');
                        $scope.BindList();
                    }).error(function (data, status, headers, config) {
                        // alert("error");
                    });
                } else $scope.BankKeys[idx].Islive = true;

            } else {
                if (confirm("Are you sure, enable this record?")) {

                    $http({
                        method: 'GET',
                        url: '/BusinessPartner/DisableData',
                        params: { id: _id, Islive: enable }
                    }).success(function (response) {
                        $rootScope.Res = "Data enabled";
                        $rootScope.Notify = "alert-info";
                        $('#divNotifiy').attr('style', 'display: block');
                        $scope.BindList();
                    }).error(function (data, status, headers, config) {
                        // alert("error");
                    });
                } else $scope.BankKeys[idx].Islive = false;


            }

        };
    });
    app.controller('BankcountryController', function ($scope, $http, $timeout, $rootScope, DTOptionsBuilder) {


        $scope.dtOptions = DTOptionsBuilder.newOptions()
           .withDisplayLength(10)
           .withOption('bLengthChange', true);

        $rootScope.NotifiyResclose = function () {
            $('#divNotifiy').attr('style', 'display: none');
        }

        $scope.BindList = function () {

            $http({
                method: 'GET',
                url: '/BusinessPartner/GetDataList',
                params: { label: 'Bankcountry' },
            }).success(function (response) {
                $scope.Bankcountrys = response;
            }).error(function (data, status, headers, config) {
                // alert("error");
            });
        };
        $scope.BindList();
        $scope.reset = function () {

            $scope.form.$setPristine();
        }
        $scope.createData = function () {

            $timeout(function () { $('#divNotifiy').attr('style', 'display: none'); }, 5000);

            $scope.obj.Label = "Bankcountry";
            var formData = new FormData();
            formData.append("data", angular.toJson($scope.obj));

            $http({
                url: "/BusinessPartner/InsertData",
                method: "POST",
                headers: { "Content-Type": undefined },
                transformRequest: angular.identity,
                data: formData
            }).success(function (data, status, headers, config) {

                if (data.success === false) {

                }
                else {
                    if (data === false)
                        $rootScope.Res = "Data already exists";
                    else {
                        $rootScope.Res = "Data created successfully";
                        $scope.BindList();
                    }
                    $scope.reset();
                    $scope.obj = null;

                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $('#divNotifiy').attr('style', 'display: block');
                }
            }).error(function (data, status, headers, config) {

            });

            // }
        };
        $scope.btnSubmit = true;
        $scope.btnUpdate = false;
        $scope.DataDel = function (_id) {
            if (confirm("Are you sure, delete this record?")) {
                $http({
                    method: 'GET',
                    url: '/BusinessPartner/DelData',
                    params: { id: _id }
                    //?id=' + _id
                }).success(function (response) {
                    $rootScope.Res = "Data deleted";
                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $scope.BindList();
                    $('#divNotifiy').attr('style', 'display: block');
                }).error(function (data, status, headers, config) {
                    // alert("error");
                });
            }
        };
        $scope.DataEdit = function (x, idx) {

            var i = 0;
            angular.forEach($scope.cust, function (lst) {
                $('#inds' + i).attr("style", "");
                i++;
            });
            $('#inds' + idx).attr("style", "background-color:lightblue");
            $scope.obj = {};
            $scope.btnSubmit = false;
            $scope.btnUpdate = true;
            $scope.obj._id = x._id;
            $scope.obj.Code = x.Code;
            $scope.obj.Title = x.Title;
        };
        $scope.updateData = function () {

            //if (!$scope.form.$invalid) { 
            $timeout(function () { $scope.NotifiyRes = false; }, 5000);
            $scope.obj.Label = "Bankcountry";
            var formData = new FormData();
            formData.append("data", angular.toJson($scope.obj));

            $http({
                url: "/BusinessPartner/InsertData",
                method: "POST",
                headers: { "Content-Type": undefined },
                transformRequest: angular.identity,
                data: formData
            }).success(function (data, status, headers, config) {

                if (data.success === false) {

                }
                else {
                    if (data === false)
                        $rootScope.Res = "Data already exists";
                    else {
                        $rootScope.Res = "Data updated successfully";
                        $scope.BindList();
                    }
                    $scope.reset();
                    $scope.obj = null;
                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $('#divNotifiy').attr('style', 'display: block');
                }
            }).error(function (data, status, headers, config) {

            });
            $scope.btnSubmit = true;
            $scope.btnUpdate = false;
        };
        $scope.ClearFrm = function () {

            $scope.obj = null;
            $scope.btnSubmit = true;
            $scope.btnUpdate = false;
            $scope.reset();
        }
        $scope.DisableData = function (idx, enable, _id) {

            if (enable == false) {

                if (confirm("Are you sure, disable this record?")) {

                    $http({
                        method: 'GET',
                        url: '/BusinessPartner/DisableData',
                        params: { id: _id, Islive: enable }
                        //?id=' + _id + '&Islive=' + enable

                    }).success(function (response) {
                        $rootScope.Res = "Data disabled";
                        $rootScope.Notify = "alert-info";
                        $('#divNotifiy').attr('style', 'display: block');
                        $scope.BindList();
                    }).error(function (data, status, headers, config) {
                        // alert("error");
                    });
                } else $scope.Bankcountrys[idx].Islive = true;

            } else {
                if (confirm("Are you sure, enable this record?")) {

                    $http({
                        method: 'GET',
                        url: '/BusinessPartner/DisableData',
                        params: { id: _id, Islive: enable }
                        //?id=' + _id + '&Islive=' + enable
                    }).success(function (response) {
                        $rootScope.Res = "Data enabled";
                        $rootScope.Notify = "alert-info";
                        $('#divNotifiy').attr('style', 'display: block');
                        $scope.BindList();
                    }).error(function (data, status, headers, config) {
                        // alert("error");
                    });
                } else $scope.Bankcountrys[idx].Islive = false;


            }

        };
    });
    app.controller('PBTController', function ($scope, $http, $timeout, $rootScope, DTOptionsBuilder) {

        $timeout(function () { $('#divNotifiy').attr('style', 'display: none'); }, 5000);
        $scope.dtOptions = DTOptionsBuilder.newOptions()
            .withDisplayLength(10)
            .withOption('bLengthChange', true);

        $scope.BindList = function () {

            $http({
                method: 'GET',
                url: '/BusinessPartner/GetDataList',
                params: { label: 'PBT' }
            }).success(function (response) {
                $scope.PBTs = response;
            }).error(function (data, status, headers, config) {
                // alert("error");
            });
        };
        $scope.BindList();
        $scope.reset = function () {

            $scope.form.$setPristine();
        }
        $scope.createData = function () {

            $timeout(function () { $('#divNotifiy').attr('style', 'display: none'); }, 5000);
            $scope.obj.Label = "PBT";
            var formData = new FormData();
            formData.append("data", angular.toJson($scope.obj));

            $http({
                url: "/BusinessPartner/InsertData",
                method: "POST",
                headers: { "Content-Type": undefined },
                transformRequest: angular.identity,
                data: formData
            }).success(function (data, status, headers, config) {

                if (data.success === false) {

                }
                else {
                    if (data === false)
                        $rootScope.Res = "Data already exists";
                    else {
                        $rootScope.Res = "Data created successfully";
                        $scope.BindList();
                    }
                    $scope.reset();
                    $scope.obj = null;
                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $('#divNotifiy').attr('style', 'display: block');
                }
            }).error(function (data, status, headers, config) {

            });

            // }
        };
        $scope.btnSubmit = true;
        $scope.btnUpdate = false;
        $scope.DataDel = function (_id) {
            if (confirm("Are you sure, delete this record?")) {
                $http({
                    method: 'GET',
                    url: '/BusinessPartner/DelData',
                    params: { id: _id }
                    //?id=' + _id
                }).success(function (response) {
                    $rootScope.Res = "Data deleted";
                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $scope.BindList();
                    $('#divNotifiy').attr('style', 'display: block');
                }).error(function (data, status, headers, config) {
                    // alert("error");
                });
            }
        };
        $scope.DataEdit = function (x, idx) {

            var i = 0;
            angular.forEach($scope.Types, function (lst) {
                $('#mat' + i).attr("style", "");
                i++;
            });
            $('#mat' + idx).attr("style", "background-color:lightblue");

            $scope.obj = {};

            $scope.btnSubmit = false;
            $scope.btnUpdate = true;

            $scope.obj._id = x._id;
            $scope.obj.Code = x.Code;
            $scope.obj.Title = x.Title;


        };
        $scope.updateData = function () {

            //if (!$scope.form.$invalid) { 
            $timeout(function () { $scope.NotifiyRes = false; }, 5000);
            $scope.obj.Label = "PBT";
            var formData = new FormData();
            formData.append("data", angular.toJson($scope.obj));

            $http({
                url: "/BusinessPartner/InsertData",
                method: "POST",
                headers: { "Content-Type": undefined },
                transformRequest: angular.identity,
                data: formData
            }).success(function (data, status, headers, config) {

                if (data.success === false) {

                }
                else {
                    if (data === false)
                        $rootScope.Res = "Data already exists";
                    else {
                        $rootScope.Res = "Data updated successfully";
                        $scope.BindList();
                    }
                    $scope.reset();
                    $scope.obj = null;

                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $('#divNotifiy').attr('style', 'display: block');
                }
            }).error(function (data, status, headers, config) {

            });

            $scope.btnSubmit = true;
            $scope.btnUpdate = false;

        };
        $scope.ClearFrm = function () {

            $scope.obj = null;
            $scope.btnSubmit = true;
            $scope.btnUpdate = false;
            $scope.reset();
        }
        $scope.DisableData = function (idx, enable, _id) {

            if (enable == false) {

                if (confirm("Are you sure, disable this record?")) {

                    $http({
                        method: 'GET',
                        url: '/BusinessPartner/DisableData',
                        params: { id: _id, Islive: enable }
                        //?id=' + _id + '&Islive=' + enable
                    }).success(function (response) {
                        $rootScope.Res = "Data disabled";
                        $rootScope.Notify = "alert-info";
                        $('#divNotifiy').attr('style', 'display: block');
                        $scope.BindList();
                    }).error(function (data, status, headers, config) {
                        // alert("error");
                    });
                } else $scope.PBTs[idx].Islive = true;

            } else {
                if (confirm("Are you sure, enable this record?")) {

                    $http({
                        method: 'GET',
                        url: '/BusinessPartner/DisableData',
                        params: { id: _id, Islive: enable }
                    }).success(function (response) {
                        $rootScope.Res = "Data enabled";
                        $rootScope.Notify = "alert-info";
                        $('#divNotifiy').attr('style', 'display: block');
                        $scope.BindList();
                    }).error(function (data, status, headers, config) {
                        // alert("error");
                    });
                } else $scope.PBTs[idx].Islive = false;


            }

        };
    });
    app.controller('PODController', function ($scope, $http, $timeout, $rootScope, DTOptionsBuilder) {


        $scope.dtOptions = DTOptionsBuilder.newOptions()
           .withDisplayLength(10)
           .withOption('bLengthChange', true);

        $rootScope.NotifiyResclose = function () {
            $('#divNotifiy').attr('style', 'display: none');
        }

        $scope.BindList = function () {

            $http({
                method: 'GET',
                url: '/BusinessPartner/GetDataList',
                params: { label: 'POD' },
            }).success(function (response) {
                $scope.PODs = response;
            }).error(function (data, status, headers, config) {
                // alert("error");
            });
        };
        $scope.BindList();
        $scope.reset = function () {

            $scope.form.$setPristine();
        }
        $scope.createData = function () {

            $timeout(function () { $('#divNotifiy').attr('style', 'display: none'); }, 5000);

            $scope.obj.Label = "POD";
            var formData = new FormData();
            formData.append("data", angular.toJson($scope.obj));

            $http({
                url: "/BusinessPartner/InsertData",
                method: "POST",
                headers: { "Content-Type": undefined },
                transformRequest: angular.identity,
                data: formData
            }).success(function (data, status, headers, config) {

                if (data.success === false) {

                }
                else {
                    if (data === false)
                        $rootScope.Res = "Data already exists";
                    else {
                        $rootScope.Res = "Data created successfully";
                        $scope.BindList();
                    }
                    $scope.reset();
                    $scope.obj = null;

                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $('#divNotifiy').attr('style', 'display: block');
                }
            }).error(function (data, status, headers, config) {

            });

            // }
        };
        $scope.btnSubmit = true;
        $scope.btnUpdate = false;
        $scope.DataDel = function (_id) {
            if (confirm("Are you sure, delete this record?")) {
                $http({
                    method: 'GET',
                    url: '/BusinessPartner/DelData',
                    params: { id: _id }
                    //?id=' + _id
                }).success(function (response) {
                    $rootScope.Res = "Data deleted";
                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $scope.BindList();
                    $('#divNotifiy').attr('style', 'display: block');
                }).error(function (data, status, headers, config) {
                    // alert("error");
                });
            }
        };
        $scope.DataEdit = function (x, idx) {

            var i = 0;
            angular.forEach($scope.cust, function (lst) {
                $('#inds' + i).attr("style", "");
                i++;
            });
            $('#inds' + idx).attr("style", "background-color:lightblue");
            $scope.obj = {};
            $scope.btnSubmit = false;
            $scope.btnUpdate = true;
            $scope.obj._id = x._id;
            $scope.obj.Code = x.Code;
            $scope.obj.Title = x.Title;
        };
        $scope.updateData = function () {

            //if (!$scope.form.$invalid) { 
            $timeout(function () { $scope.NotifiyRes = false; }, 5000);
            $scope.obj.Label = "CustCur";
            var formData = new FormData();
            formData.append("data", angular.toJson($scope.obj));

            $http({
                url: "/BusinessPartner/InsertData",
                method: "POST",
                headers: { "Content-Type": undefined },
                transformRequest: angular.identity,
                data: formData
            }).success(function (data, status, headers, config) {

                if (data.success === false) {

                }
                else {
                    if (data === false)
                        $rootScope.Res = "Data already exists";
                    else {
                        $rootScope.Res = "Data updated successfully";
                        $scope.BindList();
                    }
                    $scope.reset();
                    $scope.obj = null;
                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $('#divNotifiy').attr('style', 'display: block');
                }
            }).error(function (data, status, headers, config) {

            });
            $scope.btnSubmit = true;
            $scope.btnUpdate = false;
        };
        $scope.ClearFrm = function () {

            $scope.obj = null;
            $scope.btnSubmit = true;
            $scope.btnUpdate = false;
            $scope.reset();
        }
        $scope.DisableData = function (idx, enable, _id) {

            if (enable == false) {

                if (confirm("Are you sure, disable this record?")) {

                    $http({
                        method: 'GET',
                        url: '/BusinessPartner/DisableData',
                        params: { id: _id, Islive: enable }
                        //?id=' + _id + '&Islive=' + enable

                    }).success(function (response) {
                        $rootScope.Res = "Data disabled";
                        $rootScope.Notify = "alert-info";
                        $('#divNotifiy').attr('style', 'display: block');
                        $scope.BindList();
                    }).error(function (data, status, headers, config) {
                        // alert("error");
                    });
                } else $scope.PODs[idx].Islive = true;

            } else {
                if (confirm("Are you sure, enable this record?")) {

                    $http({
                        method: 'GET',
                        url: '/BusinessPartner/DisableData',
                        params: { id: _id, Islive: enable }
                        //?id=' + _id + '&Islive=' + enable
                    }).success(function (response) {
                        $rootScope.Res = "Data enabled";
                        $rootScope.Notify = "alert-info";
                        $('#divNotifiy').attr('style', 'display: block');
                        $scope.BindList();
                    }).error(function (data, status, headers, config) {
                        // alert("error");
                    });
                } else $scope.PODs[idx].Islive = false;


            }

        };
    });
    app.controller('ShippingcndntController', function ($scope, $http, $timeout, $rootScope, DTOptionsBuilder) {

        $timeout(function () { $('#divNotifiy').attr('style', 'display: none'); }, 5000);
        $scope.dtOptions = DTOptionsBuilder.newOptions()
            .withDisplayLength(10)
            .withOption('bLengthChange', true);

        $scope.BindList = function () {

            $http({
                method: 'GET',
                url: '/BusinessPartner/GetDataList',
                params: { label: 'Shipping Cndtn' }
            }).success(function (response) {
                $scope.ShippingCndtns = response;
            }).error(function (data, status, headers, config) {
                // alert("error");
            });
        };
        $scope.BindList();
        $scope.reset = function () {

            $scope.form.$setPristine();
        }
        $scope.createData = function () {

            $timeout(function () { $('#divNotifiy').attr('style', 'display: none'); }, 5000);
            $scope.obj.Label = "Shipping Cndtn";
            var formData = new FormData();
            formData.append("data", angular.toJson($scope.obj));

            $http({
                url: "/BusinessPartner/InsertData",
                method: "POST",
                headers: { "Content-Type": undefined },
                transformRequest: angular.identity,
                data: formData
            }).success(function (data, status, headers, config) {

                if (data.success === false) {

                }
                else {
                    if (data === false)
                        $rootScope.Res = "Data already exists";
                    else {
                        $rootScope.Res = "Data created successfully";
                        $scope.BindList();
                    }
                    $scope.reset();
                    $scope.obj = null;
                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $('#divNotifiy').attr('style', 'display: block');
                }
            }).error(function (data, status, headers, config) {

            });

            // }
        };
        $scope.btnSubmit = true;
        $scope.btnUpdate = false;
        $scope.DataDel = function (_id) {
            if (confirm("Are you sure, delete this record?")) {
                $http({
                    method: 'GET',
                    url: '/BusinessPartner/DelData',
                    params: { id: _id }
                    //?id=' + _id
                }).success(function (response) {
                    $rootScope.Res = "Data deleted";
                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $scope.BindList();
                    $('#divNotifiy').attr('style', 'display: block');
                }).error(function (data, status, headers, config) {
                    // alert("error");
                });
            }
        };
        $scope.DataEdit = function (x, idx) {

            var i = 0;
            angular.forEach($scope.Types, function (lst) {
                $('#mat' + i).attr("style", "");
                i++;
            });
            $('#mat' + idx).attr("style", "background-color:lightblue");

            $scope.obj = {};

            $scope.btnSubmit = false;
            $scope.btnUpdate = true;

            $scope.obj._id = x._id;
            $scope.obj.Code = x.Code;
            $scope.obj.Title = x.Title;


        };
        $scope.updateData = function () {

            //if (!$scope.form.$invalid) { 
            $timeout(function () { $scope.NotifiyRes = false; }, 5000);
            $scope.obj.Label = "Shipping Cndtn";
            var formData = new FormData();
            formData.append("data", angular.toJson($scope.obj));

            $http({
                url: "/BusinessPartner/InsertData",
                method: "POST",
                headers: { "Content-Type": undefined },
                transformRequest: angular.identity,
                data: formData
            }).success(function (data, status, headers, config) {

                if (data.success === false) {

                }
                else {
                    if (data === false)
                        $rootScope.Res = "Data already exists";
                    else {
                        $rootScope.Res = "Data updated successfully";
                        $scope.BindList();
                    }
                    $scope.reset();
                    $scope.obj = null;

                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $('#divNotifiy').attr('style', 'display: block');
                }
            }).error(function (data, status, headers, config) {

            });

            $scope.btnSubmit = true;
            $scope.btnUpdate = false;

        };
        $scope.ClearFrm = function () {

            $scope.obj = null;
            $scope.btnSubmit = true;
            $scope.btnUpdate = false;
            $scope.reset();
        }
        $scope.DisableData = function (idx, enable, _id) {

            if (enable == false) {

                if (confirm("Are you sure, disable this record?")) {

                    $http({
                        method: 'GET',
                        url: '/BusinessPartner/DisableData',
                        params: { id: _id, Islive: enable }
                        //?id=' + _id + '&Islive=' + enable
                    }).success(function (response) {
                        $rootScope.Res = "Data disabled";
                        $rootScope.Notify = "alert-info";
                        $('#divNotifiy').attr('style', 'display: block');
                        $scope.BindList();
                    }).error(function (data, status, headers, config) {
                        // alert("error");
                    });
                } else $scope.ShippingCndtns[idx].Islive = true;

            } else {
                if (confirm("Are you sure, enable this record?")) {

                    $http({
                        method: 'GET',
                        url: '/BusinessPartner/DisableData',
                        params: { id: _id, Islive: enable }
                    }).success(function (response) {
                        $rootScope.Res = "Data enabled";
                        $rootScope.Notify = "alert-info";
                        $('#divNotifiy').attr('style', 'display: block');
                        $scope.BindList();
                    }).error(function (data, status, headers, config) {
                        // alert("error");
                    });
                } else $scope.ShippingCndtns[idx].Islive = false;


            }

        };
    });
    app.controller('DelyplntController', function ($scope, $http, $timeout, $rootScope, DTOptionsBuilder) {


        $scope.dtOptions = DTOptionsBuilder.newOptions()
           .withDisplayLength(10)
           .withOption('bLengthChange', true);

        $rootScope.NotifiyResclose = function () {
            $('#divNotifiy').attr('style', 'display: none');
        }

        $scope.BindList = function () {

            $http({
                method: 'GET',
                url: '/BusinessPartner/GetDataList',
                params: { label: 'Dely Plant' },
            }).success(function (response) {
                $scope.DelyPlants = response;
            }).error(function (data, status, headers, config) {
                // alert("error");
            });
        };
        $scope.BindList();
        $scope.reset = function () {

            $scope.form.$setPristine();
        }
        $scope.createData = function () {

            $timeout(function () { $('#divNotifiy').attr('style', 'display: none'); }, 5000);

            $scope.obj.Label = "Dely Plant";
            var formData = new FormData();
            formData.append("data", angular.toJson($scope.obj));

            $http({
                url: "/BusinessPartner/InsertData",
                method: "POST",
                headers: { "Content-Type": undefined },
                transformRequest: angular.identity,
                data: formData
            }).success(function (data, status, headers, config) {

                if (data.success === false) {

                }
                else {
                    if (data === false)
                        $rootScope.Res = "Data already exists";
                    else {
                        $rootScope.Res = "Data created successfully";
                        $scope.BindList();
                    }
                    $scope.reset();
                    $scope.obj = null;

                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $('#divNotifiy').attr('style', 'display: block');
                }
            }).error(function (data, status, headers, config) {

            });

            // }
        };
        $scope.btnSubmit = true;
        $scope.btnUpdate = false;
        $scope.DataDel = function (_id) {
            if (confirm("Are you sure, delete this record?")) {
                $http({
                    method: 'GET',
                    url: '/BusinessPartner/DelData',
                    params: { id: _id }
                    //?id=' + _id
                }).success(function (response) {
                    $rootScope.Res = "Data deleted";
                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $scope.BindList();
                    $('#divNotifiy').attr('style', 'display: block');
                }).error(function (data, status, headers, config) {
                    // alert("error");
                });
            }
        };
        $scope.DataEdit = function (x, idx) {

            var i = 0;
            angular.forEach($scope.cust, function (lst) {
                $('#inds' + i).attr("style", "");
                i++;
            });
            $('#inds' + idx).attr("style", "background-color:lightblue");
            $scope.obj = {};
            $scope.btnSubmit = false;
            $scope.btnUpdate = true;
            $scope.obj._id = x._id;
            $scope.obj.Code = x.Code;
            $scope.obj.Title = x.Title;
        };
        $scope.updateData = function () {

            //if (!$scope.form.$invalid) { 
            $timeout(function () { $scope.NotifiyRes = false; }, 5000);
            $scope.obj.Label = "Dely Plant";
            var formData = new FormData();
            formData.append("data", angular.toJson($scope.obj));

            $http({
                url: "/BusinessPartner/InsertData",
                method: "POST",
                headers: { "Content-Type": undefined },
                transformRequest: angular.identity,
                data: formData
            }).success(function (data, status, headers, config) {

                if (data.success === false) {

                }
                else {
                    if (data === false)
                        $rootScope.Res = "Data already exists";
                    else {
                        $rootScope.Res = "Data updated successfully";
                        $scope.BindList();
                    }
                    $scope.reset();
                    $scope.obj = null;
                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $('#divNotifiy').attr('style', 'display: block');
                }
            }).error(function (data, status, headers, config) {

            });
            $scope.btnSubmit = true;
            $scope.btnUpdate = false;
        };
        $scope.ClearFrm = function () {

            $scope.obj = null;
            $scope.btnSubmit = true;
            $scope.btnUpdate = false;
            $scope.reset();
        }
        $scope.DisableData = function (idx, enable, _id) {

            if (enable == false) {

                if (confirm("Are you sure, disable this record?")) {

                    $http({
                        method: 'GET',
                        url: '/BusinessPartner/DisableData',
                        params: { id: _id, Islive: enable }
                        //?id=' + _id + '&Islive=' + enable

                    }).success(function (response) {
                        $rootScope.Res = "Data disabled";
                        $rootScope.Notify = "alert-info";
                        $('#divNotifiy').attr('style', 'display: block');
                        $scope.BindList();
                    }).error(function (data, status, headers, config) {
                        // alert("error");
                    });
                } else $scope.DelyPlants[idx].Islive = true;

            } else {
                if (confirm("Are you sure, enable this record?")) {

                    $http({
                        method: 'GET',
                        url: '/BusinessPartner/DisableData',
                        params: { id: _id, Islive: enable }
                        //?id=' + _id + '&Islive=' + enable
                    }).success(function (response) {
                        $rootScope.Res = "Data enabled";
                        $rootScope.Notify = "alert-info";
                        $('#divNotifiy').attr('style', 'display: block');
                        $scope.BindList();
                    }).error(function (data, status, headers, config) {
                        // alert("error");
                    });
                } else $scope.DelyPlants[idx].Islive = false;


            }

        };
    });
    app.controller('SalesofficeController', function ($scope, $http, $timeout, $rootScope, DTOptionsBuilder) {

        $timeout(function () { $('#divNotifiy').attr('style', 'display: none'); }, 5000);
        $scope.dtOptions = DTOptionsBuilder.newOptions()
            .withDisplayLength(10)
            .withOption('bLengthChange', true);

        $scope.BindList = function () {

            $http({
                method: 'GET',
                url: '/BusinessPartner/GetDataList',
                params: { label: 'Sales Office' }
            }).success(function (response) {
                $scope.SalesOffices = response;
            }).error(function (data, status, headers, config) {
                // alert("error");
            });
        };
        $scope.BindList();
        $scope.reset = function () {

            $scope.form.$setPristine();
        }
        $scope.createData = function () {

            $timeout(function () { $('#divNotifiy').attr('style', 'display: none'); }, 5000);
            $scope.obj.Label = "Sales Office";
            var formData = new FormData();
            formData.append("data", angular.toJson($scope.obj));

            $http({
                url: "/BusinessPartner/InsertData",
                method: "POST",
                headers: { "Content-Type": undefined },
                transformRequest: angular.identity,
                data: formData
            }).success(function (data, status, headers, config) {

                if (data.success === false) {

                }
                else {
                    if (data === false)
                        $rootScope.Res = "Data already exists";
                    else {
                        $rootScope.Res = "Data created successfully";
                        $scope.BindList();
                    }
                    $scope.reset();
                    $scope.obj = null;
                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $('#divNotifiy').attr('style', 'display: block');
                }
            }).error(function (data, status, headers, config) {

            });

            // }
        };
        $scope.btnSubmit = true;
        $scope.btnUpdate = false;
        $scope.DataDel = function (_id) {
            if (confirm("Are you sure, delete this record?")) {
                $http({
                    method: 'GET',
                    url: '/BusinessPartner/DelData',
                    params: { id: _id }
                    //?id=' + _id
                }).success(function (response) {
                    $rootScope.Res = "Data deleted";
                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $scope.BindList();
                    $('#divNotifiy').attr('style', 'display: block');
                }).error(function (data, status, headers, config) {
                    // alert("error");
                });
            }
        };
        $scope.DataEdit = function (x, idx) {

            var i = 0;
            angular.forEach($scope.Types, function (lst) {
                $('#mat' + i).attr("style", "");
                i++;
            });
            $('#mat' + idx).attr("style", "background-color:lightblue");

            $scope.obj = {};

            $scope.btnSubmit = false;
            $scope.btnUpdate = true;

            $scope.obj._id = x._id;
            $scope.obj.Code = x.Code;
            $scope.obj.Title = x.Title;


        };
        $scope.updateData = function () {

            //if (!$scope.form.$invalid) { 
            $timeout(function () { $scope.NotifiyRes = false; }, 5000);
            $scope.obj.Label = "Sales Office";
            var formData = new FormData();
            formData.append("data", angular.toJson($scope.obj));

            $http({
                url: "/BusinessPartner/InsertData",
                method: "POST",
                headers: { "Content-Type": undefined },
                transformRequest: angular.identity,
                data: formData
            }).success(function (data, status, headers, config) {

                if (data.success === false) {

                }
                else {
                    if (data === false)
                        $rootScope.Res = "Data already exists";
                    else {
                        $rootScope.Res = "Data updated successfully";
                        $scope.BindList();
                    }
                    $scope.reset();
                    $scope.obj = null;

                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $('#divNotifiy').attr('style', 'display: block');
                }
            }).error(function (data, status, headers, config) {

            });

            $scope.btnSubmit = true;
            $scope.btnUpdate = false;

        };
        $scope.ClearFrm = function () {

            $scope.obj = null;
            $scope.btnSubmit = true;
            $scope.btnUpdate = false;
            $scope.reset();
        }
        $scope.DisableData = function (idx, enable, _id) {

            if (enable == false) {

                if (confirm("Are you sure, disable this record?")) {

                    $http({
                        method: 'GET',
                        url: '/BusinessPartner/DisableData',
                        params: { id: _id, Islive: enable }
                        //?id=' + _id + '&Islive=' + enable
                    }).success(function (response) {
                        $rootScope.Res = "Data disabled";
                        $rootScope.Notify = "alert-info";
                        $('#divNotifiy').attr('style', 'display: block');
                        $scope.BindList();
                    }).error(function (data, status, headers, config) {
                        // alert("error");
                    });
                } else $scope.SalesOffices[idx].Islive = true;

            } else {
                if (confirm("Are you sure, enable this record?")) {

                    $http({
                        method: 'GET',
                        url: '/BusinessPartner/DisableData',
                        params: { id: _id, Islive: enable }
                    }).success(function (response) {
                        $rootScope.Res = "Data enabled";
                        $rootScope.Notify = "alert-info";
                        $('#divNotifiy').attr('style', 'display: block');
                        $scope.BindList();
                    }).error(function (data, status, headers, config) {
                        // alert("error");
                    });
                } else $scope.SalesOffices[idx].Islive = false;


            }

        };
    });
    app.controller('SalesGrpController', function ($scope, $http, $timeout, $rootScope, DTOptionsBuilder) {


        $scope.dtOptions = DTOptionsBuilder.newOptions()
           .withDisplayLength(10)
           .withOption('bLengthChange', true);

        $rootScope.NotifiyResclose = function () {
            $('#divNotifiy').attr('style', 'display: none');
        }

        $scope.BindList = function () {

            $http({
                method: 'GET',
                url: '/BusinessPartner/GetDataList',
                params: { label: 'Sales Grp' },
            }).success(function (response) {
                $scope.SalesGrps = response;
            }).error(function (data, status, headers, config) {
                // alert("error");
            });
        };
        $scope.BindList();
        $scope.reset = function () {

            $scope.form.$setPristine();
        }
        $scope.createData = function () {

            $timeout(function () { $('#divNotifiy').attr('style', 'display: none'); }, 5000);

            $scope.obj.Label = "Sales Grp";
            var formData = new FormData();
            formData.append("data", angular.toJson($scope.obj));

            $http({
                url: "/BusinessPartner/InsertData",
                method: "POST",
                headers: { "Content-Type": undefined },
                transformRequest: angular.identity,
                data: formData
            }).success(function (data, status, headers, config) {

                if (data.success === false) {

                }
                else {
                    if (data === false)
                        $rootScope.Res = "Data already exists";
                    else {
                        $rootScope.Res = "Data created successfully";
                        $scope.BindList();
                    }
                    $scope.reset();
                    $scope.obj = null;

                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $('#divNotifiy').attr('style', 'display: block');
                }
            }).error(function (data, status, headers, config) {

            });

            // }
        };
        $scope.btnSubmit = true;
        $scope.btnUpdate = false;
        $scope.DataDel = function (_id) {
            if (confirm("Are you sure, delete this record?")) {
                $http({
                    method: 'GET',
                    url: '/BusinessPartner/DelData',
                    params: { id: _id }
                    //?id=' + _id
                }).success(function (response) {
                    $rootScope.Res = "Data deleted";
                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $scope.BindList();
                    $('#divNotifiy').attr('style', 'display: block');
                }).error(function (data, status, headers, config) {
                    // alert("error");
                });
            }
        };
        $scope.DataEdit = function (x, idx) {

            var i = 0;
            angular.forEach($scope.cust, function (lst) {
                $('#inds' + i).attr("style", "");
                i++;
            });
            $('#inds' + idx).attr("style", "background-color:lightblue");
            $scope.obj = {};
            $scope.btnSubmit = false;
            $scope.btnUpdate = true;
            $scope.obj._id = x._id;
            $scope.obj.Code = x.Code;
            $scope.obj.Title = x.Title;
        };
        $scope.updateData = function () {

            //if (!$scope.form.$invalid) { 
            $timeout(function () { $scope.NotifiyRes = false; }, 5000);
            $scope.obj.Label = "Sales Grp";
            var formData = new FormData();
            formData.append("data", angular.toJson($scope.obj));

            $http({
                url: "/BusinessPartner/InsertData",
                method: "POST",
                headers: { "Content-Type": undefined },
                transformRequest: angular.identity,
                data: formData
            }).success(function (data, status, headers, config) {

                if (data.success === false) {

                }
                else {
                    if (data === false)
                        $rootScope.Res = "Data already exists";
                    else {
                        $rootScope.Res = "Data updated successfully";
                        $scope.BindList();
                    }
                    $scope.reset();
                    $scope.obj = null;
                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $('#divNotifiy').attr('style', 'display: block');
                }
            }).error(function (data, status, headers, config) {

            });
            $scope.btnSubmit = true;
            $scope.btnUpdate = false;
        };
        $scope.ClearFrm = function () {

            $scope.obj = null;
            $scope.btnSubmit = true;
            $scope.btnUpdate = false;
            $scope.reset();
        }
        $scope.DisableData = function (idx, enable, _id) {

            if (enable == false) {

                if (confirm("Are you sure, disable this record?")) {

                    $http({
                        method: 'GET',
                        url: '/BusinessPartner/DisableData',
                        params: { id: _id, Islive: enable }
                        //?id=' + _id + '&Islive=' + enable

                    }).success(function (response) {
                        $rootScope.Res = "Data disabled";
                        $rootScope.Notify = "alert-info";
                        $('#divNotifiy').attr('style', 'display: block');
                        $scope.BindList();
                    }).error(function (data, status, headers, config) {
                        // alert("error");
                    });
                } else $scope.SalesGrps[idx].Islive = true;

            } else {
                if (confirm("Are you sure, enable this record?")) {

                    $http({
                        method: 'GET',
                        url: '/BusinessPartner/DisableData',
                        params: { id: _id, Islive: enable }
                        //?id=' + _id + '&Islive=' + enable
                    }).success(function (response) {
                        $rootScope.Res = "Data enabled";
                        $rootScope.Notify = "alert-info";
                        $('#divNotifiy').attr('style', 'display: block');
                        $scope.BindList();
                    }).error(function (data, status, headers, config) {
                        // alert("error");
                    });
                } else $scope.SalesGrps[idx].Islive = false;


            }

        };
    });
    app.controller('PartnerController', function ($scope, $http, $timeout, $rootScope, DTOptionsBuilder) {

        $timeout(function () { $('#divNotifiy').attr('style', 'display: none'); }, 5000);
        $scope.dtOptions = DTOptionsBuilder.newOptions()
            .withDisplayLength(10)
            .withOption('bLengthChange', true);

        $scope.BindList = function () {

            $http({
                method: 'GET',
                url: '/BusinessPartner/GetDataList',
                params: { label: 'Partner' }
            }).success(function (response) {
                $scope.Partners = response;
            }).error(function (data, status, headers, config) {
                // alert("error");
            });
        };
        $scope.BindList();
        $scope.reset = function () {

            $scope.form.$setPristine();
        }
        $scope.createData = function () {

            $timeout(function () { $('#divNotifiy').attr('style', 'display: none'); }, 5000);
            $scope.obj.Label = "Partner";
            var formData = new FormData();
            formData.append("data", angular.toJson($scope.obj));

            $http({
                url: "/BusinessPartner/InsertData",
                method: "POST",
                headers: { "Content-Type": undefined },
                transformRequest: angular.identity,
                data: formData
            }).success(function (data, status, headers, config) {

                if (data.success === false) {

                }
                else {
                    if (data === false)
                        $rootScope.Res = "Data already exists";
                    else {
                        $rootScope.Res = "Data created successfully";
                        $scope.BindList();
                    }
                    $scope.reset();
                    $scope.obj = null;
                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $('#divNotifiy').attr('style', 'display: block');
                }
            }).error(function (data, status, headers, config) {

            });

            // }
        };
        $scope.btnSubmit = true;
        $scope.btnUpdate = false;
        $scope.DataDel = function (_id) {
            if (confirm("Are you sure, delete this record?")) {
                $http({
                    method: 'GET',
                    url: '/BusinessPartner/DelData',
                    params: { id: _id }
                    //?id=' + _id
                }).success(function (response) {
                    $rootScope.Res = "Data deleted";
                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $scope.BindList();
                    $('#divNotifiy').attr('style', 'display: block');
                }).error(function (data, status, headers, config) {
                    // alert("error");
                });
            }
        };
        $scope.DataEdit = function (x, idx) {

            var i = 0;
            angular.forEach($scope.Types, function (lst) {
                $('#mat' + i).attr("style", "");
                i++;
            });
            $('#mat' + idx).attr("style", "background-color:lightblue");

            $scope.obj = {};

            $scope.btnSubmit = false;
            $scope.btnUpdate = true;

            $scope.obj._id = x._id;
            $scope.obj.Code = x.Code;
            $scope.obj.Title = x.Title;


        };
        $scope.updateData = function () {

            //if (!$scope.form.$invalid) { 
            $timeout(function () { $scope.NotifiyRes = false; }, 5000);
            $scope.obj.Label = "Partner";
            var formData = new FormData();
            formData.append("data", angular.toJson($scope.obj));

            $http({
                url: "/BusinessPartner/InsertData",
                method: "POST",
                headers: { "Content-Type": undefined },
                transformRequest: angular.identity,
                data: formData
            }).success(function (data, status, headers, config) {

                if (data.success === false) {

                }
                else {
                    if (data === false)
                        $rootScope.Res = "Data already exists";
                    else {
                        $rootScope.Res = "Data updated successfully";
                        $scope.BindList();
                    }
                    $scope.reset();
                    $scope.obj = null;

                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $('#divNotifiy').attr('style', 'display: block');
                }
            }).error(function (data, status, headers, config) {

            });

            $scope.btnSubmit = true;
            $scope.btnUpdate = false;

        };
        $scope.ClearFrm = function () {

            $scope.obj = null;
            $scope.btnSubmit = true;
            $scope.btnUpdate = false;
            $scope.reset();
        }
        $scope.DisableData = function (idx, enable, _id) {

            if (enable == false) {

                if (confirm("Are you sure, disable this record?")) {

                    $http({
                        method: 'GET',
                        url: '/BusinessPartner/DisableData',
                        params: { id: _id, Islive: enable }
                        //?id=' + _id + '&Islive=' + enable
                    }).success(function (response) {
                        $rootScope.Res = "Data disabled";
                        $rootScope.Notify = "alert-info";
                        $('#divNotifiy').attr('style', 'display: block');
                        $scope.BindList();
                    }).error(function (data, status, headers, config) {
                        // alert("error");
                    });
                } else $scope.Partners[idx].Islive = true;

            } else {
                if (confirm("Are you sure, enable this record?")) {

                    $http({
                        method: 'GET',
                        url: '/BusinessPartner/DisableData',
                        params: { id: _id, Islive: enable }
                    }).success(function (response) {
                        $rootScope.Res = "Data enabled";
                        $rootScope.Notify = "alert-info";
                        $('#divNotifiy').attr('style', 'display: block');
                        $scope.BindList();
                    }).error(function (data, status, headers, config) {
                        // alert("error");
                    });
                } else $scope.Partners[idx].Islive = false;


            }

        };
    });
   
    //Ven
    app.controller('AuthGrpController', function ($scope, $http, $timeout, $rootScope, DTOptionsBuilder) {


        $scope.dtOptions = DTOptionsBuilder.newOptions()
           .withDisplayLength(10)
           .withOption('bLengthChange', true);

        $rootScope.NotifiyResclose = function () {
            $('#divNotifiy').attr('style', 'display: none');
        }

        $scope.BindList = function () {

            $http({
                method: 'GET',
                url: '/BusinessPartner/GetDataList',
                params: { label: 'Auth Grp' },
            }).success(function (response) {
                $scope.AuthGrps = response;
            }).error(function (data, status, headers, config) {
                // alert("error");
            });
        };
        $scope.BindList();
        $scope.reset = function () {

            $scope.form.$setPristine();
        }
        $scope.createData = function () {

            $timeout(function () { $('#divNotifiy').attr('style', 'display: none'); }, 5000);

            $scope.obj.Label = "Auth Grp";
            var formData = new FormData();
            formData.append("data", angular.toJson($scope.obj));

            $http({
                url: "/BusinessPartner/InsertData",
                method: "POST",
                headers: { "Content-Type": undefined },
                transformRequest: angular.identity,
                data: formData
            }).success(function (data, status, headers, config) {

                if (data.success === false) {

                }
                else {
                    if (data === false)
                        $rootScope.Res = "Data already exists";
                    else {
                        $rootScope.Res = "Data created successfully";
                        $scope.BindList();
                    }
                    $scope.reset();
                    $scope.obj = null;

                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $('#divNotifiy').attr('style', 'display: block');
                }
            }).error(function (data, status, headers, config) {

            });

            // }
        };
        $scope.btnSubmit = true;
        $scope.btnUpdate = false;
        $scope.DataDel = function (_id) {
            if (confirm("Are you sure, delete this record?")) {
                $http({
                    method: 'GET',
                    url: '/BusinessPartner/DelData',
                    params: { id: _id }
                    //?id=' + _id
                }).success(function (response) {
                    $rootScope.Res = "Data deleted";
                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $scope.BindList();
                    $('#divNotifiy').attr('style', 'display: block');
                }).error(function (data, status, headers, config) {
                    // alert("error");
                });
            }
        };
        $scope.DataEdit = function (x, idx) {

            var i = 0;
            angular.forEach($scope.AuthGrps, function (lst) {
                $('#inds' + i).attr("style", "");
                i++;
            });
            $('#inds' + idx).attr("style", "background-color:lightblue");
            $scope.obj = {};
            $scope.btnSubmit = false;
            $scope.btnUpdate = true;
            $scope.obj._id = x._id;
            $scope.obj.Code = x.Code;
            $scope.obj.Title = x.Title;
        };
        $scope.updateData = function () {

            //if (!$scope.form.$invalid) { 
            $timeout(function () { $('#divNotifiy').attr('style', 'display: none'); }, 5000);
            $scope.obj.Label = "Company Code";
            var formData = new FormData();
            formData.append("data", angular.toJson($scope.obj));

            $http({
                url: "/BusinessPartner/InsertData",
                method: "POST",
                headers: { "Content-Type": undefined },
                transformRequest: angular.identity,
                data: formData
            }).success(function (data, status, headers, config) {

                if (data.success === false) {

                }
                else {
                    if (data === false)
                        $rootScope.Res = "Data already exists";
                    else {
                        $rootScope.Res = "Data updated successfully";
                        $scope.BindList();
                    }
                    $scope.reset();
                    $scope.obj = null;
                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $('#divNotifiy').attr('style', 'display: block');
                }
            }).error(function (data, status, headers, config) {

            });
            $scope.btnSubmit = true;
            $scope.btnUpdate = false;
        };
        $scope.ClearFrm = function () {

            $scope.obj = null;
            $scope.btnSubmit = true;
            $scope.btnUpdate = false;
            $scope.reset();
        }
        $scope.DisableData = function (idx, enable, _id) {
            $timeout(function () { $('#divNotifiy').attr('style', 'display: none'); }, 5000);
            if (enable == false) {

                if (confirm("Are you sure, disable this record?")) {

                    $http({
                        method: 'GET',
                        url: '/BusinessPartner/DisableData',
                        params: { id: _id, Islive: enable }
                        //?id=' + _id + '&Islive=' + enable

                    }).success(function (response) {
                        $rootScope.Res = "Data disabled";
                        $rootScope.Notify = "alert-info";
                        $('#divNotifiy').attr('style', 'display: block');
                        $scope.BindList();
                    }).error(function (data, status, headers, config) {
                        // alert("error");
                    });
                } else $scope.AuthGrps[idx].Islive = true;

            } else {
                if (confirm("Are you sure, enable this record?")) {

                    $http({
                        method: 'GET',
                        url: '/BusinessPartner/DisableData',
                        params: { id: _id, Islive: enable }
                        //?id=' + _id + '&Islive=' + enable
                    }).success(function (response) {
                        $rootScope.Res = "Data enabled";
                        $rootScope.Notify = "alert-info";
                        $('#divNotifiy').attr('style', 'display: block');
                        $scope.BindList();
                    }).error(function (data, status, headers, config) {
                        // alert("error");
                    });
                } else $scope.AuthGrps[idx].Islive = false;


            }

        };
    });
    app.controller('AccGrpController', function ($scope, $http, $timeout, $rootScope, DTOptionsBuilder) {


        $scope.dtOptions = DTOptionsBuilder.newOptions()
           .withDisplayLength(10)
           .withOption('bLengthChange', true);

        $rootScope.NotifiyResclose = function () {
            $('#divNotifiy').attr('style', 'display: none');
        }

        $scope.BindList = function () {

            $http({
                method: 'GET',
                url: '/BusinessPartner/GetDataList',
                params: { label: 'Acc Grp' },
            }).success(function (response) {
                $scope.AccGrps = response;
            }).error(function (data, status, headers, config) {
                // alert("error");
            });
        };
        $scope.BindList();
        $scope.reset = function () {

            $scope.form.$setPristine();
        }
        $scope.createData = function () {

            $timeout(function () { $('#divNotifiy').attr('style', 'display: none'); }, 5000);

            $scope.obj.Label = "Acc Grp";
            var formData = new FormData();
            formData.append("data", angular.toJson($scope.obj));

            $http({
                url: "/BusinessPartner/InsertData",
                method: "POST",
                headers: { "Content-Type": undefined },
                transformRequest: angular.identity,
                data: formData
            }).success(function (data, status, headers, config) {

                if (data.success === false) {

                }
                else {
                    if (data === false)
                        $rootScope.Res = "Data already exists";
                    else {
                        $rootScope.Res = "Data created successfully";
                        $scope.BindList();
                    }
                    $scope.reset();
                    $scope.obj = null;

                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $('#divNotifiy').attr('style', 'display: block');
                }
            }).error(function (data, status, headers, config) {

            });

            // }
        };
        $scope.btnSubmit = true;
        $scope.btnUpdate = false;
        $scope.DataDel = function (_id) {
            if (confirm("Are you sure, delete this record?")) {
                $http({
                    method: 'GET',
                    url: '/BusinessPartner/DelData',
                    params: { id: _id }
                    //?id=' + _id
                }).success(function (response) {
                    $rootScope.Res = "Data deleted";
                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $scope.BindList();
                    $('#divNotifiy').attr('style', 'display: block');
                }).error(function (data, status, headers, config) {
                    // alert("error");
                });
            }
        };
        $scope.DataEdit = function (x, idx) {

            var i = 0;
            angular.forEach($scope.AuthGrps, function (lst) {
                $('#inds' + i).attr("style", "");
                i++;
            });
            $('#inds' + idx).attr("style", "background-color:lightblue");
            $scope.obj = {};
            $scope.btnSubmit = false;
            $scope.btnUpdate = true;
            $scope.obj._id = x._id;
            $scope.obj.Code = x.Code;
            $scope.obj.Title = x.Title;
        };
        $scope.updateData = function () {

            //if (!$scope.form.$invalid) { 
            $timeout(function () { $('#divNotifiy').attr('style', 'display: none'); }, 5000);
            $scope.obj.Label = "Company Code";
            var formData = new FormData();
            formData.append("data", angular.toJson($scope.obj));

            $http({
                url: "/BusinessPartner/InsertData",
                method: "POST",
                headers: { "Content-Type": undefined },
                transformRequest: angular.identity,
                data: formData
            }).success(function (data, status, headers, config) {

                if (data.success === false) {

                }
                else {
                    if (data === false)
                        $rootScope.Res = "Data already exists";
                    else {
                        $rootScope.Res = "Data updated successfully";
                        $scope.BindList();
                    }
                    $scope.reset();
                    $scope.obj = null;
                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $('#divNotifiy').attr('style', 'display: block');
                }
            }).error(function (data, status, headers, config) {

            });
            $scope.btnSubmit = true;
            $scope.btnUpdate = false;
        };
        $scope.ClearFrm = function () {

            $scope.obj = null;
            $scope.btnSubmit = true;
            $scope.btnUpdate = false;
            $scope.reset();
        }
        $scope.DisableData = function (idx, enable, _id) {
            $timeout(function () { $('#divNotifiy').attr('style', 'display: none'); }, 5000);
            if (enable == false) {

                if (confirm("Are you sure, disable this record?")) {

                    $http({
                        method: 'GET',
                        url: '/BusinessPartner/DisableData',
                        params: { id: _id, Islive: enable }
                        //?id=' + _id + '&Islive=' + enable

                    }).success(function (response) {
                        $rootScope.Res = "Data disabled";
                        $rootScope.Notify = "alert-info";
                        $('#divNotifiy').attr('style', 'display: block');
                        $scope.BindList();
                    }).error(function (data, status, headers, config) {
                        // alert("error");
                    });
                } else $scope.AccGrps[idx].Islive = true;

            } else {
                if (confirm("Are you sure, enable this record?")) {

                    $http({
                        method: 'GET',
                        url: '/BusinessPartner/DisableData',
                        params: { id: _id, Islive: enable }
                        //?id=' + _id + '&Islive=' + enable
                    }).success(function (response) {
                        $rootScope.Res = "Data enabled";
                        $rootScope.Notify = "alert-info";
                        $('#divNotifiy').attr('style', 'display: block');
                        $scope.BindList();
                    }).error(function (data, status, headers, config) {
                        // alert("error");
                    });
                } else $scope.AccGrps[idx].Islive = false;


            }

        };
    });
    app.controller('FacCalController', function ($scope, $http, $timeout, $rootScope, DTOptionsBuilder) {


        $scope.dtOptions = DTOptionsBuilder.newOptions()
           .withDisplayLength(10)
           .withOption('bLengthChange', true);

        $rootScope.NotifiyResclose = function () {
            $('#divNotifiy').attr('style', 'display: none');
        }

        $scope.BindList = function () {

            $http({
                method: 'GET',
                url: '/BusinessPartner/GetDataList',
                params: { label: 'Fac Cal' },
            }).success(function (response) {
                $scope.FacCals = response;
            }).error(function (data, status, headers, config) {
                // alert("error");
            });
        };
        $scope.BindList();
        $scope.reset = function () {

            $scope.form.$setPristine();
        }
        $scope.createData = function () {

            $timeout(function () { $('#divNotifiy').attr('style', 'display: none'); }, 5000);

            $scope.obj.Label = "Fac Cal";
            var formData = new FormData();
            formData.append("data", angular.toJson($scope.obj));

            $http({
                url: "/BusinessPartner/InsertData",
                method: "POST",
                headers: { "Content-Type": undefined },
                transformRequest: angular.identity,
                data: formData
            }).success(function (data, status, headers, config) {

                if (data.success === false) {

                }
                else {
                    if (data === false)
                        $rootScope.Res = "Data already exists";
                    else {
                        $rootScope.Res = "Data created successfully";
                        $scope.BindList();
                    }
                    $scope.reset();
                    $scope.obj = null;

                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $('#divNotifiy').attr('style', 'display: block');
                }
            }).error(function (data, status, headers, config) {

            });

            // }
        };
        $scope.btnSubmit = true;
        $scope.btnUpdate = false;
        $scope.DataDel = function (_id) {
            if (confirm("Are you sure, delete this record?")) {
                $http({
                    method: 'GET',
                    url: '/BusinessPartner/DelData',
                    params: { id: _id }
                    //?id=' + _id
                }).success(function (response) {
                    $rootScope.Res = "Data deleted";
                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $scope.BindList();
                    $('#divNotifiy').attr('style', 'display: block');
                }).error(function (data, status, headers, config) {
                    // alert("error");
                });
            }
        };
        $scope.DataEdit = function (x, idx) {

            var i = 0;
            angular.forEach($scope.AuthGrps, function (lst) {
                $('#inds' + i).attr("style", "");
                i++;
            });
            $('#inds' + idx).attr("style", "background-color:lightblue");
            $scope.obj = {};
            $scope.btnSubmit = false;
            $scope.btnUpdate = true;
            $scope.obj._id = x._id;
            $scope.obj.Code = x.Code;
            $scope.obj.Title = x.Title;
        };
        $scope.updateData = function () {

            //if (!$scope.form.$invalid) { 
            $timeout(function () { $('#divNotifiy').attr('style', 'display: none'); }, 5000);
            $scope.obj.Label = "Company Code";
            var formData = new FormData();
            formData.append("data", angular.toJson($scope.obj));

            $http({
                url: "/BusinessPartner/InsertData",
                method: "POST",
                headers: { "Content-Type": undefined },
                transformRequest: angular.identity,
                data: formData
            }).success(function (data, status, headers, config) {

                if (data.success === false) {

                }
                else {
                    if (data === false)
                        $rootScope.Res = "Data already exists";
                    else {
                        $rootScope.Res = "Data updated successfully";
                        $scope.BindList();
                    }
                    $scope.reset();
                    $scope.obj = null;
                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $('#divNotifiy').attr('style', 'display: block');
                }
            }).error(function (data, status, headers, config) {

            });
            $scope.btnSubmit = true;
            $scope.btnUpdate = false;
        };
        $scope.ClearFrm = function () {

            $scope.obj = null;
            $scope.btnSubmit = true;
            $scope.btnUpdate = false;
            $scope.reset();
        }
        $scope.DisableData = function (idx, enable, _id) {
            $timeout(function () { $('#divNotifiy').attr('style', 'display: none'); }, 5000);
            if (enable == false) {

                if (confirm("Are you sure, disable this record?")) {

                    $http({
                        method: 'GET',
                        url: '/BusinessPartner/DisableData',
                        params: { id: _id, Islive: enable }
                        //?id=' + _id + '&Islive=' + enable

                    }).success(function (response) {
                        $rootScope.Res = "Data disabled";
                        $rootScope.Notify = "alert-info";
                        $('#divNotifiy').attr('style', 'display: block');
                        $scope.BindList();
                    }).error(function (data, status, headers, config) {
                        // alert("error");
                    });
                } else $scope.FacCals[idx].Islive = true;

            } else {
                if (confirm("Are you sure, enable this record?")) {

                    $http({
                        method: 'GET',
                        url: '/BusinessPartner/DisableData',
                        params: { id: _id, Islive: enable }
                        //?id=' + _id + '&Islive=' + enable
                    }).success(function (response) {
                        $rootScope.Res = "Data enabled";
                        $rootScope.Notify = "alert-info";
                        $('#divNotifiy').attr('style', 'display: block');
                        $scope.BindList();
                    }).error(function (data, status, headers, config) {
                        // alert("error");
                    });
                } else $scope.FacCals[idx].Islive = false;


            }

        };
    });
    app.controller('RecACController', function ($scope, $http, $timeout, $rootScope, DTOptionsBuilder) {


        $scope.dtOptions = DTOptionsBuilder.newOptions()
           .withDisplayLength(10)
           .withOption('bLengthChange', true);

        $rootScope.NotifiyResclose = function () {
            $('#divNotifiy').attr('style', 'display: none');
        }

        $scope.BindList = function () {

            $http({
                method: 'GET',
                url: '/BusinessPartner/GetDataList',
                params: { label: 'Rec AC' },
            }).success(function (response) {
                $scope.RecACs = response;
            }).error(function (data, status, headers, config) {
                // alert("error");
            });
        };
        $scope.BindList();
        $scope.reset = function () {

            $scope.form.$setPristine();
        }
        $scope.createData = function () {

            $timeout(function () { $('#divNotifiy').attr('style', 'display: none'); }, 5000);

            $scope.obj.Label = "Rec AC";
            var formData = new FormData();
            formData.append("data", angular.toJson($scope.obj));

            $http({
                url: "/BusinessPartner/InsertData",
                method: "POST",
                headers: { "Content-Type": undefined },
                transformRequest: angular.identity,
                data: formData
            }).success(function (data, status, headers, config) {

                if (data.success === false) {

                }
                else {
                    if (data === false)
                        $rootScope.Res = "Data already exists";
                    else {
                        $rootScope.Res = "Data created successfully";
                        $scope.BindList();
                    }
                    $scope.reset();
                    $scope.obj = null;

                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $('#divNotifiy').attr('style', 'display: block');
                }
            }).error(function (data, status, headers, config) {

            });

            // }
        };
        $scope.btnSubmit = true;
        $scope.btnUpdate = false;
        $scope.DataDel = function (_id) {
            if (confirm("Are you sure, delete this record?")) {
                $http({
                    method: 'GET',
                    url: '/BusinessPartner/DelData',
                    params: { id: _id }
                    //?id=' + _id
                }).success(function (response) {
                    $rootScope.Res = "Data deleted";
                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $scope.BindList();
                    $('#divNotifiy').attr('style', 'display: block');
                }).error(function (data, status, headers, config) {
                    // alert("error");
                });
            }
        };
        $scope.DataEdit = function (x, idx) {

            var i = 0;
            angular.forEach($scope.AuthGrps, function (lst) {
                $('#inds' + i).attr("style", "");
                i++;
            });
            $('#inds' + idx).attr("style", "background-color:lightblue");
            $scope.obj = {};
            $scope.btnSubmit = false;
            $scope.btnUpdate = true;
            $scope.obj._id = x._id;
            $scope.obj.Code = x.Code;
            $scope.obj.Title = x.Title;
        };
        $scope.updateData = function () {

            //if (!$scope.form.$invalid) { 
            $timeout(function () { $('#divNotifiy').attr('style', 'display: none'); }, 5000);
            $scope.obj.Label = "Company Code";
            var formData = new FormData();
            formData.append("data", angular.toJson($scope.obj));

            $http({
                url: "/BusinessPartner/InsertData",
                method: "POST",
                headers: { "Content-Type": undefined },
                transformRequest: angular.identity,
                data: formData
            }).success(function (data, status, headers, config) {

                if (data.success === false) {

                }
                else {
                    if (data === false)
                        $rootScope.Res = "Data already exists";
                    else {
                        $rootScope.Res = "Data updated successfully";
                        $scope.BindList();
                    }
                    $scope.reset();
                    $scope.obj = null;
                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $('#divNotifiy').attr('style', 'display: block');
                }
            }).error(function (data, status, headers, config) {

            });
            $scope.btnSubmit = true;
            $scope.btnUpdate = false;
        };
        $scope.ClearFrm = function () {

            $scope.obj = null;
            $scope.btnSubmit = true;
            $scope.btnUpdate = false;
            $scope.reset();
        }
        $scope.DisableData = function (idx, enable, _id) {
            $timeout(function () { $('#divNotifiy').attr('style', 'display: none'); }, 5000);
            if (enable == false) {

                if (confirm("Are you sure, disable this record?")) {

                    $http({
                        method: 'GET',
                        url: '/BusinessPartner/DisableData',
                        params: { id: _id, Islive: enable }
                        //?id=' + _id + '&Islive=' + enable

                    }).success(function (response) {
                        $rootScope.Res = "Data disabled";
                        $rootScope.Notify = "alert-info";
                        $('#divNotifiy').attr('style', 'display: block');
                        $scope.BindList();
                    }).error(function (data, status, headers, config) {
                        // alert("error");
                    });
                } else $scope.RecACs[idx].Islive = true;

            } else {
                if (confirm("Are you sure, enable this record?")) {

                    $http({
                        method: 'GET',
                        url: '/BusinessPartner/DisableData',
                        params: { id: _id, Islive: enable }
                        //?id=' + _id + '&Islive=' + enable
                    }).success(function (response) {
                        $rootScope.Res = "Data enabled";
                        $rootScope.Notify = "alert-info";
                        $('#divNotifiy').attr('style', 'display: block');
                        $scope.BindList();
                    }).error(function (data, status, headers, config) {
                        // alert("error");
                    });
                } else $scope.RecACs[idx].Islive = false;


            }

        };
    });
    app.controller('PaytermsController', function ($scope, $http, $timeout, $rootScope, DTOptionsBuilder) {


        $scope.dtOptions = DTOptionsBuilder.newOptions()
           .withDisplayLength(10)
           .withOption('bLengthChange', true);

        $rootScope.NotifiyResclose = function () {
            $('#divNotifiy').attr('style', 'display: none');
        }

        $scope.BindList = function () {

            $http({
                method: 'GET',
                url: '/BusinessPartner/GetDataList',
                params: { label: 'Pay terms' },
            }).success(function (response) {
                $scope.Payterms = response;
            }).error(function (data, status, headers, config) {
                // alert("error");
            });
        };
        $scope.BindList();
        $scope.reset = function () {

            $scope.form.$setPristine();
        }
        $scope.createData = function () {

            $timeout(function () { $('#divNotifiy').attr('style', 'display: none'); }, 5000);

            $scope.obj.Label = "Pay terms";
            var formData = new FormData();
            formData.append("data", angular.toJson($scope.obj));

            $http({
                url: "/BusinessPartner/InsertData",
                method: "POST",
                headers: { "Content-Type": undefined },
                transformRequest: angular.identity,
                data: formData
            }).success(function (data, status, headers, config) {

                if (data.success === false) {

                }
                else {
                    if (data === false)
                        $rootScope.Res = "Data already exists";
                    else {
                        $rootScope.Res = "Data created successfully";
                        $scope.BindList();
                    }
                    $scope.reset();
                    $scope.obj = null;

                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $('#divNotifiy').attr('style', 'display: block');
                }
            }).error(function (data, status, headers, config) {

            });

            // }
        };
        $scope.btnSubmit = true;
        $scope.btnUpdate = false;
        $scope.DataDel = function (_id) {
            if (confirm("Are you sure, delete this record?")) {
                $http({
                    method: 'GET',
                    url: '/BusinessPartner/DelData',
                    params: { id: _id }
                    //?id=' + _id
                }).success(function (response) {
                    $rootScope.Res = "Data deleted";
                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $scope.BindList();
                    $('#divNotifiy').attr('style', 'display: block');
                }).error(function (data, status, headers, config) {
                    // alert("error");
                });
            }
        };
        $scope.DataEdit = function (x, idx) {

            var i = 0;
            angular.forEach($scope.AuthGrps, function (lst) {
                $('#inds' + i).attr("style", "");
                i++;
            });
            $('#inds' + idx).attr("style", "background-color:lightblue");
            $scope.obj = {};
            $scope.btnSubmit = false;
            $scope.btnUpdate = true;
            $scope.obj._id = x._id;
            $scope.obj.Code = x.Code;
            $scope.obj.Title = x.Title;
        };
        $scope.updateData = function () {

            //if (!$scope.form.$invalid) { 
            $timeout(function () { $('#divNotifiy').attr('style', 'display: none'); }, 5000);
            $scope.obj.Label = "Company Code";
            var formData = new FormData();
            formData.append("data", angular.toJson($scope.obj));

            $http({
                url: "/BusinessPartner/InsertData",
                method: "POST",
                headers: { "Content-Type": undefined },
                transformRequest: angular.identity,
                data: formData
            }).success(function (data, status, headers, config) {

                if (data.success === false) {

                }
                else {
                    if (data === false)
                        $rootScope.Res = "Data already exists";
                    else {
                        $rootScope.Res = "Data updated successfully";
                        $scope.BindList();
                    }
                    $scope.reset();
                    $scope.obj = null;
                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $('#divNotifiy').attr('style', 'display: block');
                }
            }).error(function (data, status, headers, config) {

            });
            $scope.btnSubmit = true;
            $scope.btnUpdate = false;
        };
        $scope.ClearFrm = function () {

            $scope.obj = null;
            $scope.btnSubmit = true;
            $scope.btnUpdate = false;
            $scope.reset();
        }
        $scope.DisableData = function (idx, enable, _id) {
            $timeout(function () { $('#divNotifiy').attr('style', 'display: none'); }, 5000);
            if (enable == false) {

                if (confirm("Are you sure, disable this record?")) {

                    $http({
                        method: 'GET',
                        url: '/BusinessPartner/DisableData',
                        params: { id: _id, Islive: enable }
                        //?id=' + _id + '&Islive=' + enable

                    }).success(function (response) {
                        $rootScope.Res = "Data disabled";
                        $rootScope.Notify = "alert-info";
                        $('#divNotifiy').attr('style', 'display: block');
                        $scope.BindList();
                    }).error(function (data, status, headers, config) {
                        // alert("error");
                    });
                } else $scope.Payterms[idx].Islive = true;

            } else {
                if (confirm("Are you sure, enable this record?")) {

                    $http({
                        method: 'GET',
                        url: '/BusinessPartner/DisableData',
                        params: { id: _id, Islive: enable }
                        //?id=' + _id + '&Islive=' + enable
                    }).success(function (response) {
                        $rootScope.Res = "Data enabled";
                        $rootScope.Notify = "alert-info";
                        $('#divNotifiy').attr('style', 'display: block');
                        $scope.BindList();
                    }).error(function (data, status, headers, config) {
                        // alert("error");
                    });
                } else $scope.Payterms[idx].Islive = false;


            }

        };
    });
    app.controller('AltPayeeController', function ($scope, $http, $timeout, $rootScope, DTOptionsBuilder) {


        $scope.dtOptions = DTOptionsBuilder.newOptions()
           .withDisplayLength(10)
           .withOption('bLengthChange', true);

        $rootScope.NotifiyResclose = function () {
            $('#divNotifiy').attr('style', 'display: none');
        }

        $scope.BindList = function () {

            $http({
                method: 'GET',
                url: '/BusinessPartner/GetDataList',
                params: { label: 'Alt Payee' },
            }).success(function (response) {
                $scope.AltPayees = response;
            }).error(function (data, status, headers, config) {
                // alert("error");
            });
        };
        $scope.BindList();
        $scope.reset = function () {

            $scope.form.$setPristine();
        }
        $scope.createData = function () {

            $timeout(function () { $('#divNotifiy').attr('style', 'display: none'); }, 5000);

            $scope.obj.Label = "Alt Payee";
            var formData = new FormData();
            formData.append("data", angular.toJson($scope.obj));

            $http({
                url: "/BusinessPartner/InsertData",
                method: "POST",
                headers: { "Content-Type": undefined },
                transformRequest: angular.identity,
                data: formData
            }).success(function (data, status, headers, config) {

                if (data.success === false) {

                }
                else {
                    if (data === false)
                        $rootScope.Res = "Data already exists";
                    else {
                        $rootScope.Res = "Data created successfully";
                        $scope.BindList();
                    }
                    $scope.reset();
                    $scope.obj = null;

                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $('#divNotifiy').attr('style', 'display: block');
                }
            }).error(function (data, status, headers, config) {

            });

            // }
        };
        $scope.btnSubmit = true;
        $scope.btnUpdate = false;
        $scope.DataDel = function (_id) {
            if (confirm("Are you sure, delete this record?")) {
                $http({
                    method: 'GET',
                    url: '/BusinessPartner/DelData',
                    params: { id: _id }
                    //?id=' + _id
                }).success(function (response) {
                    $rootScope.Res = "Data deleted";
                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $scope.BindList();
                    $('#divNotifiy').attr('style', 'display: block');
                }).error(function (data, status, headers, config) {
                    // alert("error");
                });
            }
        };
        $scope.DataEdit = function (x, idx) {

            var i = 0;
            angular.forEach($scope.AuthGrps, function (lst) {
                $('#inds' + i).attr("style", "");
                i++;
            });
            $('#inds' + idx).attr("style", "background-color:lightblue");
            $scope.obj = {};
            $scope.btnSubmit = false;
            $scope.btnUpdate = true;
            $scope.obj._id = x._id;
            $scope.obj.Code = x.Code;
            $scope.obj.Title = x.Title;
        };
        $scope.updateData = function () {

            //if (!$scope.form.$invalid) { 
            $timeout(function () { $('#divNotifiy').attr('style', 'display: none'); }, 5000);
            $scope.obj.Label = "Company Code";
            var formData = new FormData();
            formData.append("data", angular.toJson($scope.obj));

            $http({
                url: "/BusinessPartner/InsertData",
                method: "POST",
                headers: { "Content-Type": undefined },
                transformRequest: angular.identity,
                data: formData
            }).success(function (data, status, headers, config) {

                if (data.success === false) {

                }
                else {
                    if (data === false)
                        $rootScope.Res = "Data already exists";
                    else {
                        $rootScope.Res = "Data updated successfully";
                        $scope.BindList();
                    }
                    $scope.reset();
                    $scope.obj = null;
                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $('#divNotifiy').attr('style', 'display: block');
                }
            }).error(function (data, status, headers, config) {

            });
            $scope.btnSubmit = true;
            $scope.btnUpdate = false;
        };
        $scope.ClearFrm = function () {

            $scope.obj = null;
            $scope.btnSubmit = true;
            $scope.btnUpdate = false;
            $scope.reset();
        }
        $scope.DisableData = function (idx, enable, _id) {
            $timeout(function () { $('#divNotifiy').attr('style', 'display: none'); }, 5000);
            if (enable == false) {

                if (confirm("Are you sure, disable this record?")) {

                    $http({
                        method: 'GET',
                        url: '/BusinessPartner/DisableData',
                        params: { id: _id, Islive: enable }
                        //?id=' + _id + '&Islive=' + enable

                    }).success(function (response) {
                        $rootScope.Res = "Data disabled";
                        $rootScope.Notify = "alert-info";
                        $('#divNotifiy').attr('style', 'display: block');
                        $scope.BindList();
                    }).error(function (data, status, headers, config) {
                        // alert("error");
                    });
                } else $scope.AltPayees[idx].Islive = true;

            } else {
                if (confirm("Are you sure, enable this record?")) {

                    $http({
                        method: 'GET',
                        url: '/BusinessPartner/DisableData',
                        params: { id: _id, Islive: enable }
                        //?id=' + _id + '&Islive=' + enable
                    }).success(function (response) {
                        $rootScope.Res = "Data enabled";
                        $rootScope.Notify = "alert-info";
                        $('#divNotifiy').attr('style', 'display: block');
                        $scope.BindList();
                    }).error(function (data, status, headers, config) {
                        // alert("error");
                    });
                } else $scope.AltPayees[idx].Islive = false;


            }

        };
    });
    app.controller('TaxtypeController', function ($scope, $http, $timeout, $rootScope, DTOptionsBuilder) {


        $scope.dtOptions = DTOptionsBuilder.newOptions()
           .withDisplayLength(10)
           .withOption('bLengthChange', true);

        $rootScope.NotifiyResclose = function () {
            $('#divNotifiy').attr('style', 'display: none');
        }

        $scope.BindList = function () {

            $http({
                method: 'GET',
                url: '/BusinessPartner/GetDataList',
                params: { label: 'Tax type' },
            }).success(function (response) {
                $scope.Taxtypes = response;
            }).error(function (data, status, headers, config) {
                // alert("error");
            });
        };
        $scope.BindList();
        $scope.reset = function () {

            $scope.form.$setPristine();
        }
        $scope.createData = function () {

            $timeout(function () { $('#divNotifiy').attr('style', 'display: none'); }, 5000);

            $scope.obj.Label = "Tax type";
            var formData = new FormData();
            formData.append("data", angular.toJson($scope.obj));

            $http({
                url: "/BusinessPartner/InsertData",
                method: "POST",
                headers: { "Content-Type": undefined },
                transformRequest: angular.identity,
                data: formData
            }).success(function (data, status, headers, config) {

                if (data.success === false) {

                }
                else {
                    if (data === false)
                        $rootScope.Res = "Data already exists";
                    else {
                        $rootScope.Res = "Data created successfully";
                        $scope.BindList();
                    }
                    $scope.reset();
                    $scope.obj = null;

                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $('#divNotifiy').attr('style', 'display: block');
                }
            }).error(function (data, status, headers, config) {

            });

            // }
        };
        $scope.btnSubmit = true;
        $scope.btnUpdate = false;
        $scope.DataDel = function (_id) {
            if (confirm("Are you sure, delete this record?")) {
                $http({
                    method: 'GET',
                    url: '/BusinessPartner/DelData',
                    params: { id: _id }
                    //?id=' + _id
                }).success(function (response) {
                    $rootScope.Res = "Data deleted";
                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $scope.BindList();
                    $('#divNotifiy').attr('style', 'display: block');
                }).error(function (data, status, headers, config) {
                    // alert("error");
                });
            }
        };
        $scope.DataEdit = function (x, idx) {

            var i = 0;
            angular.forEach($scope.AuthGrps, function (lst) {
                $('#inds' + i).attr("style", "");
                i++;
            });
            $('#inds' + idx).attr("style", "background-color:lightblue");
            $scope.obj = {};
            $scope.btnSubmit = false;
            $scope.btnUpdate = true;
            $scope.obj._id = x._id;
            $scope.obj.Code = x.Code;
            $scope.obj.Title = x.Title;
        };
        $scope.updateData = function () {

            //if (!$scope.form.$invalid) { 
            $timeout(function () { $('#divNotifiy').attr('style', 'display: none'); }, 5000);
            $scope.obj.Label = "Company Code";
            var formData = new FormData();
            formData.append("data", angular.toJson($scope.obj));

            $http({
                url: "/BusinessPartner/InsertData",
                method: "POST",
                headers: { "Content-Type": undefined },
                transformRequest: angular.identity,
                data: formData
            }).success(function (data, status, headers, config) {

                if (data.success === false) {

                }
                else {
                    if (data === false)
                        $rootScope.Res = "Data already exists";
                    else {
                        $rootScope.Res = "Data updated successfully";
                        $scope.BindList();
                    }
                    $scope.reset();
                    $scope.obj = null;
                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $('#divNotifiy').attr('style', 'display: block');
                }
            }).error(function (data, status, headers, config) {

            });
            $scope.btnSubmit = true;
            $scope.btnUpdate = false;
        };
        $scope.ClearFrm = function () {

            $scope.obj = null;
            $scope.btnSubmit = true;
            $scope.btnUpdate = false;
            $scope.reset();
        }
        $scope.DisableData = function (idx, enable, _id) {
            $timeout(function () { $('#divNotifiy').attr('style', 'display: none'); }, 5000);
            if (enable == false) {

                if (confirm("Are you sure, disable this record?")) {

                    $http({
                        method: 'GET',
                        url: '/BusinessPartner/DisableData',
                        params: { id: _id, Islive: enable }
                        //?id=' + _id + '&Islive=' + enable

                    }).success(function (response) {
                        $rootScope.Res = "Data disabled";
                        $rootScope.Notify = "alert-info";
                        $('#divNotifiy').attr('style', 'display: block');
                        $scope.BindList();
                    }).error(function (data, status, headers, config) {
                        // alert("error");
                    });
                } else $scope.Taxtypes[idx].Islive = true;

            } else {
                if (confirm("Are you sure, enable this record?")) {

                    $http({
                        method: 'GET',
                        url: '/BusinessPartner/DisableData',
                        params: { id: _id, Islive: enable }
                        //?id=' + _id + '&Islive=' + enable
                    }).success(function (response) {
                        $rootScope.Res = "Data enabled";
                        $rootScope.Notify = "alert-info";
                        $('#divNotifiy').attr('style', 'display: block');
                        $scope.BindList();
                    }).error(function (data, status, headers, config) {
                        // alert("error");
                    });
                } else $scope.Taxtypes[idx].Islive = false;


            }

        };
    });
    app.controller('TaxBaseController', function ($scope, $http, $timeout, $rootScope, DTOptionsBuilder) {


        $scope.dtOptions = DTOptionsBuilder.newOptions()
           .withDisplayLength(10)
           .withOption('bLengthChange', true);

        $rootScope.NotifiyResclose = function () {
            $('#divNotifiy').attr('style', 'display: none');
        }

        $scope.BindList = function () {

            $http({
                method: 'GET',
                url: '/BusinessPartner/GetDataList',
                params: { label: 'Tax Base' },
            }).success(function (response) {
                $scope.TaxBases = response;
            }).error(function (data, status, headers, config) {
                // alert("error");
            });
        };
        $scope.BindList();
        $scope.reset = function () {

            $scope.form.$setPristine();
        }
        $scope.createData = function () {

            $timeout(function () { $('#divNotifiy').attr('style', 'display: none'); }, 5000);

            $scope.obj.Label = "Tax Base";
            var formData = new FormData();
            formData.append("data", angular.toJson($scope.obj));

            $http({
                url: "/BusinessPartner/InsertData",
                method: "POST",
                headers: { "Content-Type": undefined },
                transformRequest: angular.identity,
                data: formData
            }).success(function (data, status, headers, config) {

                if (data.success === false) {

                }
                else {
                    if (data === false)
                        $rootScope.Res = "Data already exists";
                    else {
                        $rootScope.Res = "Data created successfully";
                        $scope.BindList();
                    }
                    $scope.reset();
                    $scope.obj = null;

                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $('#divNotifiy').attr('style', 'display: block');
                }
            }).error(function (data, status, headers, config) {

            });

            // }
        };
        $scope.btnSubmit = true;
        $scope.btnUpdate = false;
        $scope.DataDel = function (_id) {
            if (confirm("Are you sure, delete this record?")) {
                $http({
                    method: 'GET',
                    url: '/BusinessPartner/DelData',
                    params: { id: _id }
                    //?id=' + _id
                }).success(function (response) {
                    $rootScope.Res = "Data deleted";
                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $scope.BindList();
                    $('#divNotifiy').attr('style', 'display: block');
                }).error(function (data, status, headers, config) {
                    // alert("error");
                });
            }
        };
        $scope.DataEdit = function (x, idx) {

            var i = 0;
            angular.forEach($scope.AuthGrps, function (lst) {
                $('#inds' + i).attr("style", "");
                i++;
            });
            $('#inds' + idx).attr("style", "background-color:lightblue");
            $scope.obj = {};
            $scope.btnSubmit = false;
            $scope.btnUpdate = true;
            $scope.obj._id = x._id;
            $scope.obj.Code = x.Code;
            $scope.obj.Title = x.Title;
        };
        $scope.updateData = function () {

            //if (!$scope.form.$invalid) { 
            $timeout(function () { $('#divNotifiy').attr('style', 'display: none'); }, 5000);
            $scope.obj.Label = "Tax Base";
            var formData = new FormData();
            formData.append("data", angular.toJson($scope.obj));

            $http({
                url: "/BusinessPartner/InsertData",
                method: "POST",
                headers: { "Content-Type": undefined },
                transformRequest: angular.identity,
                data: formData
            }).success(function (data, status, headers, config) {

                if (data.success === false) {

                }
                else {
                    if (data === false)
                        $rootScope.Res = "Data already exists";
                    else {
                        $rootScope.Res = "Data updated successfully";
                        $scope.BindList();
                    }
                    $scope.reset();
                    $scope.obj = null;
                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $('#divNotifiy').attr('style', 'display: block');
                }
            }).error(function (data, status, headers, config) {

            });
            $scope.btnSubmit = true;
            $scope.btnUpdate = false;
        };
        $scope.ClearFrm = function () {

            $scope.obj = null;
            $scope.btnSubmit = true;
            $scope.btnUpdate = false;
            $scope.reset();
        }
        $scope.DisableData = function (idx, enable, _id) {
            $timeout(function () { $('#divNotifiy').attr('style', 'display: none'); }, 5000);
            if (enable == false) {

                if (confirm("Are you sure, disable this record?")) {

                    $http({
                        method: 'GET',
                        url: '/BusinessPartner/DisableData',
                        params: { id: _id, Islive: enable }
                        //?id=' + _id + '&Islive=' + enable

                    }).success(function (response) {
                        $rootScope.Res = "Data disabled";
                        $rootScope.Notify = "alert-info";
                        $('#divNotifiy').attr('style', 'display: block');
                        $scope.BindList();
                    }).error(function (data, status, headers, config) {
                        // alert("error");
                    });
                } else $scope.TaxBases[idx].Islive = true;

            } else {
                if (confirm("Are you sure, enable this record?")) {

                    $http({
                        method: 'GET',
                        url: '/BusinessPartner/DisableData',
                        params: { id: _id, Islive: enable }
                        //?id=' + _id + '&Islive=' + enable
                    }).success(function (response) {
                        $rootScope.Res = "Data enabled";
                        $rootScope.Notify = "alert-info";
                        $('#divNotifiy').attr('style', 'display: block');
                        $scope.BindList();
                    }).error(function (data, status, headers, config) {
                        // alert("error");
                    });
                } else $scope.TaxBases[idx].Islive = false;


            }

        };
    });
    app.controller('businessTypeController', function ($scope, $http, $timeout, $rootScope, DTOptionsBuilder) {


        $scope.dtOptions = DTOptionsBuilder.newOptions()
           .withDisplayLength(10)
           .withOption('bLengthChange', true);

        $rootScope.NotifiyResclose = function () {
            $('#divNotifiy').attr('style', 'display: none');
        }

        $scope.BindList = function () {

            $http({
                method: 'GET',
                url: '/BusinessPartner/GetDataList',
                params: { label: 'business Type' },
            }).success(function (response) {
                $scope.businessTypes = response;
            }).error(function (data, status, headers, config) {
                // alert("error");
            });
        };
        $scope.BindList();
        $scope.reset = function () {

            $scope.form.$setPristine();
        }
        $scope.createData = function () {

            $timeout(function () { $('#divNotifiy').attr('style', 'display: none'); }, 5000);

            $scope.obj.Label = "business Type";
            var formData = new FormData();
            formData.append("data", angular.toJson($scope.obj));

            $http({
                url: "/BusinessPartner/InsertData",
                method: "POST",
                headers: { "Content-Type": undefined },
                transformRequest: angular.identity,
                data: formData
            }).success(function (data, status, headers, config) {

                if (data.success === false) {

                }
                else {
                    if (data === false)
                        $rootScope.Res = "Data already exists";
                    else {
                        $rootScope.Res = "Data created successfully";
                        $scope.BindList();
                    }
                    $scope.reset();
                    $scope.obj = null;

                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $('#divNotifiy').attr('style', 'display: block');
                }
            }).error(function (data, status, headers, config) {

            });

            // }
        };
        $scope.btnSubmit = true;
        $scope.btnUpdate = false;
        $scope.DataDel = function (_id) {
            if (confirm("Are you sure, delete this record?")) {
                $http({
                    method: 'GET',
                    url: '/BusinessPartner/DelData',
                    params: { id: _id }
                    //?id=' + _id
                }).success(function (response) {
                    $rootScope.Res = "Data deleted";
                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $scope.BindList();
                    $('#divNotifiy').attr('style', 'display: block');
                }).error(function (data, status, headers, config) {
                    // alert("error");
                });
            }
        };
        $scope.DataEdit = function (x, idx) {

            var i = 0;
            angular.forEach($scope.AuthGrps, function (lst) {
                $('#inds' + i).attr("style", "");
                i++;
            });
            $('#inds' + idx).attr("style", "background-color:lightblue");
            $scope.obj = {};
            $scope.btnSubmit = false;
            $scope.btnUpdate = true;
            $scope.obj._id = x._id;
            $scope.obj.Code = x.Code;
            $scope.obj.Title = x.Title;
        };
        $scope.updateData = function () {

            //if (!$scope.form.$invalid) { 
            $timeout(function () { $('#divNotifiy').attr('style', 'display: none'); }, 5000);
            $scope.obj.Label = "business Type";
            var formData = new FormData();
            formData.append("data", angular.toJson($scope.obj));

            $http({
                url: "/BusinessPartner/InsertData",
                method: "POST",
                headers: { "Content-Type": undefined },
                transformRequest: angular.identity,
                data: formData
            }).success(function (data, status, headers, config) {

                if (data.success === false) {

                }
                else {
                    if (data === false)
                        $rootScope.Res = "Data already exists";
                    else {
                        $rootScope.Res = "Data updated successfully";
                        $scope.BindList();
                    }
                    $scope.reset();
                    $scope.obj = null;
                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $('#divNotifiy').attr('style', 'display: block');
                }
            }).error(function (data, status, headers, config) {

            });
            $scope.btnSubmit = true;
            $scope.btnUpdate = false;
        };
        $scope.ClearFrm = function () {

            $scope.obj = null;
            $scope.btnSubmit = true;
            $scope.btnUpdate = false;
            $scope.reset();
        }
        $scope.DisableData = function (idx, enable, _id) {
            $timeout(function () { $('#divNotifiy').attr('style', 'display: none'); }, 5000);
            if (enable == false) {

                if (confirm("Are you sure, disable this record?")) {

                    $http({
                        method: 'GET',
                        url: '/BusinessPartner/DisableData',
                        params: { id: _id, Islive: enable }
                        //?id=' + _id + '&Islive=' + enable

                    }).success(function (response) {
                        $rootScope.Res = "Data disabled";
                        $rootScope.Notify = "alert-info";
                        $('#divNotifiy').attr('style', 'display: block');
                        $scope.BindList();
                    }).error(function (data, status, headers, config) {
                        // alert("error");
                    });
                } else $scope.businessTypes[idx].Islive = true;

            } else {
                if (confirm("Are you sure, enable this record?")) {

                    $http({
                        method: 'GET',
                        url: '/BusinessPartner/DisableData',
                        params: { id: _id, Islive: enable }
                        //?id=' + _id + '&Islive=' + enable
                    }).success(function (response) {
                        $rootScope.Res = "Data enabled";
                        $rootScope.Notify = "alert-info";
                        $('#divNotifiy').attr('style', 'display: block');
                        $scope.BindList();
                    }).error(function (data, status, headers, config) {
                        // alert("error");
                    });
                } else $scope.businessTypes[idx].Islive = false;


            }

        };
    });
    app.controller('IndustryController', function ($scope, $http, $timeout, $rootScope, DTOptionsBuilder) {


        $scope.dtOptions = DTOptionsBuilder.newOptions()
           .withDisplayLength(10)
           .withOption('bLengthChange', true);

        $rootScope.NotifiyResclose = function () {
            $('#divNotifiy').attr('style', 'display: none');
        }

        $scope.BindList = function () {

            $http({
                method: 'GET',
                url: '/BusinessPartner/GetDataList',
                params: { label: 'Industry Type' },
            }).success(function (response) {
                $scope.IndustryTypes = response;
            }).error(function (data, status, headers, config) {
                // alert("error");
            });
        };
        $scope.BindList();
        $scope.reset = function () {

            $scope.form.$setPristine();
        }
        $scope.createData = function () {

            $timeout(function () { $('#divNotifiy').attr('style', 'display: none'); }, 5000);

            $scope.obj.Label = "Industry Type";
            var formData = new FormData();
            formData.append("data", angular.toJson($scope.obj));

            $http({
                url: "/BusinessPartner/InsertData",
                method: "POST",
                headers: { "Content-Type": undefined },
                transformRequest: angular.identity,
                data: formData
            }).success(function (data, status, headers, config) {

                if (data.success === false) {

                }
                else {
                    if (data === false)
                        $rootScope.Res = "Data already exists";
                    else {
                        $rootScope.Res = "Data created successfully";
                        $scope.BindList();
                    }
                    $scope.reset();
                    $scope.obj = null;

                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $('#divNotifiy').attr('style', 'display: block');
                }
            }).error(function (data, status, headers, config) {

            });

            // }
        };
        $scope.btnSubmit = true;
        $scope.btnUpdate = false;
        $scope.DataDel = function (_id) {
            if (confirm("Are you sure, delete this record?")) {
                $http({
                    method: 'GET',
                    url: '/BusinessPartner/DelData',
                    params: { id: _id }
                    //?id=' + _id
                }).success(function (response) {
                    $rootScope.Res = "Data deleted";
                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $scope.BindList();
                    $('#divNotifiy').attr('style', 'display: block');
                }).error(function (data, status, headers, config) {
                    // alert("error");
                });
            }
        };
        $scope.DataEdit = function (x, idx) {

            var i = 0;
            angular.forEach($scope.AuthGrps, function (lst) {
                $('#inds' + i).attr("style", "");
                i++;
            });
            $('#inds' + idx).attr("style", "background-color:lightblue");
            $scope.obj = {};
            $scope.btnSubmit = false;
            $scope.btnUpdate = true;
            $scope.obj._id = x._id;
            $scope.obj.Code = x.Code;
            $scope.obj.Title = x.Title;
        };
        $scope.updateData = function () {

            //if (!$scope.form.$invalid) { 
            $timeout(function () { $('#divNotifiy').attr('style', 'display: none'); }, 5000);
            $scope.obj.Label = "business Type";
            var formData = new FormData();
            formData.append("data", angular.toJson($scope.obj));

            $http({
                url: "/BusinessPartner/InsertData",
                method: "POST",
                headers: { "Content-Type": undefined },
                transformRequest: angular.identity,
                data: formData
            }).success(function (data, status, headers, config) {

                if (data.success === false) {

                }
                else {
                    if (data === false)
                        $rootScope.Res = "Data already exists";
                    else {
                        $rootScope.Res = "Data updated successfully";
                        $scope.BindList();
                    }
                    $scope.reset();
                    $scope.obj = null;
                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $('#divNotifiy').attr('style', 'display: block');
                }
            }).error(function (data, status, headers, config) {

            });
            $scope.btnSubmit = true;
            $scope.btnUpdate = false;
        };
        $scope.ClearFrm = function () {

            $scope.obj = null;
            $scope.btnSubmit = true;
            $scope.btnUpdate = false;
            $scope.reset();
        }
        $scope.DisableData = function (idx, enable, _id) {
            $timeout(function () { $('#divNotifiy').attr('style', 'display: none'); }, 5000);
            if (enable == false) {

                if (confirm("Are you sure, disable this record?")) {

                    $http({
                        method: 'GET',
                        url: '/BusinessPartner/DisableData',
                        params: { id: _id, Islive: enable }
                        //?id=' + _id + '&Islive=' + enable

                    }).success(function (response) {
                        $rootScope.Res = "Data disabled";
                        $rootScope.Notify = "alert-info";
                        $('#divNotifiy').attr('style', 'display: block');
                        $scope.BindList();
                    }).error(function (data, status, headers, config) {
                        // alert("error");
                    });
                } else $scope.IndustryTypes[idx].Islive = true;

            } else {
                if (confirm("Are you sure, enable this record?")) {

                    $http({
                        method: 'GET',
                        url: '/BusinessPartner/DisableData',
                        params: { id: _id, Islive: enable }
                        //?id=' + _id + '&Islive=' + enable
                    }).success(function (response) {
                        $rootScope.Res = "Data enabled";
                        $rootScope.Notify = "alert-info";
                        $('#divNotifiy').attr('style', 'display: block');
                        $scope.BindList();
                    }).error(function (data, status, headers, config) {
                        // alert("error");
                    });
                } else $scope.IndustryTypes[idx].Islive = false;


            }

        };
    });
    app.controller('POCController', function ($scope, $http, $timeout, $rootScope, DTOptionsBuilder) {


        $scope.dtOptions = DTOptionsBuilder.newOptions()
           .withDisplayLength(10)
           .withOption('bLengthChange', true);

        $rootScope.NotifiyResclose = function () {
            $('#divNotifiy').attr('style', 'display: none');
        }

        $scope.BindList = function () {

            $http({
                method: 'GET',
                url: '/BusinessPartner/GetDataList',
                params: { label: 'POC' },
            }).success(function (response) {
                $scope.POCs = response;
            }).error(function (data, status, headers, config) {
                // alert("error");
            });
        };
        $scope.BindList();
        $scope.reset = function () {

            $scope.form.$setPristine();
        }
        $scope.createData = function () {

            $timeout(function () { $('#divNotifiy').attr('style', 'display: none'); }, 5000);

            $scope.obj.Label = "POC";
            var formData = new FormData();
            formData.append("data", angular.toJson($scope.obj));

            $http({
                url: "/BusinessPartner/InsertData",
                method: "POST",
                headers: { "Content-Type": undefined },
                transformRequest: angular.identity,
                data: formData
            }).success(function (data, status, headers, config) {

                if (data.success === false) {

                }
                else {
                    if (data === false)
                        $rootScope.Res = "Data already exists";
                    else {
                        $rootScope.Res = "Data created successfully";
                        $scope.BindList();
                    }
                    $scope.reset();
                    $scope.obj = null;

                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $('#divNotifiy').attr('style', 'display: block');
                }
            }).error(function (data, status, headers, config) {

            });

            // }
        };
        $scope.btnSubmit = true;
        $scope.btnUpdate = false;
        $scope.DataDel = function (_id) {
            if (confirm("Are you sure, delete this record?")) {
                $http({
                    method: 'GET',
                    url: '/BusinessPartner/DelData',
                    params: { id: _id }
                    //?id=' + _id
                }).success(function (response) {
                    $rootScope.Res = "Data deleted";
                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $scope.BindList();
                    $('#divNotifiy').attr('style', 'display: block');
                }).error(function (data, status, headers, config) {
                    // alert("error");
                });
            }
        };
        $scope.DataEdit = function (x, idx) {

            var i = 0;
            angular.forEach($scope.AuthGrps, function (lst) {
                $('#inds' + i).attr("style", "");
                i++;
            });
            $('#inds' + idx).attr("style", "background-color:lightblue");
            $scope.obj = {};
            $scope.btnSubmit = false;
            $scope.btnUpdate = true;
            $scope.obj._id = x._id;
            $scope.obj.Code = x.Code;
            $scope.obj.Title = x.Title;
        };
        $scope.updateData = function () {

            //if (!$scope.form.$invalid) { 
            $timeout(function () { $('#divNotifiy').attr('style', 'display: none'); }, 5000);
            $scope.obj.Label = "business Type";
            var formData = new FormData();
            formData.append("data", angular.toJson($scope.obj));

            $http({
                url: "/BusinessPartner/InsertData",
                method: "POST",
                headers: { "Content-Type": undefined },
                transformRequest: angular.identity,
                data: formData
            }).success(function (data, status, headers, config) {

                if (data.success === false) {

                }
                else {
                    if (data === false)
                        $rootScope.Res = "Data already exists";
                    else {
                        $rootScope.Res = "Data updated successfully";
                        $scope.BindList();
                    }
                    $scope.reset();
                    $scope.obj = null;
                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $('#divNotifiy').attr('style', 'display: block');
                }
            }).error(function (data, status, headers, config) {

            });
            $scope.btnSubmit = true;
            $scope.btnUpdate = false;
        };
        $scope.ClearFrm = function () {

            $scope.obj = null;
            $scope.btnSubmit = true;
            $scope.btnUpdate = false;
            $scope.reset();
        }
        $scope.DisableData = function (idx, enable, _id) {
            $timeout(function () { $('#divNotifiy').attr('style', 'display: none'); }, 5000);
            if (enable == false) {

                if (confirm("Are you sure, disable this record?")) {

                    $http({
                        method: 'GET',
                        url: '/BusinessPartner/DisableData',
                        params: { id: _id, Islive: enable }
                        //?id=' + _id + '&Islive=' + enable

                    }).success(function (response) {
                        $rootScope.Res = "Data disabled";
                        $rootScope.Notify = "alert-info";
                        $('#divNotifiy').attr('style', 'display: block');
                        $scope.BindList();
                    }).error(function (data, status, headers, config) {
                        // alert("error");
                    });
                } else $scope.POCs[idx].Islive = true;

            } else {
                if (confirm("Are you sure, enable this record?")) {

                    $http({
                        method: 'GET',
                        url: '/BusinessPartner/DisableData',
                        params: { id: _id, Islive: enable }
                        //?id=' + _id + '&Islive=' + enable
                    }).success(function (response) {
                        $rootScope.Res = "Data enabled";
                        $rootScope.Notify = "alert-info";
                        $('#divNotifiy').attr('style', 'display: block');
                        $scope.BindList();
                    }).error(function (data, status, headers, config) {
                        // alert("error");
                    });
                } else $scope.POCs[idx].Islive = false;


            }

        };
    });
    app.controller('IncoController', function ($scope, $http, $timeout, $rootScope, DTOptionsBuilder) {


        $scope.dtOptions = DTOptionsBuilder.newOptions()
           .withDisplayLength(10)
           .withOption('bLengthChange', true);

        $rootScope.NotifiyResclose = function () {
            $('#divNotifiy').attr('style', 'display: none');
        }

        $scope.BindList = function () {

            $http({
                method: 'GET',
                url: '/BusinessPartner/GetDataList',
                params: { label: 'Inco terms' },
            }).success(function (response) {
                $scope.Incos = response;
            }).error(function (data, status, headers, config) {
                // alert("error");
            });
        };
        $scope.BindList();
        $scope.reset = function () {

            $scope.form.$setPristine();
        }
        $scope.createData = function () {

            $timeout(function () { $('#divNotifiy').attr('style', 'display: none'); }, 5000);

            $scope.obj.Label = "Inco terms";
            var formData = new FormData();
            formData.append("data", angular.toJson($scope.obj));

            $http({
                url: "/BusinessPartner/InsertData",
                method: "POST",
                headers: { "Content-Type": undefined },
                transformRequest: angular.identity,
                data: formData
            }).success(function (data, status, headers, config) {

                if (data.success === false) {

                }
                else {
                    if (data === false)
                        $rootScope.Res = "Data already exists";
                    else {
                        $rootScope.Res = "Data created successfully";
                        $scope.BindList();
                    }
                    $scope.reset();
                    $scope.obj = null;

                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $('#divNotifiy').attr('style', 'display: block');
                }
            }).error(function (data, status, headers, config) {

            });

            // }
        };
        $scope.btnSubmit = true;
        $scope.btnUpdate = false;
        $scope.DataDel = function (_id) {
            if (confirm("Are you sure, delete this record?")) {
                $http({
                    method: 'GET',
                    url: '/BusinessPartner/DelData',
                    params: { id: _id }
                    //?id=' + _id
                }).success(function (response) {
                    $rootScope.Res = "Data deleted";
                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $scope.BindList();
                    $('#divNotifiy').attr('style', 'display: block');
                }).error(function (data, status, headers, config) {
                    // alert("error");
                });
            }
        };
        $scope.DataEdit = function (x, idx) {

            var i = 0;
            angular.forEach($scope.AuthGrps, function (lst) {
                $('#inds' + i).attr("style", "");
                i++;
            });
            $('#inds' + idx).attr("style", "background-color:lightblue");
            $scope.obj = {};
            $scope.btnSubmit = false;
            $scope.btnUpdate = true;
            $scope.obj._id = x._id;
            $scope.obj.Code = x.Code;
            $scope.obj.Title = x.Title;
        };
        $scope.updateData = function () {

            //if (!$scope.form.$invalid) { 
            $timeout(function () { $('#divNotifiy').attr('style', 'display: none'); }, 5000);
            $scope.obj.Label = "business Type";
            var formData = new FormData();
            formData.append("data", angular.toJson($scope.obj));

            $http({
                url: "/BusinessPartner/InsertData",
                method: "POST",
                headers: { "Content-Type": undefined },
                transformRequest: angular.identity,
                data: formData
            }).success(function (data, status, headers, config) {

                if (data.success === false) {

                }
                else {
                    if (data === false)
                        $rootScope.Res = "Data already exists";
                    else {
                        $rootScope.Res = "Data updated successfully";
                        $scope.BindList();
                    }
                    $scope.reset();
                    $scope.obj = null;
                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $('#divNotifiy').attr('style', 'display: block');
                }
            }).error(function (data, status, headers, config) {

            });
            $scope.btnSubmit = true;
            $scope.btnUpdate = false;
        };
        $scope.ClearFrm = function () {

            $scope.obj = null;
            $scope.btnSubmit = true;
            $scope.btnUpdate = false;
            $scope.reset();
        }
        $scope.DisableData = function (idx, enable, _id) {
            $timeout(function () { $('#divNotifiy').attr('style', 'display: none'); }, 5000);
            if (enable == false) {

                if (confirm("Are you sure, disable this record?")) {

                    $http({
                        method: 'GET',
                        url: '/BusinessPartner/DisableData',
                        params: { id: _id, Islive: enable }
                        //?id=' + _id + '&Islive=' + enable

                    }).success(function (response) {
                        $rootScope.Res = "Data disabled";
                        $rootScope.Notify = "alert-info";
                        $('#divNotifiy').attr('style', 'display: block');
                        $scope.BindList();
                    }).error(function (data, status, headers, config) {
                        // alert("error");
                    });
                } else $scope.Incos[idx].Islive = true;

            } else {
                if (confirm("Are you sure, enable this record?")) {

                    $http({
                        method: 'GET',
                        url: '/BusinessPartner/DisableData',
                        params: { id: _id, Islive: enable }
                        //?id=' + _id + '&Islive=' + enable
                    }).success(function (response) {
                        $rootScope.Res = "Data enabled";
                        $rootScope.Notify = "alert-info";
                        $('#divNotifiy').attr('style', 'display: block');
                        $scope.BindList();
                    }).error(function (data, status, headers, config) {
                        // alert("error");
                    });
                } else $scope.Incos[idx].Islive = false;


            }

        };
    });
    app.controller('PGController', function ($scope, $http, $timeout, $rootScope, DTOptionsBuilder) {


        $scope.dtOptions = DTOptionsBuilder.newOptions()
           .withDisplayLength(10)
           .withOption('bLengthChange', true);

        $rootScope.NotifiyResclose = function () {
            $('#divNotifiy').attr('style', 'display: none');
        }

        $scope.BindList = function () {

            $http({
                method: 'GET',
                url: '/BusinessPartner/GetDataList',
                params: { label: 'Purchasing Grp' },
            }).success(function (response) {
                $scope.PurchasingGrps = response;
            }).error(function (data, status, headers, config) {
                // alert("error");
            });
        };
        $scope.BindList();
        $scope.reset = function () {

            $scope.form.$setPristine();
        }
        $scope.createData = function () {

            $timeout(function () { $('#divNotifiy').attr('style', 'display: none'); }, 5000);

            $scope.obj.Label = "Purchasing Grp";
            var formData = new FormData();
            formData.append("data", angular.toJson($scope.obj));

            $http({
                url: "/BusinessPartner/InsertData",
                method: "POST",
                headers: { "Content-Type": undefined },
                transformRequest: angular.identity,
                data: formData
            }).success(function (data, status, headers, config) {

                if (data.success === false) {

                }
                else {
                    if (data === false)
                        $rootScope.Res = "Data already exists";
                    else {
                        $rootScope.Res = "Data created successfully";
                        $scope.BindList();
                    }
                    $scope.reset();
                    $scope.obj = null;

                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $('#divNotifiy').attr('style', 'display: block');
                }
            }).error(function (data, status, headers, config) {

            });

            // }
        };
        $scope.btnSubmit = true;
        $scope.btnUpdate = false;
        $scope.DataDel = function (_id) {
            if (confirm("Are you sure, delete this record?")) {
                $http({
                    method: 'GET',
                    url: '/BusinessPartner/DelData',
                    params: { id: _id }
                    //?id=' + _id
                }).success(function (response) {
                    $rootScope.Res = "Data deleted";
                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $scope.BindList();
                    $('#divNotifiy').attr('style', 'display: block');
                }).error(function (data, status, headers, config) {
                    // alert("error");
                });
            }
        };
        $scope.DataEdit = function (x, idx) {

            var i = 0;
            angular.forEach($scope.AuthGrps, function (lst) {
                $('#inds' + i).attr("style", "");
                i++;
            });
            $('#inds' + idx).attr("style", "background-color:lightblue");
            $scope.obj = {};
            $scope.btnSubmit = false;
            $scope.btnUpdate = true;
            $scope.obj._id = x._id;
            $scope.obj.Code = x.Code;
            $scope.obj.Title = x.Title;
        };
        $scope.updateData = function () {

            //if (!$scope.form.$invalid) { 
            $timeout(function () { $('#divNotifiy').attr('style', 'display: none'); }, 5000);
            $scope.obj.Label = "business Type";
            var formData = new FormData();
            formData.append("data", angular.toJson($scope.obj));

            $http({
                url: "/BusinessPartner/InsertData",
                method: "POST",
                headers: { "Content-Type": undefined },
                transformRequest: angular.identity,
                data: formData
            }).success(function (data, status, headers, config) {

                if (data.success === false) {

                }
                else {
                    if (data === false)
                        $rootScope.Res = "Data already exists";
                    else {
                        $rootScope.Res = "Data updated successfully";
                        $scope.BindList();
                    }
                    $scope.reset();
                    $scope.obj = null;
                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $('#divNotifiy').attr('style', 'display: block');
                }
            }).error(function (data, status, headers, config) {

            });
            $scope.btnSubmit = true;
            $scope.btnUpdate = false;
        };
        $scope.ClearFrm = function () {

            $scope.obj = null;
            $scope.btnSubmit = true;
            $scope.btnUpdate = false;
            $scope.reset();
        }
        $scope.DisableData = function (idx, enable, _id) {
            $timeout(function () { $('#divNotifiy').attr('style', 'display: none'); }, 5000);
            if (enable == false) {

                if (confirm("Are you sure, disable this record?")) {

                    $http({
                        method: 'GET',
                        url: '/BusinessPartner/DisableData',
                        params: { id: _id, Islive: enable }
                        //?id=' + _id + '&Islive=' + enable

                    }).success(function (response) {
                        $rootScope.Res = "Data disabled";
                        $rootScope.Notify = "alert-info";
                        $('#divNotifiy').attr('style', 'display: block');
                        $scope.BindList();
                    }).error(function (data, status, headers, config) {
                        // alert("error");
                    });
                } else $scope.PurchasingGrps[idx].Islive = true;

            } else {
                if (confirm("Are you sure, enable this record?")) {

                    $http({
                        method: 'GET',
                        url: '/BusinessPartner/DisableData',
                        params: { id: _id, Islive: enable }
                        //?id=' + _id + '&Islive=' + enable
                    }).success(function (response) {
                        $rootScope.Res = "Data enabled";
                        $rootScope.Notify = "alert-info";
                        $('#divNotifiy').attr('style', 'display: block');
                        $scope.BindList();
                    }).error(function (data, status, headers, config) {
                        // alert("error");
                    });
                } else $scope.PurchasingGrps[idx].Islive = false;


            }

        };
    });
    app.controller('GCSController', function ($scope, $http, $timeout, $rootScope, DTOptionsBuilder) {


        $scope.dtOptions = DTOptionsBuilder.newOptions()
           .withDisplayLength(10)
           .withOption('bLengthChange', true);

        $rootScope.NotifiyResclose = function () {
            $('#divNotifiy').attr('style', 'display: none');
        }

        $scope.BindList = function () {

            $http({
                method: 'GET',
                url: '/BusinessPartner/GetDataList',
                params: { label: 'GCS' },
            }).success(function (response) {
                $scope.GCSs = response;
            }).error(function (data, status, headers, config) {
                // alert("error");
            });
        };
        $scope.BindList();
        $scope.reset = function () {

            $scope.form.$setPristine();
        }
        $scope.createData = function () {

            $timeout(function () { $('#divNotifiy').attr('style', 'display: none'); }, 5000);

            $scope.obj.Label = "GCS";
            var formData = new FormData();
            formData.append("data", angular.toJson($scope.obj));

            $http({
                url: "/BusinessPartner/InsertData",
                method: "POST",
                headers: { "Content-Type": undefined },
                transformRequest: angular.identity,
                data: formData
            }).success(function (data, status, headers, config) {

                if (data.success === false) {

                }
                else {
                    if (data === false)
                        $rootScope.Res = "Data already exists";
                    else {
                        $rootScope.Res = "Data created successfully";
                        $scope.BindList();
                    }
                    $scope.reset();
                    $scope.obj = null;

                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $('#divNotifiy').attr('style', 'display: block');
                }
            }).error(function (data, status, headers, config) {

            });

            // }
        };
        $scope.btnSubmit = true;
        $scope.btnUpdate = false;
        $scope.DataDel = function (_id) {
            if (confirm("Are you sure, delete this record?")) {
                $http({
                    method: 'GET',
                    url: '/BusinessPartner/DelData',
                    params: { id: _id }
                    //?id=' + _id
                }).success(function (response) {
                    $rootScope.Res = "Data deleted";
                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $scope.BindList();
                    $('#divNotifiy').attr('style', 'display: block');
                }).error(function (data, status, headers, config) {
                    // alert("error");
                });
            }
        };
        $scope.DataEdit = function (x, idx) {

            var i = 0;
            angular.forEach($scope.AuthGrps, function (lst) {
                $('#inds' + i).attr("style", "");
                i++;
            });
            $('#inds' + idx).attr("style", "background-color:lightblue");
            $scope.obj = {};
            $scope.btnSubmit = false;
            $scope.btnUpdate = true;
            $scope.obj._id = x._id;
            $scope.obj.Code = x.Code;
            $scope.obj.Title = x.Title;
        };
        $scope.updateData = function () {

            //if (!$scope.form.$invalid) { 
            $timeout(function () { $('#divNotifiy').attr('style', 'display: none'); }, 5000);
            $scope.obj.Label = "business Type";
            var formData = new FormData();
            formData.append("data", angular.toJson($scope.obj));

            $http({
                url: "/BusinessPartner/InsertData",
                method: "POST",
                headers: { "Content-Type": undefined },
                transformRequest: angular.identity,
                data: formData
            }).success(function (data, status, headers, config) {

                if (data.success === false) {

                }
                else {
                    if (data === false)
                        $rootScope.Res = "Data already exists";
                    else {
                        $rootScope.Res = "Data updated successfully";
                        $scope.BindList();
                    }
                    $scope.reset();
                    $scope.obj = null;
                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $('#divNotifiy').attr('style', 'display: block');
                }
            }).error(function (data, status, headers, config) {

            });
            $scope.btnSubmit = true;
            $scope.btnUpdate = false;
        };
        $scope.ClearFrm = function () {

            $scope.obj = null;
            $scope.btnSubmit = true;
            $scope.btnUpdate = false;
            $scope.reset();
        }
        $scope.DisableData = function (idx, enable, _id) {
            $timeout(function () { $('#divNotifiy').attr('style', 'display: none'); }, 5000);
            if (enable == false) {

                if (confirm("Are you sure, disable this record?")) {

                    $http({
                        method: 'GET',
                        url: '/BusinessPartner/DisableData',
                        params: { id: _id, Islive: enable }
                        //?id=' + _id + '&Islive=' + enable

                    }).success(function (response) {
                        $rootScope.Res = "Data disabled";
                        $rootScope.Notify = "alert-info";
                        $('#divNotifiy').attr('style', 'display: block');
                        $scope.BindList();
                    }).error(function (data, status, headers, config) {
                        // alert("error");
                    });
                } else $scope.GCSs[idx].Islive = true;

            } else {
                if (confirm("Are you sure, enable this record?")) {

                    $http({
                        method: 'GET',
                        url: '/BusinessPartner/DisableData',
                        params: { id: _id, Islive: enable }
                        //?id=' + _id + '&Islive=' + enable
                    }).success(function (response) {
                        $rootScope.Res = "Data enabled";
                        $rootScope.Notify = "alert-info";
                        $('#divNotifiy').attr('style', 'display: block');
                        $scope.BindList();
                    }).error(function (data, status, headers, config) {
                        // alert("error");
                    });
                } else $scope.GCSs[idx].Islive = false;


            }

        };
    });
    app.controller('PF1Controller', function ($scope, $http, $timeout, $rootScope, DTOptionsBuilder) {


        $scope.dtOptions = DTOptionsBuilder.newOptions()
           .withDisplayLength(10)
           .withOption('bLengthChange', true);

        $rootScope.NotifiyResclose = function () {
            $('#divNotifiy').attr('style', 'display: none');
        }

        $scope.BindList = function () {

            $http({
                method: 'GET',
                url: '/BusinessPartner/GetDataList',
                params: { label: 'PF' },
            }).success(function (response) {
                $scope.PFs = response;
            }).error(function (data, status, headers, config) {
                // alert("error");
            });
        };
        $scope.BindList();
        $scope.reset = function () {

            $scope.form.$setPristine();
        }
        $scope.createData = function () {

            $timeout(function () { $('#divNotifiy').attr('style', 'display: none'); }, 5000);

            $scope.obj.Label = "PF";
            var formData = new FormData();
            formData.append("data", angular.toJson($scope.obj));

            $http({
                url: "/BusinessPartner/InsertData",
                method: "POST",
                headers: { "Content-Type": undefined },
                transformRequest: angular.identity,
                data: formData
            }).success(function (data, status, headers, config) {

                if (data.success === false) {

                }
                else {
                    if (data === false)
                        $rootScope.Res = "Data already exists";
                    else {
                        $rootScope.Res = "Data created successfully";
                        $scope.BindList();
                    }
                    $scope.reset();
                    $scope.obj = null;

                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $('#divNotifiy').attr('style', 'display: block');
                }
            }).error(function (data, status, headers, config) {

            });

            // }
        };
        $scope.btnSubmit = true;
        $scope.btnUpdate = false;
        $scope.DataDel = function (_id) {
            if (confirm("Are you sure, delete this record?")) {
                $http({
                    method: 'GET',
                    url: '/BusinessPartner/DelData',
                    params: { id: _id }
                    //?id=' + _id
                }).success(function (response) {
                    $rootScope.Res = "Data deleted";
                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $scope.BindList();
                    $('#divNotifiy').attr('style', 'display: block');
                }).error(function (data, status, headers, config) {
                    // alert("error");
                });
            }
        };
        $scope.DataEdit = function (x, idx) {

            var i = 0;
            angular.forEach($scope.AuthGrps, function (lst) {
                $('#inds' + i).attr("style", "");
                i++;
            });
            $('#inds' + idx).attr("style", "background-color:lightblue");
            $scope.obj = {};
            $scope.btnSubmit = false;
            $scope.btnUpdate = true;
            $scope.obj._id = x._id;
            $scope.obj.Code = x.Code;
            $scope.obj.Title = x.Title;
        };
        $scope.updateData = function () {

            //if (!$scope.form.$invalid) { 
            $timeout(function () { $('#divNotifiy').attr('style', 'display: none'); }, 5000);
            $scope.obj.Label = "business Type";
            var formData = new FormData();
            formData.append("data", angular.toJson($scope.obj));

            $http({
                url: "/BusinessPartner/InsertData",
                method: "POST",
                headers: { "Content-Type": undefined },
                transformRequest: angular.identity,
                data: formData
            }).success(function (data, status, headers, config) {

                if (data.success === false) {

                }
                else {
                    if (data === false)
                        $rootScope.Res = "Data already exists";
                    else {
                        $rootScope.Res = "Data updated successfully";
                        $scope.BindList();
                    }
                    $scope.reset();
                    $scope.obj = null;
                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $('#divNotifiy').attr('style', 'display: block');
                }
            }).error(function (data, status, headers, config) {

            });
            $scope.btnSubmit = true;
            $scope.btnUpdate = false;
        };
        $scope.ClearFrm = function () {

            $scope.obj = null;
            $scope.btnSubmit = true;
            $scope.btnUpdate = false;
            $scope.reset();
        }
        $scope.DisableData = function (idx, enable, _id) {
            $timeout(function () { $('#divNotifiy').attr('style', 'display: none'); }, 5000);
            if (enable == false) {

                if (confirm("Are you sure, disable this record?")) {

                    $http({
                        method: 'GET',
                        url: '/BusinessPartner/DisableData',
                        params: { id: _id, Islive: enable }
                        //?id=' + _id + '&Islive=' + enable

                    }).success(function (response) {
                        $rootScope.Res = "Data disabled";
                        $rootScope.Notify = "alert-info";
                        $('#divNotifiy').attr('style', 'display: block');
                        $scope.BindList();
                    }).error(function (data, status, headers, config) {
                        // alert("error");
                    });
                } else $scope.PFs[idx].Islive = true;

            } else {
                if (confirm("Are you sure, enable this record?")) {

                    $http({
                        method: 'GET',
                        url: '/BusinessPartner/DisableData',
                        params: { id: _id, Islive: enable }
                        //?id=' + _id + '&Islive=' + enable
                    }).success(function (response) {
                        $rootScope.Res = "Data enabled";
                        $rootScope.Notify = "alert-info";
                        $('#divNotifiy').attr('style', 'display: block');
                        $scope.BindList();
                    }).error(function (data, status, headers, config) {
                        // alert("error");
                    });
                } else $scope.PFs[idx].Islive = false;


            }

        };

   
    });
    
    app.controller('VendorController', function ($scope, $http, $filter, $timeout, $rootScope, DTOptionsBuilder) {

        $scope.rows = [{ 'slno': 1 }];
        $scope.addRow = function () {
            $scope.rows.push({ 'slno': $scope.rows.length + 1 });
        };

        $scope.RemoveRow = function (indx) {
            if ($scope.rows.length > 1) {
                $scope.rows.splice(indx, 1);
            }

            if ($scope.rows.length === 1 && indx === 0) {
                $scope.rows.splice(indx, 1);
                $scope.rows = [{ 'slno': 1 }];
            }

            var cunt = 1;
            angular.forEach($scope.rows, function (value, key) {
                value.slno = cunt++;

            });
          
        };

        $scope.rows1 = [{ 'slno': 1 }];
        $scope.addRow1 = function () {
            $scope.rows1.push({ 'slno': $scope.rows1.length + 1 });
        };

        $scope.RemoveRow1 = function (indx) {
            if ($scope.rows1.length > 1) {
                $scope.rows1.splice(indx, 1);
            }

            if ($scope.rows1.length === 1 && indx === 0) {
                $scope.rows1.splice(indx, 1);
                $scope.rows1 = [{ 'slno': 1 }];
            }

            var cunt1 = 1;
            angular.forEach($scope.rows1, function (value, key) {
                value.slno = cunt1++;

            });

        };
        $("#txtFrom").datepicker({
            numberOfMonths: 1,
            onSelect: function (selected) {
                $scope.Cust.Validfrom = $('#txtFrom').val();
                var dt = new Date(selected);
                dt.setDate(dt.getDate());
            }
        });

        $("#txtFrom1").datepicker({
            numberOfMonths: 1,
            onSelect: function (selected) {
                $scope.Cust.Validto = $('#txtFrom1').val();
                var dt = new Date(selected);
                dt.setDate(dt.getDate());
            }
        });

        $scope.Type = "BP"
        $scope.active1 = 'active'
        $scope.clearchk = function () {
            if ($scope.Type == "BP" || $scope.Type == "All") {
                $scope.active1 = 'active'
                $scope.active2 = ''
                $scope.active3 = ''
            } if ($scope.Type == "Customer") {
                $scope.active1 = ''
                $scope.active2 = 'active'
                $scope.active3 = ''
            } if ($scope.Type == "Vendor") {
                $scope.active1 = ''
                $scope.active2 = ''
                $scope.active3 = 'active'
            }
           
        }
        $scope.BindList = function () {
            $http({
                method: 'GET',
                url: '/BusinessPartner/GetBPMaster',
            }).success(function (response) {
                $scope.BPMasters = response;
                var res = $filter('filter')($scope.BPMasters, { 'Label': 'PF' }, true);
                $scope.PartnerFuncs = res;
            }).error(function (data, status, headers, config) {
                // alert("error");
            });
            $http({
                method: 'GET',
                url: '/BusinessPartner/GetMaterialMaster',
            }).success(function (response) {
                $scope.MaterialMasters = response;
            }).error(function (data, status, headers, config) {
                // alert("error");
            });
            $http({
                method: 'GET',
                url: '/BusinessPartner/GetBPList',
            }).success(function (response) {
                  $scope.Gens = response.GenList;
                  $scope.Custs = response.CustList;
                  $scope.Vens = response.VenList;
                  
            }).error(function (data, status, headers, config) {
            });
        };
        $scope.BindList();
        $scope.Create = function (form,x) {
            if (form != false) {
           
            $timeout(function () { $('#divNotifiy').attr('style', 'display: none'); }, 5000);

            var formData = new FormData();
            formData.append("Genral", angular.toJson($scope.Gen));
            formData.append("Cust", angular.toJson($scope.Cust));
            $scope.Ven.PartnerFunc = $scope.pf;
            formData.append("Ven", angular.toJson($scope.Ven));
            formData.append("CustPF", angular.toJson($scope.rows));
            formData.append("VenPF", angular.toJson($scope.rows1));

            $http({
                url: '/BusinessPartner/CreateBP?sKey=' + x,
                method: "POST",
                headers: { "Content-Type": undefined },
                transformRequest: angular.identity,
                data: formData
            }).success(function (data, status, headers, config) {

                if (data.success === false) {

                }
                else {
                    if (data === false)
                        $rootScope.Res = "Data already exists";
                    else {
                        $rootScope.Res = "Data created successfully";
                        $scope.BindList();
                    }
                    $scope.reset();
                    $scope.obj = null;

                    $rootScope.Notify = "alert-info";
                    $rootScope.NotifiyRes = true;
                    $('#divNotifiy').attr('style', 'display: block');
                }
            }).error(function (data, status, headers, config) {

            });
            } else {
                angular.element('input.ng-invalid').first().focus();
            }
            // }
        };
        $scope.reset = function (x) {
            if (x == "GEN")
            {
                $scope.Gen = null;
                $scope.GEN.$setPristine();
            }
            if (x == "CUST") {
                $scope.Cust = null;
                $scope.CUST.$setPristine();

            }
            if (x == "VEN") {
                $scope.Ven = null;
                $scope.VEN.$setPristine();
            }
            $scope.rows = [];
            $scope.rows1 = [];
            $scope.btnSubmit = true;
            $scope.btnUpdate = false;
            $scope.btnSubmit1 = true;
            $scope.btnUpdate1 = false;
            $scope.btnSubmit2 = true;
            $scope.btnUpdate2 = false;
          
        }
        $scope.btnSubmit = true;
        $scope.btnUpdate = false;
        $scope.btnSubmit1 = true;
        $scope.btnUpdate1 = false;
        $scope.btnSubmit2 = true;
        $scope.btnUpdate2 = false;
        
        $scope.GenEdit = function (x, idx) {
            $scope.btnSubmit2 = false;
            $scope.btnUpdate2 = true;
            $scope.Gen = x;
        };
        $scope.CustEdit = function (x, idx) {
            $scope.btnSubmit = false;
            $scope.btnUpdate = true;
            $scope.Cust = x;
            $scope.rows = x.PartnerFuncs;
        };
        $scope.VenEdit = function (x, idx) {
            $scope.btnSubmit1 = false;
            $scope.btnUpdate1 = true;
            $scope.Ven = x;
            $scope.rows1 = x.PartnerFuncs;
        };
    });
})();
