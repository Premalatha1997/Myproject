﻿var appcont = angular.module('ProsolApp', ['cgBusy']);






appcont.controller('app_controller',
    function ($scope, $window, $http, $timeout) {

        new jBox('Tooltip', {
            attach: '#showstatus',
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
        $scope.Loadpop = function () {
            new jBox('Tooltip', {
                attach: '#showstatus',
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

        $scope.Loadpop1 = function () {
            new jBox('Tooltip', {
                attach: '#showstatus1',
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
        $scope.Loadpop2 = function () {
            new jBox('Tooltip', {
                attach: '#showstatus2',
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
        $scope.Downloadfile = function (itemId) {

            $window.open('/approver/Downloadfile?Itemcode=' + itemId);

        };
        $scope.showuserMap = function (itmcode) {
           
            $http({
                method: 'GET',
                url: '/User/getItemstatusMap',
                params :{itmcde: itmcode}
            }).success(function (response) {
                $scope.itemstatusLst = response;

            }).error(function (data, status, headers, config) {
                // alert("error");
            });



        }

        $scope.rows = [];
        $scope.rows_app = [];
        $scope.rows_rej = [];
        $scope.req_visible = false;

        $scope.cataloguerlist = [];

        $scope.cb_approve = true;
        $scope.cb_reject = false;
        $scope.rejecttxt_show = false;
        $scope.model_reject = "";
        $scope.chk_txt_validation = false;
        $scope.cata_valid = false;
        $scope.ngdis = false;



        $http({
            method: 'GET',
            url: 'approver/getRequested_Records'
        }).success(function (result) {
            $scope.rows = result;
           // if($scope.rows.length > 0)
            $scope.load_data_to_approve(0);

        });

        $http({
            method: 'GET',
            url: 'approver/getApproved_Records'
        }).success(function (result) {
            $scope.rows_app = result;

            if (result.length > 0) {
                $scope.load_data_of_approved(0);
            }
        });

        $http({
            method: 'GET',
            url: 'approver/getRejected_Records'
        }).success(function (result) {
            $scope.rows_rej = result;

            if (result.length > 0) {
                $scope.load_data_of_rejected(0);
            }
        });

        $scope.uncheckreject = function (cb) {
            
            if ($scope.cb_reject == true && $scope.cb_approve == true) {
                $scope.cb_reject = false;
            }
            if ($scope.cb_approve == true) {
                $scope.model_reject = "";
                $scope.rejecttxt_show = false;
                $scope.cata_validtxt = false;
            }
            if ($scope.cb_approve == false) {
                $scope.cb_reject = true;
                $scope.model_reject = "";
                $scope.rejecttxt_show = true;
            }

        };

        $scope.chk_vali = function () {
            if ($scope.model_reject == "") {
                $scope.chk_txt_validation = true;
            }
            else {
                $scope.chk_txt_validation = false;
            }

        };

        $scope.uncheckapprover = function (cb) {           
            if ($scope.cb_reject == true && $scope.cb_approve == true) {
                $scope.cb_approve = false;
            }
            if ($scope.cb_reject == true) {
                $scope.model_reject = "";
                $scope.rejecttxt_show = true;
                $scope.cata_valid = false;
            }
            if ($scope.cb_reject == false) {
                $scope.model_reject = "";
                $scope.rejecttxt_show = false;
                $scope.cb_approve = true;
            }
        };

        $scope.load_data_pending = function () {
            $http({
                method: 'GET',
                url: 'approver/getRequested_Records'
            }).success(function (result) {
                $scope.rows = result;
                $scope.load_data_to_approve(0);
               
            });

            $http({
                method: 'GET',
                url: 'approver/getApproved_Records'
            }).success(function (result) {
                $scope.rows_app = result;

                if (result.length > 0) {
                    $scope.load_data_of_approved(0);
                }
            });

            $http({
                method: 'GET',
                url: 'approver/getRejected_Records'
            }).success(function (result) {
                $scope.rows_rej = result;

                if (result.length > 0) {
                    $scope.load_data_of_rejected(0);
                }
            });

        };


        //Code Logic
        $scope.codelogic1 = '';
        $scope.GetCodeLogic = function () {
            $http({
                method: 'GET',
                url: '/Dictionary/Showdata'
            }).success(function (response) {
                $scope.codelogic1 = response.CODELOGIC;
                if (response.CODELOGIC === "Customized Code") {
                    $scope.codeLogic = true;
                    $scope.req_maincode = true;

                }
                else {
                    $scope.codeLogic = false;
                    $scope.req_maincode = false;
                }

            }).error(function (data, status, headers, config) {
                // alert("error");
            });
        }

        $scope.GetCodeLogic();

        $scope.Approve_item = function () {           
          
            if ($window.confirm("Do you want to approve item ?")) {

            $timeout(function () { $scope.NotifiyRes = false; }, 5000);

            if ($scope.cb_reject == true && $scope.model_reject == '')
            {
                $scope.cata_validtxt = true;
                $scope.cata_valid = false;
            }
            else {

                $scope.show_loading = true;
               
                $scope.cata_validtxt = false;
                $scope.cata_valid = false;

                if ($scope.cb_approve == true) {
                    $scope.Req.itemStatus = 'approved';
                  
                }
                else {
                    $scope.Req.itemStatus = 'rejected';
                    $scope.Req.reason_rejection = $scope.model_reject;
                }

                var formData = new FormData();
                formData.append('values', angular.toJson($scope.Req));

                $scope.cgBusyPromises = $http({
                    method: 'POST',
                    url: '/approver/submit_approval',
                    headers: { "Content-Type": undefined },
                    transformRequest: angular.identity,
                    data: formData
                }).success(function (data) {
                    if (data === false) {
                        $scope.Res = data.errors;
                        $scope.Notify = "alert-danger";
                        $scope.NotifiyRes = true;
                        $scope.ngdis1 = false;
                        $scope.show_loading = false;
                    }
                    else if (data === 'approved') {
                        $scope.Res = $scope.Req.itemId + " approved successfully";
                        $scope.Notify = "alert-info";
                        $scope.NotifiyRes = true;
                        $scope.ngdis1 = false;

                        $scope.load_data_pending();
                        $scope.show_loading = false;
                    }
                    else {
                        $scope.Res = $scope.Req.itemId + " rejected successfully";
                        $scope.Notify = "alert-info";
                        $scope.NotifiyRes = true;
                        $scope.ngdis1 = false;

                        $scope.load_data_pending();
                        $scope.show_loading = false;

                    }
                }).error(function (data) {
                    $scope.Res = "Request Failed";
                    $scope.Notify = "alert-info";
                    $scope.NotifiyRes = true;
                    $scope.ngdis1 = false;
                    $scope.show_loading = false;
                });
            }
            } else {

                }
        };


        $scope.getcataloguernames_id = function () {
            $http({

                method: 'GET',
                url: 'approver/getcataloguernames_id'
            }).success(function (result) {
                $scope.cataloguerlist = result;
            })

        };

        $scope.load_data_of_rejected = function (index) {
            // alert($scope.rows[index].requestId);
            var val = 0;
            //   alert(index);
            if ($scope.rows_rej.length > 0) {
                for (var res in $scope.rows_rej) {
                    if (val === index) {
                        // alert("in");
                        $scope.rows_rej[val].itemStatus = "active";
                    }
                    else {
                        $scope.rows_rej[val].itemStatus = "inactive";
                    }
                    val = val + 1;
                }

                $http({
                    method: 'GET',
                    url: 'approver/getsingle_requested_record',
                    params :{abcsony: $scope.rows_rej[index].itemId}
                }).success(function (result) {
                    $scope.rej_visible = true;
                  
                    $scope.Req2 = {};
                    $scope.Req2.itemId = result[0].itemId;
                    $scope.Req2.requestId = result[0].requestId;
                    $scope.Req2.plant = result[1].plant;
                    $scope.Req2.storage_Location = result[1].storage_Location;
                    $scope.Req2.group = result[1].group;
                    $scope.Req2.subGroup = result[1].subGroup;
                    $scope.Req2.requester = result[1].requester;
                    $scope.Req2.source = result[0].source;
                    $scope.Req2.requestedOn = result[0].requestedOn;
                    $scope.Req2.approver = result[0].approver;
                    $scope.Req2.reason_rejection = result[0].reason_rejection;                   
                    $scope.Req2.attachment = result[0].attachment;
                    $scope.Req2.Materialtype = result[1].Materialtype;
                    $scope.Req2.Industrysector = result[1].Industrysector;
                    $scope.Req2.MaterialStrategicGroup = result[1].MaterialStrategicGroup;
                    $scope.Req2.UnitPrice = result[0].UnitPrice;
                    //$scope.Req2.Materialtype = result[0].Materialtype;
                    //$scope.Req2.Industrysector = result[0].Industrysector;
                    //$scope.Req2.MaterialStrategicGroup = result[0].MaterialStrategicGroup;
                    //$scope.Req2.UnitPrice = result[0].UnitPrice;
                });
            }
            else
            {
                $scope.rej_visible = false;
            }
        };

        $scope.load_data_of_approved = function (index) {
            // alert($scope.rows[index].requestId);
            var val = 0;
            //   alert(index);
            if ($scope.rows_app.length > 0) {
                for (var res in $scope.rows_app) {
                    if (val === index) {
                        // alert("in");
                        $scope.rows_app[val].itemStatus = "active";
                    }
                    else {
                        $scope.rows_app[val].itemStatus = "inactive";
                    }
                    val = val + 1;
                }

                $http({
                    method: 'GET',
                    url: 'approver/getsingle_requested_record',
                    params : {abcsony: $scope.rows_app[index].itemId}
                }).success(function (result) {
                    $scope.app_visible = true;
                    $scope.Req1 = {};
                    $scope.Req1.itemId = result[0].itemId;
                    //alert();
                    $scope.Req1.requestId = result[0].requestId;
                    $scope.Req1.plant = result[1].plant;
                    $scope.Req1.storage_Location = result[1].storage_Location;
                    $scope.Req1.group = result[1].group;
                    $scope.Req1.subGroup = result[1].subGroup;
                    $scope.Req1.requester = result[1].requester;
                    $scope.Req1.source = result[0].source;
                    $scope.Req1.requestedOn = result[0].requestedOn;
                    $scope.Req1.approver = result[0].approver;
                    $scope.Req1.Materialtype = result[1].Materialtype;
                    $scope.Req1.Industrysector = result[1].Industrysector;
                    $scope.Req1.MaterialStrategicGroup = result[1].MaterialStrategicGroup;
                    $scope.Req1.UnitPrice = result[0].UnitPrice;
                   // $scope.Req1.cataloguer = result[1].cataloguer;
                    $scope.Req1.attachment = result[0].attachment;
                });

            }
            else
            {
                $scope.app_visible = false;
            }
        };


        $scope.load_data_to_approve = function (index) {
     
            $scope.cb_approve = true;
            $scope.cb_reject = false;
            $scope.rejecttxt_show = false;

            $scope.cataloguerlist = [];
           // $scope.getcataloguernames_id();
            var val = 0;
            if ($scope.rows.length > 0) {
                for (var res in $scope.rows) {
                    if (val === index) {
                        $scope.rows[val].itemStatus = "active";
                    }
                    else {
                        $scope.rows[val].itemStatus = "inactive";
                    }
                    val = val + 1;
                }

                $http({
                    method: 'GET',
                    url: 'approver/getsingle_requested_record',
                    params:{abcsony:$scope.rows[index].itemId}
                }).success(function (result) {                 
                   // alert(angular.toJson(result));
                    $scope.Req = {};
                    $scope.Req.itemId = result[0].itemId;
                    $scope.Req.requestId = result[0].requestId;
                    $scope.Req.plant = result[1].plant + ' / ' + result[0].plant;
                    $scope.Req.storage_Location = result[1].storage_Location + ' / ' + result[0].storage_Location;
                    $scope.Req.group = result[1].group;
                    $scope.Req.subGroup = result[1].subGroup;
                    $scope.Req.requester = result[1].requester;
                    $scope.Req.source = result[0].source;
                    $scope.Req.requestedOn = result[0].requestedOn;
                    $scope.Req.approver = result[0].approver;
                    $scope.Req.Materialtype = result[1].Materialtype + ' / ' + result[0].Materialtype;
                    $scope.Req.Industrysector = result[1].Industrysector + ' / ' + result[0].Industrysector;
                    $scope.Req.MaterialStrategicGroup = result[1].MaterialStrategicGroup + ' / ' + result[0].MaterialStrategicGroup;
                    $scope.Req.UnitPrice = result[0].UnitPrice;
                    $scope.Req.attachment = result[0].attachment;
                    $scope.req_visible = true;
                });
            }
            else
            {
                $scope.req_visible = false;
                $scope.Req = {};
                $scope.Req.itemId = "";
                $scope.Req.requestId = "";
                $scope.Req.plant = "";
                $scope.Req.storage_Location = "";
                $scope.Req.group = "";
                $scope.Req.subGroup = "";
                $scope.Req.requester = "";
                $scope.Req.source = "";
                $scope.Req.requestedOn = "";
                $scope.Req.approver = "";
                $scope.Req.Industrysector = "";
                $scope.Req.Industrysector = "";
                $scope.Req.MaterialStrategicGroup = "";
                $scope.Req.UnitPrice = "";
                $scope.Req.attachment = "";
            }
        };
    });
