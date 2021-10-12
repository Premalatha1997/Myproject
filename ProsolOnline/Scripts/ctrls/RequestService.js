
(function () {
    'use strict';
    var app = angular.module('ProsolApp', ['cgBusy', 'angular.filter']);
    app.controller('RequestServiceController', function ($scope, $window, $http, $rootScope, $timeout, $filter) {
        $scope.sResultbulk1 = [];
        $scope.hidetb2 = true;
        $scope.getplant = [];
        $scope.getcategory = [];
        $scope.getgroup1S = [];
        $scope.getuomS = [];
        $scope.getapprover = [];

        $scope.getplant = [];
        $scope.getcategory1M = [];
        $scope.group = [];
        $scope.getuom1M = [];
        $scope.getCleanser1 = [];

        $scope.add_button = true;
        $scope.update_button = false;

        $scope.tablerow1 = 0;
        $scope.ngdis2 = false;
        $scope.ngdis1 = false;
        $scope.ngdis = false;

        $scope.show_loading_multiple = false;
        $scope.show_loading_single = false;


       // $scope.Cleanser = [];

        //singlemaster
        //gategory

        $http({
            method: 'GET',
            url: '/GeneralSettings/GetUnspsc',
            params: { Noun: 'Service', Modifier: 'Service' }
        }).success(function (response) {

            if (response != '') {
                $scope.Commodities = response;
                //if ($scope.Commodities[0].Commodity != null && response[0].Commodity != "")
                //    $scope.cat.Unspsc = $scope.Commodities[0].Commodity;
                //else $scope.cat.Unspsc = $scope.Commodities[0].Class;
            }
            else {
                $scope.Commodities = null;
            }

        }).error(function (data, status, headers, config) {
            // alert("error");

        });


        $http.get('/Master/GetDataListplnt'
            ).success(function (response) {
               // alert(angular.toJson(response));
                $scope.getplant = response;
                $scope.getplant = $filter('filter')($scope.getplant, { 'Islive': 'true' })

            }).error(function (data, status, headers, config) {

            });
        

        $http.get('/ServiceMaster/showall_Categoryuser'
            ).success(function (response) {
              //  alert('hi');
                $scope.getcategory = response;
                //alert(angular.toJson($scope.getcategory));
                $scope.getcategory = $filter('filter')($scope.getcategory, {'Islive':'true'})
                $scope.getcategory1M = response;
                $scope.getcategory1M = $filter('filter')($scope.getcategory1M, { 'Islive': 'true' })
              //  alert(angular.toJson($scope.getcategory));
            }).error(function (data, status, headers, config) {
            });

        $scope.getCleanser = function () {
            $http.get(
                '/ServiceMaster/getCleanser'
                ).success(function (response) {

                    $scope.getCleanser1 = response;
                   // alert(angular.toJson($scope.getCleanser1));
                }).error(function (data) {

                });
        };

        $scope.getCleanser();
        //group

        $scope.getgroup1 = function (SeviceCategorycode) {
          //  alert(SeviceCategorycode);
            $http.get('/ServiceMaster/getgroup?SeviceCategorycode=' + SeviceCategorycode
            ).success(function (response) {
                //alert('hi');
                $scope.getgroup1S = response;
                $scope.getgroup1S = $filter('filter')($scope.getgroup1S, { 'Islive': 'true' })
                // alert(angular.toJson($scope.shwusr1))
            }).error(function (data, status, headers, config) {
            });
        };

        //uom

        $http.get('/ServiceMaster/getuomlist').success(function (response) {
           //S  alert('hi');
             $scope.getuom1M = response;
            //alert(angular.toJson($scope.uomList1))
        });

        //$http.get('/ServiceMaster/showall_Uomuser'
        //    ).success(function (response) {
        //        //  alert('hi');
        //        $scope.getuomS = response;
        //        //alert(angular.toJson($scope.getuomS));
        //        $scope.getuomS = $filter('filter')($scope.getuomS, { 'Islive': 'true' })
        //        $scope.getuom1M = response;
        //        $scope.getuom1M = $filter('filter')($scope.getuom1M, { 'Islive': 'true' })
        //        //  alert(angular.toJson($scope.getcategory));
        //    }).error(function (data, status, headers, config) {
        //    });

        //approvercodename

        //$http({
        //    method: 'GET',
        //    url: '/ServiceMaster/get_approvercodename'
        //}).success(function (result) {
        //   // $scope.getapprover = result;
        //    $scope.getCleanser1 = result;
        //  //  alert(angular.toJson($scope.getapprover1));
        //});


        //multiplemaster
        //group under category
        
        $scope.getgrpreqM = function (SeviceCategorycode) {
          // alert(SeviceCategorycode);
            $http.get('/ServiceMaster/getgroup?SeviceCategorycode=' + SeviceCategorycode
            ).success(function (response) {
                //alert('hi');
                $scope.Commodities = response;
              // alert(angular.toJson($scope.group))
            }).error(function (data, status, headers, config) {
            });
        };

        //new request
            $scope.newRequest_SM = function () {
            $scope.show_loading_single = true;
            $timeout(function () { $scope.NotifiyRes = false; }, 5000);
            $scope.ngdis2 = true;
            

            $scope.rows_single = [];
            $scope.rows_single.push({
                servicecategory: $scope.obj.SeviceCategorycode, servicegroup: $scope.obj.ServiceGroupcode,
                unitofmeasurement: $scope.obj.ServiceUomcode, Cleanser: $scope.Cleanserddl,
                servicediscription: $scope.obj.ServiceDiscription
                
            });

            var form_singlerequest = new FormData();
            form_singlerequest.append('Single_request', angular.toJson($scope.rows_single));
           // alert(angular.toJson($scope.rows_single));
            $scope.cgBusyPromises = $http({
                method: 'POST',
                url: '/ServiceMaster/newRequestService',
                headers: { "Content-Type": undefined },
                transformRequest: angular.identity,
                data: form_singlerequest
                

            }).success(function (data) {
                if (data.success === false) {
                    $scope.Res = data.errors;
                    $scope.Notify = "alert-danger";
                    $scope.NotifiyRes = true;
                    $scope.ngdis2 = false;
                    $scope.show_loading_single = false;
                }
                else {
                    //alert('hai');
                   
                    $scope.Res = "Request sent successfully";
                   // alert(angular.toJson($scope.Res))
                    $scope.Notify = "alert-info";
                    $scope.NotifiyRes = true;
                    $scope.ngdis2 = false;
                    $scope.show_loading_single = false;
                    $scope.reset_reqform();
                    
                }

            }).error(function (data) {
                $scope.Res = "Request failed";
                $scope.Notify = "alert-info";
                $scope.NotifiyRes = true;
                $scope.ngdis2 = false;
                $scope.show_loading_single = false;
            });
            };

            $scope.reset_reqform = function () {
               // alert('hi');
                // $scope.getcategory = [];
                $scope.obj.SeviceCategorycode = "";
                $scope.getgroup1S = [];
                $scope.obj.ServiceGroupcode = "";
                $scope.obj.ServiceUomcode = "";
               // $scope.getuomS = [];
                // $scope.getapprover = [];
               // $scope.approverddl = "";
                $scope.obj.ServiceDiscription = "";

                $scope.reqform.$setPristine();
            };

            $scope.reset_reqform_multi = function () {
                $scope.obj.SeviceCategorycode = "";
                $scope.group = [];
                $scope.obj.ServiceGroupcode = "";
                $scope.obj.ServiceUomcode = "";
                $scope.Cleanserddl = "";
                $scope.obj.ServiceDiscription1 = "";
                $scope.obj.PlantCode = "";
                $scope.obj.ServiceGroupCode = "";
              //  $scope.getCleanser();
                $scope.reqform_multi.$setPristine();
               
            };

        //adding multiple rows

            $scope.rows = [];
            $scope.addrowtobulktable_SM = function () {

                var PlantName = $.grep($scope.getplant, function (plant) {
                    return plant.Plantcode == $scope.obj.PlantCode;
                })[0].Plantname;

                var PlantCode = $scope.obj.PlantCode;              

                var ServiceCategoryName = $("#ServiceCategorycodee1M").find("option:selected").text();
                var ServiceGroupName = $("#ServiceGroupcode1M").find("option:selected").text();
                var ServiceCategoryCode = $scope.obj.SeviceCategorycode;
                var ServiceGroupCode = $scope.obj.ServiceGroupCode;
                //alert(group);
               var UomCode = $scope.obj.ServiceUomcode;
               //$.grep($scope.getuom1M, function (uom1) {
               //    return uom1.ServiceUomcode == $scope.obj.ServiceUomcode;
               //})[0].ServiceUomname;

               var UomName = $scope.obj.ServiceUomcode;
                //alert(UomName);
                 var Cleanser1 = $.grep($scope.getCleanser1, function (Cleanser1) {
                     return Cleanser1.Userid == $scope.Cleanserddl;
                 })[0].UserName;
                 var Cleanser = $scope.Cleanserddl;
                // alert(approver);
                 $scope.rows.push({
                    // Sequence: $scope.rows.length + 1, PlantName: $scope.obj.PlantCode, ServiceCategoryName: $scope.obj.SeviceCategorycode, ServiceGroupName: $scope.obj.ServiceGroupcode, UomName: $scope.obj.ServiceUomcode, Cleanser: Cleanser, Cleanser1: Cleanser1, Legacy: $scope.obj.ServiceDiscription1, hPlantName: PlantName, hServiceCategoryName: ServiceCategoryName, hServiceGroupName: ServiceGroupName, hUomName: UomName, hCleanser1: Cleanser1, hLegacy: $scope.obj.ServiceDiscription1
                     Sequence: $scope.rows.length + 1, PlantName: PlantName, PlantCode: PlantCode, ServiceCategoryName: ServiceCategoryName, ServiceCategoryCode: ServiceCategoryCode, ServiceGroupName: ServiceGroupName, ServiceGroupCode: ServiceGroupCode, UomName: UomName, UomCode: UomCode, Cleanser: Cleanser, Cleanser1: Cleanser1, Legacy: $scope.obj.ServiceDiscription1
                 });
             
                 $scope.reset_reqform_multi();
            };
            $scope.clear_fields1 = function () {
                $scope.reset();
                $scope.getcategory1M = "";
                $scope.group = "";
                $scope.getuom1M = "";
                $scope.getCleanser1 = "";
                $scope.ServiceDiscription1 = "";
                $scope.ServiceDiscription = "";
               

           //     $http.get('/ServiceMaster/showall_Categoryuser'
           //).success(function (response) {
           //    $scope.getcategory1M = response;
           //});

           //     $http.get('/ServiceMaster/getgroup?SeviceCategorycode=' + SeviceCategorycode
           // ).success(function (response) {
           //     $scope.group = response;
           // });

                $scope.getCleanser();
            };
            $scope.update_table = function () {
             //   alert("hai");
                //alert(angular.toJson($scope.update_table));
                //    var category = $.grep($scope.getcategory1M, function (category1) {
                //        return category1.SeviceCategorycode == $scope.obj.SeviceCategorycode;
                //    })[0].SeviceCategoryname;
                ////alert(group);
                //    var group = $.grep($scope.group, function (group1) {
                //        return group1.ServiceGroupcode == $scope.obj.ServiceGroupcode;
                //    })[0].ServiceGroupname;
                //    //alert(group);
                //    var uom = $.grep($scope.getuom1M, function (uom1) {
                //        return uom1.ServiceUomcode == $scope.obj.ServiceUomcode;
                //    })[0].ServiceUomname;
                //    // alert(uom);
                //    var Cleanser = $.grep($scope.getCleanser1, function (Cleanser1) {
                //        return Cleanser1.Userid == $scope.Cleanserddl;
                //    })[0].UserName;
              //  alert("hi");

                //-------------------
               // alert(angular.toJson($scope.obj.PlantCode));
                //var PlantName = $.grep($scope.getplant, function (plant) {
                //    return plant.Plantcode == $scope.obj.PlantCode;
                //})[0].Plantname;
               
                //var PlantCode = $scope.obj.PlantCode;

              //  alert(angular.toJson($scope.getcategory1M));

                //    var ServiceCategoryName = $.grep($scope.getcategory1M, function (category1) {
                //        return category1.SeviceCategorycode == $scope.obj.SeviceCategorycode;
                //    })[0].SeviceCategoryname;
                //    var ServiceCategoryCode = $scope.obj.SeviceCategorycode;
           
                //  //  alert(angular.toJson($scope.group));

                //    var ServiceGroupName = $.grep($scope.group, function (group1) {
                //        return group1.ServiceGroupcode == $scope.obj.ServiceGroupcode;
                //    })[0].ServiceGroupname;

                //    var ServiceGroupCode = $scope.obj.ServiceGroupcode;
          

                //   // alert(angular.toJson($scope.getuom1M));

                //    //var UomName = $.grep($scope.getuom1M, function (uom1) {
                //    //    return uom1.UOMNAME == $scope.obj.ServiceUomcode;
                //    //})[0].UOMNAME;

                ////var UomCode = $scope.obj.UOMNAME;

                //////

                //    var UomCode = $scope.obj.ServiceUomcode;
                ////$.grep($scope.getuom1M, function (uom1) {
                ////    return uom1.ServiceUomcode == $scope.obj.ServiceUomcode;
                ////})[0].ServiceUomname;

                //    var UomName = $scope.obj.ServiceUomcode;

                /////
     
                //    //alert(angular.toJson($scope.getCleanser1));
                //    var Cleanser1 = $.grep($scope.getCleanser1, function (Cleanser1) {
                //        return Cleanser1.Userid == $scope.Cleanserddl;
                //    })[0].UserName;

                //    var Cleanser = $scope.Cleanserddl;
                //  alert(angular.toJson($scope.getCleanser1));
                    //alert(angular.toJson($scope.tablerow1));
                var PlantName = $.grep($scope.getplant, function (plant) {
                    return plant.Plantcode == $scope.obj.PlantCode;
                })[0].Plantname;
                var PlantCode = $scope.obj.PlantCode;
                var ServiceCategoryName = $("#ServiceCategorycodee1M").find("option:selected").text();
                var ServiceGroupName = $("#ServiceGroupcode1M").find("option:selected").text();
                var ServiceCategoryCode = $scope.obj.SeviceCategorycode;
                var ServiceGroupCode = $scope.obj.ServiceGroupCode;
                var UomCode = $scope.obj.ServiceUomcode;
                var UomName = $scope.obj.ServiceUomcode;
                var Cleanser1 = $.grep($scope.getCleanser1, function (Cleanser1) {
                    return Cleanser1.Userid == $scope.Cleanserddl;
                })[0].UserName;
                var Cleanser = $scope.Cleanserddl;
                    $scope.rows[$scope.tablerow1] = ({
                        Sequence: $scope.tablerow1 + 1, PlantName: PlantName, PlantCode: PlantCode, ServiceCategoryName: ServiceCategoryName, ServiceCategoryCode: ServiceCategoryCode, ServiceGroupName: ServiceGroupName, ServiceGroupCode: ServiceGroupCode, UomName: UomName, UomCode: UomCode, Cleanser: Cleanser, Cleanser1: Cleanser1, Legacy: $scope.obj.ServiceDiscription1, hPlantName: PlantName, hServiceCategoryName: ServiceCategoryName, hServiceGroupName: ServiceGroupName, hUomName: UomName, Cleanser: Cleanser, hCleanser1: Cleanser1, hLegacy: $scope.obj.ServiceDiscription1
                     //   Sequence: $scope.tablerow1 + 1, PlantName: PlantName, PlantCode: PlantCode, ServiceCategoryName: ServiceCategoryName, ServiceCategoryCode: ServiceCategoryCode, ServiceGroupName: ServiceGroupName, ServiceGroupCode: ServiceGroupCode, UomName: UOMNAME, UomCode: UOMNAME, Cleanser: Cleanser,Cleanser1: Cleanser1, Legacy: $scope.obj.ServiceDiscription1
                      
                       
                    });
                     $scope.update_button = false;
                    $scope.add_button = true;

                    $scope.reset_reqform_multi();
                };
               
            
        // removerow_SM(indexx)
                $scope.removerow = function (index) {
                    //  alert($scope.removerow);
                    $scope.reset_reqform_multi();
                    $scope.add_button = true;
                    $scope.update_button = false;
                    if ($scope.rows.length > 1) {
                        if ($window.confirm("Please confirm to remove row?")) {
                            if ($scope.rows.length > 1) {
                                $scope.rows.length
                                $scope.rows.splice(index, 1);
                            }
                            var cunt = 1;
                            angular.forEach($scope.rows, function (value, key) {
                                value.Sequence = cunt++;
                            });
                        }
                        else {

                        }
                    }
                    else {
                        alert("You cant delete, better update this row");
                    }
                };

        // update row _SM
                $scope.updaterow = function (index) {
                    //if ($window.confirm("Please confirm to load Row to update?")) {

                    //    $scope.add_button = false;
                    //    $scope.update_button = true;

                    //    $scope.tablerow1 = index;
                    //    $scope.obj.SeviceCategorycode = $scope.rows[index].ServiceCategoryName;
                    //    $scope.getgrpreqM($scope.rows[index].SeviceCategoryName);
                    //    $scope.obj.ServiceGroupcode = $scope.rows[index].ServiceGroupName;
                    //    $scope.obj.ServiceUomcode = $scope.rows[index].UomName;
                    //    $scope.Cleanserddl = $scope.rows[index].Cleanser;
                    //    $scope.obj.ServiceDiscription1 = $scope.rows[index].Legacy;
                    //} else {

                    //}
               
                    if ($window.confirm("Please confirm to load Row to update?")) {

                        $scope.add_button = false;
                        $scope.update_button = true;
                        $scope.tablerow1 = index;
                        $scope.obj.PlantCode = $scope.rows[index].PlantCode;
                        $scope.obj.SeviceCategorycode = $scope.rows[index].ServiceCategoryCode;
                        $scope.obj.ServiceGroupCode = $scope.rows[index].ServiceGroupCode;
                      //  $scope.getgrpreqM($scope.rows[index].ServiceGroupCode);
                        $scope.obj.ServiceUomcode = $scope.rows[index].UomCode;
                        $scope.Cleanserddl = $scope.rows[index].Cleanser;
                        $scope.obj.ServiceDiscription1 = $scope.rows[index].Legacy;
                    } else {

                    }
                };
        // requesting bulk material items

                $scope.bulk_material_request_SM = function () {
                    $scope.show_loading_multiple = true;
                    $timeout(function () { $scope.NotifiyRes = false; }, 3000);
                    $scope.ngdis1 = true;
                    var formvalues = new FormData();
                    formvalues.append('Mul_request', angular.toJson($scope.rows));
                    $scope.cgBusyPromises = $http({
                        url: "/ServiceMaster/bulk_material_request_SM",
                        method: "POST",
                        headers: { "Content-Type": undefined },
                        transformRequest: angular.identity,
                        data: formvalues
                    }).success(function (data) {
                        if (data.success === false) {
                            $scope.Res = data.errors;
                            $scope.Notify = "alert-danger";
                            $scope.NotifiyRes = true;
                            $scope.ngdis1 = false;
                            $scope.show_loading_multiple = false;
                        }
                        else {
                            $scope.reset_reqform_multi();
                            $scope.rows = [];
                            $scope.Res = "Request sent successfully";
                            $scope.Notify = "alert-info";
                            $scope.NotifiyRes = true;
                            $scope.ngdis1 = false;
                            $scope.show_loading_multiple = false;
                        }

                    }).error(function () {
                        $scope.Res = "Error occured";
                        $scope.Notify = "alert-danger";
                        $scope.NotifiyRes = true;
                        $scope.ngdis1 = false;
                        $scope.show_loading_multiple = false;
                    });
                };
        //onchangefile

                $scope.LoadFileData2 = function (files) {
                    $timeout(function () {
                        $scope.NotifiyRes = false;
                    }, 30000);
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
                            $('#divNotifiy').attr('style', 'display: block');
                        }
                    }
                };


                $scope.visiable = function () {
                    //  alert("hai");
                    $scope.makevisiable1 = true;
                };

                $scope.visiable1 = function () {
                    //   alert("hai");
                    $scope.makevisiable1 = false;
                };
                $scope.Loadfile2 = function () {
                   // alert("hai");
                    if ($scope.files != null && $scope.files != undefined && $scope.files != "") {
                        $timeout(function () {
                            $('#divNotifiy').attr('style', 'display: none');
                        }, 10000);
                        $timeout(function () { $scope.NotifiyRes1 = false; }, 5000);
                        var formData = new FormData();
                        formData.append('file', $scope.files[0]);
                        $scope.cgBusyPromises = $http({
                            url: "/ServiceMaster/Load_Data_for_bulkupload",
                            method: "POST",
                            headers: { "Content-Type": undefined },
                            transformRequest: angular.identity,
                            data: formData
                        }).success(function (response) {

                            if (response == "Check File Format") {
                                $scope.Res = "Check file format";
                                $scope.Notify = "alert-danger";
                                $scope.NotifiyRes = true;
                                $('#divNotifiy').attr('style', 'display: block');
                            }
                            else if (response == "Uploaded File is Empty") {
                                $scope.Res = "Uploaded File is Emplty";
                                $scope.Notify = "alert-danger";
                                $scope.NotifiyRes = true;
                                $('#divNotifiy').attr('style', 'display: block');

                            }
                            else if (response != null) {
                                $scope.hidetb2 = false;
                                $scope.sResultbulk1 = response;

                              //   alert(angular.toJson($scope.sResultbulk1));

                            }

                        }).error(function (data, status, headers, config) {

                        });
                        //} else {
                        //    if ($scope.GetLD.length > 0) {
                        //        $scope.Res = "Data loaded";
                        //        $scope.Notify = "alert-info";
                        //        $scope.NotifiyRes = true;
                        //        $('#divNotifiy').attr('style', 'display: block');
                        //        $scope.load = true;
                        //        $scope.scrub = true;
                        //        $scope.imp = true;

                        //    } else {
                        //        $scope.Res = "Load valid excel file";
                        //        $scope.Notify = "alert-danger";
                        //        $scope.NotifiyRes = true;
                        //        $('#divNotifiy').attr('style', 'display: block');
                        //        $scope.load = true;
                        //        $scope.scrub = true;
                        //        $scope.imp = true;
                        //    }
                        //}
                    }

                    else {
                        $scope.Res = "Select file to be uploaded";
                        $scope.Notify = "alert-danger";
                        $scope.NotifiyRes = true;
                        $('#divNotifiy').attr('style', 'display: block');
                        //alert("hai");
                        //$scope.files = "";

                    }
                };
                $scope.bulkupload_service_request = function () {
                    $timeout(function () { $scope.NotifiyRes = false; }, 5000);
                    $scope.ngdis = true;
                    var formvalues = new FormData();
                    formvalues.append('sResultbulk1', angular.toJson($scope.sResultbulk1));
                    $scope.cgBusyPromises = $http({
                        url: "/ServiceMaster/bulkupload_service_request",
                        method: "POST",
                        headers: { "Content-Type": undefined },
                        transformRequest: angular.identity,
                        data: formvalues
                    }).success(function (data) {
                        if (data === false) {
                            $scope.Res = data.errors;
                            $scope.Notify = "alert-danger";
                            $scope.NotifiyRes = true;
                            $scope.ngdis = false;
                        }
                        else if (data === true) {
                           // $scope.reset_reqform_multi();
                            $scope.sResultbulk1 = [];
                            $scope.hidetb2 = true;
                            $scope.Res = "Request sent successfully";
                            $scope.Notify = "alert-info";
                            $scope.NotifiyRes = true;
                            $scope.ngdis = false;
                            $('.fileinput').fileinput('clear');
                          //  files[0] = null;
                           // $scope.sResultbulk1 = true;
                           // $scope.hidetb2 = false;

                        }
                        else {
                            $scope.Res = data;
                            $scope.Notify = "alert-info";
                            $scope.NotifiyRes = true;
                            $scope.ngdis = false;
                        }

                    }).error(function () {
                        $scope.Res = "Error occured";
                        $scope.Notify = "alert-danger";
                        $scope.NotifiyRes = true;
                        $scope.ngdis = false;
                        $scope.hidetb2 = true;
                        // $scope.show_loading_multiple = false;
                    });
                };



    });


})();





